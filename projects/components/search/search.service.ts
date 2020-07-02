import {Injectable, InjectionToken, Inject, Optional, OnDestroy} from "@angular/core";
import {Router, NavigationStart, NavigationEnd, Params} from "@angular/router";
import {Subject, BehaviorSubject, Observable, Subscription, of, throwError} from "rxjs";
import {map, catchError} from "rxjs/operators";
import {QueryWebService, AuditWebService, QueryIntentData, Results, Record, Tab, DidYouMeanKind,
    QueryIntentAction, QueryIntent, QueryAnalysis, IMulti, CCTab,
    AdvancedValue, AdvancedValueWithOperator, AdvancedOperator,
    AuditEvents, AuditEventType, AuditEvent} from "@sinequa/core/web-services";
import {AppService, FormatService, ValueItem, Query, ExprParser, Expr} from "@sinequa/core/app-utils";
import {NotificationsService} from "@sinequa/core/notification";
import {LoginService} from "@sinequa/core/login";
import {IntlService} from "@sinequa/core/intl";
import {Utils} from "@sinequa/core/base";
import {Breadcrumbs, BreadcrumbsItem} from './breadcrumbs';

export interface SearchOptions {
    routes?: string[];
    homeRoute?: string;
    deactivateRouting?: boolean;
}

export const SEARCH_OPTIONS = new InjectionToken<SearchOptions>("SEARCH_OPTIONS");

@Injectable({
    providedIn: "root"
})
export class SearchService implements OnDestroy {
    protected _query: Query | undefined;
    queryStringParams: Params = {};
    results: Results | undefined;
    breadcrumbs: Breadcrumbs | undefined;
    searchActive: boolean;

    protected loginSubscription: Subscription;
    protected routerSubscription: Subscription;
    protected appSubscription: Subscription;
    protected _events = new Subject<SearchService.Events>();
    protected _queryStream = new BehaviorSubject<Query | undefined>(undefined);
    protected _resultsStream = new BehaviorSubject<Results | undefined>(undefined);

