import {Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges} from "@angular/core";
import {Results, Aggregation, AggregationItem} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {AppService, Query} from "@sinequa/core/app-utils";
import {SelectionService} from '@sinequa/components/selection';
import {Subscription} from "rxjs";
import {ChartOptions, ChartDataPoint} from "../chart/chart";
import {FacetService, AbstractFacet} from "@sinequa/components/facet";
import {Action} from "@sinequa/components/action";

export interface FacetChartDataPoint extends ChartDataPoint {
    $item: AggregationItem;
}

@Component({
    selector: "sq-facet-ngx-chart",
    templateUrl: "./facet-chart.html",
    styles: [`
    :host {
        fill: var(--bs-dark);
    }
    :host-context(.dark) {
        fill: var(--bs-light);
    }
    `]
})
export class FacetNgxChart extends AbstractFacet implements OnInit, OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation: string;
    @Input() aggregations?: string[];
    @Input() chartType: string;
    @Input() colorScheme: string;
    @Input() colors: string[] = ["#7aa3e5"];    // Single color (default is bar chart)
    @Input() filteredColor: string = "#C3E6CB";
    @Input() selectedColor: string = "#7acce5";
    @Input() name?: string;

    // Aggregation from the Results object
    data: Aggregation | undefined;

    // sq-charts inputs
    dataPoints: FacetChartDataPoint[];
    options: ChartOptions;

    private readonly selectedValues = new Set<string>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly clearFilters: Action;
    private readonly selectField: Action;

    // Subscriptions
    private localeChange: Subscription;
    private selectionChange: Subscription;

    constructor(
        private facetService: FacetService,
        private intlService: IntlService,
        private selectionService: SelectionService,
        private appService: AppService
    ){
        super();

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                if(this.data) {
                    this.facetService.clearFiltersSearch(this.data.column, true, this.query, this.name);
                }
            }
        });

        this.selectField = new Action({
            title: "Select field",
            updater: (action) => {
                if(this.aggregations && this.data) {
                    action.text = this.appService.getPluralLabel(this.data.column);
                    action.children = this.aggregations
                        .map(a => this.facetService.getAggregation(a, this.results)!)
                        .filter(a => a && a?.name !== this.aggregation)
                        .map(agg => {
                            return new Action({
                                text: this.appService.getPluralLabel(agg?.column),
                                action : () => {
                                    this.aggregation = agg.name;
                                    this.ngOnChanges(<SimpleChanges> <any> {results: true});
                                }
                            });
                        });
                }
            }
        });

    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.data?.$filtered.length) {
            actions.push(this.clearFilters);
        }
        if(!!this.selectField.text) {
            actions.push(this.selectField);
        }
        return actions;
    }

    /**
     * Generates the sq-chart input data, including formatting
     */
    private makeData() {
        this.dataPoints = [];
        if(this.data?.items){
            for (const item of this.data.items) {
                this.dataPoints.push({
                    name: this.facetService.formatValue(item),
                    value: item.count,
                    $item: item
                });
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
                if(this.data){
                    const val = record[this.data.column];
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

    /**
     * Create the chart options
     */
    private createChartOptions(){
        this.options = {
            type: this.chartType,
            tickFormatter: this.tickFormatter,
            colorScheme: this.colorScheme
        };

        if (this.colors && this.colors.length > 0) {
            this.options.getItemColor = (value: string): string => {
                const index = this.dataPoints.findIndex(dataPoint => dataPoint.name === value);
                if (index === -1) {
                    return "black";
                }
                const item = this.getItem(this.dataPoints[index]);
                if (item) {
                    if (item.$filtered) {
                        return this.filteredColor;
                    }
                    if(this.selectedValues.has(Utils.toSqlValue(item.value).toLowerCase())){
                        return this.selectedColor;
                    }
                }
                return this.colors[index % this.colors.length]; // Rolling colors scheme
            };
        }
    }

    tickFormatter = (value: any): string => {
        if (Utils.isNumber(value)) {
            // No fractional counts
            if (value % 1 !== 0) {
                return "";
            }
            return this.intlService.formatNumber(value);
        }
        return value;
    }

    /**
     * Subscribe to language changes, in order to reformat the data points.
     * Subscribe to selection changes, in order to highlight selected documents.
     */
    ngOnInit() {
        this.localeChange = Utils.subscribe(this.intlService.events,
            (value) => {
                this.makeData();
            });
        this.selectionChange = this.selectionService.events.subscribe(event => {
            this.ngOnChanges(<SimpleChanges> <any> {results: true});
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes.results) {
            // may be null if no data
            this.data = this.facetService.getAggregation(this.aggregation, this.results);

            this.updateSelectedValues();

            this.createChartOptions();

            this.makeData();
        }
        this.selectField.update();
    }

    ngOnDestroy() {
        this.localeChange.unsubscribe();
        this.selectionChange.unsubscribe();
    }

    click(dataPoint: ChartDataPoint) {
        if (this.data) {
            const item = this.getItem(dataPoint);
            if (!!item) {
                if(!item.$filtered)
                    this.facetService.addFilterSearch(this.data, item, undefined, this.query, this.name);
                else
                    this.facetService.removeFilterSearch(this.data, item, this.query, this.name);
            }
        }
    }

    getItem(dataPoint: ChartDataPoint): AggregationItem | undefined {
        const _dataPoint = this.dataPoints.find(_dataPoint => _dataPoint.name === dataPoint.name && _dataPoint.value === dataPoint.value);
        if (!!_dataPoint && !!_dataPoint.$item) {
            return _dataPoint.$item;
        }
        return undefined;
    }

    /* AbstractFacet abstract methods */
    override isHidden(): boolean {
        // Always display if multivalued
        return !this.aggregations && (!this.data || !this.dataPoints);
    }

}
