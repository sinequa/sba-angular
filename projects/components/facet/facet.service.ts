import { Observable, Subject, map, tap } from "rxjs";

import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";

import { Action, ActionSeparator } from "@sinequa/components/action";
import { SuggestService } from "@sinequa/components/autocomplete";
import { FirstPageService, SearchService } from "@sinequa/components/search";
import { AppService, FormatService, Query } from "@sinequa/core/app-utils";
import { FieldValue, Utils, diacriticsInsensitiveRegexp } from "@sinequa/core/base";
import { IntlService } from "@sinequa/core/intl";
import {
  Aggregation, AggregationItem, AuditEvents,
  BetweenFilter, CCColumn, EngineType, Filter, ListAggregation,
  NumericalFilter, Results, Suggestion, TreeAggregation, TreeAggregationNode, UserSettings, UserSettingsWebService, ValueFilter, getFieldPredicate, isExprFilter
} from "@sinequa/core/web-services";

import { FacetConfig } from "./facet-config";

// Facet interface (from models/UserSettings)
export interface FacetState {
    name: string;
    position: number; // eg 0 = left, 1 = right
}

export interface NamedFacetConfig extends FacetConfig<{}> {
    name: string;
}

/**
 * Options for the [[FacetService.AddFilter]] and [[FacetService.AddFilterSearch]] methods
 *
 * and: If multiple items are filtered, determines whether they are filtered as AND or OR
 * not: Whether this is an exclusion of the filtered item
 * replaceCurrent: if true, the current filter is replaced
 */
export interface AddFilterOptions {
    and?: boolean;
    not?: boolean;
    replaceCurrent?: boolean;
    forceAdd?: boolean; // force a new select creation instead of append it into the current one
}

// Audit Events (from models/Audit)
export const enum FacetEventType {
    Loaded = "Facet_Loaded",
    Add = "Facet_Added",
    AddAll = "Facets_Added",
    Remove = "Facet_Removed",
    RemoveAll = "Facets_Removed",
    SetDefaults = "Facets_SetDefaults",

    Patched = "Facet_Patched",
    ClearFilters = "Facet_ClearFilters",
    AddFilter = "Facet_AddFilter",
    RemoveFilter = "Facet_RemoveFilter",
    Open = "Facet_TreeOpen"
}

// Types of events triggering a change event
export const FACET_CHANGE_EVENTS = [
    FacetEventType.Loaded,
    FacetEventType.Add,
    FacetEventType.AddAll,
    FacetEventType.Remove,
    FacetEventType.RemoveAll,
    FacetEventType.SetDefaults
];


// CRUD Events
export interface FacetChangeEvent {
    type: FacetEventType;
    query?: Query;
    facet?: FacetState;
}

export const ALL_FACETS = new InjectionToken<NamedFacetConfig[]>('ALL_FACETS');
export const DEFAULT_FACETS = new InjectionToken<FacetState[]>('DEFAULT_FACETS');

@Injectable({
    providedIn: 'root',
})
export class FacetService {

    protected readonly _events = new Subject<FacetChangeEvent>();
    protected readonly _changes = new Subject<FacetChangeEvent>();

