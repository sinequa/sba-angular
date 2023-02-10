import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, Optional, NgZone, ElementRef } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { Results, Aggregation, AggregationItem, TreeAggregationNode } from '@sinequa/core/web-services';
import { UIService } from "@sinequa/components/utils";
import { FacetService, AbstractFacet, BsFacetCard } from "@sinequa/components/facet";
import { Action } from '@sinequa/components/action';
import { Subscription, merge } from 'rxjs';
import { SelectionService } from '@sinequa/components/selection';
import { AppService, FormatService, Query, ValueItem } from '@sinequa/core/app-utils';
import { Utils } from "@sinequa/core/base";

export const defaultMultiLevelChart = {
    "theme": "fusion",
    "highlightParentPieSlices": true, // automatically highlight parent slices when you hover over the child pie slices
    "highlightChildPieSlices": false, // prevent child pie slices from getting highlighted, when you hover over the parent slices
    "showPlotBorder": true,
    "piefillalpha": 60,
    "pieborderthickness": 3
}

export interface Category extends AggregationItem {
    label: string;
    originalLabel: string;
    value: number | string;
    tooltext?: string;
    color?: string;
    showLabel?: boolean;
    showValue?: boolean;
    category?: Category[];
    $path?: string;
}

@Component({
    selector: "sq-multi-level-pie-chart",
    templateUrl: "./multi-level-pie-chart.html",
    styleUrls: ["./multi-level-pie-chart.scss"]
})
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class MultiLevelPieChart extends AbstractFacet implements OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() aggregation: string; // Aggregation name
    @Input() query?: Query;

    @Input() data: Category[];

    @Input() width: string = '100%';
    @Input() height: string = '350';
    @Input() showToolTip: boolean = true;
    @Input() plottooltext: string = "$label, $value, $percentValue"; // configure the tooltip text of plots
    @Input() showLabels: boolean = false; // Show/hide ALL CHART'S plots labels
    @Input() showValues: boolean = false; // Show/hide ALL CHART'S plots value next to labels
    @Input() showPercentValues: boolean = false; // if enabled along with "showValues", values of ALL CHART'S plots will be shown as percentages
    @Input() chart: any = defaultMultiLevelChart;
    @Input() autohide = true;

    /** Additional css classes */
    @Input() styles: string;

    /** Leave the default color undefined to use the color scheme of FusionCharts */
    @Input() defaultColor?: string;
    /** Filtered items appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() filteredColor: string = "#C3E6CB";
    /** Items that belong in a selected document appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() selectedColor: string = "#8186d4";
    /** Optional name for audit purposes */
    @Input() name?: string;

    /**
     * A function that returns true the aggregationItem match a selected document
     */
    @Input()
    isSelected = <T extends AggregationItem | TreeAggregationNode>(item: T) => {
        if (this.isTree()) {
            return this.selectedValues.has((item as TreeAggregationNode).$path!.toLowerCase()) && this.selectedColor;
        }
        return item.value !== null && this.selectedValues.has(Utils.toSqlValue(item.value).toLowerCase()) && this.selectedColor;
    }
    /**
     * Callback used to apply custom operations (sort, filter ...) on a tree nodes
     */
    @Input() initNodes?: (lineage: TreeAggregationNode[], node: TreeAggregationNode, depth: number) => boolean;

    @Output() initialized = new EventEmitter<any>();
    @Output() onClick = new EventEmitter<Category | undefined>();

    // A flag to wait for the parent component to actually display this child, since creating
    // the fusionchart component without displaying causes strange bugs...
    ready = false;

    // A flag to remove the fusionChart component from the DOM when refreshing the data after a plot click, since it causes
    // strange multiple execution of the click action
    isRefreshing = true;

    chartObj: any;
    aggrData?: Aggregation;
    dataSource: any = {};
    _data: Category[] | undefined;
    public readonly type = "multilevelpie";

    private readonly selectedValues = new Set<string>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly clearFilters: Action;

    // Subscriptions
    private subs = new Subscription();


    constructor(
        public intlService: IntlService,
        public uiService: UIService,
        public facetService: FacetService,
        public selectionService: SelectionService,
        public appService: AppService,
        public formatService: FormatService,
        @Optional() public cardComponent: BsFacetCard,
        private zone: NgZone,
        private el: ElementRef
    ) {
        super();

        this.subs.add(this.cardComponent?.facetCollapsed.subscribe(value => {
            this.ready = value === "expanded" ? true : false
        }));

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "sq-filter-clear",
            title: "msg#facet.clearSelects",
            action: () => {
                if(this.aggrData) {
                    this.facetService.clearFiltersSearch(this.aggrData.column, true, this.query, this.name);
                }
            }
        });

        this.subs.add(merge(this.intlService.events, this.selectionService.events)
            .subscribe(_ => this.updateData())
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.aggrData?.$filtered.length) {
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
        if(changes.chart || !this.dataSource.chart || changes.showToolTip || changes.plottooltext
            || changes.showValues || changes.showPercentValues) {
                this.chart = {
                    ...this.chart,
                    showToolTip: this.showToolTip,
                    plottooltext: this.plottooltext,
                    showValues: this.showValues,
                    showPercentValues: this.showPercentValues
                }
                this.dataSource = {...this.dataSource, chart: this.chart};
        }
        this.updatePlotsValueDisplay();
        this.isRefreshing = false
    }

    /**
     * Update the chart dataSource
     */
    updateData() {
        // Retrieve aggregation data
        this.getAggregationData();

        // Update the set of selected values (for chart coloring)
        this.updateSelectedValues();

        this._data = this.data || this.aggrData?.items?.map(item => this.convertAggregationItems(item)) || [];

        this.dataSource = {
            ...this.dataSource,
            category: this._data
        };
    }

    /**
     * Hack to show/hide plots labels since it couldn't be done with native fusionChart attributes without breaking
     * the component behavior (on click, will not be able to identify the clicked plot because the key === label will be empty)
     */
    updatePlotsValueDisplay() {
        this.el.nativeElement.style.setProperty('--display', this.showLabels ? '' : 'none')
    }

    private getAggregationData(): void {
        if (this.aggregation) {
            // Get aggregation from the facet service
            this.aggrData = this.facetService.getAggregation(
                this.aggregation,
                this.results
            );
            if(this.aggrData?.isTree && this.initNodes) {
                Utils.traverse(this.aggrData.items as TreeAggregationNode[], this.initNodes);
            }
        }
    }

    private convertAggregationItems<T extends AggregationItem | TreeAggregationNode>(item: T): Category {
        const isFiltered = item.$filtered && this.filteredColor;
        const isSelected = this.isSelected(item);
        const label = item.value !== null? this.formatService.formatFieldValue(item as ValueItem) : 'null';
        if ((item as TreeAggregationNode).items) {
            return {
                ...item,
                label,
                originalLabel: item.value,
                value: item.count,
                color: isFiltered ? this.filteredColor : isSelected ? this.selectedColor : this.defaultColor,
                category: (item as TreeAggregationNode).items.map(el => this.convertAggregationItems(el))
            } as Category
        }
        return {
            ...item,
            label,
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
        this.chartObj = $event.chart; // saving chart instance
        this.initialized.next(this.chartObj);
    }

    /**
     * Event triggered when the user clicks on the plot, on a data element.
     * We create a filter for the clicked element.
     * @param $event
     */
    dataplotClick($event) {
        this.isRefreshing = true;
        const label = this.showValues ? $event.dataObj.label.substring(0, $event.dataObj.label.lastIndexOf(',')) : $event.dataObj.label;
        const item = this.getItem(label, this._data);
        this.zone.run(() => { // FusionCharts runs outside Angular zone, so we must re-enter it
            if (this.aggrData) { // For standard Aggregation data structure
                const obj = {...item!, value: item!.originalLabel} // Re-convert clickedItem structure to fit standard AggregationItem
                if (!item?.$filtered) {
                    this.facetService.addFilterSearch(this.aggrData, obj, undefined, this.query, this.name);
                } else {
                    this.facetService.removeFilterSearch(this.aggrData, obj, this.query, this.name);
                }
            } else { // For custom data structure, just emit the clicked item, behavior should be implemented at parent component level
                this.onClick.next(item);
            }
        });
    }


    private isTree(): boolean {
        return !!this.aggrData?.isTree;
    }

    /**
     * Get the aggregation item based on its label
     * @param label
     */
    getItem(label: string, data: Category[] | undefined): Category | undefined {
        let item;
        const isTree = this.isTree();

        function _getItem(_label: string, _data: Category[] | undefined, root = '/') {
            let path = root;
            if (_data) {
                for (const _element of _data) {
                    path = path + _element.originalLabel + '/';
                    if (_element.label === _label && (isTree ? _element.$path === path : true)) {
                        item = _element;
                        break;
                    } else if (_element.category) {
                        for (const _elem of _element.category) {
                            _getItem(_label, [_elem], path);
                            if (item) {
                                break;
                            }
                        }
                    }
                    if (item) {
                        break;
                    }
                    const parentIndex = path.lastIndexOf('/', path.lastIndexOf('/') - 1);
                    path = path.substring(0, parentIndex + 1);
                }
            }
        }

        _getItem(label, data);
        return item;
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
                    const val = record[this.aggrData.column];
                    if(val){
                        if(Utils.isString(val)){    // Sourcestr
                            this.selectedValues.add(val.toLowerCase());
                        }
                        if(Array.isArray(val)){
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
