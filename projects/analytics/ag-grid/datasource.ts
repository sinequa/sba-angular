import { SearchService } from '@sinequa/components/search';
import { AppService, ExprParser, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { Results } from '@sinequa/core/web-services';
import { IGetRowsParams, IDatasource } from 'ag-grid-community';

export type Filter = {
    filterType: "text" | "number" | "date";
    type: "contains" | "notContains" | "equals" | "notEqual" | "startsWith" | "endsWith" | "lessThan" | "lessThanOrEqual" | "greaterThan" | "greaterThanOrEqual" | "inRange";
    filter: string | number;
    filterTo?: number;
    dateFrom?: string;
    dateTo?: string;
};

export class SqDatasource implements IDatasource {

    /** Number of rows on the server */
    rowCount?: number | undefined;

    constructor(
        public results: Results,
        public query: Query | undefined,
        public searchService: SearchService,
        public appService: AppService
    ){
        this.rowCount = results.totalRowCount;
    }

    getRows(params: IGetRowsParams): void {

        // Return the seed results if there is no custom sorting, filtering or pagination required
        if(params.startRow === 0 && params.sortModel.length === 0 && Object.keys(params.filterModel).length === 0) {
            params.successCallback(this.results.records || []);
        }
        
        // Or else, create a Query that fetches the data from the server
        else {
            const query = (this.query || this.searchService.query).copy();
            const pageSize = this.appService.ccquery?.pageSize || 20;
            query.page = 1 + (params.startRow / pageSize);

            // Apply sorting (order by clause)
            if(params.sortModel.length > 0) {
                let column = params.sortModel[0].colId; // geo
                const sort = params.sortModel[0].sort; // asc
                column = this.appService.getColumn(column)?.name; // entity27
                query.orderBy = `${column} ${sort}`;
            }

            // Apply filters (via addSelect)
            Object.keys(params.filterModel).forEach(column => {
                const filter = params.filterModel[column];
                const operator = filter.operator; // AND or OR
                let select = "";
                if(operator) {
                    select = `${this.makeSelect(column, filter.condition1)} ${operator} ${this.makeSelect(column, filter.condition2)}`;
                }
                else {
                    select = this.makeSelect(column, filter);
                }
                query.addSelect(select);
            });

            // Query the server for data
            this.searchService.getResults(query).subscribe(results => {
                this.rowCount = results.totalRowCount;
                params.successCallback(results.records || [], this.rowCount);
            },
            err => {
                params.failCallback();
            });
        }
    }

    destroy(): void {

    }

    /**
     * Utility function to convert an ag-grid filter into an
     * equivalent fielded-search string.
     * 
     * For example a filter of type "contains" on the string "toto"
     * is converted to the query "~ toto"
     */
    makeSelect(column: string, filter: Filter): string {
        let pattern = "";
        if(filter.filterType === "text") {
            let f = filter.filter.toString();
            // Normalize entities to avoid ES-13540
            if(this.appService.isEntity(column)) {
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

}