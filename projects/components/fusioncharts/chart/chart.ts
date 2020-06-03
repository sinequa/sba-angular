import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { Results, Aggregation, AggregationItem } from '@sinequa/core/web-services';
import { UIService } from "@sinequa/components/utils";
import { FacetService, AbstractFacet } from "@sinequa/components/facet";
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import { Subscription } from 'rxjs';
import { SelectionService } from '@sinequa/components/selection';
import { AppService } from '@sinequa/core/app-utils';


export const defaultChart = {
    "theme": "fusion",
    "labelDisplay": "rotate",
    "slantLabel": "1"
}

@Component({
    selector: "sq-fusion-chart",
    templateUrl: "./chart.html",
    styleUrls: ["./chart.scss"]
})
export class FusionChart extends AbstractFacet implements OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() aggregations: string[];
    
    @Input() width: string = '100%';
    @Input() height: string = '350';
    @Input() type: string = 'Column2D';
    @Input() chart: any = defaultChart;

    /** Leave the default color undefined to use the color scheme of FusionCharts */
    @Input() defaultColor?: string;
    /** Filtered items appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() filteredColor: string = "#C3E6CB";
    /** Items that belong in a selected document appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() selectedColor: string = "#8186d4";
    
    chartObj: any;

    data?: Aggregation;
    dataSource: any = {};
    
    private readonly selectedValues = new Set<string>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly clearFilters: Action;
    private readonly selectField: Action;

    // Subscriptions
    private localeChange: Subscription;
    private selectionChange: Subscription;
    
    constructor(
        public intlService: IntlService,
        public uiService: UIService,
        public facetService: FacetService,
        public selectionService: SelectionService,
        public appService: AppService
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
                                    this.updateData();
                                }
                            });
                        });
                }
            }
        });

        this.localeChange = this.intlService.events.subscribe(event => {
            this.updateData();
        });
        this.selectionChange = this.selectionService.events.subscribe(event => {
            this.updateData();
        });
    }

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
    

    ngOnChanges(changes: SimpleChanges) {
        this.selectField.update();

        if(changes['results']) {
            this.updateData();
        }
        if(changes['chart'] || !this.dataSource.chart) {
            this.dataSource.chart = this.chart;
        }
    }

    updateData() {
        // Get aggregation from the facet service
        this.data = this.facetService.getAggregation(this.aggregation, this.results);

        // Update the set of selected values (for chart coloring)
        this.updateSelectedValues();

        // Create the dataSource.data object, including the custom coloring
        this.dataSource.data = this.data?.items?.map(item => {
            const isSelected = this.selectedValues.has(Utils.toSqlValue(item.value).toLowerCase()) && this.selectedColor;
            const isFiltered = this.isFiltered(item) && this.filteredColor;
            return {
                label: this.facetService.formatValue(item),
                value: ""+item.count,
                color: isFiltered? this.filteredColor : isSelected? this.selectedColor : this.defaultColor
            };
        });
    }

    isHidden(): boolean {
        return !this.dataSource.data || this.dataSource.data.length === 0;
    }
    
    /**
     * Event triggered on initialization of the fusion chart
     * @param $event 
     */
    initialized($event) {
        this.chartObj = $event.chart; // saving chart instance
    }

    /**
     * Event triggered when the user clicks on the plot, on a data element.
     * We create a filter for the clicked element.
     * @param $event 
     */
    dataplotClick($event) {
        if (this.data) {
            const item = this.getItem($event.dataObj.index);
            if (item) {
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
    
    /**
     * Get the aggregation item based on its index
     * @param index 
     */
    getItem(index: number): AggregationItem | undefined {
        return this.data && this.data.items? this.data.items[index] : undefined;
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
}