import {Utils, MapOf} from "@sinequa/core/base";
import {IQuery, Select, Open, SpellingCorrectionMode, AggregationOptions} from "@sinequa/core/web-services";


export const advancedFacetPrefix = "advanced_";

/**
 * Represents a query for retrieving search results from a Sinequa search engine.
 *
 * The properties are described in the {@link IQuery} interface
 */
export class Query implements IQuery {
    text?: string;
    action: "" | "search" | "open" | "aggregate";
    select?: Select[];
    open?: Open[];
    page?: number;
    pageSize?: number;
    tab?: string;
    scope?: string;
    sort?: string;
    basket?: string;
    isFirstPage?: boolean;
    strictRefine?: boolean;
    globalRelevance?: number;
    questionLanguage?: string;
    questionDefaultLanguage?: string;
    spellingCorrectionMode?: SpellingCorrectionMode;
    spellingCorrectionFilter?: string;
    documentWeight?: string;
    textPartWeights?: string;
    relevanceTransforms?: string;
    removeDuplicates?: boolean;
    queryId?: string;
    aggregations: MapOf<AggregationOptions> | string[];
    orderBy?: string;
    groupBy?: string;

    /**
     * Return a copy of the passed query
     */
    static copy(query: Query): Query {
        if (!query) {
            return query;
        }
        return query.copy();
    }

    constructor(
        public name: string) {
    }

    /**
     * Return `true` if the query has fulltext search elements
     */
    get hasRelevance(): boolean {
        if (!Utils.isEmpty(this.text)) {
            return true;
        }
        if (this.findSelect("refine")) {
            return true;
        }
        return false;
    }

    /**
     * Add a select filter to the query
     *
     * @param expr The fielded search expression to filter the results
     * @param facet The name of the associated facet
     */
    addSelect(expr: string, facet?: string): number {
        return this.pushSelect({
            expression: expr,
            facet: facet || ""
        });
    }

    /**
     * Adds a new `Select` object to the end of the query's `selects`
     */
    pushSelect(select: Select): number {
        if (!this.select) {
            this.select = [];
        }
        return this.select.push(select);
    }

    /**
     * Remove the last `Select` object from the `selects` and return it
     */
    popSelect(): Select | undefined {
        if (!this.select) {
            return undefined;
        }
        return this.select.pop();
    }

    /**
     * Remove the `Select` object identified by `indexOrFacet`
     *
     * @param indexOrFacet either an index in the `selects` array or a facet name
     * @param all If `true` and `indexOrFacet` is a facet name then all `Select` objects with a matching facet name will be removed
     */
    removeSelect(indexOrFacet: number | string, all = false): void {
        if (!this.select) {
            return;
        }
        if (Utils.isString(indexOrFacet)) {
            // indexOrFacet is a facet name
            for (let i = this.select.length - 1; i >= 0; i--) {
                const _select = this.select[i];
                if (Utils.eqNC(_select.facet, indexOrFacet)) {
                    this.select.splice(i, 1);
                    if (this.select.length === 0) {
                        delete this.select; // Clean the query if no more select
                        return;
                    }
                    if (!all) {
                        return;
                    }
                }
            }
        }
        else {
            if (indexOrFacet < 0 || indexOrFacet >= this.select.length) {
                return;
            }
            this.select.splice(indexOrFacet, 1);
            if (this.select.length === 0) {
                delete this.select;
            }
        }
    }

    /**
     * Replace a `Select` with another
     *
     * @param index The index in the `selects` array of the `Select to replace
     * @param select The `Select` to use as a replacement
     */
    replaceSelect(index: number, select: Select) {
        if (!this.select) {
            return;
        }
        this.select.splice(index, 1, select);
    }

    /**
     * Find the index of the nth `Select` object matching the passed facet name
     *
     * @param facet A facet name
     * @param ordinal Specifies which `Select` object to retrieve among selects with the same facet name
     */
    findSelectIndex(facet: string, ordinal = 0): number {
        if (!this.select) {
            return -1;
        }
        let index = 0;
        let facetOrdinal = 0;
        let facetIndex = -1;
        for (const select of this.select) {
            if (Utils.eqNC(facet, select.facet)) {
                facetIndex = index;
                if (facetOrdinal === ordinal) {
                    break;
                }
                facetOrdinal++;
            }
            index++;
        }
        return facetIndex;
    }

