import {Injectable, Inject, Optional, InjectionToken} from "@angular/core";
import {UserSettingsWebService, UserSettings, Suggestion,
    Results, Aggregation, AggregationItem, TreeAggregation, TreeAggregationNode,
    AuditEvents} from "@sinequa/core/web-services";
import {IntlService} from "@sinequa/core/intl";
import {Query, AppService, FormatService, ValueItem, Expr, ExprOperator, ExprParser} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {Subject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SearchService} from "@sinequa/components/search";
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
    Remove = "Facet_Removed",

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

    private readonly _events = new Subject<FacetChangeEvent>();
    private readonly _changes = new Subject<FacetChangeEvent>();

    constructor(
        private userSettingsService: UserSettingsWebService,
        private searchService: SearchService,
        private suggestService: SuggestService,
        private appService: AppService,
        private intlService: IntlService,
        private formatService: FormatService,
        @Optional() @Inject(ALL_FACETS) private allFacets: any[],
        @Optional() @Inject(DEFAULT_FACETS) private defaultFacets: FacetState[]){

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

    private facetIndex(name: string): number {
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
                type: FacetEventType.Add,
                detail: {
                    facet: facet.name
                }
            }]);
        }
    }


    /**
     * Updates facets in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchFacets(auditEvents?: AuditEvents) {
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

        this.addFilter(facetName, aggregation, items, options);
        this.events.next({ type: FacetEventType.AddFilter, facet: this.facet(facetName) });
        return this.searchService.search(undefined, {
                type: FacetEventType.AddFilter,
                detail: {
                    item: <any>this.searchService.query.lastSelect(),
                    itembox: facetName,
                    itemcolumn: aggregation.column,
                    isitemexclude: options.not,
                    "from-result-id": !!this.searchService.results ? this.searchService.results.id : null
                }
            });
    }


    /**
     * Filter/Exclude one or more item(s) in a facet (without launching a search)
     * @param facetName
     * @param aggregation
     * @param items
     * @param options
     */
    public addFilter(
        facetName: string,
        aggregation: Aggregation,
        items: AggregationItem | AggregationItem[],
        options: AddFilterOptions = {}) : void {

        if (!items) {
            return;
        }
        if (options.replaceCurrent) {
            this.searchService.query.removeSelect(facetName);
        }

        const expr = this.makeExpr(facetName, aggregation, items, options);
        if (expr) this._addFacetFilter(expr, facetName, options.not);
    }

    /**
     * Clears the query from the current selection on the given facet
     * @param facetName
     * @param all
     */
    public clearFilters(facetName: string, all?: boolean) {
        this.searchService.query.removeSelect(facetName, all);
    }

    /**
     * Clears the query from the current selection on the given facet and perform a search
     * @param facetName
     * @param all
     */
    public clearFiltersSearch(facetName: string, all?: boolean): Promise<boolean> {
        this.clearFilters(facetName, all);
        this._events.next({type: FacetEventType.ClearFilters, facet: this.facet(facetName)});
        return this.searchService.search(undefined, {
                type: FacetEventType.ClearFilters,
                detail: {
                    itembox: facetName,
                    "from-result-id": !!this.searchService.results ? this.searchService.results.id : null
                }
            });
    }

    /**
     * Remove a filter and update the appropriate Select if it was previously included in a selection
     * @param facetName
     * @param aggregation
     * @param item
     */
    public removeFilter(facetName: string, aggregation: Aggregation, item: AggregationItem){
        if (this.searchService.breadcrumbs) {
            const expr = this.findItemFilter(facetName, aggregation, item);
            const i = this.searchService.breadcrumbs.activeSelects.findIndex(select => select.facet === facetName && (select.expr === expr || select.expr === expr?.parent));

            if (expr && expr.parent && expr.parent.operands.length > 1) {
                // create a new Expr from parent and replaces Select by this new one
                // so, breadcrumbs stay ordered
                const items: AggregationItem[] = expr.parent.operands.filter(expr => expr.value !== item.value).map( i => ({count:0, value: i.value, display: i.display} as AggregationItem))
                const _expr = this.makeExpr(facetName, aggregation, items);
                if (_expr) this.searchService.query.replaceSelect(i, {expression: _expr, facet: facetName});
            } else {
                // filter is a single value... remove it
                this.searchService.query.removeSelect(i);
            }
        }
    }

    public removeFilterSearch(facetName: string, aggregation: Aggregation, item: AggregationItem): Promise<boolean>{
        this.removeFilter(facetName, aggregation, item);
        this._events.next({type: FacetEventType.RemoveFilter, facet: this.facet(facetName)});
        return this.searchService.search(undefined); // Note: Audit event generated by the removeBreadcrumbItem call
    }

    private _addFacetFilter(expr: string, facet: string, not?: boolean): number {
        if (not) {
            expr = "NOT (" + expr + ")";
        }
        return this.searchService.query.addSelect(expr, facet);
    }

    /**
     * Queries the server for data for this aggregation
     * @param aggregation
     * @param skip
     * @param count
     */
    public loadData(aggregation: string, skip: number = 0, count: number = 10): Observable<Aggregation | undefined> {
        const query = Utils.copy(this.searchService.query);
        query.action = "aggregate";
        query.aggregations = {};
        query.aggregations[aggregation] = {skip: skip, count: count};
        return this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(
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
     */
    public hasFiltered(facetName: string) : boolean {
        return !!this.findFilter(facetName);
    }

    /**
     * Returns an active selection of this facet filtering the search
     * Returns it as an expression
     * @param facetName
     */
    public findFilter(facetName: string) : Expr | undefined {
        if (this.searchService.breadcrumbs) {
            return this.searchService.breadcrumbs.findSelect(facetName);
        }
        return undefined;
    }

    /**
     * Look for an aggregation with the given name in the search results and returns it.
     * Takes care of initializing the aggregation items to insert their $column property.
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     */
    getAggregation(aggregationName: string, results = this.searchService.results): Aggregation | undefined {
        if (results && results.aggregations) {
            for (const aggregation of results.aggregations) {
                if (Utils.eqNC(aggregation.name, aggregationName)) {
                    this.setColumn(aggregation);    // Useful for formatting and i18n
                    return aggregation;
                }
            }
        }
        return undefined;
    }

    /**
     * Look for a Tree aggregation with the given name in the search results and returns it.
     * Takes care of initializing the Node aggregation items to insert their properties ($column, $path, $opened, $level)
     * @param facetName
     * @param aggregationName
     * @param results The search results can be provided explicitly or taken from the SearchService implicitly.
     * @param levelCallback A callback method called at every level of the tree.
     * Can be used to read or alter the properties of the nodes (opening, closing), or node list (sorting)
     */
    getTreeAggregation(facetName: string, aggregationName: string, results = this.searchService.results,
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node?: TreeAggregationNode, opened?: boolean, filtered?: boolean) => void
    ): TreeAggregation | undefined {
        const agg = this.getAggregation(aggregationName, results);
        if(agg && agg.isTree){
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
        const ccaggregation = this.appService.getCCAggregation(aggregationName);
        return (ccaggregation && ccaggregation.count) || 10;
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
    open(facetName: string, aggregation: TreeAggregation,
        item: TreeAggregationNode,
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node?: TreeAggregationNode, opened?: boolean, filtered?: boolean) => void
    ): Observable<Results> {
        const value = item.$path + "*";
        const query = Query.copy(this.searchService.query);
        query.action = "open";
        const expr = aggregation.column + ":(" + ExprParser.escape(value) + ")";
        query.addOpen(expr, aggregation.name);

        this.events.next({type: FacetEventType.Open, facet: this.facet(facetName)});
        return this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(
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
    itemFiltered(facetName: string, aggregation: Aggregation, item: AggregationItem): boolean {
        return !!this.findItemFilter(facetName, aggregation, item);
    }

    private findItemFilter(facetName: string, aggregation: Aggregation, item: AggregationItem) : Expr | undefined {
        let expr: Expr | undefined;
        if (!aggregation.valuesAreExpressions) {
            let value: string;
            if (aggregation.isTree) {
                value = Utils.toSqlValue((<TreeAggregationNode>item).$path + "*");
            }
            else {
                value = Utils.toSqlValue(item.value);
            }
            expr = new Expr({
                exprContext: {
                    appService: this.appService,
                    formatService: this.formatService,
                    intlService: this.intlService
                },
                value: value,
                operator: ExprOperator.eq,
                field: aggregation.column
            });
        }
        else {
            const ret = this.appService.parseExpr(<string>item.value);
            if (ret instanceof Expr) {
                expr = <Expr>ret;
            }
        }
        if (expr) {
            const expr2 = this.searchService.breadcrumbs && this.searchService.breadcrumbs.findSelect(facetName, expr);
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
    private initTreeNodes(facetName: string, aggregation: Aggregation,
        root: string, children: TreeAggregationNode[],
        expandPaths?: string[],
        levelCallback?: (nodes: TreeAggregationNode[], level: number, node?: TreeAggregationNode, opened?: boolean, selected?: boolean) => void
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
        FacetService
            .traverse(children, (_nodes) => {
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
                _node["$level"] = level;
                _node.$opened = false;
                let filtered = false;
                if (expandPaths) {
                    for (const expandPath of expandPaths) {
                        if (expandPath.indexOf(path) === 0) {
                            if (FacetService.getChildrenCount(_node) > 0) {
                                _node.$opened = true;
                            }
                        }
                    }
                }
                if (this.itemFiltered(facetName, aggregation, _node)) {
                    filtered = true;
                    _nodes.forEach(node => node.$unselectable = true);
                }
                if (levelCallback) {
                    levelCallback(_node.items, level, _node, _node.$opened, filtered);
                }
                return false; // don't stop
            });
        if (levelCallback) {
            levelCallback(children, rootLevel);
        }
    }

    private setColumn(aggregation: Aggregation){
        if(!aggregation.isTree && aggregation.items){
            const column = this.appService.getColumn(aggregation.column);
            aggregation.items.forEach((value) => value.$column = column);
        }
    }



    // static methods

    /**
     * Create an Expression to filter or exclude an item in a facet
     * @param aggregation the Aggregation to which the item belong
     * @param item the filtered/excluded item (might be a tree item)
     * @param label an optional label to display the value (by default will have none)
     */
    private static makeFacetExpr(
        aggregation: Aggregation,
        item: AggregationItem | TreeAggregationNode,
        excludeField?: boolean,
        label?: string): string {

        let expr: string;
        if (aggregation.valuesAreExpressions) {
            expr = <string>item.value;
        }
        else {
            let valueItem: ValueItem = item;
            let displayObj: {label?: string, display?: string} | undefined;
            if (label) {
                displayObj = {
                    label: label,
                    display: item.display
                };
            }
            if (aggregation.isTree) {
                let display: string;
                if (displayObj) {
                    displayObj.display = displayObj.display || <string>item.value;
                    display = Utils.toJson(displayObj);
                }
                else {
                    display = item.display || <string>item.value;
                }
                valueItem = {
                    value: (item as TreeAggregationNode).$path + "*",
                    display: display
                };
            }
            else {
                if (displayObj) {
                    valueItem = {
                        value: item.value,
                        display: Utils.toJson(displayObj)
                    };
                }
            }
            expr = this.makeFilterExpr(excludeField? "" : aggregation.column, valueItem);
        }
        if (item.$excluded) {
            expr = "NOT (" + expr + ")";
        }
        return expr;
    }

    // Copied from Search service
    private static makeFilterExpr(field: string, valueItem: ValueItem): string {
        let haveField = false;
        const sb: string[] = [];
        if (field) {
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

    private static getChildrenCount(node: TreeAggregationNode): number {
        return !!node.items ? node.items.length : node.hasChildren ? -1 : 0;
    }

    private static splitTreepath(path: string): string[] {
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

    /*private static treepathDepth(path: string): number {
        let names = FacetService.splitTreepath(path);
        if (!names) {
            return 0;
        }
        return names.length;
    }*/

    public static treepathLast(path: string): string {
        const parts = FacetService.splitTreepath(path);
        if (!parts || parts.length === 0) {
            return "";
        }
        return parts[parts.length - 1];
    }

    /*private static getTreePath(nodes: TreeAggregationNode[], node: TreeAggregationNode) {
        let path: string = null;
        FacetService.traverse(nodes, (lineage) => {
            if (lineage) {
                let _node = lineage[lineage.length - 1];
                if (node === _node) {
                    path = "/";
                    for (let _node of lineage) {
                        path = path + _node.value + "/";
                    }
                    console.log(path);
                    return true; // stop
                }
            }
            return false; // don't stop
        });
        return path;
    }*/

    private static traverse(nodes: TreeAggregationNode[], callback: (lineage: TreeAggregationNode[] | undefined) => boolean): boolean {
        if (!nodes || nodes.length === 0) {
            return false;
        }
        if (!callback) {
            return false;
        }
        const lineage: TreeAggregationNode[] = [];
        const stack: (TreeAggregationNode | undefined)[] = [];
        let _i = nodes.length;
        while (_i--) {
            stack.push(nodes[_i]);
        }
        while (stack.length) {
            const node = stack.pop();
            if (!node) {
                lineage.pop();
                callback(undefined);
            }
            else {
                lineage.push(node);
                if (callback(lineage)) {
                    return true;
                }
                stack.push(undefined);
                if (node.items && node.items.length > 0) {
                    _i = node.items.length;
                    while (_i--) {
                        stack.push(node.items[_i]);
                    }
                }
            }
        }
        return false;
    }

    private static getAggregationNode(nodes: TreeAggregationNode[], path: string): TreeAggregationNode | undefined {
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

    /*private static compareFieldValues(a: FieldValue, b: FieldValue): number {
        if (!a && !b) {
            return 0;
        }
        if (!a) {
            return -1;
        }
        if (!b) {
            return 1;
        }
        if (Utils.isNumber(a) && Utils.isNumber(b)) {
            return a - b;
        }
        if (Utils.isDate(a) && Utils.isDate(b)) {
            return a.getTime() - b.getTime();
        }
        if (Utils.isBoolean(a) && Utils.isBoolean(b)) {
            return (a ? 1 : 0) - (b ? 1 : 0);
        }
        return Utils.compare(String(a), String(b));
    }*/

    private makeExpr(
        facetName: string,
        aggregation: Aggregation,
        items: AggregationItem | AggregationItem[],
        options: AddFilterOptions = {}) :string | undefined {

        let _exprs: string[] | undefined;
        let _expr: string = "";
        let addGlobalField = !aggregation.valuesAreExpressions;
        if (Utils.isArray(items)) {
            if (items.length === 0) {
                return;
            }
            addGlobalField = !aggregation.valuesAreExpressions && items.length > 1;
            const excludeField = addGlobalField;
            _exprs = items.map(value => FacetService.makeFacetExpr(aggregation, value, excludeField));
            if (_exprs.length === 1) {
                _expr = _exprs[0];
            }
        }
        else {
            _expr = FacetService.makeFacetExpr(aggregation, items as AggregationItem);
        }
        // SINGLE VALUE CASE
        if (_expr) {
            return _expr;
        }
        // AND / OR
        const operator = options.and ? " AND " : " OR ";
        let expr = "";
        if (_exprs) {
            for (const _expr of _exprs) {
                if (expr) {
                    expr = expr + operator;
                }
                expr += "(" + _expr + ")";
            }
            expr = "(" + expr + ")";
        }
        if (addGlobalField) {
            expr = aggregation.column + ":" + expr;
        }
        return expr
    }

}