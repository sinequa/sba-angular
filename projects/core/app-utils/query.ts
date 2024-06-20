import {Utils, MapOf} from "@sinequa/core/base";
import {IQuery, Select, Open, SpellingCorrectionMode, AggregationOptions, Filter, ExprFilter, isExprFilter, ValueFilter, FieldFilter, compareFilters, getFieldPredicate, getValuePredicate, AggregationItem, isValueFilter, isFieldFilter} from "@sinequa/core/web-services";

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
      else if(this.filters.operator === 'and' && !this.filters.display) {
        this.filters.filters.push(filter);
      }
      else {
        this.filters = {
          operator: 'and',
          filters: [this.filters, filter]
        }
      }
    }

    /**
     * Find a filter within the filter tree that matches the given predicate
     * @param predicate
     * @param filter
     * @returns
     */
    findFilter(predicate: (c: Filter) => boolean, filter = this.filters): Filter | undefined {
      if(!filter) {
        return undefined;
      }
      if(predicate(filter)) {
        return filter;
      }
      return (filter as ExprFilter).filters?.find(f => this.findFilter(predicate, f));
    }

    /**
     * Find and return a filter that is equivalent to the given filter
     * @param filter
     * @returns
     */
    findSameFilter(filter: Filter): Filter | undefined {
      return this.findFilter(f => compareFilters(f, filter));
    }

    /**
     * Execute a callback function for each filter in the filter tree.
     * The callback function may return true to prevent the propagation
     * to a filter's sub-filters.
     */
    forEachFilter(callback: (c:Filter) => boolean|void, filter = this.filters) {
      if(filter) {
        const stop = callback(filter);
        if(!stop && isExprFilter(filter)) {
          for(let f of filter.filters) {
            this.forEachFilter(callback, f);
          }
        }
      }
    }

    /**
     * Find all filters within the filter tree that match the given predicate
     * @param predicate a predicate function that checks whether or not to return a filter
     * @param nested when true, all the filters nested within a filter that matches the predicate are included (even if they do not match the predicate themselves)
     * @param filter the filter object to explore (defaults to query.filter)
     * @returns a list of filters that match the given predicate
     */
    findAllFilters(predicate: (c: Filter) => boolean, nested = false, filter = this.filters): Filter[] {
      const filters = [] as Filter[];
      if(filter) {
        if(predicate(filter)) {
          filters.push(filter);
          if(nested) {
            predicate = () => true; // Starting from this filter, include all the children
          }
        }
        if(isExprFilter(filter)) {
          filters.push(...filter.filters
            .map(f => this.findAllFilters(predicate, nested, f))
            .flat()
          );
        }
      }
      return filters;
    }

    /**
     * Return all filters within the filter tree that are FieldFilter
     * (with a 'field' attribute)
     * @param fields The field to search for
     */
    findFieldFilters(field: string | string[]): FieldFilter[] {
      return this.findAllFilters(getFieldPredicate(field)) as FieldFilter[];
    }

    /**
     * Return all filters within the filter tree that are ValueFilter
     * (with a 'value' attribute)
     * @param fields The (optional) field to search for
     */
    findValueFilters(field?: string | string[]): ValueFilter[] {
      return this.findAllFilters(getValuePredicate(field)) as ValueFilter[];
    }

    // What counts as 1 filter is a leaf or an AND/OR/NOT with display value
    getFilterCount(fields: string[]|undefined, filter = this.filters): number {
      // No filter => 0
      if(!filter) return 0;

      if(isExprFilter(filter)) {
        const count = filter.filters.reduce((acc, f) => acc + this.getFilterCount(fields, f), 0);
        if(count > 0) {
          return filter.display? 1 : count; // If the expr filter has a "display", it counts as only 1
        }
      }
      else if(!fields || fields.includes(filter.field)) {
        return 1;
      }
      return 0;
    }

    /**
     * Remove the filter(s) from the filter tree that match the given
     * predicate.
     * Clean the filter tree after the removal to remove empty/trivial
     * expressions.
     */
    removeFilters(predicate: (c: Filter) => boolean, filter = this.filters): Filter[] {
      const removed = [] as Filter[];
      if(filter) {
        if(isExprFilter(filter)) {
          for(let i = filter.filters.length-1; i>=0; i--) {
            const f = filter.filters[i];
            if(predicate(f)) {
              removed.push(f);
              filter.filters.splice(i,1);
            }
            else if(isExprFilter(f)) {
              removed.push(...this.removeFilters(predicate, f));
            }
          }
        }
        if (filter === this.filters) {
          if(predicate(filter)) {
            delete this.filters;
            removed.push(filter);
          }
          this.cleanFilters();
        }
      }
      return removed;
    }

    /**
     * Remove expr filters that have no children from
     * the filter tree.
     * Also remove AND/OR filters with single values
     */
    cleanFilters(filter = this.filters): Filter|undefined {
      if(isExprFilter(filter)) {
        filter.filters = filter.filters
          .map(f => this.cleanFilters(f)!)
          .filter(f => f);
        if(filter.filters.length === 0) {
          if(filter === this.filters) {
            delete this.filters; // Special case of the root element
          }
          return undefined; // This filter can be removed from its parent
        }
        if(filter.filters.length === 1 && (filter.operator === 'and' || filter.operator === 'or')) {
          if(filter === this.filters) {
            this.filters = filter.filters[0];
          }
          return filter.filters[0]; // Remove the unneeded and / or that contains a single value
        }
      }
      return filter;
    }


    /**
     * Remove the filters from the filter tree that are identical to the
     * given filter
     */
    removeSameFilters(filter: Filter): Filter[] {
      return this.removeFilters(f => compareFilters(f, filter));
    }

    /**
     * Remove the filters from the filter tree that act on the given field(s)
     */
    removeFieldFilters(field: string | string[]): Filter[] {
      return this.removeFilters(getFieldPredicate(field));
    }

    /**
     * Traverse the filter tree to extract aggregation items from the filters
     *
     * There are 2 types of items:
     * - Simple field-value items (leafs of the tree)
     * - Distribution items (Specific and-expressions with a display value)
     *
     * @returns a map of fields (lowercase) to a list of their AggregationItem
     */
    getFiltersAsAggregationItems(): MapOf<AggregationItem[]> {
      const map = {} as MapOf<AggregationItem[]>;

      this.forEachFilter(f => {

        // Distributions (where values are expressions)
        if(f.display) {
          // This code reconstructs the expresion corresponding to that distribution
          // so it can be compared with the corresponding aggregation item
          let field = '';
          let value = '';
          if(f.operator === 'and' && f.filters.length === 2 && isValueFilter(f.filters[0]) && isValueFilter(f.filters[1]) && f.filters[0].field === f.filters[1].field) {
            value = `${f.filters[0].field}\`${f.display}\`:(>= ${f.filters[0].value} AND < ${f.filters[1].value})`;
            field = f.filters[0].field.toLowerCase();
          }
          else if(f.operator === 'gte') {
            value = `${f.field}\`${f.display}\`:>= ${f.value}`;
            field = f.field.toLowerCase();
          }
          else if(f.operator === 'lt') {
            value = `${f.field}\`${f.display}\`:< ${f.value}`;
            field = f.field.toLowerCase();
          }

          if(value) {
            if(!map[field]) {
              map[field] = [];
            }
            map[field].push({value, display: f.display, count: 0, $filtered: true});
            return true; // Returning true stops the forEach from exploring descendents
          }
        }

        // The most common case of filter: field = value
        if(isFieldFilter(f)) {
          const field = f.field.toLowerCase();
          if(!map[field]) {
            map[field] = [];
          }
          switch(f.operator) {
            case 'between':
              map[field].push({value: f.start, display: f.display, count: 0, $filtered: true});
              map[field].push({value: f.end, display: f.display, count: 0, $filtered: true});
              break;
            case 'in':
              map[field].push(...f.values.map(value => ({value, count: 0, $filtered: true})));
              break;
            case 'null':
              map[field].push({value: null, display: 'null', count: 0, $filtered: true});
              break;
            default:
              map[field].push({value: f.value, display: f.display, count: 0, $filtered: true});
              break;
          }
        }

        return false;
      });

      // Also include filtered concepts
      map['concepts'] = this.getConcepts().map(value => ({value, count:0}));

      return map;
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
      if(isExprFilter(filter)) {
        for(let i=0; i<filter.filters.length; i++) {
          this.nestFilter(predicate, operator, filter.filters[i], filter); // Nest children
        }
      }
    }

    unnestFilter(predicate: (f: Filter) => boolean, filter = this.filters, parent: ExprFilter|undefined = undefined) {
      if(isExprFilter(filter)) {
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


    serializeFilter(filter: Filter): any[] {
      const data: any[] = [filter.operator || '', filter.display || ''];
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

    deserializeFilter(data: any): Filter {
      if(!Array.isArray(data)) {
        return data
      }
      const filter: Partial<Filter> = {};
      if(data[0]) filter.operator = data[0];
      if(data[1]) filter.display = data[1];
      switch(filter.operator) {
        case 'and': case 'or': case 'not':
          filter.filters = data.slice(2).map(d => this.deserializeFilter(d));
          break;
        case 'between':
          filter.field = data[2];
          filter.start = data[3];
          filter.end = data[4];
          break;
        case 'in':
          filter.field = data[2];
          filter.values = data.slice(3);
          break;
        case 'null':
          filter.field = data[2];
          filter.not = data[3];
          break;
        default:
          (filter as ValueFilter).field = data[2];
          (filter as ValueFilter).value = data[3];
          break;
      }
      return filter as Filter;
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
     * Add an `Open` filter to the query. This is typically used to load children of tree nodes
     *
     * @param expr The fielded search expression specifying the node to expand
     * @param aggregation The associated aggregation
     */
    addOpen(expression: string, aggregation: string) {
        if (!this.open || !Array.isArray(this.open)) {
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
     * Return a copy of this query
     */
    copy(): Query {
        const query = new Query(this.name);
        Utils.copy(this, query);
        return query;
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
        if (Array.isArray(select)) {
            query.select = select.map<Select>((value: Select | string[]) => {
                if (Array.isArray(value)) {
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
        if (Array.isArray(open)) {
            query.open = open.map<Open>((value: Open | string[]) => {
                if (Array.isArray(value)) {
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
