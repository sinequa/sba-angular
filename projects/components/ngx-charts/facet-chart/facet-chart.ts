import {Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges} from "@angular/core";
import {Results, Aggregation, AggregationItem} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {AppService} from "@sinequa/core/app-utils";
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
    templateUrl: "./facet-chart.html"
})
export class FacetNgxChart extends AbstractFacet implements OnInit, OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() aggregations: string[];
    @Input() chartType: string;
    @Input() colorScheme: string;
    @Input() colors: string[] = ["#7aa3e5"];    // Single color (default is bar chart)
    @Input() filteredColor: string = "#C3E6CB";
    @Input() selectedColor: string = "#7acce5";

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
                this.facetService.clearFiltersSearch(this.getName(), true);
            }
        });

        this.selectField = new Action({
            title: "Select field",
            updater: (action) => {
                if(this.aggregations){
                    action.name = this.aggregation,
                    action.text = this.aggregation,
                    action.children = this.aggregations
                        .filter(v => v!==this.aggregation)
                        .map(a => {
                            return new Action({
                                name: a,
                                text: a,
                                action : (item, event) => {
                                    this.aggregation = a;
                                    this.ngOnChanges(<SimpleChanges> <any> {results: true});
                                }
                            });
                        });
                }
            }
        });

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
    get actions(): Action[] {
        const actions: Action[] = [];
        if(this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        if(!!this.selectField.name) {
            actions.push(this.selectField);
        }
        return actions;
    }

    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered(): boolean {
        return this.facetService.hasFiltered(this.getName());
    }

    /**
     * Generates the sq-chart input data, including formatting
     */
    private makeData() {
        this.dataPoints = [];
        if(this.data && this.data.items){
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
                    const val = record[this.appService.getColumnAlias(this.appService.getColumn(this.data.column))];
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
                    if (this.isFiltered(item)) {
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
        this.selectField.update();

        if (!!changes["results"]) {
            // may be null if no data
            this.data = this.facetService.getAggregation(this.aggregation, this.results);

            this.updateSelectedValues();

            this.createChartOptions();

            this.makeData();
        }
    }

    ngOnDestroy() {
        this.localeChange.unsubscribe();
        this.selectionChange.unsubscribe();
    }

    click(dataPoint: ChartDataPoint) {
        if (this.data) {
            const item = this.getItem(dataPoint);
            if (!!item) {
                if(!this.isFiltered(item))
                    this.facetService.addFilterSearch(this.getName(), this.data, item);
                else
                    this.facetService.removeFilterSearch(this.getName(), this.data, item);
            }
        }
    }

    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(item: AggregationItem) : boolean {
        return !!this.data && this.facetService.itemFiltered(this.getName(), this.data, item);
    }

    getItem(dataPoint: ChartDataPoint): AggregationItem | undefined {
        const _dataPoint = this.dataPoints.find(_dataPoint => _dataPoint.name === dataPoint.name && _dataPoint.value === dataPoint.value);
        if (!!_dataPoint && !!_dataPoint.$item) {
            return _dataPoint.$item;
        }
        return undefined;
    }

    /* AbstractFacet abstract methods */
    isHidden(): boolean {
        // Always display if multivalued
        return !this.aggregations && (!this.data || !this.dataPoints);
    }

}