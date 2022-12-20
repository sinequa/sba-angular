import {Utils, MapOf} from "@sinequa/core/base";
import {IQuery, Select, Open, SpellingCorrectionMode, AggregationOptions, Filter, ExprFilter} from "@sinequa/core/web-services";


export const advancedFacetPrefix = "advanced_";

/**
 * This regular expression performs a high-level parsing of the full text query
 * containing search operators: + - (...) [...] "..." /.../
 * This expression catches high-level groups and their +/- operators, but it
 * does not parse the text recursively, so it will miss nested groups like
 * in the query: +([Bill Gates] is "nice") -microsoft
 */
const FULL_TEXT_PATTERNS = /(([\+\-])?\(([^\)]+)\))|(([\+\-])?\[([^\]]+)\])|(([\+\-])?\"([^\"]+)\")|(([\+\-])?\/([^\/]+)\/)|(([\+\-])?(\S+))/g;
const GROUP_OP = 2;
const GROUP = 3;
const ADJACENT_OP = 5;
const ADJACENT_GROUP = 6;
const EXACT_OP = 8;
const EXACT_GROUP = 9;
const REGEX_OP = 11;
const REGEX_GROUP = 12;
const TOKEN_OP = 14;
const TOKEN_GROUP = 15;

export interface FullTextPattern {
  type: 'group'|'adjacent'|'exact'|'regex'|'token';
  value: string;
  op?: '+'|'-';
}

/**
 * Represents a query for retrieving search results from a Sinequa search engine.
 *
 * The properties are described in the {@link IQuery} interface
 */
export class Query implements IQuery {
    text?: string;
    action: "" | "search" | "open" | "aggregate";
    filters?: Filter;
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
    neuralSearch?: boolean;


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


    addFilter(filter: Filter) {
      if(!this.filters) {
        this.filters = filter;
      }
      else if(this.filters.operator === 'and') {
        this.filters.filters.push(filter);
      }
      else {
        this.filters = {
          operator: 'and',
          filters: [this.filters, filter]
        }
      }
    }

    findFilter(predicate: (c: Filter) => boolean, filter = this.filters): Filter | undefined {
      if(!filter) {
        return undefined;
      }
      if(predicate(filter)) {
        return filter;
      }
      return (filter as ExprFilter).filters?.find(f => this.findFilter(predicate, f));
    }

    findAllFilters(predicate: (c: Filter) => boolean, nested = false, filter = this.filters): Filter[] {
      const filters = [] as Filter[];
      if(filter) {
        if(predicate(filter)) {
          filters.push(filter);
          if(nested) {
            predicate = () => true; // Starting from, include all the children
          }
        }
        const children = (filter as ExprFilter).filters
          ?.map(f => this.findAllFilters(predicate, nested, f))
          .flat() || [];
        filters.push(...children);
      }
      return filters;
    }

    // What counts as 1 filter is a leaf or an AND/OR/NOT with display value
    getFilterCount(facetName: string|undefined, filter = this.filters): number {
      // No filter => 0
      if(!filter) return 0;

      const subFilters = (filter as ExprFilter).filters;

      // We are looking for a facetName
      if(facetName) {
        // This filter has one, but they disagree => 0
        if(filter.facetName && filter.facetName !== facetName) return 0;

        // This filter agrees!
        if(filter.facetName === facetName) {
          if(!subFilters || filter.display) return 1; // if no sub filter or a display value exists => 1
          return subFilters.reduce((acc, f) => acc + this.getFilterCount(undefined, f), 0); // If subfilters, return the number of leafs or displays
        }
      }

      // We are just counting every filter
      else {
        if(!subFilters || filter.display) return 1; // if no sub filter or a display value exists => 1
      }

      return subFilters?.reduce((acc, f) => acc + this.getFilterCount(facetName, f), 0) || 0;
    }

    removeFilter(predicate: (c: Filter) => boolean): Filter[] {
      const removed = [] as Filter[];
      if(this.filters) {
        if(predicate(this.filters)) {
          removed.push(this.filters);
          delete this.filters;
        }
        else {
          const remaining = this._removeFilter(predicate, this.filters, removed);
          if(!remaining) {
            removed.push(this.filters);
            delete this.filters;
          }
          else {
            this.filters = remaining;
          }
        }
      }
      return removed;
    }

    protected _removeFilter(predicate: (c: Filter) => boolean, filter: Filter|undefined, removed: Filter[]): Filter|undefined {
      if(this.isExpr(filter)) {
        const updated: Filter[] = [];
        for(let f of filter.filters) {
          const p = predicate(f);
          if(p) {
            removed.push(f); // Remove conditions matching predicate
          }
          else {
            f = this._removeFilter(predicate, f, removed)! // Apply recursively on remaining objects
            if(f) {
              updated.push(f); // Keep what's left
            }
          }
        }
        if(updated.length === 0) {
          return undefined; // Delete entirely this condition
        }
        if(updated.length === 1 && (filter?.operator === 'and' || filter?.operator === 'or')) {
          if(filter.facetName && !updated[0].facetName) { // When we "delete a level", we write the facetName of the "wrapper" on the nested level
            updated[0].facetName = filter.facetName;
          }
          return updated[0]; // Return the inner condition (no need to apply AND/OR to single condition)
        }
        filter.filters = updated;
      }
      return filter;
    }

    nestFilter(predicate: (f: Filter) => boolean, operator: 'and' | 'or' | 'not', filter = this.filters, parent: ExprFilter|undefined = undefined) {
      if(filter && predicate(filter)) {
        if(!parent) {
          this.filters = {operator: 'and', filters: [filter]};
        }
        else {
          const i = parent.filters.indexOf(filter);
          parent.filters[i] = {operator: 'and', filters: [filter]};
        }
      }
      if(this.isExpr(filter)) {
        for(let i=0; i<filter.filters.length; i++) {
          this.nestFilter(predicate, operator, filter.filters[i], filter); // Nest children
        }
      }
    }

    unnestFilter(predicate: (f: Filter) => boolean, filter = this.filters, parent: ExprFilter|undefined = undefined) {
      if(this.isExpr(filter)) {
        if(predicate(filter)) {
          if(!parent) {
            this.filters = filter.filters[0];
          }
          else {
            const i = parent.filters.indexOf(filter);
            parent.filters[i] = filter.filters[0];
          }
        }
        for(let f of filter.filters) {
          this.unnestFilter(predicate, f, filter);
        }
      }
    }

    isExpr(filter: Filter | undefined): filter is ExprFilter {
      return !!(filter as ExprFilter)?.filters;
    }

    serializeFilter(filter: Filter): any[] {
      const data: any[] = [filter.operator || '', filter.display || '', filter.facetName || ''];
      switch(filter.operator) {
        case 'and': case 'or': case 'not':
          data.push(...filter.filters.map(f => this.serializeFilter(f)));
          break;
        case 'between':
          data.push(filter.field, this.serializeValue(filter.start), this.serializeValue(filter.end));
          break;
        case 'in':
          data.push(filter.field, ...filter.values);
          break;
        case 'null':
          data.push(filter.field, filter.not);
          break;
        default:
          data.push(filter.field, this.serializeValue(filter.value));
          break;
      }
      return data;
    }

    serializeValue(value: string|number|Date|boolean) {
      if(Utils.isDate(value)) {
        return Utils.toSysDateStr(value);
      }
      return value;
    }

    deserializeFilter(data: any[]): Filter {
      const filter: any = {};
      if(data[0]) filter.operator = data[0];
      if(data[1]) filter.display = data[1];
      if(data[2]) filter.facetName = data[2];
      switch(filter.operator) {
        case 'and': case 'or': case 'not':
          filter.filters = data.slice(3).map(d => this.deserializeFilter(d));
          break;
        case 'between':
          filter.field = data[3];
          filter.start = data[4];
          filter.end = data[5];
          break;
        case 'in':
          filter.field = data[3];
          filter.values = data.slice(4);
          break;
        case 'null':
          filter.field = data[3];
          filter.not = data[4];
          break;
        default:
          filter.field = data[3];
          filter.value = data[4];
          break;
      }
      return filter;
    }

    /**
     * Return `true` if the query has fulltext search elements
     */
    get hasRelevance(): boolean {
        return !!this.text;
    }

    protected parseText(): FullTextPattern[] {
      if(!this.text) return [];
      const content = [] as FullTextPattern[];
      const matches = this.text.matchAll(FULL_TEXT_PATTERNS);
      for(let m of matches) {
        if(m[GROUP]) content.push({type: 'group', value: m[GROUP], op: m[GROUP_OP] as '+'|'-'});
        else if(m[ADJACENT_GROUP]) content.push({type: 'adjacent', value: m[ADJACENT_GROUP], op: m[ADJACENT_OP] as '+'|'-'});
        else if(m[EXACT_GROUP]) content.push({type: 'exact', value: m[EXACT_GROUP], op: m[EXACT_OP] as '+'|'-'});
        else if(m[REGEX_GROUP]) content.push({type: 'regex', value: m[REGEX_GROUP], op: m[REGEX_OP] as '+'|'-'});
        else if(m[TOKEN_GROUP]) content.push({type: 'token', value: m[TOKEN_GROUP], op: m[TOKEN_OP] as '+'|'-'});
      }
      return content;
    }

    protected rewriteText(patterns: FullTextPattern[]) {
      return patterns.map(p => {
        const op = p.op || '';
        switch(p.type) {
          case 'group': return `${op}(${p.value})`;
          case 'adjacent': return `${op}[${p.value}]`;
          case 'exact': return `${op}"${p.value}"`;
          case 'regex': return `${op}/${p.value}/`;
          case 'token': return `${op}${p.value}`;
        }
      }).join(' ');
    }

    addRefine(value: string) {
      let patterns = this.parseText();
      patterns.forEach(p => p.op = '+'); // Make all previous patterns mandatory (if not already the case)
      patterns.push({type: 'group', value, op: '+'});
      this.text = this.rewriteText(patterns);
    }

    getRefines(): string[] {
      return this.parseText()
        .filter(p => p.type === 'group' && p.op === '+') // We assume the latest refine is a +(group) pattern
        .map(p => p.value);
    }

    addConcepts(concepts: string[], op?: '+'|'-') {
      let patterns = this.parseText();
      for(let value of concepts) {
        patterns.push({type: 'adjacent', value, op});
      }
      this.text = this.rewriteText(patterns);
    }

    removeConcept(concept: string): boolean {
      const patterns = this.parseText();
      const i = patterns.findIndex(p => Utils.eqNC(p.value, concept));
      if(i !== -1) {
        patterns.splice(i, 1);
        this.text = this.rewriteText(patterns);
        return true;
      }
      return false;
    }

    removeConcepts() {
      const patterns = this.parseText()
        .filter(p => !(p.type === 'adjacent'));
      this.text = this.rewriteText(patterns);
    }

    getConcepts() {
      return this.parseText()
        .filter(p => p.type === 'adjacent') // We assume the concepts are a +[group] pattern
        .map(p => p.value);
    }

    /**
     * Add a select filter to the query
     *
     * @param expression The fielded search expression to filter the results
     * @param facet The name of the associated facet
     */
    addSelect(expression: string, facet = ""): number {
        return this.pushSelect({expression,  facet});
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
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expression: string, aggregation: string) {
        if (!this.open || !Utils.isArray(this.open)) {
            this.open = [];
        }
        return this.open.push({ expression, aggregation });
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
        this.removeFilter(f => !!f.facetName?.startsWith(advancedFacetPrefix));
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
            if (this.hasOwnProperty(property) && !Utils.eqNC(property, "filters") && (!withText || !Utils.eqNC(property, "text"))) {
                delete this[property];
            }
        }
        this.removeFilter(f => !f.facetName?.startsWith(advancedFacetPrefix));
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
        if (query.filters) {
            query.filters = this.deserializeFilter(query.filters);
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
        if (this.filters) {
            o.filters = this.serializeFilter(this.filters);
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
