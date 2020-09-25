import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {AppService, FormatService} from "@sinequa/core/app-utils";
import {CCColumn, Results} from "@sinequa/core/web-services";
import {SelectionService} from "@sinequa/components/selection";
import {SearchService} from "@sinequa/components/search";
import {ResultsView} from "../../results-view.service";

export interface GridView extends ResultsView {
    columns: Column[];
}

export interface Column {
    active: boolean;
    title: string;
    field: string;
    sortable: boolean;
    renderAsHtml: boolean;
}

export interface ColumnData {
    config: Column;
    column: CCColumn | undefined;
    // Sorting data
    sortIndex?: number;
    ascending?: boolean;
    sortIcon?: string;
    sortIndicator?: string;
}

@Component({
    selector: "sq-results-grid-view",
    templateUrl: "./results-grid-view.html"
})
export class BsResultsGridView implements OnChanges {
    @Input() results: Results;
    @Input() view: GridView;
    private orderBy: string | undefined;
    columnsData: ColumnData[] | undefined;

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public formatService: FormatService,
        private selectionService: SelectionService) {
    }

    observeQueryFields() {
        this.initSorts();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.columnsData) {
            if (!!this.view.columns) {
                this.columnsData = this.view.columns.filter(config => config.active).map(config => ({
                    config: config,
                    column: this.appService.getColumn(config.field)
                }));
                this.clearSorts();
            }
            else {
                this.columnsData = [];
            }
        }
        if (!!changes["query"]) {
            this.observeQueryFields();
        }
    }


    toggleSelectedRecords() {
        this.selectionService.toggleSelectedRecords();
    }

    get haveSelectedRecords(){
        return this.selectionService.haveSelectedRecords;
    }

    getSortIndicator(columnData: ColumnData): string | undefined {
        if (columnData.sortIndex === -1) {
            return undefined;
        }
        if (this.maxSortIndex === 0) {
            return undefined;
        }
        switch (columnData.sortIndex || -1 + 1) {
            case 1: return "\u00B9";
            case 2: return "\u00B2";
            case 3: return "\u00B3";
            case 4: return "\u2074";
            case 5: return "\u2075";
            case 6: return "\u2076";
            case 7: return "\u2077";
            case 8: return "\u2078";
            case 9: return "\u2079";
            default: return "\u207A";
        }
    }

    ascendingFirst(column: Column): boolean {
        //return this.appService.isNumber(column.field);
        return false;
    }

    get maxSortIndex(): number {
        let sortIndex = -1;
        if (this.columnsData) {
            for (const columnData of this.columnsData) {
                if (columnData.sortIndex !== undefined && columnData.sortIndex > sortIndex) {
                    sortIndex = columnData.sortIndex;
                }
            }
        }
        return sortIndex;
    }

    _setSort(columnData: ColumnData, ascending: boolean) {
        const previousSortIndex = columnData.sortIndex;
        if (previousSortIndex === -1) {
            columnData.sortIndex = this.maxSortIndex + 1;
        }
        columnData.ascending = ascending;
        columnData.sortIcon = columnData.ascending ? "fas fa-caret-up" : "fas fa-caret-down";
        columnData.sortIndicator = this.getSortIndicator(columnData);
        if (previousSortIndex === -1) {
            if (this.columnsData) {
                for (const columnData1 of this.columnsData) {
                    columnData1.sortIndicator = this.getSortIndicator(columnData1);
                }
            }
        }
    }

    _clearSort(columnData: ColumnData) {
        const previousSortIndex = columnData.sortIndex || -1;
        columnData.sortIndex = -1;
        columnData.ascending = false;
        columnData.sortIcon = "fas fa-sort";
        columnData.sortIndicator = undefined;
        if (previousSortIndex !== -1) {
            if (this.columnsData) {
                for (const columnData1 of this.columnsData) {
                    if (columnData1.sortIndex !== undefined && columnData1.sortIndex > previousSortIndex) {
                        columnData1.sortIndex--;
                    }
                    columnData1.sortIndicator = this.getSortIndicator(columnData1);
                }
            }
        }
    }

    clearSorts() {
        if (this.columnsData) {
            for (const columnData of this.columnsData) {
                this._clearSort(columnData);
            }
        }
    }

    isSortable(columnData: ColumnData): boolean {
        return !!columnData && columnData.config.sortable && this.appService.isSortable(columnData.config.field);
    }

    initSorts() {
        if (this.searchService.query.orderBy === this.orderBy) {
            return;
        }
        this.orderBy = this.searchService.query.orderBy;
        this.clearSorts();
        if (!!this.orderBy) {
            const parts = Utils.split(this.orderBy, ",");
            for (const part of parts) {
                const tokens = Utils.split(part, " ");
                if (tokens.length > 0) {
                    const field = tokens[0];
                    if (this.columnsData) {
                        const columnData = this.columnsData.find(value => Utils.eqNC(field, value.config.field));
                        if (columnData && this.isSortable(columnData)) {
                            this._setSort(columnData, tokens.length > 1 ? Utils.eqNC(tokens[1], "asc") : true);
                        }
                    }
                }
            }
        }
    }

    setSort(columnData: ColumnData) {
        if (this.isSortable(columnData)) {
            if (columnData.sortIndex !== -1) {
                if (this.ascendingFirst(columnData.config)) {
                    if (columnData.ascending) {
                        this._setSort(columnData, false);
                    }
                    else {
                        this._clearSort(columnData);
                    }
                }
                else {
                    if (columnData.ascending) {
                        this._clearSort(columnData);
                    }
                    else {
                        this._setSort(columnData, true);
                    }
                }
            }
            else {
                this._setSort(columnData, this.ascendingFirst(columnData.config));
            }
            const orderBy: string[] = [];
            if (this.columnsData) {
                for (let sortIndex = 0; ; sortIndex++) {
                    const columnData = this.columnsData.find(columnData => columnData.sortIndex === sortIndex);
                    if (!columnData) {
                        break;
                    }
                    if (orderBy.length !== 0) {
                        orderBy.push(",");
                    }
                    orderBy.push(columnData.config.field);
                    if (!columnData.ascending) {
                        orderBy.push(" desc");
                    }
                }
            }
            if (orderBy.length === 0) {
                this.searchService.query.orderBy = this.orderBy = undefined;
            }
            else {
                this.searchService.query.orderBy = this.orderBy = orderBy.join("");
            }
            this.searchService.search();
        }
    }

}