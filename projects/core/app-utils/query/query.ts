import {AppService} from "../app.service";
import {Utils, MapOf} from "@sinequa/core/base";
import {ExprParser, Expr} from "./expr-parser";
import {IQuery, Select, Open, SpellingCorrectionMode, AggregationOptions, AdvancedValueEntry,
    AdvancedOperator, BasicAdvancedValue, AdvancedValue, AdvancedValueWithOperator} from "@sinequa/core/web-services";

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
    advanced?: MapOf<AdvancedValueEntry>;

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
     * Remove advanced search filters from the query
     */
    toStandard(): Query {
        delete this.advanced;
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
     * Return a copy of this query but without any advanced fields
     */
    copyStandard(): Query {
        const query = this.copy();
        return query.toStandard();
    }

    /**
     * Remove all properties from the query except `advanced` and optionally `text`
     *
     * @param withText If `true` do not remove the `text` field
     */
    toAdvanced(withText: boolean = false): Query {
        for (const property in this) {
            if (this.hasOwnProperty(property) && !Utils.eqNC(property, "advanced") && (!withText || !Utils.eqNC(property, "text"))) {
                delete this[property];
            }
        }
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
     * Returns `true` if the advanced parameters of this query are the same as the advanced parameters
     * of the passed query.
     *
     * @param query A query to compare with this instance
     * @param withText Also include the `text` field in the comparison
     */
    advancedEquals(query: Query, withText: boolean = false): boolean {
        if (!query) {
            return false;
        }
        if (withText) {
            if (this.text !== query.text) {
                return false;
            }
        }
        return Utils.equals(this.advanced, query.advanced);
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

    /**
     * Return `true` if the passed value is an `AdvancedValueWithOperator`
     */
    isAdvancedValueWithOperator(value: any): value is AdvancedValueWithOperator {
        if (Utils.isObject(value) && !Utils.isArray(value) && !Utils.isDate(value)) {
            if (value.hasOwnProperty("value") && value.hasOwnProperty("operator")) {
                return true;
            }
        }
        return false;
    }

    /**
     * Return `true` if the passed value is an array that doesn't contain any `AdvancedValueWithOperator`
     * objects
     */
    isValueArray(value: any): value is (string[] | number[] | Date[] | boolean[]) {
        if (Utils.isArray(value)) {
            return value.every(element => !this.isAdvancedValueWithOperator(element));
        }
        return false;
    }

    private _escapeAdvancedValue(field: string, value: BasicAdvancedValue): BasicAdvancedValue {
        if (value && Utils.isString(value)) {
            return ExprParser.escape(value);
        }
        return value;
    }

    private escapeAdvancedValue(field: string, value: AdvancedValue): AdvancedValue {
        if (Utils.isArray(value)) {
            return value.map(value1 => this._escapeAdvancedValue(field, value1));
        }
        else {
            return this._escapeAdvancedValue(field, value);
        }
    }

    private _unescapeAdvancedValue(field: string, value: BasicAdvancedValue): BasicAdvancedValue {
        if (value && Utils.isString(value)) {
            return ExprParser.unescape(value);
        }
        return value;
    }

    private unescapeAdvancedValue(field: string, value: AdvancedValue): AdvancedValue {
        if (Utils.isArray(value)) {
            return value.map(value1 => this._unescapeAdvancedValue(field, value1));
        }
        else {
            return this._unescapeAdvancedValue(field, value);
        }
    }

    /**
     * Get the `AdvancedValue` corresponding to the passed field and operator
     */
    getAdvancedValue(field: string, operator: AdvancedOperator): AdvancedValue | undefined {
        if (this.advanced) {
            const value = this.advanced[field];
            if (Utils.isArray(value)) {
                if (operator) {
                    for (const _value of value) {
                        if (this.isAdvancedValueWithOperator(_value)) {
                            if (operator === _value.operator) {
                                return this.unescapeAdvancedValue(field, _value.value);
                            }
                        }
                    }
                }
                else {
                    if (this.isValueArray(value)) {
                        return this.unescapeAdvancedValue(field, value);
                    }
                    for (const _value of value) {
                        if (!this.isAdvancedValueWithOperator(_value)) {
                            return this.unescapeAdvancedValue(field, _value);
                        }
                    }
                }
            }
            else {
                if (operator) {
                    if (this.isAdvancedValueWithOperator(value)) {
                        if (operator === value.operator) {
                            return this.unescapeAdvancedValue(field, value.value);
                        }
                    }
                }
                else {
                    if (!this.isAdvancedValueWithOperator(value)) {
                        return this.unescapeAdvancedValue(field, value);
                    }
                }
            }
        }
        return undefined;
    }

    /**
     * Get a dictionary of advanced values keyed by field name
     */
    getAdvancedValues(): MapOf<(AdvancedValue | AdvancedValueWithOperator)[]> {
        if (!this.advanced) {
            return {};
        }
        const map: MapOf<(AdvancedValue | AdvancedValueWithOperator)[]> = {};
        for (const key of Object.keys(this.advanced)) {
            let value = this.advanced[key];
            if (!Utils.isArray(value) || this.isValueArray(value)) {
                value = [value];
            }
            map[key] = value;
        }
        return map;
    }

    /**
     * Get the value of an advanced value as a fielded search expression {@link Expr}.
     *
     * @param appService The `AppService`
     * @param field The field
     * @param value The advanced value
     */
    getAdvancedValueExpr(appService: AppService, field: string, value: AdvancedValue | AdvancedValueWithOperator): Expr | string {
        // The string value may already contain the field expression (eg for distributions)
        // Try parsing the value and if successful see whether the field on the expression
        // matches the passed field. If it does, use the value as the full expression.
        if (Utils.isString(value)) {
            const expr1 = appService.parseExpr(ExprParser.unescape(value));
            if (expr1 instanceof Expr && Utils.eqNC(expr1.field || "", field)) {
                return expr1;
            }
        }
        let expression = field + ":";
        let advancedValue: AdvancedValue;
        if (this.isAdvancedValueWithOperator(value)) {
            expression += value.operator;
            advancedValue = value.value;
        }
        else {
            advancedValue = value;
        }
        if (Utils.isArray(advancedValue)) {
            expression += "[";
            advancedValue.forEach((value1, index) => {
                if (index > 0) {
                    expression += ",";
                }
                expression += appService.escapeFieldValue(field, value1);
            });
            expression += "]";
        }
        else {
            expression += appService.escapeFieldValue(field, advancedValue);
        }
        const expr = appService.parseExpr(expression);
        return expr;
    }

    private advancedValueIsEmpty(value: AdvancedValue): boolean {
        return value === null || Utils.isUndefined(value) || value === "";
    }

    /**
     * Set an advanced value on this query. An empty replacement `value` leads to an advanced value being removed
     * from the query. When an operator is specified with the value then multiple values with different operators
     * can be stored for a field. The incoming operator is matched against any existing operator when deciding
     * whether to replace or append a new advanced value
     *
     * @param field The field associated with the value
     * @param value The value
     * @param operator The advanced operator
     * @param escapeValue If `true` the value is escaped
     */
    setAdvancedValue(field: string, value: AdvancedValue, operator?: AdvancedOperator, escapeValue = false) {
        const advanced = this.advanced || {};
        let currentValue = advanced[field];
        if (escapeValue) {
            value = this.escapeAdvancedValue(field, value);
        }
        const valueWithOperator = operator && !this.advancedValueIsEmpty(value) ?
            {
                value,
                operator
            } as AdvancedValueWithOperator : undefined;
        let done = false;
        if (Utils.isArray(currentValue)) {
            if (this.isValueArray(currentValue)) {
                if (operator) {
                    advanced[field] = valueWithOperator;
                }
                else {
                    advanced[field] = value;
                }
                done = true;
            }
            else {
                for (let i = 0, ic = currentValue.length; i < ic; i++) {
                    const _value = currentValue[i];
                    if (operator) {
                        if (this.isAdvancedValueWithOperator(_value)) {
                            if (_value.operator === operator) {
                                if (this.advancedValueIsEmpty(value)) {
                                    currentValue.splice(i, 1);
                                    i--;
                                    ic--;
                                }
                                else {
                                    _value.value = value;
                                }
                                done = true;
                                break;
                            }
                        }
                    }
                    else {
                        if (!this.isAdvancedValueWithOperator(_value)) {
                            if (this.advancedValueIsEmpty(value)) {
                                currentValue.splice(i, 1);
                                i--;
                                ic--;
                            }
                            else {
                                currentValue[i] = value;
                            }
                            done = true;
                            break;
                        }
                    }
                }
                if (currentValue.length === 0) {
                    advanced[field] = undefined;
                }
            }
        }
        else if (!Utils.isUndefined(currentValue)) {
            if (operator) {
                if (this.isAdvancedValueWithOperator(currentValue)) {
                    if (currentValue.operator === operator) {
                        if (this.advancedValueIsEmpty(value)) {
                            advanced[field] = undefined;
                        }
                        else {
                            currentValue.value = value;
                        }
                        done = true;
                    }
                }
            }
            else if (!this.isAdvancedValueWithOperator(currentValue)) {
                advanced[field] = value;
                done = true;
            }
        }
        else {
            if (operator) {
                advanced[field] = valueWithOperator;
            }
            else {
                advanced[field] = value;
            }
            done = true;
        }
        if (!done && !this.advancedValueIsEmpty(value)) {
            if (!Utils.isArray(currentValue)) {
                currentValue = [currentValue];
            }
            if (operator) {
                currentValue.push(valueWithOperator);
            }
            else {
                currentValue.push(value);
            }
            advanced[field] = currentValue;
        }
        if (Object.keys(advanced).length === 0) {
            this.advanced = undefined;
        }
        else {
            this.advanced = advanced;
        }
    }

    /**
     * Remove the advanced value associated with the passed field. If the operator
     * is specified then it is matched when testing the value to be removed
     *
     * @param field The field for which an advanced value should be removed
     * @param operator An optional advanced operator
     */
    removeAdvancedValue(field: string, operator?: AdvancedOperator) {
        this.setAdvancedValue(field, undefined, operator);
    }
}
