import { FacetService } from '@sinequa/components/facet';
import { SearchService } from '@sinequa/components/search';
import { AppService, ExprParser, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { Results } from '@sinequa/core/web-services';
import { IGetRowsParams, IDatasource, ColDef } from 'ag-grid-community';

export type Filter = {
    filterType: "text" | "number" | "date";
    type: "contains" | "notContains" | "equals" | "notEqual" | "startsWith" | "endsWith" | "lessThan" | "lessThanOrEqual" | "greaterThan" | "greaterThanOrEqual" | "inRange";
    filter: string | number;
    filterTo?: number;
    dateFrom?: string;
    dateTo?: string;
};

export class SqDatasource implements IDatasource {

    // The latest results (as opposed to the "seed" results provided when building the datasource)
    latestResults: Results;

    _filterChangedFlag: boolean;
    _sortChangedFlag: boolean;
    _destroyedFlag: boolean;

    /** Number of rows on the server */
    get rowCount(): number {
        return this.latestResults.totalRowCount;
    }

    constructor(
        public results: Results,
        public query: Query | undefined,
        public colDefs: ColDef[],
        public searchService: SearchService,
        public appService: AppService,
        public facetService: FacetService
    ){
        this.latestResults = results;
    }

    /**
     * This method is called by ag-grid in different situations:
     * - The datasource is created and data needs to be displayed
     * - The user scrolls down and the grid needs to display more rows
     * - The user changes an ag-grid filter (filterModel)
     * - The user changes an ag-grid sort (sortModel)
     * @param params 
     * @returns 
     */
    getRows(params: IGetRowsParams): void {

        if(this._destroyedFlag) {
            console.warn("Request cancelled");
            return;
        }

        // GLOBAL QUERY MODE ("stateful"): Filtering & Sorting are managed globally by the search service and the state is stored in the URL and persisted upon refresh
        // Search bar, filters, etc. modify searchService.results, which results in a new datasource being created

        if(!this.query) {
            if(this._filterChangedFlag) {
                this.updateGlobalFilters(params.filterModel);
                this._destroyedFlag = true; // We want to cancel any further request from ag-grid, as a new datasource will be created
                return;
            }
    
            if(this._sortChangedFlag) {
                if(this.updateGlobalSort(params.sortModel[0])) {
                    this._destroyedFlag = true; // We want to cancel any further request from ag-grid, as a new datasource will be created
                    return;
                }
            }
            
            // Return the seed results if this is the first page
            if(params.startRow === 0) {
                params.successCallback(this.results.records || [], this.rowCount);
            }
            // Or else, create a Query that fetches the data from the server
            else {
                const query = this.searchService.query.copy();
                const pageSize = this.appService.ccquery?.pageSize || 20;
                query.page = 1 + (params.startRow / pageSize);

                // Query the server for data
                this.searchService.getResults(query).subscribe(results => {
                    this.latestResults = results;
                    params.successCallback(results.records || [], this.rowCount);
                },
                err => {
                    console.error(err);
                    params.failCallback();
                });
            }
        }

        // INTERNAL QUERY MODE ("stateless"): Filtering & Sorting are managed internally by this datasource, but the state is lost upon refresh.
        // /!\ External facets and search bars will not work unless a new datasource is created
        // /!\ This mode is not compatible when using Sinequa facets in the grid (because facets are tied to the search service)

        else {

            // Return the seed results if there is no custom sorting, filtering or pagination required
            if(params.startRow === 0 && params.sortModel.length === 0 && Object.keys(params.filterModel).length === 0) {
                params.successCallback(this.results.records || [], this.rowCount);
            }

            else {
                const query = this.query.copy();
                const pageSize = this.appService.ccquery?.pageSize || 20;
                query.page = 1 + (params.startRow / pageSize);
    
                // Apply sorting (order by clause)
                if(params.sortModel.length > 0) {
                    this.applySort(query, params.sortModel[0]);
                }
    
                // Filters are applied as a delta vs original query
                for(let column of Object.keys(params.filterModel)) {
                    this.applyFilter(query, params.filterModel[column], column);
                }
    
                // Query the server for data
                this.searchService.getResults(query).subscribe(results => {
                    this.latestResults = results;
                    params.successCallback(results.records || [], this.rowCount);
                },
                err => {
                    console.error(err);
                    params.failCallback();
                });
            }
        }

    }

    /**
     * Sync the ag-grid filter model with the global query
     * @param filterModel 
     */
    updateGlobalFilters(filterModel: any) {
        for(let col of this.colDefs) {
            if(col.field && col.filter && col.filter !== "facet") { // Only manage ag-grid facets
                this.searchService.query.removeSelect("grid-filter-"+col.field); // Remove existing filters if any
                if(filterModel[col.field]) {
                    this.applyFilter(this.searchService.query, filterModel[col.field], col.field);
                }
            }
        }
        this.searchService.search();
    }
    
    /**
     * Sync the ag-grid sort model with the global query
     * @param filterModel 
     */
    updateGlobalSort(sortModel: {colId: string, sort: string} | undefined): boolean {
        if(this.makeSort(sortModel) !== this.searchService.query.orderBy){
            this.applySort(this.searchService.query, sortModel);
            this.searchService.search();
            return true;
        }
        return false;
    }

    destroy(): void {
        this._destroyedFlag = true;
    }

    /**
     * Notify this datasource that a filter was changed by a user
     */
    filterChanged() {
        this._filterChangedFlag = true;
    }

    /**
     * Notify this datasource that a sort was changed by a user
     */
    sortChanged() {
        this._sortChangedFlag = true;
    }

    /**
     * Apply an ag-grid filter to a Sinequa query.
     * The filter model is first converted into a Sinequa Expr, and
     * then the select is added to the query
     * @param query 
     * @param filter 
     * @param column 
     */
    applyFilter(query: Query, filter: any, column: string) {
        const expr = SqDatasource.modelToExpr(filter, column, this.appService.isEntity(column));
        query.addSelect(expr, "grid-filter-"+column);
    }

    /**
     * Apply an ag-grid sort to a Sinequa query (orderBy property).
     * @param query 
     * @param model 
     */
    applySort(query: Query, model: {colId: string, sort: string} | undefined) {
        if(model) {
            query.orderBy = this.makeSort(model);
        }
        else {
            delete query.orderBy;
        }
    }

    /**
     * Transform an ag-grid sort into a Sinequa order by clause
     * @param model 
     * @returns 
     */
    makeSort(model: {colId: string, sort: string} | undefined): string | undefined {
        if(model) {
            let column = model.colId; // geo
            const sort = model.sort; // asc
            column = this.appService.getColumn(column)?.name || column; // entity27
            return `${column} ${sort}`;
        }
        return undefined;
    }

    
    // STATIC METHODS
    // Conversions from Sinequa Expressions to AG Grid filters, and vice-versa

    /**
     * Transforms a filter model into an expression
     * @param column 
     * @param model 
     * @param normalize 
     * @returns 
     */
    static modelToExpr(model: any, column: string, normalize?: boolean): string {
        if(model.operator) { // AND or OR
            return `${this.makeExpr(model.condition1, column, normalize)} ${model.operator} ${this.makeExpr(model.condition2, column, normalize)}`;
        }
        else {
            return this.makeExpr(model, column, normalize);
        }
    }

    /**
     * Utility function to convert an ag-grid filter into an
     * equivalent fielded-search string.
     * 
     * For example a filter of type "contains" on the string "toto"
     * is converted to the query "~ toto"
     */
    static makeExpr(filter: Filter, column: string, normalize?: boolean): string {
        let pattern = "";
        if(filter.filterType === "text") {
            let f = filter.filter.toString();
            // Normalize entities to avoid ES-13540
            if(normalize) {
                f = Utils.normalize(f);
            }
            switch(filter.type) {
                case "contains": pattern = `~ ${f}`; break;
                case "notContains": pattern = `NOT (~ ${f})`; break;
                case "equals": pattern = `=${ExprParser.escape(f)}`; break;
                case "notEqual": pattern = `<>${ExprParser.escape(f)}`; break;
                case "startsWith": pattern = ` ${ExprParser.escape(f+"*")}`; break;
                case "endsWith": pattern = `~ ${f}$`; break;
            }
        }
        else if(filter.filterType === "number") {
            switch(filter.type) {
                case "equals": pattern = `=${filter.filter}`; break;
                case "notEqual": pattern = `<>${filter.filter}`; break;
                case "lessThan": pattern = `<${filter.filter}`; break;
                case "lessThanOrEqual": pattern = `<=${filter.filter}`; break;
                case "greaterThan": pattern = `>${filter.filter}`; break;
                case "greaterThanOrEqual": pattern = `>=${filter.filter}`; break;
                case "inRange": pattern = `[${filter.filter}..${filter.filterTo}]`; break;
            }
        }
        else if(filter.filterType === "date") {
            switch(filter.type) {
                case "equals": pattern = `=${filter.dateFrom}`; break;
                case "notEqual": pattern = `<>${filter.dateFrom}`; break;
                case "lessThan": pattern = `<${filter.dateFrom}`; break;
                case "greaterThan": pattern = `>${filter.dateFrom}`; break;
                case "inRange": pattern = `[${filter.dateFrom}..${filter.dateTo}]`; break;
            }
        }
        return `${column}:${pattern}`;
    }

    /**
     * Convert an expression generated by makeExpr() back into
     * a model that ag-grid can understand
     * @param type 
     * @param column 
     * @param expr 
     */
    static exprToModel(type: "text" | "number" | "date", column: string, expr: string): any {
        const prefix = `${column}:`;
        if(expr.startsWith(prefix)) {
            expr = expr.substr(prefix.length);

            // Manage operators
            if(expr.includes(` OR ${prefix}`)) {
                let [expr1, expr2] = expr.split(` OR ${prefix}`);
                return {operator: "OR", condition1: this.subExprToModel(type, expr1), condition2: this.subExprToModel(type, expr2)};
            }
            
            if(expr.includes(` AND ${prefix}`)) {
                let [expr1, expr2] = expr.split(` OR ${prefix}`);
                return {operator: "AND", condition1: this.subExprToModel(type, expr1), condition2: this.subExprToModel(type, expr2)};
            }
            
            return this.subExprToModel(type, expr);
        }
    }

    static subExprToModel(type: "text" | "number" | "date", expr: string): any {
        if(type === "text") {
            if(expr.startsWith("~ ") && !expr.endsWith("$")) return {filterType: "text", type: "contains", filter: expr.substr(2)};
            if(expr.startsWith("NOT (~ ")) return {filterType: "text", type: "notContains", filter: expr.substring(7, expr.length-1)};
            if(expr.startsWith("=`")) return {filterType: "text", type: "equals", filter: ExprParser.unescape(expr.substr(1))};
            if(expr.startsWith("<>`")) return {filterType: "text", type: "notEqual", filter: ExprParser.unescape(expr.substr(2))};
            if(expr.startsWith(" `")) {
                const filter = ExprParser.unescape(expr.substring(1));
                return {filterType: "text", type: "startsWith", filter: filter.substring(0,filter.length-1)}; // Remove the '*' at the end
            };
            if(expr.startsWith("~ ") && expr.endsWith("$")) return {filterType: "text", type: "endsWith", filter: expr.substring(2, expr.length-1)};
        }
        else if(type === "number") {
            if(expr.startsWith("=")) return {filterType: "number", type: "equals", filter: +expr.substr(1)};
            if(expr.startsWith("<>")) return {filterType: "number", type: "notEqual", filter: +expr.substr(2)};
            if(expr.startsWith("<=")) return {filterType: "number", type: "lessThanOrEqual", filter: +expr.substr(2)};
            if(expr.startsWith("<")) return {filterType: "number", type: "lessThan", filter: +expr.substr(1)};
            if(expr.startsWith(">=")) return {filterType: "number", type: "greaterThanOrEqual", filter: +expr.substr(2)};
            if(expr.startsWith(">")) return {filterType: "number", type: "greaterThan", filter: +expr.substr(1)};
            if(expr.startsWith("[") && expr.includes("..") && expr.endsWith("]")) {
                let range = expr.substring(1, expr.length-1).split("..");
                return {filterType: "number", type: "inRange", filter: +range[0], filterTo: +range[1]};
            }
        }
        else if(type === "date") {
            if(expr.startsWith("=")) return {filterType: "date", type: "equals", dateFrom: expr.substr(1)};
            if(expr.startsWith("<>")) return {filterType: "date", type: "notEqual", dateFrom: expr.substr(2)};
            if(expr.startsWith("<")) return {filterType: "date", type: "lessThan", dateFrom: expr.substr(1)};
            if(expr.startsWith(">")) return {filterType: "date", type: "greaterThan", dateFrom: expr.substr(1)};
            if(expr.startsWith("[") && expr.includes("..") && expr.endsWith("]")) {
                let range = expr.substring(1, expr.length-1).split("..");
                return {filterType: "date", type: "inRange", dateFrom: range[0], dateTo: range[1]};
            }
        }
        console.error("Could not rebuild filter from expression: ", expr, type);
        return undefined;
    }

}