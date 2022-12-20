import { FacetService } from '@sinequa/components/facet';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { Results, Filter as SqFilter, ValueFilter } from '@sinequa/core/web-services';
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
        public facetService: FacetService,
        public selectionService: SelectionService
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
                    const selected = new Set(this.selectionService.getSelectedIds());
                    results.records.forEach(r => r.$selected = selected.has(r.id));
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
                const pageSize = this.query.pageSize || this.appService.ccquery?.pageSize || 20;
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
                this.searchService.query.removeFilter(f => f.facetName === "grid-filter-"+col.field); // Remove existing filters if any
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
     * The filter model is first converted into a Sinequa filter, and
     * then the select is added to the query
     * @param query
     * @param filter
     * @param column
     */
    applyFilter(query: Query, filter: any, column: string) {
        const sqFilter = SqDatasource.modelToFilter(filter, column, this.appService.isEntity(column), "grid-filter-"+column);
        query.addFilter(sqFilter);
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
    // Conversions from Sinequa Filters to AG Grid filters, and vice-versa

    /**
     * Transforms a filter model into a filter
     * @param column
     * @param model
     * @param normalize
     * @returns
     */
    static modelToFilter(model: any, column: string, normalize?: boolean, facetName?: string): SqFilter {
        if(model.operator) { // AND or OR
            return {
                operator: (model.operator as 'AND'|'OR').toLowerCase() as 'and'|'or',
                filters: [
                    this.makeFilter(model.condition1, column, normalize),
                    this.makeFilter(model.condition2, column, normalize)
                ],
                facetName
            };
        }
        else {
            return this.makeFilter(model, column, normalize, facetName);
        }
    }

    /**
     * Utility function to convert an ag-grid filter into an
     * Sinequa filter.
     *
     * For example a filter of type "contains" on the string "toto"
     * is converted to the query {operator: regex, value: toto}
     */
    static makeFilter(filter: Filter, field: string, normalize?: boolean, facetName?: string): SqFilter {
        if(filter.filterType === "text") {
            let value = filter.filter.toString();
            // Normalize entities to avoid ES-13540
            if(normalize) {
                value = Utils.normalize(value);
            }
            switch(filter.type) {
                case "contains": return {field, operator: 'regex', value, facetName};
                case "notContains": return {operator: 'not', filters: [{field, operator: 'regex', value}], facetName};
                case "equals": return {field, value, facetName};
                case "notEqual": return {field, operator: 'neq', value, facetName};
                case "startsWith": return {field, value: value+"*", facetName};
                case "endsWith": return {field, operator: 'regex', value: value+"$", facetName};
            }
        }
        else if(filter.filterType === "number") {
            let value = filter.filter;
            switch(filter.type) {
                case "equals": return {field, value, facetName};
                case "notEqual": return {field, operator: 'neq', value, facetName};
                case "lessThan": return {field, operator: 'lt', value, facetName};
                case "lessThanOrEqual": return {field, operator: 'lte', value, facetName};
                case "greaterThan": return {field, operator: 'gt', value, facetName};
                case "greaterThanOrEqual": return {field, operator: 'gte', value, facetName};
                case "inRange": return {field, operator: 'between', start: value, end: filter.filterTo!, facetName};
            }
        }
        else if(filter.filterType === "date") {
            switch(filter.type) {
                case "equals": return {field, value:filter.dateFrom!, facetName};
                case "notEqual": return {field, operator: 'neq', value:filter.dateFrom!, facetName};
                case "lessThan": return {field, operator: 'lte', value:filter.dateFrom!, facetName};
                case "greaterThan": return {field, operator: 'gte', value:filter.dateFrom!, facetName};
                case "inRange": return {field, operator: 'between', start:filter.dateFrom!, end: filter.dateTo!, facetName};
            }
        }
        throw new Error("Unknown filter type "+filter.filterType);
    }

    /**
     * Convert a filter generated by makeFilter() back into
     * a model that ag-grid can understand
     * @param type
     * @param column
     * @param filter
     */
    static filterToModel(type: "text" | "number" | "date", filter: SqFilter): any {
        // Manage operators
        if(filter.operator === 'or') {
            return {
                operator: "OR",
                condition1: this.subFilterToModel(type, filter.filters[0]),
                condition2: this.subFilterToModel(type, filter.filters[1])
            };
        }

        if(filter.operator === 'and') {
            return {
                operator: "AND",
                condition1: this.subFilterToModel(type, filter.filters[0]),
                condition2: this.subFilterToModel(type, filter.filters[1])
            };
        }

        return this.subFilterToModel(type, filter);
    }

    static subFilterToModel(type: "text" | "number" | "date", filter: SqFilter): any {
        if(type === "text") {
            if(filter.operator === 'regex') {
                const value = filter.value.toString();
                if(value.endsWith('$')) {
                    return {filterType: "text", type: "endsWith", filter: value.substring(0, value.length-1)}
                }
                return {filterType: "text", type: "contains", filter: value}
            };
            if(filter.operator === 'not') return {filterType: "text", type: "notContains", filter: (filter.filters[0] as ValueFilter).value};
            if(!filter.operator || filter.operator === 'eq') {
                const value = filter.value.toString();
                if(value.endsWith('*')) {
                    return {filterType: "text", type: "startsWith", filter: value.substring(0,value.length-1)};
                }
                return {filterType: "text", type: "equals", filter: value}
            };
            if(filter.operator === 'neq') return {filterType: "text", type: "notEqual", filter: filter.value};
        }
        else if(type === "number") {
            if(!filter.operator || filter.operator === 'eq') return {filterType: "number", type: "equals", filter: +filter.value};
            if(filter.operator === 'neq') return {filterType: "number", type: "notEqual", filter: +filter.value};
            if(filter.operator === 'lte') return {filterType: "number", type: "lessThanOrEqual", filter: +filter.value};
            if(filter.operator === 'lt') return {filterType: "number", type: "lessThan", filter: +filter.value};
            if(filter.operator === 'gte') return {filterType: "number", type: "greaterThanOrEqual", filter: +filter.value};
            if(filter.operator === 'gt') return {filterType: "number", type: "greaterThan", filter: +filter.value};
            if(filter.operator === 'between') {
                return {filterType: "number", type: "inRange", filter: +filter.start, filterTo: +filter.end};
            }
        }
        else if(type === "date") {
            if(!filter.operator || filter.operator === 'eq') return {filterType: "date", type: "equals", dateFrom: filter.value};
            if(filter.operator === 'neq') return {filterType: "date", type: "notEqual", dateFrom: filter.value};
            if(filter.operator === 'lt') return {filterType: "date", type: "lessThan", dateFrom: filter.value};
            if(filter.operator === 'gt') return {filterType: "date", type: "greaterThan", dateFrom: filter.value};
            if(filter.operator === 'between') {
                return {filterType: "date", type: "inRange", dateFrom: filter.start, dateTo: filter.end};
            }
        }
        console.error("Could not rebuild filter from filter: ", filter, type);
        return undefined;
    }

}