    constructor(
        protected userSettingsService: UserSettingsWebService,
        protected searchService: SearchService,
        protected suggestService: SuggestService,
        protected appService: AppService,
        protected intlService: IntlService,
        protected formatService: FormatService,
        protected firstPageService: FirstPageService,
        @Optional() @Inject(ALL_FACETS) public allFacets: NamedFacetConfig[],
        @Optional() @Inject(DEFAULT_FACETS) public defaultFacets: FacetState[]){

        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Menus need to be rebuilt
            this.events.next({type: FacetEventType.Loaded});
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if(FACET_CHANGE_EVENTS.indexOf(event.type) !== -1){
                this.changes.next(event);
            }
        });
    }

    // GETTERS

    /**
     * Returns the list of this user's facets.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of facets if it does not already exist.
     */
    public get facets() : FacetState[] {
      if(!this.userSettingsService.userSettings)
      this.userSettingsService.userSettings = {};
      if(!this.userSettingsService.userSettings["facets"]) {
          this.userSettingsService.userSettings["facets"] = [];
          if(!!this.defaultFacets){
              this.userSettingsService.userSettings["facets"].push(...this.defaultFacets);
              this.patchFacets();
          }
      }
      return this.userSettingsService.userSettings["facets"];
    }

    /**
     * @returns a facet with the given name or undefined if it does not exist
     * @param name
     */
    public facet(name: string|undefined): FacetState | undefined {
        const i = this.facetIndex(name);
        return this.facets[i];
    }

    /**
     * Returns the list of facet config in the given container (position)
     * @param position (default to 0 if there is a single container)
     */
    public getFacets(position: number = 0, results: Results) : FacetConfig<{}>[] {
        if (!this.allFacets) {
            return [];
        }
        return this.facets.filter(f => f.position === position)
            .map(f => this.allFacets.find(_f => _f.name === f.name)!)
            .filter(f => f && this.isFacetIncluded(f, results));
    }

    public isFacetIncluded(facet: FacetConfig<{}>, results: Results): boolean {
      return !(facet.includedTabs && !facet.includedTabs.includes(results.tab)) && !facet.excludedTabs?.includes(results.tab)
    }

    /**
     * Returns true if this facet is opened (in any container)
     * @param facetName
     */
    public isFacetOpened(name): boolean {
        return this.facetIndex(name) !== -1;
    }

    protected facetIndex(name: string|undefined): number {
        return this.facets.findIndex(f => f.name === name);
    }

    /**
     * Triggers any events regarding the facets
     */
    public get events(): Subject<FacetChangeEvent> {
        return this._events;
    }

    /**
     * Triggers when events affect the list of facets
     * Cf. CHANGE_EVENTS list
     */
    public get changes() : Subject<FacetChangeEvent> {
        return this._changes;
    }


    public addFacet(facet: FacetState){
        this.facets.push(facet);
        this.updateFacets(FacetEventType.Add, facet);
    }

    public removeFacet(facet: FacetState){
        const i = this.facetIndex(facet.name);
        if(i !== -1){
            this.facets.splice(i,1);
            this.updateFacets(FacetEventType.Remove, facet);
        }
    }

    public setDefaultFacets() {
        this.facets.splice(0);
        if(this.defaultFacets) this.facets.push(...this.defaultFacets);
        this.updateFacets(FacetEventType.SetDefaults);
    }

    public addAllFacets() {
        this.facets.splice(0);
        if(this.allFacets) this.allFacets.forEach(f => this.facets.push({name: f.name, position: 0}));
        this.updateFacets(FacetEventType.AddAll);
    }

    public removeAllFacets() {
        this.facets.splice(0);
        this.updateFacets(FacetEventType.RemoveAll);
    }

    public updateFacets(type: FacetEventType, facet?: FacetState) {
        this.events.next({type, facet});
        const detail = facet? { facet: facet?.name } : undefined
        this.patchFacets([{type, detail}]);
    }

    public createFacetMenu(): Action {

        const outFacets: Action[] = [];

        outFacets.push(new Action({
            name: `set_defaults`,
            text: "msg#facet.filters.setDefaults",
            title: "msg#facet.filters.setDefaults",
            action: () => {
                this.setDefaultFacets();
            }
        }));

        outFacets.push(new Action({
            name: `add_all`,
            text: "msg#facet.filters.addAll",
            title: "msg#facet.filters.addAll",
            action: () => {
                this.addAllFacets();
            }
        }));

        outFacets.push(new Action({
            name: `remove_all`,
            text: "msg#facet.filters.removeAll",
            title: "msg#facet.filters.removeAll",
            action: () => {
                this.removeAllFacets();
            }
        }));

        outFacets.push(ActionSeparator);

        for (const facet of this.allFacets) {
            outFacets.push(new Action({
                name: `add_remove_${facet.name}`,
                text: facet.title,
                icon: facet.icon,
                selected: !!this.facets?.find(userFacet => userFacet.name === facet.name),
                title: this.facets?.find(userFacet => userFacet.name === facet.name) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
                action: () => {
                    const fs = this.facets?.find(userFacet => userFacet.name === facet.name);
                    if (fs) {
                      this.removeFacet(fs);
                    }
                    else {
                      this.addFacet({name: facet.name, position: 0});
                    }
                }
            }));
        }

        return new Action({
            name: "facets_config",
            icon: "fas fa-cog",
            title: "msg#facet.filters.customizeFacets",
            scrollable: true,
            children: outFacets
        });
    }

    /**
     * Updates facets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    protected patchFacets(auditEvents?: AuditEvents) {
      return this.userSettingsService.patch({facets: this.facets} as UserSettings, auditEvents)
        .subscribe(() => this.events.next({type: FacetEventType.Patched}));
    }

    /**
     * Verify that the search service can search the given query on the current route.
     * - check that the query is the search service query
     * - check that the route is a search route
     * - check that the query is not an empty search
     */
    public canSearch(query: Query) {
      return this.searchService.isSearchRouteActive() &&
            (!this.searchService.isEmptySearch(query) || this.appService.getCCQuery(query.name)?.allowEmptySearch) &&
            query === this.searchService.query;
    }

    /**
     * Filter/Exclude an item in a facet and launch a search.
     * Triggers an internal event and an Audit Event
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     */
    public addFilterSearch(
      aggregation: Aggregation,
      items: AggregationItem | AggregationItem[],
      options: AddFilterOptions = {},
      query = this.searchService.query,
      facetName?: string): Promise<boolean> {

      const success = this.addFilter(aggregation, items, options, query);
      if(success) {
        this.events.next({ type: FacetEventType.AddFilter, facet: this.facet(facetName), query });

        if(this.canSearch(query)) {
          return this.searchService.search(undefined, {
            type: FacetEventType.AddFilter,
            detail: {
              item: (Array.isArray(items)? items[0] : items).value,
              itembox: facetName,
              itemcolumn: aggregation.column,
              isitemexclude: options.not,
              fromresultid: this.searchService.results?.id
            }
          });
        }
      }
      return Promise.resolve(false);
    }


    /**
     * Filter/Exclude one or more item(s) in a facet (without launching a search)
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     * @param query the query on which to add the filter (defaults to search service query)
     */
    public addFilter(
      aggregation: Aggregation,
      items: AggregationItem | AggregationItem[],
      options: AddFilterOptions = {},
      query = this.searchService.query): boolean {

      if (!items) {
        return false;
      }

      items = Utils.asArray(items);

      if(Utils.eqNC(aggregation.column, 'concepts')) {
        query.addConcepts(items.map(i => i.value as string), options.not? '-' : '+');
        return true;
      }

      let filter: Filter;
      // Multiple value filter
      if(items.length > 1 || options.not) {
        const filters = items.map(i => this.toFilter(i, aggregation));
        const operator = options.not? 'not' : options.and? 'and' : 'or';
        filter = {operator, filters};
      }
      // Single value filter
      else {
        filter = this.toFilter(items[0], aggregation);
      }

      this.applyFilter(filter, query, options.replaceCurrent);
      return true;
    }


    public applyFilterSearch(filter: Filter, query = this.searchService.query, replaceCurrent = true, facetName?: string) {
      this.applyFilter(filter, query, replaceCurrent);
      this.events.next({ type: FacetEventType.AddFilter, facet: this.facet(facetName), query });

      if(this.canSearch(query)) {
        this.searchService.search(undefined, {
          type: FacetEventType.AddFilter,
          detail: {
            item: filter.display || (filter as ValueFilter).value?.toString() || JSON.stringify(filter),
            itembox: facetName,
            itemcolumn: (filter as ValueFilter).field,
            "from-result-id": this.searchService.results?.id
          }
        });
      }
    }

    public applyFilter(filter: Filter, query = this.searchService.query, replaceCurrent = true) {
      if(replaceCurrent) {
        const fields = this.getFields(filter);
        query.removeFieldFilters(fields);
      }
      query.addFilter(filter);
    }

    protected getFields(filter: Filter): string[] {
      if(isExprFilter(filter)) {
        return filter.filters.map(f => this.getFields(f)).flat();
      }
      return [filter.field];
    }

    protected toFilter(item: AggregationItem, aggregation: Aggregation): Filter {
      const field = aggregation.column;
      const display = item.display;

      if(aggregation.isTree) {
        const _item = item as TreeAggregationNode;
        return {field, value: _item.$path! + '*', display: _item.value}
      }

      else if(aggregation.isDistribution) {
        const res = (item.value as string).match(/.*\:\(?([><=\d\-\.AND ]+)\)?/);
        if(res?.[1]) {
          const expr = res?.[1].split(" AND ");
          const filters = expr.map(e => {
            const operator: 'gte'|'lt' = e.indexOf('>=') !== -1? 'gte' : 'lt';
            let value: FieldValue = e.substring(e.indexOf(' ')+1);
            if(this.appService.isNumber(aggregation.column)) {
              value = +value;
            }
            return {field, operator, value};
          });

          if(filters.length === 2) {
            return {operator: 'and', filters, display};
          }
          else if(filters.length === 1) {
            return {...filters[0], display};
          }
          throw new Error("Failed to parse distribution expression");
        }
      }

      if(typeof item.value === "string" ) {
        return { field, display: item.display, value: item.value, operator: "contains" };
      }
      return {field, value: item.value as boolean | number, display: item.display };
    }

    /**
     * Clears the query from the current filters on the given facet
     * @param field
     * @param query the query to clear from the facet filters (defaults to search service query)
     */
    public clearFilters(field: string, query = this.searchService.query) {
      if(Utils.eqNC(field, "concepts")) {
        query.removeConcepts();
      }
      else {
        query.removeFieldFilters(field);
      }
    }

    /**
     * Clears the query from the current selection on the given facet and perform a search
     * @param facetName
     */
    public clearFiltersSearch(fields: string | string[], all: boolean, query = this.searchService.query, facetName?: string): Promise<boolean> {
      fields = Utils.asArray(fields);

      for(const field of fields) {
        this.clearFilters(field, query);
        this._events.next({type: FacetEventType.ClearFilters, facet: this.facet(facetName), query});
      }

      if(this.canSearch(query)) {
        return this.searchService.search(undefined, {
          type: FacetEventType.ClearFilters,
          detail: {
            itembox: facetName,
            fromresultid: this.searchService.results?.id
          }
        });
      }
      return Promise.resolve(false);
    }

    /**
     * Remove a filter and update the appropriate Select if it was previously included in a selection
     * @param aggregation the aggregation that contains the item to remove
     * @param item the aggregation item to remove from the query
     * @param query the query on which to remove the filter (defaults to search service query)
     */
    public removeFilter(
      aggregation: Aggregation,
      item: AggregationItem,
      query = this.searchService.query): Filter | undefined {

      if(Utils.eqNC(aggregation.column, 'concepts')) {
        const res = query.removeConcept(item.value as string);
        return res? {field: 'concepts', value: item.value as string} : undefined;
      }

      const filter = this.toFilter(item, aggregation);
      const removed = query.removeSameFilters(filter);

      return removed[0];
    }

    /**
     * Removes the aggregation from the search service query and refresh the search
     * @param aggregation
     * @param item
     */
    public removeFilterSearch(aggregation: Aggregation, item: AggregationItem, query = this.searchService.query, facetName?: string): Promise<boolean>{
        const filter = this.removeFilter(aggregation, item, query);
        if(filter) {
            this._events.next({type: FacetEventType.RemoveFilter, facet: this.facet(facetName), query});
            delete query.queryId; // SBA-154
            if(this.canSearch(query)) {
                return this.searchService.search(undefined, {
                    type: FacetEventType.RemoveFilter,
                    detail: {
                        item: item.value,
                        itembox: facetName,
                        itemcolumn: aggregation.column,
                        fromresultid: this.searchService.results ? this.searchService.results.id : null
                    }
                });
            }
        }
        return Promise.resolve(false);
    }

    public makeRangeFilter(field: string, start: Date|number|string|undefined, end: Date|number|string|undefined): BetweenFilter|NumericalFilter|undefined {
      if(end instanceof Date) {
        end = Utils.toSysDateStr(end);
      }
      if(start instanceof Date) {
        start = Utils.toSysDateStr(start);
      }
      if(typeof start === 'undefined' && typeof end === 'undefined') {
        return undefined;
      }
      if(typeof start === 'undefined') {
        return {field, operator: 'lte', value: end!};
      }
      else if(typeof end === 'undefined') {
        return {field, operator: 'gte', value: start!};
      }
      else {
        return {field, operator: 'between', start, end};
      }
    }

    /**
     * Queries the server for data for this aggregation
     * @param aggregation
     * @param skip
     * @param count
     * @param query the query to use to fetch the data (default to search service query)
     */
    public loadData(
        aggregation: Aggregation,
        query = this.searchService.query,
        searchInactive = true): Observable<AggregationItem[]> {

        const skip = aggregation.items?.length || 0;
        const count = aggregation.$cccount;

        query = Utils.copy(query);
        query.action = "aggregate";
        query.aggregations = {};
        query.aggregations[aggregation.name] = {skip, count};
        return this.searchService.getResults(query, undefined, {searchInactive}).pipe(
            map(results => {
                const data = results.aggregations[0];
                const items = aggregation.items || [];
                if(data?.items) {
                    items.push(...data.items);
                }
                aggregation.$hasMore = !!data?.$hasMore;
                return items;
            })
        );
    }

    /**
     * Get suggestions given a text and a field name, using the Suggest service
     * @param text
     * @param field
     * @param suggestQuery
     */
    public suggest(text: string, field: string, query = this.searchService.query): Observable<Suggestion[]> {
      return this.suggestService.get(this.appService.suggestQueries[0], text, [field], query);
    }

    /**
     * Returns true if this facet has at least one active selection
     * filtering the search
     * @param field
     */
    public hasFiltered(field: string | string[], query = this.searchService.query) : boolean {
      return !!this.findFilter(field, query);
    }

    /**
     * Returns an active selection of this facet filtering the search
     * Returns it as a filter
     * @param field
     */
    public findFilter(field: string | string[], query = this.searchService.query) : Filter | undefined {
      field = Utils.asArray(field);

      if(field.find(f => Utils.eqNC(f, "concepts"))) {
        const concepts = query.getConcepts();
        return concepts.length? {field: "concepts", value: concepts[0]} : undefined;
      }

      return query?.findFilter(getFieldPredicate(field));
    }

    /**
     * Look for an aggregation with the given name in the search results and returns it.
     * If this.searchService.results is used, then it takes care of initializing the aggregation items to insert their $column property.
     * If not, fallback to results?.aggregations since $aggregationMap will never exists
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     */
    getAggregation(
        aggregationName: string,
        results = this.searchService.results,
    ): ListAggregation | TreeAggregation | undefined {
        return results?.$aggregationMap?.[aggregationName.toLowerCase()] || results?.aggregations.find((agg) => agg.name === aggregationName);
    }

    /**
     * Opens a Tree node of the given tree facet by querying data from the server
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @param facetName
     * @param aggregation
     * @param item
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    open(
        aggregation: TreeAggregation,
        item: TreeAggregationNode,
        query = this.searchService.query,
        searchInactive = true,
        facetName?: string,
    ): Observable<Results> {

        const value = item.$path + "*";
        query = Query.copy(query);
        query.action = "open";
        const expr = `${aggregation.column}: ${Utils.escapeExpr(value)}`;
        query.addOpen(expr, aggregation.name);

        this.events.next({type: FacetEventType.Open, facet: this.facet(facetName), query});
        return this.searchService.getResults(query, undefined, {searchInactive}).pipe(
            tap(results => {
                const subAggregation = results.aggregations[0] as TreeAggregation;
                if (item.$path && aggregation.items && subAggregation.items) {
                    const source = this.getAggregationNode(subAggregation.items, item.$path);
                    const target = this.getAggregationNode(aggregation.items, item.$path);
                    if (source && target) {
                        target.items = source.items;    // Insert the new data (source) into the original (target)
                    }
                }
            })
        );
    }

    protected getAggregationNode(nodes: TreeAggregationNode[], path: string): TreeAggregationNode | undefined {
        if (!nodes || nodes.length === 0) {
            return undefined;
        }
        const names = Utils.splitTreepath(path);
        let node: TreeAggregationNode | undefined;
        for (let _i = 0, _a = names; _i < _a.length; _i++) {
            if (!nodes || nodes.length === 0) {
                return undefined;
            }
            const name = _a[_i].toLocaleLowerCase();
            node = undefined;
            for (let _j = 0, _b = nodes; _j < _b.length; _j++) {
                const _node = _b[_j];
                if ((<string>_node.value).toLocaleLowerCase() === name) {
                    node = _node;
                    break;
                }
            }
            if (!node) {
                return undefined;
            }
            nodes = node.items;
        }
        return node;
    }

    /**
     * Convert Suggestion to AggregationItem
     * @param suggest a Suggestion object
     *
     * @returns AggregationItem object with is `$column` property defined.
     * On boolean type, convert `value` property to boolean
     */
    suggestionToAggregationItem(suggest: Suggestion): AggregationItem {
        const item: AggregationItem = {
            value: suggest.normalized || suggest.display,
            display: suggest.display,
            count: +(suggest.frequency || 0),
            $column: this.appService.getColumn(suggest.category)
        };
        if (item.$column?.eType === EngineType.bool) {
            item.value = Utils.isTrue(item.value);
        }
        return item;
    }

    /**
     * Converts a list of suggestions into a structure of TreeAggregationNodes
     * @param suggests Suggestions to convert
     * @param searchTerm The searched term in the suggestions
     * @param aggregation The tree aggregations
     */
    suggestionsToTreeAggregationNodes(suggests: Suggestion[], searchTerm: string, aggregation: Aggregation | undefined): TreeAggregationNode[] {
        const suggestions: TreeAggregationNode[] = [];
        if(suggests.length > 0) {
            const path2node = new Map<string, TreeAggregationNode>();

            // searchTerm should be escaped
            const term = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const searchPattern = diacriticsInsensitiveRegexp(term, '\\b', '', 'i');
            const column = this.appService.getColumn(aggregation?.column);
            suggests.forEach(suggest => {
                if(suggest.display.length > 1) {
                    const match = searchPattern.exec(suggest.display);
                    this.addNode(suggestions, path2node, "/", suggest.display, +(suggest.frequency || 0), 0, (match?.index || 0)+searchTerm.length, column);
                }
            });
        }
        return suggestions;
    }

    /**
     * Utility recursive function to generate a tree aggregation structure from
     * a list of suggestions
     */
    protected addNode(items: TreeAggregationNode[],
            path2node: Map<string,TreeAggregationNode>,
            parentPath: string,
            path: string,
            count: number,
            level: number,
            matchend: number,
            column: CCColumn | undefined) {

        const nextChild = path.indexOf("/", parentPath.length); // path = /Cities/Paris/17e/   parentPath = /Cities/
        const currentPath = path.substring(0, nextChild+1); // => currentPath = /Cities/Paris/
        let node = path2node.get(currentPath);

        if(!node) {
            const value = path.substring(parentPath.length, nextChild);
            node = {
                value,
                count,
                items: [],
                hasChildren: false,
                $column: column,
                $level: level,
                $opened: matchend >= currentPath.length,
                $path: currentPath
            };
            path2node.set(currentPath, node);
            items.push(node);
        }

        if(currentPath.length < path.length) {
            node.hasChildren = true;
            this.addNode(node.items, path2node, currentPath, path, count, level+1, matchend, column);
        }
    }

    /**
     * This function returns the query that was used to generate the given data.
     * If the results object is the "first page", then it was obtained from a blank search
     * If the results object is the searchService.results, then it was obtained from the searchService.query
     * It could also be an unrelated query so we return sensible defaults
     */
    getDataQuery(results: Results, query?: Query): Query {
        // If this facet displays the "first page" (blank search), we want to actually get suggestiong corresponding to a blank search
        const isFirstPage = results.aggregations === this.firstPageService.firstPage?.aggregations;
        // If this facet displays the SearchService results, we want to use the corresponding query for suggestion, which may be different from the "edited" query (this.query)
        const isMainResults = results.aggregations === this.searchService.results?.aggregations;
        return isFirstPage ? this.searchService.makeQuery() :
            isMainResults? this.searchService.query :
            query || this.searchService.query;
    }


}
