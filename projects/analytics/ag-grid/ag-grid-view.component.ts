import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { SelectionEventType, SelectionService } from "@sinequa/components/selection";
import { UserPreferences } from "@sinequa/components/user-settings";
import { UIService } from "@sinequa/components/utils";
import { AppService, FormatService, Query } from "@sinequa/core/app-utils";
import { IntlService } from "@sinequa/core/intl";
import { ModalService } from "@sinequa/core/modal";
import { Results, Record, CCColumn, EngineType } from "@sinequa/core/web-services";
import { ICellRendererFunc, ITooltipParams, ColDef, GridApi, ColumnApi, GridReadyEvent, RowDataChangedEvent, CellDoubleClickedEvent, SelectionChangedEvent, IDatasource, CsvExportParams, ProcessCellForExportParams } from 'ag-grid-community';
import { Subscription } from "rxjs";
import { DataModalComponent } from "./data-modal.component";
import { SqDatasource } from "./datasource";


export interface Column extends ColDef {
    field: string;
    $column?: CCColumn;
}


@Component({
    selector: 'sq-ag-grid-view',
    templateUrl: './ag-grid-view.component.html',
    styleUrls: ['./ag-grid-view.component.scss']
})
export class AgGridViewComponent implements OnInit, OnChanges, OnDestroy {

    /** Results containing the record objects displayed in this grid */
    @Input() results?: Results;
    /** List of column definitions for each column displayed in the grid */
    @Input() columns: Column[];
    /** Optional query to fetch more data from the server (defaults to searchService.query) */
    @Input() query?: Query;

    /** Width of the grid */
    @Input() width = "100%";
    /** Height of the grid */
    @Input() height = "600px";
    /** Whether or not to show a toolbar above the grid */
    @Input() showToolbar = true;
    /** Whether or not to format the data in the grid, using the FormatService */
    @Input() formatContent = true;
    /** Row selection mode (forwarded to ag-grid) */
    @Input() rowSelection: 'single' | 'multiple' = 'multiple';
    /** Whether or not to display checkboxes in the first column of the grid to select rows */
    @Input() displayCheckbox = false;
    /** Choice of ag-grid theme (balham is denser) */
    @Input() theme: "ag-theme-balham" | "ag-theme-alpine" | "ag-theme-balham-dark" | "ag-theme-alpine-dark" = "ag-theme-alpine";
    /** Default column grid (possibly overriden by column definitions) */
    @Input() defaultColumnWidth = 200;

    /** Default column definition */
    @Input()
    defaultColDef: ColDef = {
        resizable: true
    }
    
    /** Actual column definitions (derived from this.columns) */
    colDefs: ColDef[] = [];
    
    /** ag-grid API for the grid and the column model */
    gridApi: GridApi | null | undefined;
    gridColumnApi: ColumnApi | null | undefined;

    /** Datasource implementation for infinite scrolling row model */
    datasource?: IDatasource;

    /** List of action buttons displayed in the toolbar */
    gridActions: Action[];
    /** Action button allowing to toggle each column's visibility */
    columnsAction: Action;

