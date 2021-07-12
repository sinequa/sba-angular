import {Injectable, Inject, Optional, InjectionToken} from "@angular/core";
import {UserSettingsWebService, UserSettings, Suggestion,
    Results, Aggregation, AggregationItem, TreeAggregation, TreeAggregationNode,
    AuditEvents, EngineType, Select, CCColumn
} from "@sinequa/core/web-services";
import {IntlService} from "@sinequa/core/intl";
import {Query, AppService, FormatService, ExprBuilder, Expr} from "@sinequa/core/app-utils";
import {FieldValue, Utils} from "@sinequa/core/base";
import {Subject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SearchService, BreadcrumbsItem, Breadcrumbs} from "@sinequa/components/search";
import {SuggestService} from "@sinequa/components/autocomplete";

// Facet interface (from models/UserSettings)
export interface FacetState {
    name: string;
    position: number; // eg 0 = left, 1 = right
    expanded: boolean;
    hidden: boolean;
    view: string;
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
}

// Audit Events (from models/Audit)
export const enum FacetEventType {
    Loaded = "Facet_Loaded",
    Add = "Facet_Added",
    AddAll = "Facets_Added",
    Remove = "Facet_Removed",
    RemoveAll = "Facets_Removed",

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
    FacetEventType.Remove
];


// CRUD Events
export interface FacetChangeEvent {
    type: FacetEventType;
    facet?: FacetState;
}

