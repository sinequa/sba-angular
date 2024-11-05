import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { FacetService } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { SelectionEventType, SelectionService } from "@sinequa/components/selection";
import { UserPreferences } from "@sinequa/components/user-settings";
import { UIService } from "@sinequa/components/utils";
import { AppService, FormatService, Query } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { IntlService } from "@sinequa/core/intl";
import { ModalService } from "@sinequa/core/modal";
import { Results, Record, CCColumn, EngineType, getFieldPredicate } from "@sinequa/core/web-services";
import { ICellRendererFunc, ITooltipParams, ColDef, GridApi, GridReadyEvent, RowDataUpdatedEvent, CellDoubleClickedEvent, SelectionChangedEvent, IDatasource, CsvExportParams, ProcessCellForExportParams, SortChangedEvent, FilterChangedEvent, FilterModifiedEvent, ModelUpdatedEvent } from 'ag-grid-community';
import { ApplyColumnStateParams } from "ag-grid-community/dist/types/core/columns/columnApplyStateService";
import { Subscription } from "rxjs";
import { DataModalComponent } from "./data-modal.component";
import { SqDatasource } from "./datasource";
import { FacetWrapperComponent } from "./facet-wrapper.component";


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
    /** Which actions to show above the grid, if any */
    @Input() toolbarActions: (string | Action)[] = ["columnVisibility", "gridReset", "autosize", "copySelection", "downloadSelection", "formatContent"];
    /** Whether or not to show the results counter in the toolbar */
    @Input() showCounter = true;
    /** Whether or not to format the data in the grid, using the FormatService */
    @Input() formatContent = true;
    /** Row selection mode (forwarded to ag-grid) */
    @Input() rowSelection: 'single' | 'multiple' | undefined = 'multiple';
    /** Whether or not to display checkboxes in the first column of the grid to select rows */
    @Input() displayCheckbox = false;
    /** Choice of ag-grid theme (balham is denser) */
    @Input() theme: "ag-theme-balham" | "ag-theme-alpine" | "ag-theme-balham-dark" | "ag-theme-alpine-dark" = "ag-theme-alpine";
    /** Default column grid (possibly overriden by column definitions) */
    @Input() defaultColumnWidth = 200;
    /** Configure scrolling functionality */
    @Input() rowModelType: string = 'infinite';
    /** Name of this component for audit purposes */
    @Input() name?: string;

    /** Default column definition */
    @Input()
    defaultColDef: ColDef = {
        resizable: true
    }

    /** Actual column definitions (derived from this.columns) */
    colDefs: ColDef[] = [];

    /** ag-grid API for the grid and the column model */
    gridApi: GridApi | null | undefined;

    /** Datasource implementation for infinite scrolling row model */
    datasource?: IDatasource;

    // Flags to manage the state of filters and sorts
    _filterInput = false;

    /** Custom components */
    frameworkComponents = {
        facet: FacetWrapperComponent
    };

    /** List of action buttons displayed in the toolbar */
    gridActions: Action[];
    /** Action button allowing to toggle each column's visibility */
    columnsAction: Action;

    /** If rowModelType is 'clientSide', set rowData directly */
    rowData: Record[] = [];

    /** List of subscriptions to clean up on destroy */
    subscriptions: Subscription[] = [];

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public facetService: FacetService,
        public intlService: IntlService,
        public formatService: FormatService,
        public selectionService: SelectionService,
        public uiService: UIService,
        public modalService: ModalService,
        public prefs: UserPreferences
    ) {
        this.columnsAction = new Action({
            icon: "fas fa-columns fa-fw",
            text: "msg#grid.columns",
            scrollable: true,
            children: []
        });
    }

    ngOnInit() {
        // Subscribe to the selection service to reflect external row selection into the grid
        this.subscriptions.push(this.selectionService.events.subscribe(event => {
            if(event.source !== "ag-grid" && (event.type === SelectionEventType.SELECT || event.type === SelectionEventType.UNSELECT)) {
                this.gridApi?.forEachNode(node => {
                    if(event.records.find(r => r.id === node.data.id)) {
                        node.setSelected(event.type === SelectionEventType.SELECT, undefined);
                    }
                });
            }
        }));
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.columns) {
            this.createColumns();
        }
        if(changes.results) {
            this.createRows();
        }
        if(!this.gridActions || changes.toolbarActions) {
            // Override the "formatContent" property if it exists in the user preferences
            const formatContent = this.prefs.get("ag-grid-format-content");
            if(formatContent !== undefined) {
                this.formatContent = formatContent;
            }
            this.createActions();
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

            col = Utils.extend({}, col);
            col.$column = this.appService.getColumn(col.field);

            col.tooltipValueGetter = col.tooltipValueGetter || this.tooltipValueGetter;
            col.headerName = col.headerName || (col.$column?.label? this.intlService.formatMessage(col.$column?.label) : col.field);
            col.headerTooltip = col.headerTooltip || col.headerName;
            col.cellRenderer = col.cellRenderer ? undefined : col.cellRenderer || this.renderCell;
            col.sortable = col.sortable || this.appService.isSortable(col.field);
            const hidePref = this.prefs.get("ag-grid-hide-"+col.field);
            col.hide = hidePref === undefined? col.hide : hidePref;
            col.width = col.width || this.defaultColumnWidth;

            // How to filter the column
            if(col.filter === undefined) {
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
            }

            if(i === 0 && this.displayCheckbox) {
                // Note that header selection checkbox doesn't work with the infinite row model
                col.checkboxSelection = true;
            }

            return col;
        }) || [];

        // Populate the columnsAction: for each column we toggle the "hide" property and persist that preference
        this.columnsAction.children = this.colDefs.map(col => new Action({
            name: col.field,
            text: col.headerName,
            selected: !col.hide,
            action: (action, event) => {
                action.selected = !action.selected;
                this.gridApi?.setColumnsVisible([col.field!], action.selected);
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
        if(this.gridApi && this.rowModelType === 'infinite') {
            // Create a new datasource
            this.datasource = this.makeDatasource();
            // Apply to the grid
            this.gridApi.setGridOption('datasource', this.datasource);
            // The query that yielded this data may have active filters & sort: we want the grid to reflect this
            this.updateFilterState(this.query || this.searchService.query);
            this.updateSortState(this.query || this.searchService.query);
        } else if (this.rowModelType === 'clientSide') {
            this.rowData = this.results?.records || [];
        }
    }

    /**
     * For each column of the grid, look for an active filter in the query
     * and create a filter model that the grid can understand.
     * Finally, set the filter model via the grid API.
     * @param query
     */
    updateFilterState(query: Query) {
        const model = {};
        for(const col of this.colDefs) {
            if(col.field) {
                const isField = getFieldPredicate(col.field);
                const filter = query.findFilter(f =>
                  isField(f) ||
                  ((f.operator === 'and' || f.operator === 'or') && f.filters.length === 2 && isField(f.filters[0]) && isField(f.filters[1]))
                );
                if(filter) {
                    if(col.filter === "facet") { // Sinequa facets
                        model[col.field] = {facetActive: true}; // Lets us tell ag-grid that a custom filter is active this column
                    }
                    else { // AG Grid filters
                        const filterType = col.filter ==="agNumberColumnFilter"? "number" : col.filter ==="agDateColumnFilter"? "date" : "text";
                        model[col.field] = SqDatasource.filterToModel(filterType, filter);
                    }
                }
            }
        }
        this.gridApi?.setFilterModel(model);
    }

    /**
     * If the query has a custom orderby clause, create
     * a sort model that the grid can understand and apply
     * that model via the grid column API.
     * @param query
     */
    updateSortState(query: Query) {
        const model: ApplyColumnStateParams = {};
        if(query.orderBy) {
            let [colId, sort] = query.orderBy.split(" ");
            colId = this.appService.getColumnAlias(this.appService.getColumn(colId));
            if (sort === "asc" || sort === "desc") {
                model.state = [{colId, sort}];
            } else {
                model.state = [{colId, sort: null}];
            }
        }
        else {
            model.defaultState = {sort: null};
        }
        this.gridApi?.applyColumnState(model);
    }

    /**
     * Create the actions displayed in the toolbar
     */
    createActions() {
        // Initialization of button actions
        this.gridActions = [];
        for(const action of this.toolbarActions) {
            if(!Utils.isString(action)) {
                this.gridActions.push(action);
            }
            else if(action === "columnVisibility") {
                this.gridActions.push(this.columnsAction);
            }
            else if(action === "gridReset") {
                this.gridActions.push(new Action({
                    icon: "fas fa-sync-alt fa-fw",
                    text: "msg#grid.reset",
                    title: "msg#grid.resetTitle",
                    action: () => this.resetState()
                }));
            }
            else if(action === "autosize") {
                this.gridActions.push(new Action({
                    icon: "fas fa-arrows-alt-h fa-fw",
                    text: "msg#grid.autosize",
                    title: "msg#grid.autosizeTitle",
                    action: () => this.autoResize()
                }));
            }
            else if(action === "copySelection") {
                this.gridActions.push(new Action({
                    icon: "fas fa-copy fa-fw",
                    text: "msg#grid.copy",
                    title: "msg#grid.copyTitle",
                    action: () => this.copyToClipboard()
                }));
            }
            else if(action === "downloadSelection") {
                this.gridActions.push(new Action({
                    icon: "fas fa-download fa-fw",
                    text: "msg#grid.download",
                    title: "msg#grid.downloadTitle",
                    action: () => this.downloadCsv()
                }));
            }
            else if(action === "formatContent") {
                this.gridActions.push(new Action({
                    icon: this.formatContent? "far fa-fw fa-check-square" : "far fa-fw fa-square",
                    text: "msg#grid.formatData",
                    title: "msg#grid.formatDataTitle",
                    action: act => this.toggleFormatContent(act)
                }));
            }
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
    tooltipValueGetter = (params: ITooltipParams) => this.formatService.formatRaw(params.value)

    /**
     * A function that returns a string formatted for export for each cell's value
     */
    @Input()
    exportValueGetter = (params: ProcessCellForExportParams) => this.formatService.formatRaw(params.value)


    /**
     * Create a datasource object from the given results and query
     */
    makeDatasource() : IDatasource {
        if(this.results) {
            return new SqDatasource(this.results, this.query, this.colDefs, this.searchService, this.appService, this.facetService, this.selectionService);
        }
        return {getRows: () => []};
    }


    // User actions

    /**
     * Reset filtering, sorting, column width and order
     */
    resetState() {
        if(!this.query) {
            // In global search mode, the new query & results will update the filter model
            this.datasource?.destroy?.();
            delete this.searchService.query.orderBy;
            const fields = this.colDefs.map(col => col.field!).filter(f => f);
            this.facetService.clearFiltersSearch(fields, true, this.query, this.name);
        }
        else {
            // clear filters
            this.gridApi?.setFilterModel({});
            // clear sort
            this.gridApi?.applyColumnState({
                defaultState:{
                    sort: null
                }
            });
        }
        // clear width, visiblity, order
        this.gridApi?.applyColumnState({
            defaultState:{
                width: this.defaultColumnWidth
            },
            state: this.columns.map(c => {
                // Delete the visibility preference
                this.prefs.delete("ag-grid-hide-"+c.field, true);
                // Update the visibility action
                const visibilityAction = this.columnsAction.children?.find(a => a.name === c.field);
                if(visibilityAction) {
                    visibilityAction.selected = !c.hide;
                }
                return {
                    colId: c.field, // Resets the ordering
                    hide: !!c.hide // Resets the visibility
                };
            }),
            applyOrder: true
        });
        // Sync to apply the new visibility preference
        this.prefs.sync();
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
        this.gridApi?.autoSizeAllColumns();
    }

    /**
     * Called when the user toggles the "format content" checkbox
     */
    toggleFormatContent(action: Action) {
        this.formatContent = !this.formatContent;
        action.icon = this.formatContent? "far fa-fw fa-check-square" : "far fa-fw fa-square";
        this.prefs.set("ag-grid-format-content", this.formatContent);
        this.gridApi?.refreshCells({force: true})
    }

    // AG-GRID events

    /**
     * Callback function called when the grid is initialized
     */
    onGridReady(event: GridReadyEvent) {
        this.gridApi = event.api;
        // Create the rows in case there are already results available
        this.createRows();
    }

    /**
     * Callback function called when data in the grid changes
     */
    onRowDataChanged(event: RowDataUpdatedEvent) {

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

    /**
     * Callback triggered on every user key input. It is useful to capture
     * the fact that onFilterChanged is about to be called after some
     * user input.
     * @param event
     */
     onFilterModified(event: FilterModifiedEvent) {
        if(!this._filterInput) {
            // Check that the model has actually changed, as the method can be called event it hasn't changed!
            const oldModel = event.filterInstance.getModel();
            const newModel = (event.filterInstance as any).getModelFromUi?.();
            this._filterInput = !Utils.equals(oldModel, newModel);
        }
    }

    /**
     * Notify the datasource that filter have changed
     * @param event
     */
    onFilterChanged(event: FilterChangedEvent) {
        // The _filterInput flag allows us to only respond to actual user input and ignore programmatic changes
        if(this._filterInput) {
            this._filterInput = false;
            (this.datasource as SqDatasource)?.filterChanged?.();
        }
    }

    /**
     * Notify the datasource that sort has changed
     * @param event
     */
    onSortChanged(event: SortChangedEvent) {
        (this.datasource as SqDatasource)?.sortChanged?.();
    }

    /**
     * Update selection when new rows are inserted in the table
     * @param event
     */
    onModelUpdated(event: ModelUpdatedEvent) {
        this.gridApi?.forEachNode(node => {
            if(node.data?.$selected && !node.isSelected()) {
                node.setSelected(true, undefined);
            }
        });
    }

}