    /** List of subscriptions to clean up on destroy */
    subscriptions: Subscription[] = [];

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public intlService: IntlService,
        public formatService: FormatService,
        public selectionService: SelectionService,
        public uiService: UIService,
        public modalService: ModalService,
        public prefs: UserPreferences
    ) {
        // Initialization of button actions
        this.gridActions = [];
        this.columnsAction = new Action({
            icon: "fas fa-columns fa-fw",
            text: "msg#grid.columns",
            scrollable: true,
            children: []
        });
        this.gridActions.push(this.columnsAction);
        this.gridActions.push(new Action({
            icon: "fas fa-sync-alt fa-fw",
            text: "msg#grid.reset",
            title: "msg#grid.resetTitle",
            action: () => this.resetState()
        }));
        this.gridActions.push(new Action({
            icon: "fas fa-arrows-alt-h fa-fw",
            text: "msg#grid.autosize",
            title: "msg#grid.autosizeTitle",
            action: () => this.autoResize()
        }));
        this.gridActions.push(new Action({
            icon: "fas fa-copy fa-fw",
            text: "msg#grid.copy",
            title: "msg#grid.copyTitle",
            action: () => this.copyToClipboard()
        }));
        this.gridActions.push(new Action({
            icon: "fas fa-download fa-fw",
            text: "msg#grid.download",
            title: "msg#grid.downloadTitle",
            action: () => this.downloadCsv()
        }));
    }

    ngOnInit() {
        // Subscribe to the selection service to reflect external row selection into the grid
        this.subscriptions.push(this.selectionService.events.subscribe(event => {
            if(event.source !== "ag-grid" && (event.type === SelectionEventType.SELECT || event.type === SelectionEventType.UNSELECT)) {
                this.gridApi?.forEachNode(node => {
                    if(event.records.find(r => r.id === node.data.id)) {
                        node.setSelected(event.type === SelectionEventType.SELECT, undefined, true);
                    }
                });
            }
        }));

        // Override the "formatContent" property if it exists in the user preferences
        const formatContent = this.prefs.get("ag-grid-format-content");
        if(formatContent !== undefined) {
            this.formatContent = formatContent;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.columns) {
            this.createColumns();
        }
        if(changes.results) {
            this.createRows();
        }
    }

    ngOnDestroy() {
        // Unsubscribe from any subscription
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    /**
     * Create the list of column definitions by deriving the input
     * `columns` list. Since record objects do not necessarily contain
     * clean string data, we add a custom cellRenderer and tooltipValueGetter.
     * Sinequa provides header names and tells us if a column can be sorted on,
     * or filtered.
     */
    createColumns() {
        this.colDefs = this.columns?.map((col,i) => {

            col.$column = this.appService.getColumn(col.field);

            col.tooltipValueGetter = col.tooltipValueGetter || this.tooltipValueGetter;
            col.headerName = col.headerName || (col.$column?.label? this.intlService.formatMessage(col.$column?.label) : col.field);
            col.headerTooltip = col.headerTooltip || col.headerName;
            col.cellRenderer = col.cellRenderer || this.renderCell;
            col.sortable = col.sortable || this.appService.isSortable(col.field);
            const hidePref = this.prefs.get("ag-grid-hide-"+col.field);
            col.hide = hidePref === undefined? col.hide : hidePref;
            col.width = col.width || this.defaultColumnWidth;

            // How to filter the column
            switch(col.$column?.eType) {
                case EngineType.double:
                case EngineType.float:
                case EngineType.integer:
                    col.filter = 'agNumberColumnFilter'; break;
                case EngineType.date:
                case EngineType.dates:
                case EngineType.dateTime:
                case EngineType.dateTimes:
                    col.filter = 'agDateColumnFilter'; break;
                case EngineType.string:
                case EngineType.csv:
                    col.filter = true; break;
            }

            if(i === 0 && this.displayCheckbox) {
                // Note that header selection checkbox doesn't work with the infinite row model
                col.checkboxSelection = true;
            }

            return col;
        }) || [];

        // Populate the columnsAction: for each column we toggle the "hide" property and persist that preference
        this.columnsAction.children = this.colDefs.map(col => new Action({
            text: col.headerName,
            selected: !col.hide,
            action: (action, event) => {
                action.selected = !action.selected;
                this.gridColumnApi?.setColumnVisible(col.field!, action.selected);
                if(action.selected) {
                    this.prefs.delete("ag-grid-hide-"+col.field);
                }
                else {
                    this.prefs.set("ag-grid-hide-"+col.field, true);
                }
                event.stopPropagation();
            }
        }));
    }

    /**
     * Create the rows' datasource
     */
    createRows() {
        if(this.gridApi && this.gridColumnApi) {
            // Reset sorting & filtering
            this.resetState();
            // Create a new datasource
            this.datasource = this.makeDatasource();
            // Apply to the grid
            this.gridApi.setDatasource(this.datasource);
        }
    }


    // Custom rendering functions

    /**
     * A function that returns a HTML string for each cell.
     * The value in the cell is params.value and the column definition
     * is params.colDef.
     */
    @Input()
    renderCell: ICellRendererFunc = (params: any): HTMLElement |string => {
        if(this.formatContent) {
            return this.formatService.formatValue(params.value, params.colDef.$column);
        }
        else {
            return this.formatService.formatRaw(params.value);
        }
    }

    /**
     * A function that returns a tooltip string for each cell's value
     */
    @Input()
    tooltipValueGetter = (params: ITooltipParams) => {
        return this.formatService.formatRaw(params.value);
    }

    /**
     * A function that returns a string formatted for export for each cell's value
     */
    @Input()
    exportValueGetter = (params: ProcessCellForExportParams) => {
        return this.formatService.formatRaw(params.value);
    }


    /**
     * Create a datasource object from the given results and query
     */
    makeDatasource() : IDatasource {
        if(this.results) {
            return new SqDatasource(this.results, this.query, this.searchService, this.appService);
        }
        return {getRows: () => []}
    }


    // User actions

    /**
     * Reset filtering, sorting and column width
     */
     resetState() {
        this.gridApi?.setFilterModel({});
        this.gridColumnApi?.applyColumnState({defaultState:{
            sort: null, width: this.defaultColumnWidth
        }});
    }

    /**
     * Returns a configuration for exporting the data as CSV.
     */
    getExportParams(): CsvExportParams {
        const params: CsvExportParams = {
            allColumns: true,
            processCellCallback: this.exportValueGetter
        };
        if(this.gridApi?.getSelectedRows().length) {
            params.onlySelected = true;
        }
        return params;
    }

    /**
     * Copy the data to the clipboard
     */
    copyToClipboard() {
        const data = this.gridApi?.getDataAsCsv(this.getExportParams());
        if(data) {
            this.uiService.copyToClipboard(data);
        }
    }
    
    /** Download the data as a CSV file */
    downloadCsv() {
        this.gridApi?.exportDataAsCsv(this.getExportParams());
    }

    /**
     * Auto-resize the columns
     */
    autoResize() {
        this.gridColumnApi?.autoSizeAllColumns();
    }
    
    /**
     * Called when the user toggles the "format content" checkbox
     */
    onFormatContentChanged() {
        this.prefs.set("ag-grid-format-content", this.formatContent);
        this.gridApi?.refreshCells({force: true})
    }

    // AG-GRID events

    /**
     * Callback function called when the grid is initialized
     */
    onGridReady(event: GridReadyEvent) {
        this.gridApi = event.api;
        this.gridColumnApi = event.columnApi;
        // Create the rows in case there are already results available
        this.createRows();
    }

    /**
     * Callback function called when data in the grid changes
     */
    onRowDataChanged(event: RowDataChangedEvent) {
        
    }

    /**
     * Callback function called when users double click on a cell
     */
    onCellDoubleClicked(event: CellDoubleClickedEvent) {
        this.modalService.open(DataModalComponent, {
            model: {
                row: event.data,
                column: event.colDef.headerName || event.colDef.field,
                cell: event.value,
                cccolumn: (event.colDef as Column).$column,
                formatContent: this.formatContent
            }
        })
    }

    /**
     * Callback function called when users select data in the grid
     */
    onSelectionChanged(event: SelectionChangedEvent) {
        const newRows = this.gridApi?.getSelectedRows() as Record[] | undefined;
        const oldRows = this.selectionService.getSelectedIds();
        oldRows.forEach(id => {
            const foundRow = newRows?.find(row => row.id === id);
            if(!foundRow) {
                this.selectionService.toggleSelectedRecords({id} as Record, "ag-grid");
            }
        });
        newRows?.forEach(row => {
            const foundId = oldRows.find(id => row.id === id);
            if(!foundId) {
                this.selectionService.toggleSelectedRecords(row, "ag-grid");
            }
        });
    }


}