    /**
     * Find the first `Select` matching the passed facet name
     *
     * @param facet A facet name
     * @param fromEnd If `true` start searching backwards from the last `Select`
     */
    findSelect(facet: string, fromEnd = true): Select | undefined {
        const facetSelectIndex = this.findSelectIndex(facet, fromEnd ? -1 : 0);
        return facetSelectIndex >= 0 ? this.select && this.select[facetSelectIndex] : undefined;
    }

    /**
     * Return the last `Select` object
     */
    lastSelect(): Select | undefined {
        if (!this.select) {
            return undefined;
        }
        return this.select[this.select.length - 1];
    }

    /**
     * Return the number of `Select` objects
     */
    get selectLength(): number {
        if (!this.select) {
            return 0;
        }
        return this.select.length;
    }

    /**
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expr: string, aggregation: string) {
        if (!this.open || !Utils.isArray(this.open)) {
            this.open = [];
        }
        return this.open.push({
            expression: expr,
            aggregation
        });
    }

    /**
     * Clear all fields in the query except the name
     */
    clear(): void {
        const name = this.name;
        Utils.clearObject(this);
        this.name = name;
    }

    /**
     * Remove advanced search select(s) from the query
     */
    toStandard(): Query {
        const advancedSelect = this.select?.filter(
          (select: Select) => select.facet && select.facet.startsWith(advancedFacetPrefix)
        )
        advancedSelect?.forEach(
          (select) => this.removeSelect(select.facet, true)
        )
        return this;
    }

    /**
     * Return a copy of this query
     */
    copy(): Query {
        const query = new Query(this.name);
        Utils.copy(this, query);
        return query;
    }

    /**
     * Return a copy of this query but without any advanced select
     */
    copyStandard(): Query {
        const query = this.copy();
        return query.toStandard();
    }

    /**
     * Remove all properties from the query except advanced search select(s) and optionally `text`
     *
     * @param withText If `true` do not remove the `text` field
     */
    toAdvanced(withText: boolean = false): Query {
        for (const property in this) {
            if (this.hasOwnProperty(property) && !Utils.eqNC(property, "select") && (!withText || !Utils.eqNC(property, "text"))) {
                delete this[property];
            }
        }
        const notAdvancedSelect = this.select?.filter(
          (select: Select) => select.facet && !select.facet.startsWith(advancedFacetPrefix)
        )
        notAdvancedSelect?.forEach(
          (select) => this.removeSelect(select.facet)
        )
        return this;
    }

    /**
     * Return a copy of this query including just the advanced fields and optionally `text`
     *
     * @param withText If `true` include the `text` field
     */
    copyAdvanced(withText: boolean = false): Query {
        const query = this.copy();
        return query.toAdvanced(withText);
    }

    /**
     * Tests whether this query has advanced search selections
     */
    hasAdvanced(): boolean {
        return !!this.select?.find(s => s.facet && s.facet.startsWith(advancedFacetPrefix));
    }

    /**
     * Initialize this query from the passed JSON string
     *
     * @param jquery JSON in string form
     */
    fromJson(jquery: string): Query {
        this.clear();
        const query = Utils.fromJson(jquery);
        // convert select and open
        const select = query.select;
        if (Utils.isArray(select)) {
            query.select = select.map<Select>((value: Select | string[]) => {
                if (Utils.isArray(value)) {
                    return {
                        expression: value[0],
                        facet: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        const open = query.open;
        if (Utils.isArray(open)) {
            query.open = open.map<Open>((value: Open | string[]) => {
                if (Utils.isArray(value)) {
                    return {
                        expression: value[0],
                        aggregation: value[1]
                    };
                }
                else {
                    return value;
                }
            });
        }
        Utils.extend(this, query);
        return this;
    }

    /**
     * Returns a JSON representation of this query where `Select` and `Open` objects are expressed as tuple arrays for conciseness
     */
    toJsonForQueryString(): string {
        const o: any = {};
        Utils.merge(o, this);
        if (this.select) {
            o.select = this.select.map<string[]>((value) => {
                const a = [value.expression];
                if (value.facet) {
                    a.push(value.facet);
                }
                return a;
            });
        }
        if (this.open) {
            o.open = this.open.map<string[]>((value) => [value.expression, value.aggregation]);
        }
        return Utils.toJson(o);
    }

    /**
     * Return a hash value of this query that excludes any pagination parameters
     */
    hash(): string {
        const obj: any = {};
        Utils.mergeAndSort(obj, this);
        // remove pagination
        delete obj.page;
        delete obj.pageSize;
        const str = Utils.toJson(obj);
        return Utils.sha512(str);
    }
}
