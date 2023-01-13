import {Injectable, InjectionToken, Inject, Optional, OnDestroy} from "@angular/core";
import {Router, NavigationStart, NavigationEnd, Params, NavigationExtras} from "@angular/router";
import {Subject, BehaviorSubject, Observable, Subscription, of, throwError, map, switchMap, tap, finalize} from "rxjs";
import {QueryWebService, AuditWebService, CCQuery, QueryIntentData, Results, Record, Tab, DidYouMeanKind,
    QueryIntentAction, QueryIntent, QueryAnalysis, IMulti, CCTab,
    AuditEvents, AuditEventType, AuditEvent, QueryIntentWebService, QueryIntentMatch, Filter, TreeAggregationNode, TreeAggregation, ListAggregation} from "@sinequa/core/web-services";
import {AppService, FormatService, ValueItem, Query} from "@sinequa/core/app-utils";
import {NotificationsService} from "@sinequa/core/notification";
import {LoginService} from "@sinequa/core/login";
import {IntlService} from "@sinequa/core/intl";
import {Utils} from "@sinequa/core/base";

export interface SearchOptions {
    /** Name of routes for which we want the search service to work (incl. storing the query in the URL) */
    routes?: string[];
    /** Name of routes for which we want the search service to work, but no actual search query to be performed. This can be used to perform custom actions on certain routes */
    skipSearchRoutes?: string[];
    /** Name of the home route, if any */
    homeRoute?: string;
    /** Deactivate the storing of the query in the URL (calling search() then directly triggers a search and causes no URL modification or routing event) */
    deactivateRouting?: boolean;
    /** Force the global query to always be appService.ccquery */
    preventQueryNameChanges?: boolean;
    /** Whether to detect query intents synchronously (blocking the execution of the query until we know the intent). By default, query intents are detected asynchronously. */
    queryIntentsSync?: boolean;
}

export const SEARCH_OPTIONS = new InjectionToken<SearchOptions>("SEARCH_OPTIONS");

@Injectable({
    providedIn: "root"
})
export class SearchService<T extends Results = Results> implements OnDestroy {
    protected _query: Query | undefined;
    queryStringParams: Params = {};
    results: T | undefined;
    searchActive: boolean;

    protected loginSubscription: Subscription;
    protected routerSubscription: Subscription;
    protected appSubscription: Subscription;
    protected fetchingLoadMore = false;
    protected _events = new Subject<SearchService.Events<T>>();
    protected _queryStream = new BehaviorSubject<Query | undefined>(undefined);
    protected _resultsStream = new BehaviorSubject<T | undefined>(undefined);