export const ALL_FACETS = new InjectionToken<any[]>('ALL_FACETS');
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
        protected exprBuilder: ExprBuilder,
        @Optional() @Inject(ALL_FACETS) public allFacets: any[],
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
    public getFacets(position: number = 0) : any[] {
        if (!this.allFacets) {
            return [];
        }
        return this.facets.filter(f => f.position === position)
            .map(f => this.allFacets.find(_f => _f.name === f.name));
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
        this.events.next({type : FacetEventType.Add, facet: facet});
        this.patchFacets([{
            type: FacetEventType.Add,
            detail: {
                facet: facet.name
            }
        }]);
    }

    public removeFacet(facet: FacetState){
        const i = this.facetIndex(facet.name);
        if(i !== -1){
            this.facets.splice(i,1);
            this.events.next({type : FacetEventType.Remove, facet: facet});
            this.patchFacets([{
                type: FacetEventType.Remove,
                detail: {
                    facet: facet.name
                }
            }]);
        }
    }

    public addAllFacet() {
        this.facets.splice(0,this.facets.length);
        if(!!this.defaultFacets) this.facets.push(...this.defaultFacets);
        this.events.next({type : FacetEventType.AddAll});
        this.patchFacets([{
            type: FacetEventType.AddAll
        }]);
    }

    public removeAllFacet() {
        this.facets.splice(0,this.facets.length);
        this.events.next({type : FacetEventType.RemoveAll});
        this.patchFacets([{
            type: FacetEventType.RemoveAll
        }]);
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
        options: AddFilterOptions = {}): Promise<boolean> {

        const success = this.addFilter(facetName, aggregation, items, options);
        if(success) {
            this.events.next({ type: FacetEventType.AddFilter, facet: this.facet(facetName) });
            return this.searchService.search(undefined, {
                type: FacetEventType.AddFilter,
                detail: {
                    item: <any>this.searchService.query.lastSelect(),
                    itembox: facetName,
                    itemcolumn: aggregation.column,
                    isitemexclude: options.not,
                    "from-result-id": this.searchService.results?.id
                }
            });
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
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
     */
    public addFilter(
        facetName: string,
        aggregation: Aggregation,
        items: AggregationItem | AggregationItem[],
        options: AddFilterOptions = {},
        query = this.searchService.query,
        breadcrumbs = this.searchService.breadcrumbs): boolean {

        if (!items) {
            return false;
        }
        if (options.replaceCurrent) {
            query.removeSelect(facetName);
        }

        if (!aggregation.isTree && breadcrumbs?.activeSelects.length && !options.replaceCurrent) {
            const expr = breadcrumbs.findSelect(facetName);
            const index = breadcrumbs.activeSelects.findIndex(select => select.facet === facetName && (select.expr === expr || select.expr === expr?.parent));
            const same = (!Array.isArray(items)) ? true : (options.and ? "AND" : "OR") === (expr?.and ? "AND" : "OR") && (options.not ? "YES" : "NO") === (expr?.not ? "YES" : "NO");

            if (expr && same && index !== -1){
                let _items: AggregationItem[];
                if (expr?.operands) {
                    _items = this.exprToAggregationItem(expr.operands, aggregation.valuesAreExpressions).concat(items);
                } else {
                    // previous selection is a single value
                    _items = this.exprToAggregationItem(expr as Expr, aggregation.valuesAreExpressions).concat(items);
                }
                // MUST reset $excluded property otherwise expression is misunderstood
                _items.forEach(item => item.$excluded = undefined);
                // overrides options settings with expression if any
                let _expr = this.exprBuilder.makeAggregationExpr(aggregation, _items, options.and || expr.and);
                if (options.not || expr.not) {
                    _expr = this.exprBuilder.makeNotExpr(_expr);
                }
                if (_expr) {
                    query.replaceSelect(index, {expression: _expr, facet: facetName});
                    return true;
                }
            }
        }
        let expr = this.exprBuilder.makeAggregationExpr(aggregation, items, options.and);
        if (options.not) {
            expr = this.exprBuilder.makeNotExpr(expr);
        }
        if (expr) {
            query.addSelect(expr, facetName);
            return true;
        }
        return false;
    }

    /**
     * Clears the query from the current selection on the given facet
     * @param facetName
     * @param all
     * @param query the query to clear from the facet selection (defaults to search service query)
     */
    public clearFilters(facetName: string, all?: boolean, query = this.searchService.query) {
        query.removeSelect(facetName, all);
    }

    /**
     * Clears the query from the current selection on the given facet and perform a search
     * @param facetName
     * @param all
     */
    public clearFiltersSearch(facetName: string | string[], all?: boolean): Promise<boolean> {
        [].concat(facetName as []).forEach(name => {
            this.clearFilters(name, all);
            this._events.next({type: FacetEventType.ClearFilters, facet: this.facet(name)});
        });

        return this.searchService.search(undefined, {
                type: FacetEventType.ClearFilters,
                detail: {
                    itembox: facetName,
                    "from-result-id": this.searchService.results?.id
                }
            });
    }

    /**
     * Remove a filter and update the appropriate Select if it was previously included in a selection
     * @param facetName the facet that removes the filter
     * @param aggregation the aggregation that contains the item to remove
     * @param item the aggregation item to remove from the query
     * @param query the query on which to remove the filter (defaults to search service query)
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults  to search service breadcrumbs)
     */
    public removeFilter(
        facetName: string,
        aggregation: Aggregation,
        item: AggregationItem,
        query = this.searchService.query,
        breadcrumbs = this.searchService.breadcrumbs): Select | undefined {

        if (breadcrumbs) {
            // if item is excluded, makeAggregation() should returns a NOT expression
            const stringExpr = item.$excluded ? this.exprBuilder.makeNotExpr(this.exprBuilder.makeAggregationExpr(aggregation, item)) : this.exprBuilder.makeAggregationExpr(aggregation, item);
            const filterExpr = this.findItemFilter(facetName, aggregation, item, breadcrumbs) || this.appService.parseExpr(stringExpr);
            const expr = breadcrumbs.findSelect(facetName, filterExpr);
            const i = breadcrumbs.activeSelects.findIndex(select => select.facet === facetName && (select.expr === expr || select.expr === expr?.parent));

            // 'Select' can't be created when aggregation is a tree map, so, avoid aggregation tree
            // and remove whole breadcrumbs
            if (!aggregation.isTree && expr && expr.parent && expr.parent.operands.length > 1) {
                // create a new Expr from parent and replaces Select by this new one
                // so, breadcrumbs stay ordered
                const filterByValuesAreExpression = (it: AggregationItem) => it.value.toString().replace(/ /g, "") !== item.value.toString().replace(/ /g, "");
                const filterByValue = (it: AggregationItem) => it.value !== item.value
                const filter = (aggregation.valuesAreExpressions) ? filterByValuesAreExpression : filterByValue;

                const items: AggregationItem[] = this.exprToAggregationItem(expr.parent.operands, aggregation.valuesAreExpressions).filter(filter);
                // MUST reset $excluded property otherwise expression is misunderstood (mainly NOT expressions)
                items.forEach(item => item.$excluded = undefined);
                const {not, and} = breadcrumbs.selects[i].expr || {};
                let _expr = this.exprBuilder.makeAggregationExpr(aggregation, items, and);
                if (not) {
                    _expr = this.exprBuilder.makeNotExpr(_expr);
                }
                if (_expr) {
                    query.replaceSelect(i, {expression: _expr, facet: facetName});
                    return {expression: this.exprBuilder.makeAggregationExpr(aggregation, item), facet: facetName};
                }
            } else {
                // filter is a single value... remove it
                const select = query.select ? query.select[i] : undefined;
                query.removeSelect(i);
                return select;
            }
        }
        return undefined;
    }

    /**
     * Removes the aggregation from the search service query and refresh the search
     * @param facetName
     * @param aggregation
     * @param item
     */
    public removeFilterSearch(facetName: string, aggregation: Aggregation, item: AggregationItem): Promise<boolean>{
        const select = this.removeFilter(facetName, aggregation, item);
        if(select) {
            this._events.next({type: FacetEventType.RemoveFilter, facet: this.facet(facetName || "")});
            delete this.searchService.query.queryId; // SBA-154
            return this.searchService.search(undefined, {
                type: FacetEventType.RemoveFilter,
                detail: {
                    item: {expression: select?.expression, facet: select?.facet},
                    itembox: facetName,
                    itemcolumn: aggregation.column,
                    "from-result-id": !!this.searchService.results ? this.searchService.results.id : null
                }
            });
        }
        return Promise.resolve(false);
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
    public suggest(text: string, field: string, suggestQuery = this.appService.suggestQueries[0]): Observable<Suggestion[]> {
        return this.suggestService.get(suggestQuery, text, [field], this.searchService.query);
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
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
     */
    public hasFiltered(facetName: string, breadcrumbs = this.searchService.breadcrumbs) : boolean {
        return !!this.findFilter(facetName, breadcrumbs);
    }

    /**
     * Returns an active selection of this facet filtering the search
     * Returns it as an expression
     * @param facetName
     * @param breadcrumbs breadcrumbs in which to look for selected items (defaults to search service breadcrumbs)
     */
    public findFilter(facetName: string, breadcrumbs = this.searchService.breadcrumbs) : Expr | undefined {
        return breadcrumbs?.findSelect(facetName);
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
        }
    ): Aggregation | TreeAggregation | undefined {

        if (results?.aggregations) {
            const aggregation = results.aggregations.find(agg => Utils.eqNC(agg.name, aggregationName))
            if (aggregation) {
                this.setColumn(aggregation);    // Useful for formatting and i18n
                if (aggregation.isTree && treeAggregationOptions) {
                    const expr = this.findFilter(treeAggregationOptions.facetName);
                    const expandPaths = expr ? expr.getValues(aggregation.column) : [];
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
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => void
    ): TreeAggregation | undefined {

        const agg = this.getAggregation(aggregationName, results);
        if(agg?.isTree){
            const expr = this.findFilter(facetName);
            const expandPaths = expr ? expr.getValues(agg.column) : [];
            this.initTreeNodes(facetName, agg, "/", agg.items as TreeAggregationNode[], expandPaths, levelCallback);

            return agg as TreeAggregation;
        }
        return undefined;
    }

    /**
     * Returns the count parameter of the given aggregation (default is 10)
     * @param aggregationName
     */
    getAggregationCount(aggregationName: string) : number {
        return this.appService.getCCAggregation(aggregationName)?.count || 10;
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
        const expr = this.exprBuilder.makeExpr(aggregation.column, value);
        query.addOpen(expr, aggregation.name);

        this.events.next({type: FacetEventType.Open, facet: this.facet(facetName)});
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
     * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
     */
    itemFiltered(facetName: string, aggregation: Aggregation, item: AggregationItem, breadcrumbs = this.searchService.breadcrumbs): boolean {
        return !!this.findItemFilter(facetName, aggregation, item, breadcrumbs);
    }

    protected findItemFilter(facetName: string, aggregation: Aggregation, item: AggregationItem, breadcrumbs: Breadcrumbs | undefined) : Expr | undefined {
        let expr: Expr | undefined;
        let exprText: string;
        if (!aggregation.valuesAreExpressions) {
            let value: string;
            if (aggregation.isTree) {
                value = Utils.toSqlValue((<TreeAggregationNode>item).$path + "*");
            }
            else {
                value = Utils.toSqlValue(item.value);
            }
            exprText = this.exprBuilder.makeExpr(aggregation.column, value);
        }
        else {
            exprText = item.value as string;
        }
        const ret = this.appService.parseExpr(exprText);
        if (ret instanceof Expr) {
            expr = <Expr>ret;
        }
        if (expr) {
            const expr2 = breadcrumbs?.findSelect(facetName, expr);
            if(!!expr2 && (!expr2.parent || !expr2.parent.parent)){
                return expr2;
            }
        }
        return undefined;
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
     * Convert an Expression object or an Expression Array to their AggregationItem equivalent
     *
     * @param expr Expression object or Expression Array
     * @param valuesAreExpressions when true values should be converted to string otherwise no
     *
     * @returns AggregationItem array with converted expression or an empty array
     */
    exprToAggregationItem(expr: Expr[] | Expr, valuesAreExpressions: boolean = false): AggregationItem[] {
        const fn = [
            (item: Expr) => {
                let value: FieldValue = item.value as string;
                if (item.column?.eType === EngineType.bool) {
                    value = Utils.isTrue(item.value);
                }
                return ({count: 0, value, display: item.display, $column: item.column, $excluded: (item?.not || item?.parent?.not)} as AggregationItem);
            },
            (item: Expr) => ({count: 0, value: item.toString((item.value) ? true : false), display: item.display, $column: item.column, $excluded: (item?.not || item?.parent?.not)} as AggregationItem)
        ];

        const callback = valuesAreExpressions ? fn[1] : fn[0];
        return [].concat(expr as []).map(callback) as AggregationItem[];
    }

    /**
     * Get all Breadcrumbs items from a specific facet
     *
     * @param facetName facet name where to extract all breadcrumbs
     * @param breadcrumbs breadcrumbs in which to look for selected items
     */
    getBreadcrumbsItems(facetName: string, breadcrumbs: Breadcrumbs | undefined): BreadcrumbsItem[] {
        return breadcrumbs?.items.filter(item => item.facet === facetName) || [];
    }

    /**
     * Get all Aggregation items from a facet, currently filtered
     *
     * @param facetName facet name where to inspect
     * @param valuesAreExpressions when true, some transformations should be done
     * @param breadcrumbs breadcrumbs in which to look for selected items (default to search service breadcrumbs)
     */
    getAggregationItemsFiltered(facetName: string, valuesAreExpressions: boolean = false, breadcrumbs = this.searchService.breadcrumbs): AggregationItem[] {
        const items = this.getBreadcrumbsItems(facetName, breadcrumbs);

        // aggregation items are constructed from nested expressions
        const expr = [] as Expr[][];
        for (const item of items) {
            const value = (item.expr?.display === undefined) ? item.expr?.operands as Expr[] || item.expr : item.expr;
            if (value) {
                expr.push(value as Expr[]);
            }
        }
        // faltten results
        const flattenExpr = [].concat.apply([], expr);

        return this.exprToAggregationItem(flattenExpr, valuesAreExpressions);
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
            const path2node = new Map<string,TreeAggregationNode>();
            const searchPattern = new RegExp(`\\b${searchTerm}`, 'i');
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
        let index = arr.findIndex(it => it.value === item.value);
        if (index === -1 && item.display) {
            // fallback to display comparison
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