    constructor(
        @Optional() @Inject(SEARCH_OPTIONS) protected options: SearchOptions,
        protected router: Router,
        protected appService: AppService,
        protected queryService: QueryWebService,
        protected loginService: LoginService,
        protected intlService: IntlService,
        protected formatService: FormatService,
        protected auditService: AuditWebService,
        protected notificationsService: NotificationsService) {

        if (!this.options) {
            this.options = {
                routes: ["search"]
            };
        }

        this.results = undefined;
        this.breadcrumbs = undefined;

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

    get events(): Observable<SearchService.Events> {
        return this._events;
    }

    get queryStream(): Observable<Query | undefined> {
        return this._queryStream;
    }

    get resultsStream(): Observable<Results | undefined> {
        return this._resultsStream;
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
            let ccquery = this.appService.getCCQuery(this._query.name);
            if (!ccquery) {
                console.warn(`Query '${this._query.name}' not found`);
                ccquery = this.appService.defaultCCQuery;
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

    private updateBreadcrumbs(results: Results | undefined, options: SearchService.SetResultsOptions) {
        if (!results) {
            this.breadcrumbs = undefined;
            return;
        }
        if (!this.breadcrumbs || (!options.resuseBreadcrumbs && !options.advanced)) {
            this.breadcrumbs = Breadcrumbs.create(this.appService, this, this.query);
        }
        else if (options.advanced) {
            this.breadcrumbs.update(this.query);
        }
    }

    private _setResults(results: Results | undefined, options: SearchService.SetResultsOptions = {}) {
        if (results === this.results) {
            return;
        }
        this._events.next({type: "before-new-results", results});
        this.results = results;
        this.treatQueryIntents(results);
        this.updateBreadcrumbs(results, options);
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

    public setResults(results: Results) {
        return this._setResults(results);
    }

    // TODO: queryintents in their own service ?

    private treatQueryIntents (results: Results | undefined) {
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

    makeQuery(): Query {
        const ccquery = this.appService.ccquery;
        const query = new Query(ccquery ? ccquery.name : "_unknown");
        this._events.next({type: "make-query", query: query});
        return query;
    }

    protected makeAuditEvent(event: AuditEvent): AuditEvent {
        this._events.next({type: "make-audit-event", event: event});
        return event;
    }

    selectBreadcrumbsItem(item: BreadcrumbsItem) {
        if (this.breadcrumbs) {
            const query = this.breadcrumbs.selectItem(item);
            if (query) {
                this.setQuery(query, false);
                this.search({reuseBreadcrumbs: true}); // audit?
            }
        }
    }

    removeBreadcrumbsItem(item: BreadcrumbsItem) {
        if (this.breadcrumbs) {
            const next = this.breadcrumbs.removeItem(item);
            if (this.isEmptySearch(this.breadcrumbs.query)) {
                this.clear();
                return;
            }
            if (next) {
                this.selectBreadcrumbsItem(next);
            }
        }
    }

    removeSelect(index: number) {
        if (this.breadcrumbs) {
            const item = this.breadcrumbs.items[index + 1];
            this.removeBreadcrumbsItem(item);
        }
    }

    removeText() {
        if (this.breadcrumbs) {
            const item = this.breadcrumbs.items[0];
            this.removeBreadcrumbsItem(item);
        }
    }

    clear(navigate = true, path?: string) {
        this.clearQuery();
        path = path || this.options.homeRoute;
        this._setResults(undefined);
        this._events.next({type: "clear", path});
        if (navigate) {
            this.navigate({path: path || this.options.homeRoute}, this.makeAuditEvent({
                type: AuditEventType.Search_FirstPage
            }));
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
            // Test no advanced
            if (query.advanced && Object.keys(query.advanced).length > 0) {
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
        options: SearchService.GetResultsOptions = {}): Observable<Results> {
        if (!this.checkEmptySearch(query)) {
            return throwError("empty search");
        }
        if (!options.searchInactive) {
            this.searchActive = true;
        }
        const tab = this.getCurrentTab();
        return this.queryService.getResults(query, auditEvents,
            this.makeQueryIntentData({
                tab: !!tab ? tab.name : undefined,
                queryIntents: options.queryIntents,
                queryAnalysis: options.queryAnalysis
            })
        ).pipe(
            map((results) => {
                this.searchActive = false;
                return results;
            })
        );
    }

    getMultipleResults(queries: Query[], auditEvents?: AuditEvents): Observable<IMulti<Results>> {
        if (!this.checkEmptySearch(queries)) {
            return of({results: []});
        }
        return this.queryService.getMultipleResults(queries, auditEvents);
    }

    navigate(options?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean> {
        if (!options) {
            options = {};
        }
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
            const extras = {
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
                extras.queryParams.$refresh = Utils.now.getTime();
                // But don't update the browser url
                extras.skipLocationChange = true;
            }
            return this.router.navigate([path], extras);
        }
    }

    protected getHistoryState(): SearchService.HistoryState {
        const navigation = this.router.getCurrentNavigation();
        if (navigation) {
            return navigation.extras.state || {};
        }
        return window.history.state || {};
    }

    public isSearchRouteActive(): boolean {
        const url = Utils.makeURL(this.router.url);
        return this.isSearchRoute(url.pathname);
    }

    protected isSearchRoute(pathname): boolean {
        if (this.options.routes) {
            for (const route of this.options.routes) {
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

    protected makeAuditEventFromCurrentQuery(): AuditEvent | undefined {
        const lastSelect = this.query.lastSelect();
        if (lastSelect) {
            const lastExpr = this.appService.parseExpr(lastSelect.expression);
            if (lastExpr instanceof Expr) {
                if (lastExpr.field === "refine") {
                    return this.makeAuditEvent({
                        type: AuditEventType.Search_Refine,
                        detail: {
                            text: lastExpr.value,
                            itembox: lastSelect.facet,
                            "from-result-id": !!this.results ? this.results.id : null
                        }
                    });
                }
                else {
                    return this.makeAuditEvent({
                        type: AuditEventType.Search_Select_Item,
                        detail: {
                            item: lastSelect as any,
                            itembox: lastSelect.facet,
                            itemcolumn: lastExpr.field,
                            isitemexclude: lastExpr.not,
                            "from-result-id": !!this.results ? this.results.id : null
                        }
                    });
                }
            }
        }
        else {
            if (this.query.basket) {
                return this.makeAuditEvent({
                    type: AuditEventType.Basket_Open,
                    detail: {
                        basket: this.query.basket
                    }
                });
            }
            else {
                return this.makeAuditEvent({
                    type: AuditEventType.Search_Text,
                    detail: {
                        text: this.query.text,
                        scope: this.query.scope
                    }
                });
            }
        }
        return undefined;
    }

    protected handleNavigation(navigationOptions?: SearchService.NavigationOptions, audit?: AuditEvents): Promise<boolean> {
        if (!this.loginService.complete) {
            return Promise.resolve(false);
        }
        if (!this.appService.ccquery) {
            return Promise.resolve(false);
        }
        let query = this._query;
        if (this.routingActive) {
            query = this.ensureQueryFromUrl();
        }
        this._events.next({type: "update-query", query});
        this._queryStream.next(query);
        if (!query) {
            return Promise.resolve(true);
        }
        if (this.routingActive) {
            const state = this.getHistoryState();
            // console.log("history.state:", state);
            audit = state.audit;
            navigationOptions = state.navigationOptions;
        }
        navigationOptions = navigationOptions || {};
        if (!audit) {
            audit = this.makeAuditEventFromCurrentQuery();
            if (audit && audit.type === AuditEventType.Search_Text) {
                delete navigationOptions.queryIntents;
                delete navigationOptions.queryAnalysis;
            }
        }
        let observable = this.getResults(this.query, audit,
            {
                queryIntents: navigationOptions.queryIntents,
                queryAnalysis: navigationOptions.queryAnalysis
            });
        Utils.subscribe(observable,
            (results) => {
                navigationOptions = navigationOptions || {};
                this._setResults(results, {
                    resuseBreadcrumbs: navigationOptions.reuseBreadcrumbs,
                    advanced: navigationOptions.advanced
                });
                return results;
            });
        if (navigationOptions.selectTab) {
            const afterSelectTabEvent: SearchService.AfterSelectTabEvent = {
                type: "after-select-tab",
                observable
            };
            this._events.next(afterSelectTabEvent);
            observable = afterSelectTabEvent.observable;
        }
        return observable.pipe(
            map(() => true),
            catchError(() => of(false))).toPromise();
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
        if (this.appService.ccquery && !this.appService.ccquery.allowEmptySearch && !Utils.trim(this.query.text || "")) {
            this.notificationsService.info("msg#search.emptySearchNotification");
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
                    text: this.query.text,
                    scope: this.query.scope
                }
            }));
    }

    searchAdvanced(query: Query): Promise<boolean> {
        return this.applyAdvanced(query, this.makeAuditEvent({
            type: AuditEventType.Search_Text,
            detail: {
                text: this.query.text,
                advanced: true
            }
        }));
    }

    searchRefine(text: string): Promise<boolean> {
        this.query.addSelect(this.makeSelectExpr("refine", {value: text}), "refine");
        return this.search(undefined,
            this.makeAuditEvent({
                type: AuditEventType.Search_Refine,
                detail: {
                    text: text,
                    itembox: "refine",
                    "from-result-id": !!this.results ? this.results.id : null
                }
            }));
    }

    gotoPage(page: number): Promise<boolean> {
        this.query.page = page;
        return this.navigate(undefined, this.makeAuditEvent({
            type: AuditEventType.Search_GotoPage,
            detail: {
                page: page,
                "from-result-id": !!this.results ? this.results.id : null
            }
        }));
    }

    didYouMean(text: string, context: "search" | "refine", kind: DidYouMeanKind): Promise<boolean> {
        if (context === "search") {
            this.query.text = text;
        }
        else {
            const refineSelect = this.query.findSelect("refine");
            if (refineSelect) {
                refineSelect.expression = "refine:" + ExprParser.escape(text);
            }
        }
        this.query.spellingCorrectionMode = "dymonly";
        return this.navigate(undefined, this.makeAuditEvent({
            type: kind === DidYouMeanKind.Original ? AuditEventType.Search_DidYouMean_Original : AuditEventType.Search_DidYouMean_Correction,
            detail: {
                text: text
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

    mergeAdvanced(target: Query, source: Query) {
        const deltas = Utils.deltas({advanced: {}}, source.copyAdvanced()); // Utils.copy(this.advancedDefaults) => {}
        target.toStandard();
        delete target.page;
        Utils.merge(target, deltas);
        return target;
    }

    applyAdvanced(query: Query, auditEvents?: AuditEvents): Promise<boolean> {
        this.mergeAdvanced(this.query, query);
        if (!this.checkEmptySearch(this.query)) {
            this.clear();
            return Promise.resolve(false);
        }
        return this.navigate({advanced: true}, auditEvents);
    }

    removeAdvanced(field: string, value: AdvancedValue | AdvancedValueWithOperator) {
        const query = this.query.copy();
        let operator: AdvancedOperator | undefined;
        if (query.isAdvancedValueWithOperator(value)) {
            operator = value.operator;
        }
        query.removeAdvancedValue(field, operator);
        this.applyAdvanced(query, this.makeAuditEvent({
            type: AuditEventType.Search_RemoveAdvanced,
            detail: {
                name: field,
                "from-result-id": !!this.results ? this.results.id : null
            }
        }));
    }

    private makeSelectExpr(field: string, valueItem: ValueItem, excludeField?: boolean): string {
        let haveField = false;
        const sb: string[] = [];
        if (!excludeField) {
            sb.push(field);
            haveField = true;
        }
        if (valueItem.display) {
            let display = valueItem.display;
            if (Utils.isDate(display)) { // ES-7785
                display = Utils.toSysDateStr(display);
            }
            sb.push(ExprParser.escape(display));
            haveField = true;
        }
        if (haveField) {
            sb.push(":(", ExprParser.escape(Utils.toSqlValue(valueItem.value)), ")");
        }
        else {
            sb.push(ExprParser.escape(Utils.toSqlValue(valueItem.value)));
        }
        return sb.join("");
    }

    private _addFieldSelect(expr: string, options: SearchService.AddFieldSelectOptions): number {
        if (options.not) {
            expr = "NOT (" + expr + ")";
        }
        return this.query.addSelect(expr);
    }

    private makeFieldExpr(
        field: string, valueItem: ValueItem, options: SearchService.AddFieldSelectOptions,
        excludeField?: boolean): string {
        if (options && options.valuesAreExpressions) {
            return valueItem.value as string;
        }
        return this.makeSelectExpr(field, valueItem, excludeField);
    }

    addFieldSelect(field: string, items: ValueItem | ValueItem[], options?: SearchService.AddFieldSelectOptions): number {
        if (!items) {
            return 0;
        }
        const _options = Utils.extend({not: false, and: false}, options);
        let item: ValueItem | undefined;
        if (Utils.isArray(items)) {
            if (items.length === 0) {
                return 0;
            }
            if (items.length === 1) {
                item = items[0];
            }
        }
        else {
            item = items as ValueItem;
        }
        if (item) {
            return this._addFieldSelect(this.makeFieldExpr(field, item, _options), _options);
        }
        if (Utils.isArray(items)) {
            if (_options.and) {
                let count = 0;
                for (const _item of items) {
                    count += this._addFieldSelect(this.makeFieldExpr(field, _item, _options), _options);
                }
                return count;
            }
            // or
            let expr = "";
            for (const _item of items) {
                if (expr) {
                    expr = expr + " OR ";
                }
                const expr1 = this.makeFieldExpr(field, _item, _options, true);
                expr += "(" + expr1 + ")";
            }
            expr = field + ":(" + expr + ")";
            return this._addFieldSelect(expr, _options);
        }
        return 0;
    }


    get lastRefineText(): string {
        if (this.breadcrumbs) {
            const refineExpr = this.breadcrumbs.findSelect("refine");
            if (refineExpr) {
                return ExprParser.unescape(refineExpr.toString(false));
            }
        }
        return "";
    }

    get hasRelevance(): boolean {
        if (!this.breadcrumbs) {
            return false;
        }
        if (this.breadcrumbs.textExpr) {
            return true;
        }
        const refineExpr = this.breadcrumbs.findSelect("refine");
        return refineExpr != null;
    }

    selectTab(arg: string | Tab, options: SearchService.NavigationOptions = {}): Promise<boolean> {
        options.selectTab = true;
        const tabName = typeof arg === 'string' ? arg : arg.name;
        this.query.tab = tabName;
        this._events.next({type: "before-select-tab", query: this.query});
        return this.search(options,
            this.makeAuditEvent({
                type: AuditEventType.Search_GotoTab,
                detail: {
                    tab: tabName,
                    "from-result-id": !!this.results ? this.results.id : null
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

    notifyOpenOriginalDocument(record: Record, resultId?: string): void {
        const results = this.results && this.results.records && this.results.records.includes(record) ? this.results : undefined;
        this._events.next({ type: "open-original-document", record });
        const querylang = this.query.questionLanguage ||
            (this.appService.ccquery && this.appService.ccquery.questionLanguage);
        this.auditService.notifyDocument(
            AuditEventType.Click_ResultLink,
            record,
            results || resultId || "",
            {
                querytext: this.query.text,
                querylang,
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
}

export module SearchService {
    export interface GetResultsOptions {
        queryIntents?: QueryIntent[];
        queryAnalysis?: QueryAnalysis;
        searchInactive?: boolean;   // default "false"
    }

    export interface SetResultsOptions {
        resuseBreadcrumbs?: boolean;
        advanced?: boolean;
    }

    export interface AddSelectOptions {
        not?: boolean;      // default "false"
        and?: boolean;      // default "false"
    }

    export interface NavigationOptions {
        path?: string; // absolute path, current path used if not specified
        reuseBreadcrumbs?: boolean;
        selectTab?: boolean;
        advanced?: boolean;
        analyzeQueryText?: boolean;
        queryIntents?: QueryIntent[];
        queryAnalysis?: QueryAnalysis;
        skipLocationChange?: boolean;
    }

    export interface HistoryState {
        audit?: AuditEvents;
        navigationOptions?: NavigationOptions;
    }

    export interface AddFieldSelectOptions extends AddSelectOptions {
        valuesAreExpressions?: boolean;
    }

    export interface Event {
        type: "new-query" | "update-query" | "make-query" | "before-new-results" | "new-results" | "make-query-intent-data" |
            "process-query-intent-action" | "make-audit-event" |
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

    export interface BeforeNewResultsEvent extends Event {
        type: "before-new-results";
        results: Results | undefined;
    }

    export interface NewResultsEvent extends Event {
        type: "new-results";
        results: Results | undefined;
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

    export interface AfterSelectTabEvent extends Event {
        type: "after-select-tab";
        observable: Observable<Results>;
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

    export type Events =
        NewQueryEvent |
        UpdateQueryEvent |
        MakeQueryEvent |
        BeforeNewResultsEvent |
        NewResultsEvent |
        MakeQueryIntentDataEvent |
        ProcessQueryIntentActionEvent |
        MakeAuditEventEvent |
        BeforeSelectTabEvent |
        AfterSelectTabEvent |
        ClearEvent |
        OpenOriginalDocument |
        BeforeSearchEvent;

    export const DefaultPageSize = 20;
}