    constructor(
        @Optional() @Inject(SEARCH_OPTIONS) protected options: SearchOptions,
        protected router: Router,
        protected appService: AppService,
        protected queryService: QueryWebService<T>,
        protected loginService: LoginService,
        protected intlService: IntlService,
        protected formatService: FormatService,
        protected auditService: AuditWebService,
        protected notificationsService: NotificationsService,
        protected queryIntentWebService: QueryIntentWebService) {

        if (!this.options) {
            this.options = {
                routes: ["search"]
            };
        }

        this.results = undefined;

        this.loginSubscription = this.loginService.events.subscribe(
            (value) => {
                if (value.type === "session-changed") {
                    this.handleLogin();
                }
            });
        this.routerSubscription = this.router.events.subscribe(
            (event) => {
                if (event instanceof NavigationStart) {
                    // Restore state on back/forward until this issue is fixed: https://github.com/angular/angular/issues/28108
                    const currentNavigation = this.router.getCurrentNavigation();
                    if (currentNavigation && event.navigationTrigger === "popstate" &&
                        !currentNavigation.extras.state && event.restoredState) {
                        currentNavigation.extras.state = event.restoredState;
                    }
                }
                else if (event instanceof NavigationEnd) {
                    this.handleNavigation();
                }
            });
        this.appSubscription = this.appService.events.subscribe(
            (event) => {
                if (event.type === "query-changed") {
                    if (this._query && (!this.appService.ccquery || (this._query.name !== this.appService.ccquery.name))) {
                        this.clearQuery();
                    }
                }
            });
    }

    ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.routerSubscription.unsubscribe();
        this.appSubscription.unsubscribe();
        this._events.complete();
        this._queryStream.complete();
        this._resultsStream.complete();
    }

    get events(): Observable<SearchService.Events<T>> {
        return this._events;
    }

    get queryStream(): Observable<Query | undefined> {
        return this._queryStream;
    }

    get resultsStream(): Observable<T | undefined> {
        return this._resultsStream.asObservable();
    }

    getTabConfig(name: string): CCTab | undefined {
        if (this.appService.ccquery && this.appService.ccquery.tabSearch && this.appService.ccquery.tabSearch.tabs) {
            return this.appService.ccquery.tabSearch.tabs.find(t => Utils.eqNC(t.name, name));
        }
        return undefined;
    }

    get query(): Query {
        if (!this._query) {
            this._query = this.makeQuery();
            this._events.next({type: "new-query", query: this._query});
        }
        return this._query;
    }

    public setQuery(query: Query | undefined, newQuery = true) {
        if (query === this._query) {
            return;
        }
        this._query = query;
        if (this._query) {
            let ccquery: CCQuery | undefined;
            if (this.options.preventQueryNameChanges) {
                ccquery = this.appService.ccquery || this.appService.defaultCCQuery;
            }
            else {
                ccquery = this.appService.getCCQuery(this._query.name);
                if (!ccquery) {
                    console.warn(`Query '${this._query.name}' not found`);
                    ccquery = this.appService.defaultCCQuery;
                }
            }
            if (ccquery) {
                this._query.name = ccquery.name;
                if (this.appService.ccquery !== ccquery) {
                    this.appService.ccquery = ccquery;
                }
            }
        }
        if (newQuery) {
            this._events.next({type: "new-query", query: this._query});
        }
    }

    public clearQuery() {
        this.setQuery(undefined);
    }

    private _setResults(results: T | undefined) {
        if (results === this.results) {
            return;
        }
        this._events.next({type: "before-new-results", results});
        this.results = results;
        this.treatQueryIntents(results);
        if (this.results) {
            if (this.results.tab) {
                this.query.tab = this.results.tab;
            }
            if (this.results.attributes && this.results.attributes.queryid) {
                this.query.queryId = this.results.attributes.queryid;
            }
        }
        this._events.next({type: "new-results", results: this.results});
        this._resultsStream.next(this.results);
    }

    public setResults(results: T) {
        return this._setResults(results);
    }

    // TODO: queryintents in their own service ?

    private treatQueryIntents (results: T | undefined) {
        if (results && results.queryAnalysis && results.queryIntents) {
            const queryIntents = results.queryIntents;
            for (const intent of queryIntents) {
                if (intent.actions) {
                    for (const action of intent.actions) {
                        const event: SearchService.ProcessQueryIntentActionEvent = {type: "process-query-intent-action", action: action, intent: intent, analysis: results.queryAnalysis};
                        this._events.next(event);
                        if (!event.actionProcessed) {
                            if (!!action.data) {
                                switch (action.type) {
                                    case "tab":
                                        if (results.queryAnalysis.initial && this.query &&
                                            !Utils.eqNC(this.query.tab || "", action.data)) {
                                            this.selectTab(action.data, {skipLocationChange: true});
                                        }
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    get haveRecords(): boolean {
        return !!this.results && !!this.results.records && this.results.records.length > 0;
    }

    get rowCount(): number {
        return (!!this.results && this.results.rowCount) ? this.results.rowCount : 0;
    }

    get totalRowCount(): number {
        return (!!this.results && this.results.totalRowCount) ? this.results.totalRowCount : 0;
    }

    get pageSize(): number {
        if (this.query && this.query.pageSize) {
            return this.query.pageSize;
        }
        if (this.appService.ccquery && this.appService.ccquery.pageSize) {
            return this.appService.ccquery.pageSize;
        }
        return SearchService.DefaultPageSize;
    }

    get page(): number {
        if (!this.results) {
            return 1;
        }
        return this.results.page;
    }

    get pageCount(): number {
        if (!this.results || !this.results.rowCount) {
            return 0;
        }
        return Math.ceil(this.results.rowCount / this.results.pageSize);
    }

    makeQuery(recentQuery?: Query): Query {
        const ccquery = this.appService.ccquery;
        const query = new Query(ccquery ? ccquery.name : "_unknown");
        if(recentQuery){
            Object.assign(query, recentQuery);
        }
        this._events.next({type: "make-query", query: query});
        return query;
    }

    protected makeAuditEvent(event: AuditEvent): AuditEvent {
        this._events.next({type: "make-audit-event", event: event});
        return event;
    }

    clear(navigate = true, path?: string) {
        this.clearQuery();
        path = path || this.options.homeRoute;
        this._setResults(undefined);
        this._events.next({type: "clear", path});
        if (navigate) {
            this.navigate({path: path || this.options.homeRoute});
        }
    }

    home(path = this.options.homeRoute) {
        this.clear(true, path);
    }

    protected makeQueryIntentData(queryIntentData: QueryIntentData): QueryIntentData {
        this._events.next({type: "make-query-intent-data", intentData: queryIntentData});
        return queryIntentData;
    }

    isEmptySearchIgnoreSelects(query: Query | undefined): boolean {
        if (!query) {
            return true;
        }
        if (!query.action || query.action === "search") {
            // Test isFirstPage
            if (query.isFirstPage) {
                return false;
            }
            // Test empty text
            if (query.text && Utils.trim(query.text)) {
                return false;
            }
            // Test basket
            if (query.basket) {
                return false;
            }
            return true;
        }
        return false;
    }

    isEmptySearch(query: Query | undefined): boolean {
        if (!query) {
            return true;
        }
        if (!query.action || query.action === "search") {
            if (!this.isEmptySearchIgnoreSelects(query)) {
                return false;
            }
            // Test no facet selection
            if (query.select && query.select.length > 0) {
                return false;
            }
            if (query.filters) {
                return false;
            }
            return true;
        }
        return false;
    }

    checkEmptySearch(queries: Query | Query[]): boolean {
        if (this.appService.ccquery && !this.appService.ccquery.allowEmptySearch) {
            if (!Utils.isArray(queries)) {
                queries = [queries];
            }
            for (const query of queries) {
                if (this.isEmptySearch(query)) {
                    this.notificationsService.info("msg#search.emptySearchNotification");
                    return false;
                }
            }
        }
        return true;
    }

    getResults(
        query: Query, auditEvents?: AuditEvents,
        options: SearchService.GetResultsOptions = {}): Observable<T> {
        if (!this.checkEmptySearch(query)) {
            return throwError(() => new Error("empty search"));
        }
        if (!options.searchInactive) {
            this.searchActive = true;
        }
        const tab = this.getCurrentTab();
        return this.queryService.getResults(query, auditEvents,
            this.makeQueryIntentData({
                tab: !!tab ? tab.name : undefined,
                queryIntents: (query.spellingCorrectionMode !== "dymonly") ? options.queryIntents : undefined,
                queryAnalysis: (query.spellingCorrectionMode !== "dymonly") ? options.queryAnalysis : undefined
            })
        ).pipe(
            tap(results => this.initializeResults(query, results)),
            finalize(() => this.searchActive = false) // Called on complete or error
        );
    }

    getMultipleResults(queries: Query[], auditEvents?: AuditEvents): Observable<IMulti<T>> {
        if (!this.checkEmptySearch(queries)) {
            return of({results: []});
        }
        return this.queryService.getMultipleResults(queries, auditEvents)
          .pipe(
            tap(results => results.results.forEach(
              (r,i) => this.initializeResults(queries[i], r))
            )
          );
    }

    /**
     * Initializes the client-side fields of the Results object
     * @param results
     */
    initializeResults(query: Query, results: Results) {
      // Initialize records
      this.initializeRecords(query, results);

      // Initialize aggregations
      this.initializeAggregations(query, results);
    }

    initializeRecords(query: Query, results: Results) {
      if(results.records) {
        for(let record of results.records) {
          record.$hasPassages = !!record.matchingpassages?.passages?.length;
        }
      }
    }

    initializeAggregations(query: Query, results: Results) {
      // Get the query web service configuration
      const ccquery = this.appService.getCCQuery(query.name);

      // Initialize aggregation map
      results.$aggregationMap = {};

      const filtered = query.getFiltersAsAggregationItems();

      for(let aggregation of results.aggregations) {
        // Populate aggregation map
        results.$aggregationMap[aggregation.name.toLowerCase()] = aggregation;

        // Columns and aggregation configuration
        aggregation.$cccolumn = this.appService.getColumn(aggregation.column, ccquery);
        aggregation.column = this.appService.getColumnAlias(aggregation.$cccolumn, aggregation.column);
        aggregation.$ccaggregation = this.appService.getCCAggregation(aggregation.name, ccquery)!;
        aggregation.$cccount = aggregation.$ccaggregation?.count || 10;

        aggregation.$filtered = filtered[aggregation.column.toLowerCase()] || [];
        aggregation.$remainingFiltered = aggregation.$filtered;

        // List aggregations
        if(!aggregation.isTree) {
          this.initializeAggregation(aggregation);
        }
        // Tree aggregations
        else {
          this.initializeTreeAggregation(aggregation);
        }
      }
    }

    initializeAggregation(aggregation: ListAggregation) {
      // Aggregation items enrichment
      if(aggregation.items && aggregation.$cccount > 0) { // exclude unlimited aggregation (eg. timelines)

        for(let item of aggregation.items) {
          // Include the column configuration (for formatting & labels)
          item.$column = aggregation.$cccolumn;
          // convert null value without display property to string
          if (item.value === null && !aggregation.valuesAreExpressions && !item.display) {
            item.value = String(item.value);
          }
          // Check whether the item is currently filtered
          item.$filtered = aggregation.$remainingFiltered.some(i => i.value === item.value); // TODO: this properly needs refinement for Dates or other special types
          if(item.$filtered) {
            aggregation.$remainingFiltered = aggregation.$remainingFiltered.filter(i => i.value !== item.value); // Rather than a splice, we filter the array, in case there are duplicate filters
          }
        }

        // adjust aggregation's items length
        if(aggregation.items.length > aggregation.$cccount && !aggregation.isDistribution) {
          aggregation.items = aggregation.items?.slice(0, aggregation.$cccount);
          aggregation.$hasMore = true;
        }
      }
    }

    initializeTreeAggregation(aggregation: TreeAggregation) {
      // Process the filtered items
      for(let item of aggregation.$filtered) {
        (item as TreeAggregationNode).$path = item.value.toString().slice(0, -1); // Remove the '*' at the end of the value
      }

      if(aggregation.items) {
        // Traverse the aggregation items to add metadata
        Utils.traverse(aggregation.items, (lineage, node, depth) => {
          node.$path = '/' + lineage.map(n => n.value).join('/') + '/';
          node.$column = aggregation.$cccolumn;
          node.$level = depth;
          node.$opened = false;
          // Check whether the item is currently filtered
          const idx = aggregation.$remainingFiltered.findIndex(
            i => (i as TreeAggregationNode).$path === node.$path // TODO: this properly needs refinement for Dates or other special types
          );
          if(idx !== -1) {
            node.$filtered = true;
            aggregation.$remainingFiltered = aggregation.$remainingFiltered.filter(i => i.value !== node.value); // Rather than a splice, we filter the array, in case there are duplicate filters
            lineage.filter(n => n.items?.length).forEach(n => n.$opened = true);
          }
          return false; // don't stop the traversal
        });
      }
    }

    navigate(options?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean> {
        if (!options) {
            options = {};
        }
        // We reuse the query intent analysis from previous results
        if (!options.analyzeQueryText && this.results) {
            options.queryIntents = this.results.queryIntents;
            options.queryAnalysis = this.results.queryAnalysis;
        }
        if (!this.routingActive) {
            this.handleNavigation(options, audit);
            return Promise.resolve(true);
        }
        else {
            // Save currentPath and currentSearch
            let url = Utils.makeURL(this.router.url);
            const currentPath = url.pathname;
            url.searchParams.delete("$refresh");
            const currentSearch = decodeURIComponent(url.search);
            // Set up queryParams and add current query
            const queryParams = Utils.copy(this.queryStringParams);
            if (this._query) {
                queryParams.query = this._query.toJsonForQueryString();
            }
            // Set up history state
            const state: SearchService.HistoryState = {
                audit,
                navigationOptions: options
            };
            const extras: NavigationExtras = {
                queryParams,
                state,
                skipLocationChange: options.skipLocationChange
            };
            // Calculate new search
            let path = options.path;
            if (!path) {
                path = currentPath;
            }
            url = Utils.makeURL(path);
            path = url.pathname; // normalized
            for (const key of Object.keys(queryParams)) {
                url.searchParams.set(key, queryParams[key]);
            }
            const search = decodeURIComponent(url.search);
            // If path and search are both the same as current then force navigation (without adding to history)
            if (Utils.eq(currentPath, path) && Utils.eq(currentSearch, search)) {
                // We want to force the navigation so that the query will be processed
                extras.queryParams!.$refresh = Utils.now.getTime();
                // But don't update the browser url
                extras.skipLocationChange = true;
            }
            return this.router.navigate([path], extras);
        }
    }

    protected getHistoryState(): SearchService.HistoryState {
        const navigation = this.router.getCurrentNavigation();
        if (navigation) {
            return navigation.extras && navigation.extras.state || {};
        }
        return window.history.state || {};
    }

    public isSearchRouteActive(): boolean {
        const url = Utils.makeURL(this.router.url);
        return this.isSearchRoute(url.pathname);
    }

    protected isSearchRoute(pathname: string): boolean {
        return this.checkSearchRoute(pathname, this.options.routes);
    }

    protected isSkipSearchRoute(pathname: string): boolean {
        return this.checkSearchRoute(pathname, this.options.skipSearchRoutes);
    }

    private checkSearchRoute(pathname: string, routes: string[] | undefined): boolean {
        if (routes) {
            for (const route of routes) {
                if (Utils.endsWith(pathname, Utils.addUrl("/", route))) {
                    return true;
                }
            }
        }
        return false;
    }

    public getQueryFromUrl(): Query | undefined {
        let query: Query | undefined;
        const url = Utils.makeURL(this.router.url);
        if (this.isSearchRoute(url.pathname)) {
            const jquery = url.searchParams.get("query");
            if (jquery) {
                try {
                    query = this.makeQuery().fromJson(jquery);
                }
                catch {}
            }
        }
        return query;
    }

    protected ensureQueryFromUrl(): Query | undefined {
        const query = this.getQueryFromUrl();
        if (!query) {
            this.clear(false);
            return undefined;
        }
        else {
            // The url query should be the same as the current query on SearchService unless
            // it's the initial navigation or if the url is changed manually.
            // In any case, we always set the query from the url. We only send a new-query
            // event if the current query is empty so that we don't systematically create a
            // new query "session" (ml-audit)
            this.setQuery(query, !this._query);
            return query;
        }
    }

    protected handleLogin(): Promise<boolean> {
        if (!this.loginService.complete) {
            return Promise.resolve(false);
        }
        if (!!this.ensureQueryFromUrl()) {
            return this.navigate();
        }
        else {
            return Promise.resolve(true);
        }
    }

    get routingActive(): boolean {
        return !this.options.deactivateRouting;
    }

    set routingActive(value: boolean) {
        this.options.deactivateRouting = !value;
    }

    protected handleNavigation(navigationOptions?: SearchService.NavigationOptions, audit?: AuditEvents) {
        if (!this.loginService.complete) {
            return
        }
        if (!this.appService.ccquery) {
            return
        }
        let query = this._query;
        if (this.routingActive) {
            query = this.ensureQueryFromUrl();
        }
        this._events.next({type: "update-query", query});
        this._queryStream.next(query);
        if (!query) {
            return
        }
        if (this.routingActive) {
            const state = this.getHistoryState();
            // console.log("history.state:", state);
            audit = state.audit;
            navigationOptions = state.navigationOptions;
        }
        navigationOptions = navigationOptions || {};
        const pathName = navigationOptions.path ? navigationOptions.path : Utils.makeURL(this.router.url).pathname;
        if(navigationOptions.skipSearch || this.isSkipSearchRoute(pathName)) {
            return
        }

        let obs = of(false);

        // Insert a call to the query intent web service (if any)
        if(this.appService.ccquery?.queryIntentSet) {
            // In synchronous mode, the query intents are executed before search
            if(this.options.queryIntentsSync) {
                obs = this.pipeQueryIntent(obs);
            }
            // In asynchronous mode, the query intents are executed in parallel
            else {
                this.pipeQueryIntent(obs).subscribe();
            }
        }

        // Get results (except if the search query is cancelled)
        let observable = obs.pipe(
            switchMap(cancel => {
                if(cancel) return of(undefined);
                return this.getResults(this.query, audit, {
                    queryIntents: navigationOptions?.queryIntents,
                    queryAnalysis: navigationOptions?.queryAnalysis
                });
            })
        );

        // This event allows customization of behavior when switching tabs (the observable property can be modified to get other results)
        if (navigationOptions.selectTab) {
            const afterSelectTabEvent: SearchService.AfterSelectTabEvent<T> = {
                type: "after-select-tab",
                observable
            };
            this._events.next(afterSelectTabEvent);
            observable = afterSelectTabEvent.observable;
        }

        // Set results if any
        observable.subscribe(results => {
            if(results) {
                navigationOptions = navigationOptions || {};
                this._setResults(results);
            }
        });
    }

    pipeQueryIntent(obs: Observable<boolean>): Observable<boolean> {
        return obs.pipe(
            switchMap(() => this.queryIntentWebService.getQueryIntent(this.query)),
            map(intents => {
                const event: SearchService.NewQueryIntentsEvent = {
                    type: "new-query-intents",
                    query: this.query,
                    intents,
                    cancelSearch: false
                };
                this._events.next(event);
                if(intents.length > 0) {
                    const events = intents.map(intent => ({
                        type: "Search_QueryIntent_Detected",
                        detail: {
                            querytext: this.query.text,
                            item: intent.name,
                            detail: intent.globalEntities?.map(e => e.value).join(";")
                        }
                    }));
                    this.auditService.notify(events);
                }
                return event.cancelSearch;
            })
        );
    }

    search(navigationOptions?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean> {
        delete this.query.page;
        delete this.query.spellingCorrectionMode;
        return this.navigate(navigationOptions, audit);
    }

    searchText(path?: string): Promise<boolean> {
        // Check for empty search preemptively to avoid clearing the current results in the most
        // common case of the user entering empty search text in the search box
        // The lower level check in getResults will handle less obvious cases (url editing etc)
        if (!this.checkEmptySearch(this.query)) {
            return Promise.resolve(false);
        }
        return this.search(
            {
                path,
                analyzeQueryText: true
            },
            this.makeAuditEvent({
                type: AuditEventType.Search_Text,
                detail: {
                    querytext: this.query.text,
                    scope: this.query.scope,
                    language: this.intlService.currentLocale.name,
                    neuralsearch: this.appService.isNeural() && this.query.neuralSearch !== false
                }
            }));
    }

    gotoPage(page: number): Promise<boolean> {
        this.query.page = page;
        return this.navigate(undefined, this.makeAuditEvent({
            type: AuditEventType.Search_GotoPage,
            detail: {
                page: page,
                fromresultid: !!this.results ? this.results.id : null
            }
        }));
    }

    /**
     * Load more results and append them to previous results
     */
    loadMore() {
        if(!this.fetchingLoadMore) {
            let page = this.query.page || this.page;
            page += (page <= this.pageCount) ? 1 : 0;
            if (page <= this.pageCount) {
                this.fetchingLoadMore = true;
                this.query.page = page;

                const auditEvents = this.makeAuditEvent({
                    type: AuditEventType.Search_GotoPage,
                    detail: {
                        page: page,
                        fromresultid: !!this.results ? this.results.id : null
                    }
                })

                this.getResults(this.query, auditEvents)
                    .subscribe(results => {
                        if(this.results && results) {
                            this.results.records = [...this.results?.records || [], ...results.records] || [];
                            this._resultsStream.next(this.results);
                        }
                        this.fetchingLoadMore = false;
                    });
            }
        }
    }

    /**
     * @returns true if more are available otherwise false
     */
    hasMore(): boolean {
        const page = this.query.page || this.page;
        return (page < this.pageCount);
    }

    didYouMean(text: string, kind: DidYouMeanKind): Promise<boolean> {
        this.query.text = text;
        this.query.spellingCorrectionMode = "dymonly";
        return this.navigate(undefined, this.makeAuditEvent({
            type: kind === DidYouMeanKind.Original ? AuditEventType.Search_DidYouMean_Original : AuditEventType.Search_DidYouMean_Correction,
            detail: {
                querytext: text
            }
        }));
    }

    getCurrentRecordIds(): string[]{
        if (this.results && this.results.records) {
            return this.results.records.map(record => record.id);
        }
        return [];
    }

    getRecordFromId(id: string): Record | undefined {
        if (this.results && this.results.records) {
            return this.results.records.find(record => Utils.eq(record.id, id));
        }
        return undefined;
    }

    addFieldSelect(field: string, items: ValueItem | ValueItem[], options?: SearchService.AddSelectOptions): boolean {
        if(Utils.isArray(items) && items.length === 1) {
            items = items[0];
        }
        if (items && (!Utils.isArray(items) || items.length > 0)) {
            let filter: Filter;
            if(!Utils.isArray(items)) {
              filter = {field, value: items.value as string|number|boolean, display: items.display};
              if(options?.not) filter.operator = 'neq';
            }
            else {
              const operator = options?.not? 'not' : options?.and? 'and' : 'or';
              filter = {operator, filters: items.map(item => ({field, value: item.value as string|number|boolean, display: item.display}))}
            }
            this.query.addFilter(filter);
            return true;
        }
        return false;
    }

    selectTab(arg: string | Tab, options: SearchService.NavigationOptions = {}): Promise<boolean> {
        options.selectTab = true;
        const tabName = typeof arg === 'string' ? arg : arg.name;
        this.query.tab = tabName;
        delete this.query.queryId; // SBA-154
        this._events.next({type: "before-select-tab", query: this.query});
        return this.search(options,
            this.makeAuditEvent({
                type: AuditEventType.Search_GotoTab,
                detail: {
                    tab: tabName,
                    fromresultid: !!this.results ? this.results.id : null
                }
            }));
    }

    selectScope(scope: string) {
        this.query.scope = scope;
    }

    getTab(tabName: string): Tab | undefined {
        if (this.results && this.results.tabs) {
            for (const tab of this.results.tabs) {
                if (Utils.equals(tab.name, tabName)) {
                    return tab;
                }
            }
        }
        return undefined;
    }

    getCurrentTab(): Tab | undefined {
        if (this.results && this.results.tab) {
            return this.getTab(this.results.tab);
        }
        return undefined;
    }

    notifyOpenOriginalDocument(record: Record, resultId?: string, type = AuditEventType.Click_ResultLink): void {
        const results = this.results && this.results.records && this.results.records.includes(record) ? this.results : undefined;
        this._events.next({ type: "open-original-document", record });
        const querylang = this.results?.queryAnalysis?.queryLanguage
            || this.query?.questionLanguage
            || this.appService?.ccquery?.questionLanguage;
        let score: number | undefined;
        if (type === AuditEventType.Click_ResultLink) {
            const passages = record?.matchingpassages?.passages;
            score = passages && passages.length ? passages[0].score : undefined;
        }
        this.auditService.notifyDocument(
            type,
            record,
            results || resultId || "",
            {
                querytext: this.query.text,
                querylang,
                score
            },
            {
                queryhash: results ? results.rfmQueryHash : undefined,
                querytext: this.query.text,
                querylang: querylang
            }
        );
    }

    checkBeforeSearch(cancelReasons?: string[]): boolean {
        const beforeSearch: SearchService.BeforeSearchEvent = {type: "before-search"};
        this._events.next(beforeSearch);
        if (cancelReasons && beforeSearch.cancelReasons) {
            cancelReasons.splice(0, 0, ...beforeSearch.cancelReasons);
        }
        return !beforeSearch.cancel;
    }

    /**
     * Get the records according to a list of ID
     *
     * They are first searched on the result records, and we make a query for those we cannot find
     */
    getRecords(ids: string[]): Observable<Record[]> {
        const records = ids.map(id => {
            return {
                id,
                record: this.results?.records.find(r => Utils.eq(r.id, id))
            }
        });

        // if all records found, return them
        if (records.filter(r => r.record).length === ids.length) return of(records.map(r => r.record as Record));

        // building query to get missing records
        const query = this.query.copy();
        query.globalRelevance = 0;
        query.addFilter({
          operator: 'or',
          filters: records.filter(r => !r.record)
            .map(r => ({field: 'id', value: r.id}))
        });

        return this.getResults(query, undefined, {searchInactive: true})
                .pipe(map(res => records.map(r => r.record as Record || res.records.find(rec => rec.id === r.id))));
    }
}

export module SearchService {
    export interface GetResultsOptions {
        queryIntents?: QueryIntent[];
        queryAnalysis?: QueryAnalysis;
        searchInactive?: boolean;   // default "false"
    }

    export interface AddSelectOptions {
        not?: boolean;      // default "false"
        and?: boolean;      // default "false"
    }

    export interface NavigationOptions {
        path?: string; // absolute path, current path used if not specified
        selectTab?: boolean;
        analyzeQueryText?: boolean;
        queryIntents?: QueryIntent[];
        queryAnalysis?: QueryAnalysis;
        skipLocationChange?: boolean;
        skipSearch?: boolean;
    }

    export interface HistoryState {
        audit?: AuditEvents;
        navigationOptions?: NavigationOptions;
    }

    export interface Event {
        type: "new-query" | "update-query" | "make-query" | "before-new-results" | "new-results" | "make-query-intent-data" |
            "process-query-intent-action" | "make-audit-event" | "new-query-intents" |
            "before-select-tab" | "after-select-tab" | "clear" | "open-original-document" | "before-search";
    }

    export interface NewQueryEvent extends Event {
        type: "new-query";
        query: Query | undefined;
    }

    export interface UpdateQueryEvent extends Event {
        type: "update-query";
        query: Query | undefined;
    }

    export interface MakeQueryEvent extends Event {
        type: "make-query";
        query: Query;
    }

    export interface BeforeNewResultsEvent<T> extends Event {
        type: "before-new-results";
        results: T | undefined;
    }

    export interface NewResultsEvent<T> extends Event {
        type: "new-results";
        results: T | undefined;
    }

    export interface MakeQueryIntentDataEvent extends Event {
        type: "make-query-intent-data";
        intentData: QueryIntentData;
    }

    export interface ProcessQueryIntentActionEvent extends Event {
        type: "process-query-intent-action";
        action: QueryIntentAction;
        intent: QueryIntent;
        analysis: QueryAnalysis;
        actionProcessed?: boolean;
    }

    export interface MakeAuditEventEvent extends Event {
        type: "make-audit-event";
        event: AuditEvent;
    }

    export interface BeforeSelectTabEvent extends Event {
        type: "before-select-tab";
        query: Query;
    }

    export interface AfterSelectTabEvent<T> extends Event {
        type: "after-select-tab";
        observable: Observable<T|undefined>;
    }

    export interface ClearEvent extends Event {
        type: "clear";
        path?: string;
    }

    export interface OpenOriginalDocument extends Event {
        type: "open-original-document";
        record: Record;
    }

    export interface BeforeSearchEvent extends Event {
        type: "before-search";
        cancel?: boolean;
        cancelReasons?: string[];
    }

    export interface NewQueryIntentsEvent extends Event {
        type: "new-query-intents";
        query: Query;
        intents: QueryIntentMatch[];
        cancelSearch: boolean;
    }

    export type Events<T> =
        NewQueryEvent |
        UpdateQueryEvent |
        MakeQueryEvent |
        BeforeNewResultsEvent<T> |
        NewResultsEvent<T> |
        MakeQueryIntentDataEvent |
        ProcessQueryIntentActionEvent |
        MakeAuditEventEvent |
        BeforeSelectTabEvent |
        AfterSelectTabEvent<T> |
        ClearEvent |
        OpenOriginalDocument |
        BeforeSearchEvent |
        NewQueryIntentsEvent;

    export const DefaultPageSize = 20;
}
