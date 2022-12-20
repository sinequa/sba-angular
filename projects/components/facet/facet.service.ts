import {Injectable, Inject, Optional, InjectionToken} from "@angular/core";
import {UserSettingsWebService, UserSettings, Suggestion,
    Results, Aggregation, AggregationItem, TreeAggregation, TreeAggregationNode,
    AuditEvents, EngineType, CCColumn, Filter, ExprFilter, ValueFilter, BetweenFilter, NumericalFilter, InFilter, NullFilter
} from "@sinequa/core/web-services";
import {IntlService} from "@sinequa/core/intl";
import {Query, AppService, FormatService} from "@sinequa/core/app-utils";
import {FieldValue, Utils} from "@sinequa/core/base";
import {Subject, Observable, map} from "rxjs";
import {FirstPageService, SearchService} from "@sinequa/components/search";
import {SuggestService} from "@sinequa/components/autocomplete";
import { FacetConfig } from "./facet-config";
import { Action, ActionSeparator } from "@sinequa/components/action";

// Facet interface (from models/UserSettings)
export interface FacetState {
    name: string;
    position: number; // eg 0 = left, 1 = right
}

/**
 * Options for the [[FacetService.AddFilter]] and [[FacetService.AddFilterSearch]] methods
 *
 * and: If multiple items are filtered, determines whether they are filtered as AND or OR
 * not: Whether this is an exlusion of the filtered item
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

export const ALL_FACETS = new InjectionToken<FacetConfig<any>[]>('ALL_FACETS');
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
        @Optional() @Inject(ALL_FACETS) public allFacets: FacetConfig<{}>[],
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
    public facet(name: string): FacetState | undefined {
        const i = this.facetIndex(name);
        return i>= 0? this.facets[i] : undefined;
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
    public isFacetOpened(facetName): boolean {
        return !!this.facets.find(f => f.name === facetName);
    }

    protected facetIndex(name: string): number {
        for (let i = 0, ic = this.facets.length; i < ic; i++) {
            const facet = this.facets[i];
            if (facet && facet.name === name) {
                return i;
            }
        }
        return -1;
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
        if(!!this.defaultFacets) this.facets.push(...this.defaultFacets);
        this.updateFacets(FacetEventType.SetDefaults);
    }

    public addAllFacets() {
        this.facets.splice(0);
        if(!!this.allFacets) this.allFacets.forEach(f => this.facets.push({name: f.name, position: 0}));
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
                title: !!this.facets?.find(userFacet => userFacet.name === facet.name) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
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
            .subscribe(
                next => {
                    this.events.next({type: FacetEventType.Patched});
                },
                error => {
                    console.error("Could not patch Facets!", error);
            });
    }

    public canSearch(query: Query) {
        return this.searchService.isSearchRouteActive() && query === this.searchService.query;
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
        facetName: string,
        aggregation: Aggregation,
        items: AggregationItem | AggregationItem[],
        options: AddFilterOptions = {},
        query = this.searchService.query): Promise<boolean> {

        const success = this.addFilter(facetName, aggregation, items, options, query);
        if(success) {
            this.events.next({ type: FacetEventType.AddFilter, facet: this.facet(facetName), query });

            if(this.canSearch(query)) {
                return this.searchService.search(undefined, {
                    type: FacetEventType.AddFilter,
                    detail: {
                        item: (Array.isArray(items)? items[0] : items).value.toString(),
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
        facetName: string,
        aggregation: Aggregation,
        items: AggregationItem | AggregationItem[],
        options: AddFilterOptions = {},
        query = this.searchService.query): boolean {

        if (!items) {
          return false;
        }

        if (!Array.isArray(items)) {
          items = [items];
        }

        if(Utils.eqNC(aggregation.column, 'concepts')) {
          query.addConcepts(items.map(i => i.value.toString()), options.not? '-' : '+');
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
        filter.facetName = facetName;

        this.applyFilter(filter, query, options.replaceCurrent);
        return true;
    }


    public applyFilterSearch(filter: Filter, query = this.searchService.query, replaceCurrent = true) {
        this.applyFilter(filter, query, replaceCurrent);
        this.events.next({ type: FacetEventType.AddFilter, facet: filter.facetName? this.facet(filter.facetName) : undefined, query });

        if(this.canSearch(query)) {
            this.searchService.search(undefined, {
                type: FacetEventType.AddFilter,
                detail: {
                    item: (filter as ValueFilter).value?.toString(),
                    itembox: filter.facetName,
                    itemcolumn: (filter as ValueFilter).field,
                    "from-result-id": this.searchService.results?.id
                }
            });
        }
    }

    public applyFilter(filter: Filter, query = this.searchService.query, replaceCurrent = true) {
        if(filter.facetName && replaceCurrent) {
            query.removeFilter(f => f.facetName === filter.facetName);
        }
        query.addFilter(filter);
    }


    protected toFilter(item: AggregationItem, aggregation: Aggregation): Filter {
      const field = aggregation.column;
      const display = item.display;

      if(aggregation.isTree) {
        return {field, value: (item as TreeAggregationNode).$path! + '*', display: item.value.toString()}
      }

      else if(aggregation.isDistribution) {
        const res = item.value.toString().match(/.*\:\(?([><=\d\-\.AND ]+)\)?/);
        if(res?.[1]) {
          const expr = res?.[1].split(" AND ");
          const filters = expr.map(e => {
            const operator: 'gte'|'lt' = e.indexOf('>=') !== -1? 'gte' : 'lt';
            return {field, operator, value: e.substring(e.indexOf(' ')+1)};
          });
          if(filters.length === 2) {
            return {operator: 'and', filters, display};
          }
          else if(filters.length === 1) {
            return {...filters[0], display};
          }
          throw new Error("Failed to parse distribution expresion");
        }
      }

      return {field, value: item.value as boolean | number | string, display: item.display};
    }

    /**
     * Clears the query from the current filters on the given facet
     * @param facetName
     * @param query the query to clear from the facet filters (defaults to search service query)
     */
    public clearFilters(facetName: string, query = this.searchService.query) {
      if(Utils.eqNC(facetName, "concepts")) {
        query.removeConcepts();
      }
      else {
        query.removeFilter(c => c.facetName === facetName);
      }
    }

    /**
     * Clears the query from the current selection on the given facet and perform a search
     * @param facetName
     */
    public clearFiltersSearch(facetName: string | string[], all: boolean, query = this.searchService.query): Promise<boolean> {
      if(!Array.isArray(facetName)) {
        facetName = [facetName];
      }

      for(let name of facetName) {
        this.clearFilters(name, query);
        this._events.next({type: FacetEventType.ClearFilters, facet: this.facet(name), query});
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
     * @param facetName the facet that removes the filter
     * @param aggregation the aggregation that contains the item to remove
     * @param item the aggregation item to remove from the query
     * @param query the query on which to remove the filter (defaults to search service query)
     */
    public removeFilter(
      facetName: string,
      aggregation: Aggregation,
      item: AggregationItem,
      query = this.searchService.query): Filter | undefined {

      if(Utils.eqNC(aggregation.column, 'concepts')) {
        const res = query.removeConcept(item.value.toString());
        return res? {field: 'concept', value: item.value.toString()} : undefined;
      }

      const filter = this.toFilter(item, aggregation);
      const removed = query.removeFilter(f => this.compareFilters(f, filter));

      return removed[0];
    }

    public compareFilters(a: Filter|undefined, b: Filter|undefined): boolean {
      if(a === b) return true;
      if(!a || !b) return false;
      if(a.operator !== b.operator) return false;
      if(this.isExprFilter(a)) return this.compareExprFilters(a, b as ExprFilter);
      if(a.field !== (b as ValueFilter).field) return false;
      if(this.isValueFilter(a)) return a.value === (b as ValueFilter).value;
      if(a.operator === 'between') return a.start === (b as BetweenFilter).start && a.end === (b as BetweenFilter).end;
      if(a.operator === 'in') return JSON.stringify(a.values) === JSON.stringify((b as InFilter).values);
      if(a.operator === 'null') return !a.not === !(b as NullFilter).not;
      return false;
    }

    protected compareExprFilters(a: ExprFilter, b: ExprFilter): boolean {
      if(a.filters.length !== b?.filters.length) return false;
      for(let i=0; i<a.filters.length; i++) {
        if(!this.compareFilters(a.filters[i], b.filters[i])) {
          return false;
        }
      }
      return true;
    }

    /**
     * Removes the aggregation from the search service query and refresh the search
     * @param facetName
     * @param aggregation
     * @param item
     */
    public removeFilterSearch(facetName: string, aggregation: Aggregation, item: AggregationItem, query = this.searchService.query): Promise<boolean>{
        const filter = this.removeFilter(facetName, aggregation, item, query);
        if(filter) {
            this._events.next({type: FacetEventType.RemoveFilter, facet: this.facet(facetName || ""), query});
            delete query.queryId; // SBA-154
            if(this.canSearch(query)) {
                return this.searchService.search(undefined, {
                    type: FacetEventType.RemoveFilter,
                    detail: {
                        item: {expression: item.value.toString(), facet: filter.facetName},
                        itembox: facetName,
                        itemcolumn: aggregation.column,
                        fromresultid: !!this.searchService.results ? this.searchService.results.id : null
                    }
                });
            }
        }
        return Promise.resolve(false);
    }


    public isExprFilter(filter: Filter): filter is ExprFilter {
        return !!(filter as ExprFilter).filters;
    }

    public isValueFilter(filter: Filter): filter is ValueFilter {
        return !!(filter as ValueFilter).value;
    }

    public makeRangeFilter<T extends Date|number|string>(field: string, start: T|undefined, end: T|undefined, facetName?: string): BetweenFilter|NumericalFilter|undefined {
      if(typeof start === 'undefined' && typeof end === 'undefined') {
        return undefined;
      }
      if(typeof start === 'undefined') {
        return {field, facetName, operator: 'lte', value: end!};
      }
      else if(typeof end === 'undefined') {
        return {field, facetName, operator: 'gte', value: start!};
      }
      else {
        return {field, facetName, operator: 'between', start, end};
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
        aggregation: string,
        skip: number = 0,
        count: number = 10,
        query = this.searchService.query,
        searchInactive = true): Observable<Aggregation | undefined> {

        query = Utils.copy(query);
        query.action = "aggregate";
        query.aggregations = {};
        query.aggregations[aggregation] = {skip: skip, count: count};
        return this.searchService.getResults(query, undefined, {searchInactive}).pipe(
            map((results: Results) => {
                const data = results.aggregations.find(a => Utils.eqNC(a.name, aggregation));
                if (data) {
                    this.setColumn(data);   // Useful for formatting and i18n
                    const max = this.appService.getCCAggregation(data.name)?.count || 10;
                    if (data.items) {
                        if (!data.isDistribution && data.items?.length > max) {
                            data.items = data.items.slice(0, count);
                        }
                    }
                }
                return data;
            })
        );
    }

    /**
     * Get suggestions given a text and a field name, using the Suggest service
     * @param text
     * @param field
     * @param suggestQuery
     */
    public suggest(text: string, field: string, suggestQuery = this.appService.suggestQueries[0], query = this.searchService.query): Observable<Suggestion[]> {
      return this.suggestService.get(suggestQuery, text, [field], query);
    }

    /**
     * Format the given result item, using field formatter and/or i18n service
     * @param item
     */
    formatValue(item: AggregationItem): string {
      return this.intlService.formatMessage(
        this.formatService.formatFieldValue(item, item.$column));
    }

    /**
     * Returns true if this facet has at least one active selection
     * filtering the search
     * @param facetName
     */
    public hasFiltered(facetName: string, query = this.searchService.query) : boolean {
      return !!this.findFilter(facetName, query);
    }

    /**
     * Returns an active selection of this facet filtering the search
     * Returns it as a filter
     * @param facetName
     */
    public findFilter(facetName: string, query = this.searchService.query) : Filter | undefined {
      if(Utils.eqNC(facetName, "concepts")) {
        const concepts = query.getConcepts();
        return concepts.length? {field: "concepts", value: concepts[0]} : undefined;
      }
      return query?.findFilter(f => f.facetName === facetName);
    }

    /**
     * Look for an aggregation with the given name in the search results and returns it.
     * Takes care of initializing the aggregation items to insert their $column property.
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     */
    getAggregation(
        aggregationName: string,
        results = this.searchService.results,
        treeAggregationOptions?: {
            facetName: string,
            levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void
        },
        query = this.searchService.query
    ): Aggregation | TreeAggregation | undefined {

        if (results?.aggregations) {
            const aggregation = results.aggregations.find(agg => Utils.eqNC(agg.name, aggregationName))
            if (aggregation) {
                this.setColumn(aggregation);    // Useful for formatting and i18n
                this.convertNullValueToString(aggregation);

                // adjust aggregation's items length except for treepath aggregation
                if (!aggregation.isTree && aggregation.items) {
                    // set aggregation's count
                    const max = this.getAggregationCount(aggregationName);
                    const count = max < 0 ? aggregation.items.length : max;
                    if (!aggregation.isDistribution && aggregation.items.length > count) {
                        aggregation.items = aggregation.items?.slice(0, count);
                    }
                }

                if (aggregation.isTree && treeAggregationOptions) {
                    const filter = query.findAllFilters(f => f.facetName === treeAggregationOptions.facetName, true);
                    const expandPaths = filter?.map(f => (f as ValueFilter).value?.toString()).filter(v => v);
                    this.initTreeNodes(treeAggregationOptions.facetName, aggregation, "/", aggregation.items as TreeAggregationNode[], expandPaths, treeAggregationOptions.levelCallback);

                    return aggregation as TreeAggregation;
                }
                return aggregation;
            }
        }
        return undefined;
    }

    /**
     * Look for a Tree aggregation with the given name in the search results and returns it.
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @deprecated use getAggregation() instead
     * @param facetName
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    getTreeAggregation(
        facetName: string,
        aggregationName: string,
        results = this.searchService.results,
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void,
        query = this.searchService.query
    ): TreeAggregation | undefined {

      const agg = this.getAggregation(aggregationName, results);
      if(agg?.isTree){
        const filter = query.findAllFilters(f => f.facetName === facetName, true);
        const expandPaths = filter?.map(f => (f as ValueFilter).value.toString()).filter(v => v);
        this.initTreeNodes(facetName, agg, "/", agg.items as TreeAggregationNode[], expandPaths, levelCallback);

        return agg as TreeAggregation;
      }
      return undefined;
    }

    /**
     * Returns the count parameter of the given aggregation (default is -1 === return all items)
     * @param aggregationName
     */
    getAggregationCount(aggregationName: string) : number {
        const cc = this.appService.getCCAggregation(aggregationName);
        return cc ? (!!cc.count ? cc.count : 10) : -1;
    }

    /**
     * Returns the label associated to an aggregation, if any
     * @param aggregationName
     */
    getAggregationLabel(aggregationName: string) : string {
        const ccagg = this.appService.getCCAggregation(aggregationName);
        if(ccagg) {
            return this.appService.getPluralLabel(ccagg.column, aggregationName);
        }
        return aggregationName;
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
        facetName: string,
        aggregation: TreeAggregation,
        item: TreeAggregationNode,
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void,
        query = this.searchService.query,
        searchInactive = true
    ): Observable<Results> {

        const value = item.$path + "*";
        query = Query.copy(query);
        query.action = "open";
        const expr = `${aggregation.column}: ${Utils.escapeExpr(value)}`;
        query.addOpen(expr, aggregation.name);

        this.events.next({type: FacetEventType.Open, facet: this.facet(facetName), query});
        return this.searchService.getResults(query, undefined, {searchInactive}).pipe(
            map((results: Results) => {
                if (item.$path) {
                    const source = FacetService.getAggregationNode(results.aggregations[0].items as TreeAggregationNode[], item.$path);
                    const target = FacetService.getAggregationNode(aggregation.items as TreeAggregationNode[], item.$path);
                    if (source && target) {
                        target.items = source.items;    // Insert the new data (source) into the original (target)
                    }
                    if (target && target.items) {
                        this.initTreeNodes(facetName, aggregation, item.$path, target.items, undefined, levelCallback);
                    }
                }
                return results;
            })
        );
    }

    /**
     * Returns true if a given aggregation item is currently actively filtering the search
     * @param facetName
     * @param aggregation
     * @param item
     */
    itemFiltered(facetName: string, aggregation: Aggregation, item: AggregationItem, query = this.searchService.query): boolean {
      return !!this.findItemFilter(facetName, aggregation, item, query);
    }

    protected findItemFilter(facetName: string, aggregation: Aggregation, item: AggregationItem, query = this.searchService.query) : Filter | undefined {
      if(Utils.eqNC(aggregation.column, 'concepts')) {
        const concept = query.getConcepts().find(c => Utils.eqNC(c, item.value.toString()));
        return concept? {field: 'concepts', value: concept} : undefined;
      }
      const filter = this.toFilter(item, aggregation);
      const allFilters = query?.findAllFilters(f => f.facetName === facetName, true);
      return allFilters?.find(f => this.compareFilters(f, filter));
    }

    /**
     * Initializes the nodes of a tree (private, with a callback)
     * @param facetName
     * @param aggregation
     * @param root
     * @param children
     * @param expandPaths
     * @param levelCallback
     */
    protected initTreeNodes(
        facetName: string,
        aggregation: Aggregation,
        root: string,
        children: TreeAggregationNode[],
        expandPaths?: string[],
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void
    ) {
        if (!children) {
            return;
        }
        let rootLevel: number;
        if (root) {
            rootLevel = Utils.count(root, "/", false) - 1;
        }
        else {
            root = "/";
            rootLevel = 0;
        }
        const column = this.appService.getColumn(aggregation.column);
        Utils.traverse(children, (_nodes) => {
            if (!_nodes) {
                return false;
            }
            let path = root;
            let level = rootLevel;
            for (const _node of _nodes) {
                path = path + _node.value + "/";
                level++;
            }
            // console.log(path);
            const _node = _nodes[_nodes.length - 1];
            _node.$path = path;
            _node.$column = column;
            _node.$level = level;
            _node.$opened = false;
            _node.$filtered = this.itemFiltered(facetName, aggregation, _node)
            expandPaths?.forEach(expandPath => {
                if (expandPath.indexOf(path) === 0) {
                    const count = !!_node.items ? _node.items.length : _node.hasChildren ? -1 : 0;
                    if (count > 0) {
                        _node.$opened = true;
                    }
                }
            });
            if (levelCallback) {
                levelCallback(_nodes, level, _node);
            }
            return false; // don't stop
        });
    }

    protected setColumn(aggregation: Aggregation){
        if(!aggregation.isTree && aggregation.items){
            const column = this.appService.getColumn(aggregation.column);
            aggregation.items.forEach((value) => value.$column = column);
            aggregation.column = this.appService.resolveColumnAlias(aggregation.column);
        }
    }

    protected convertNullValueToString(aggregation: Aggregation) {
        if(!aggregation.isTree && !aggregation.valuesAreExpressions && aggregation.items){
            aggregation.items.forEach((item: AggregationItem) => {
                // convert null value without display property to string
                if (item.value === null && !item.display) {
                    item.value = String(item.value);
                }
            });
        }
    }



    // static methods

    protected static splitTreepath(path: string): string[] {
        if (!path) return [];
        path = path.trim();
        if (path.length > 0 && path[0] === "/") {
            path = path.substr(1);
        }
        if (path.length > 0 && path[path.length - 1] === "/") {
            path = path.substr(0, path.length - 1);
        }
        if (path.length === 0) {
            return [];
        }
        return path.split("/");
    }

    public static treepathLast(path: string): string {
        const parts = FacetService.splitTreepath(path);
        if (!parts || parts.length === 0) {
            return "";
        }
        return parts[parts.length - 1];
    }

    protected static getAggregationNode(nodes: TreeAggregationNode[], path: string): TreeAggregationNode | undefined {
        if (!nodes || nodes.length === 0) {
            return undefined;
        }
        const names = FacetService.splitTreepath(path);
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
     * Get all Aggregation items from a facet, currently filtered
     *
     * @param facetName facet name where to inspect
     * @param valuesAreExpressions when true, some transformations should be done
     */
    getAggregationItemsFiltered(facetName: string, valuesAreExpressions: boolean = false, query = this.searchService.query): AggregationItem[] {
        if(Utils.eqNC(facetName, "concepts")) {
          return query.getConcepts().map(c => ({value: c, count: 0}));
        }

        const filters = query.findAllFilters(f => f.facetName === facetName, true);

        const items = [] as AggregationItem[];

        for(let filter of filters) {
          if(valuesAreExpressions) {
            if(filter.display) {
              let value = ''; // This code reconstructs the expresion corresponding to that distribution, for the sole purpose of the AggregationItem being processable by the toFilter method
              if(filter.operator === 'and') {
                const op1 = filter.filters[0] as ValueFilter;
                const op2 = filter.filters[1] as ValueFilter;
                value = `${op1.field}:(>= ${op1.value} AND < ${op2.value})`;
              }
              else if(filter.operator === 'gte') {
                value = `${filter.field}:>= ${filter.value}`;
              }
              else if(filter.operator === 'lt') {
                value = `${filter.field}:< ${filter.value}`;
              }
              items.push({value, display: filter.display, count: 0});
            }
          }
          else if((filter as ValueFilter).value) {
            items.push({value: (filter as ValueFilter).value, display: filter.display, count: 0});
          }
        }

        return items;
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
            const searchPattern = new RegExp(`\\b${term}`, 'i');
            const column = this.appService.getColumn(aggregation?.column);
            suggests.forEach(suggest => {
                if(suggest.display.length > 1) {
                    const match = searchPattern.exec(suggest.display);
                    this.addNode(suggestions, path2node, "/", suggest.display, +(suggest.frequency || 0), 1, (match?.index || 0)+searchTerm.length, column);
                }
            });
        }
        return suggestions;
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
     * Check if a facet contains items
     * @param aggregation aggregation name
     * @param results search results
     *
     * @returns true if the facet contains a least one item otherwise false
     */
    hasData(aggregation: string, results: Results): boolean {
        // Avoid calling getAggregation() which is costly
        return !!results.aggregations.find(agg => Utils.eqNC(agg.name, aggregation))?.items?.length;
    }

    /**
     * Returns the index of the first element in the supplied array
     * corresponding to `item.value` or -1 when not found.
     * A fallback to `item.display` is done before returning -1
     * @param item item to find
     */
    filteredIndex(data: Aggregation | undefined, arr: Array<AggregationItem>, item: AggregationItem): number {
        let indx = -1;
        // specific to Values Are Expressions where expression are not well formatted by Expression Parser
        // eg: when values is : "> 0", Expression Parser returns : ">0" without space between operator and value
        if (data?.valuesAreExpressions) {
            const value = this.trimAllWhitespace(item.value);
            const normalizedArr = arr.map(item => ({...item, value: this.trimAllWhitespace(item.value)})) || [];
            indx = normalizedArr.findIndex(it => it.value === value);

            // fallback to display
            if (indx === -1 && item.display) {
                indx= normalizedArr.findIndex(it => it.display === item.display);
            }
        } else {
            indx = this.findAggregationItemIndex(arr, item);
        }
        return indx;
    }

    /**
     * Utility function to returns aggregation item's index in supplied array with fallback to `display` comparison.
     * Otherwise -1, indicating that no element passed the test.
     * @param arr The array findIndex() was called upon
     * @param value The value to be test
     */
    public findAggregationItemIndex = (arr: Array<AggregationItem>, item: AggregationItem) => {
        // first check value as is
        let index = arr.findIndex(it => it.value === item.value);

        // fallback to display comparison
        if (index === -1 && item.display) {
            index = arr.findIndex(it => it.display === item.display);
        }
        return index;
    };

    private trimAllWhitespace = (value: FieldValue | undefined): FieldValue | undefined => {
        switch (typeof value) {
            case "string":
                return value.replace(/\s/g, '');
            default:
                return value;
        }
    };
}
