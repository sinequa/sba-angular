import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, Optional, DoCheck, NgZone } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { Results, Aggregation, AggregationItem, TreeAggregationNode } from '@sinequa/core/web-services';
import { UIService } from "@sinequa/components/utils";
import { FacetService, AbstractFacet, BsFacetCard } from "@sinequa/components/facet";
import { Action } from '@sinequa/components/action';
import { Subscription } from 'rxjs';
import { SelectionService } from '@sinequa/components/selection';
import { AppService } from '@sinequa/core/app-utils';
import { Utils } from "@sinequa/core/base";


export const defaultMultiLevelChart = {
    "theme": "fusion",
    "highlightParentPieSlices": true, // prevent child pie slices from getting highlighted, when you hover over the parent slices
    "highlightChildPieSlices": false, // automatically highlight parent slices when you hover over the child pie slices
    "showPlotBorder": true,
    "piefillalpha": "60",
    "pieborderthickness": "3"
}

export interface Category extends AggregationItem, TreeAggregationNode {
    label: string;
    originalLabel: string;
    value: number | string;
    tooltext?: string;
    color?: string;
    showLabel?: boolean;
    showValue?: boolean;
    category?: Category[];
}

export interface MultiLevelChartData {
    category: Category[] | undefined
}

@Component({
    selector: "sq-multi-level-pie-chart",
    templateUrl: "./multi-level-pie-chart.html",
    styleUrls: ["./multi-level-pie-chart.scss"]
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class MultiLevelPieChart extends AbstractFacet implements OnChanges, OnDestroy, DoCheck {
    @Input() results: Results;
    @Input() aggregation: string; // Aggregation name
    @Input() isTreeAgg: boolean = true;

    @Input() data: Category[];

    @Input() width: string = '100%';
    @Input() height: string = '350';
    @Input() showToolTip: boolean = true;
    @Input() plottooltext: string = "$label, $value, $percentValue"; // configure the tooltip text of plots
    @Input() showLabels: boolean = true; // Show/hide ALL CHART'S plots labels
    @Input() showValues: boolean = false; // Show/hide ALL CHART'S plots value next to labels
    @Input() showPercentValues: boolean = false; // if enabled along with "showValues", values of ALL CHART'S plots will be shown as percentages
    @Input() chart: any = defaultMultiLevelChart;
    @Input() autohide = true;

    /** Leave the default color undefined to use the color scheme of FusionCharts */
    @Input() defaultColor?: string;
    /** Filtered items appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() filteredColor: string = "#C3E6CB";
    /** Items that belong in a selected document appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() selectedColor: string = "#8186d4";

    /**
     * A function that returns true this component is already filtering the query
     */
    @Input()
    hasFiltered = () => {
        return this.facetService.hasFiltered(this.getName());
    }

    /**
     * A function that returns true the aggregationItem match a selected document
     */
    @Input()
    isSelected = <T extends AggregationItem | TreeAggregationNode>(item: T) => {
        if (this.aggrData?.isTree) {
            return this.selectedValues.has((item as TreeAggregationNode).$path!.toLowerCase()) && this.selectedColor;
        }
        return this.selectedValues.has(Utils.toSqlValue(item.value).toLowerCase()) && this.selectedColor;
    }

    /**
     * Callback used to apply custom operations (sort, filter ...) on a tree nodes
     */
    @Input() initNodes = (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => {}

    @Output() initialized = new EventEmitter<any>();
    @Output() onClick = new EventEmitter<Category | undefined>();

    // A flag to wait for the parent component to actually display this child, since creating
    // the fusionchart component without displaying causes strange bugs...
    ready = false;

    chartObj: any;
    aggrData?: Aggregation;
    dataSource: any = {};
    _data: Category[] | undefined;

    private clickedItem: Category | undefined;
    private readonly selectedValues = new Set<string>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly clearFilters: Action;

    // Subscriptions
    private localeChange: Subscription;
    private selectionChange: Subscription;

    public readonly type = "multilevelpie";

    constructor(
        public intlService: IntlService,
        public uiService: UIService,
        public facetService: FacetService,
        public selectionService: SelectionService,
        public appService: AppService,
        @Optional() public cardComponent: BsFacetCard,
        private zone: NgZone
    ) {
        super();

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.facetService.clearFiltersSearch(this.getName(), true);
            }
        });

        this.localeChange = this.intlService.events.subscribe(event => {
            this.updateData();
        });
        this.selectionChange = this.selectionService.events.subscribe(event => {
            this.updateData();
        });
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngOnDestroy() {
        this.localeChange.unsubscribe();
        this.selectionChange.unsubscribe();
    }


    /**
     * Name of the facet, used to create and retrieve selections
     * through the facet service.
     */
    getName() : string {
        return this.aggregation;
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        return actions;
    }

    override isHidden(): boolean {
        return this.autohide && !this.dataSource.category?.length;
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngOnChanges(changes: SimpleChanges) {

        if(changes.results || changes.defaultColor || changes.filteredColor || changes.selectedColor) {
            this.updateData();
        }
        if(changes.chart || !this.dataSource.chart || changes.showLabels
            || changes.showToolTip || changes.plottooltext || changes.showValues || changes.showPercentValues) {
                const chart = {
                    ...this.chart,
                    showToolTip: this.showToolTip,
                    plottooltext: this.plottooltext,
                    showLabels: this.showLabels,
                    showValues: this.showValues,
                    showPercentValues: this.showPercentValues
                }
                this.dataSource = {...this.dataSource, chart: chart};
        }
       // console.log("ngOnChanges")
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngDoCheck(){
        // We check that the parent component (if any) has been expanded at least once so that the fusioncharts
        // gets created when it is visible (otherwise, there can be visual bugs...)
        this.ready = !this.cardComponent?._collapsed;
       // console.log("ngDoCheck")
    }

    updateData() {
        // Retrieve aggregation data
        this.getAggregationData();

        // Update the set of selected values (for chart coloring)
        this.updateSelectedValues();

        this._data = this.data || this.aggrData?.items?.map(item => this.convertAggregationItems(item));

        this.dataSource = {
            ...this.dataSource,
            category: this._data
        };
    }

    private getAggregationData(): void {
        if (this.aggregation) {
            // Get aggregation from the facet service
            this.aggrData = this.facetService.getAggregation(
                this.aggregation,
                this.results,
                !!this.isTree() ? {facetName: this.getName(), levelCallback: this.initNodes} : undefined
            );
        }
    }

    private convertAggregationItems<T extends AggregationItem | TreeAggregationNode>(item: T): Category {
        const isFiltered = this.isFiltered(item) && this.filteredColor;
        const isSelected = this.isSelected(item);
        if (item.hasOwnProperty('items')) {
            return {
                ...item,
                label: this.facetService.formatValue(item),
                originalLabel: item.value,
                value: item.count,
                color: isFiltered ? this.filteredColor : isSelected ? this.selectedColor : this.defaultColor,
                category: item['items'].map(el => this.convertAggregationItems(el))
            } as Category
        }
        return {
            ...item,
            label: this.facetService.formatValue(item),
            originalLabel: item.value,
            value: item.count,
            color: isFiltered ? this.filteredColor : isSelected ? this.selectedColor : this.defaultColor
        } as Category
    }

    /**
     * Event triggered on initialization of the fusion chart
     * @param $event
     */
    onInitialized($event) {
        console.log("initialization of the fusion chart")
        this.chartObj = $event.chart; // saving chart instance
        this.initialized.next(this.chartObj);
    }

    /**
     * Event triggered when the user clicks on the plot, on a data element.
     * We create a filter for the clicked element.
     * @param $event
     */
    dataplotClick($event) {
       // $event.eventObj.stopImmediatePropagation();

        this.zone.run(() => { // FusionCharts runs outside Angular zone, so we must re-enter it
            console.log("plot click")
            this.clickedItem = undefined;
            this.getItem($event.dataObj.label, this._data);

            if (this.aggrData) { // For standard Aggregation data structure
                const obj = {...this.clickedItem!, value: this.clickedItem!.originalLabel} // Re-convert clickedItem structure to fit standard AggregationItem
                if (!this.isFiltered(obj)) {
                    this.facetService.addFilterSearch(this.getName(), this.aggrData, obj);
                } else {
                    this.facetService.removeFilterSearch(this.getName(), this.aggrData, obj);
                }
            } else { // For custom data structure, just emit the clicked item, behavior should be implemented at parent component level
                this.onClick.next(this.clickedItem)
            }
        });
    }

    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    private isFiltered(item: AggregationItem) : boolean {
        return !!this.aggrData && this.facetService.itemFiltered(this.getName(), this.aggrData, item);
    }

    private isTree(): boolean {
        return !!this.isTreeAgg;
    }

    /**
     * Get the aggregation item based on its label
     * @param label
     */
    private getItem(label: string, data: Category[] | undefined, root = '/'): void {
        let path = root;
        if (data) {
            for (const _element of data) {
                path = path + _element.originalLabel + '/';
                if (_element.label === label && (this.isTree() ? _element.$path === path : true)) {
                    this.clickedItem = _element;
                    break;
                } else if (_element.category) {
                    for (const _elem of _element.category) {
                        this.getItem(label, [_elem], path);
                        if (this.clickedItem) {
                            break;
                        }
                    }
                }
                if (this.clickedItem) {
                    break;
                }
                const parentIndex = path.lastIndexOf('/', path.lastIndexOf('/') - 1);
                path = path.substring(0, parentIndex + 1);
            }
        }
    }


    /**
     * Update selected values (the value in the aggregation that belong to a selected document)
     */
    private updateSelectedValues(){
        this.selectedValues.clear();
        this.results.records
            .filter(record => record.$selected)
            .forEach(record => {
                if(this.aggrData){
                    const val = record[this.appService.getColumnAlias(this.appService.getColumn(this.aggrData.column))];
                    if(val){
                        if(Utils.isString(val)){    // Sourcestr
                            this.selectedValues.add(val.toLowerCase());
                        }
                        if(Utils.isArray(val)){
                            val.forEach(v => {
                                if(Utils.isString(v))
                                    this.selectedValues.add(v.toLowerCase()); // Sourcecsv
                                else
                                    this.selectedValues.add(v.value.toLowerCase()); // Entity
                            });
                        }
                    }
                }
            });
    }
}
