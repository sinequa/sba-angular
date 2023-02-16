import { Component, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter, NgZone, Optional, DoCheck } from "@angular/core";
import { IntlService } from "@sinequa/core/intl";
import { Results, Aggregation } from '@sinequa/core/web-services';
import { UIService } from "@sinequa/components/utils";
import { FacetService, AbstractFacet, BsFacetCard } from "@sinequa/components/facet";
import { Action } from '@sinequa/components/action';
import { Utils } from '@sinequa/core/base';
import { merge, Subscription } from 'rxjs';
import { SelectionService } from '@sinequa/components/selection';
import { AppService, FormatService, Query, ValueItem } from '@sinequa/core/app-utils';


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
// eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
export class FusionChart extends AbstractFacet implements OnChanges, OnDestroy, DoCheck {
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation: string;
    @Input() aggregations?: string[];
    /** Additional css classes */
    @Input() styles: string;

    @Input() width: string = '100%';
    @Input() height: string = '350';
    @Input() type: string = 'Column2D';
    /** List of possible views allowed to switch to */
    @Input() types?: {type: string, display: string}[];
    /** List of non-native fusionCharts views allowed to switch to, for example "grid"
     * This is needed to prevent ChartObj errors when selecting such types of view
     */
    @Input() externalTypes?: {type: string, display: string}[];
    @Input() chart: any = defaultChart;
    @Input() autohide = true;

    /** Leave the default color undefined to use the color scheme of FusionCharts */
    @Input() defaultColor?: string;
    /** Filtered items appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() filteredColor: string = "#C3E6CB";
    /** Items that belong in a selected document appear in a different color. Set to undefined use FusionCharts's color scheme */
    @Input() selectedColor: string = "#8186d4";

    /** Optional facet name for audit purposes */
    @Input() name = "chart";

    @Output() initialized = new EventEmitter<any>();
    @Output() aggregationChange = new EventEmitter<string>();
    @Output() typeChange = new EventEmitter<string>();

    // A flag to wait for the parent component to actually display this child, since creating
    // the fusionchart component without displaying causes strange bugs...
    ready = false;
    isExternalType: boolean;
    chartObj: any;

    data?: Aggregation;
    dataSource: any = {};

    private readonly selectedValues = new Set<string>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly clearFilters: Action;
    private readonly selectField: Action;
    private readonly selectType: Action;

    // Subscriptions
    subs: Subscription = new Subscription();

    constructor(
        public intlService: IntlService,
        public formatService: FormatService,
        public uiService: UIService,
        public facetService: FacetService,
        public selectionService: SelectionService,
        public appService: AppService,
        @Optional() public cardComponent: BsFacetCard,
        private zone: NgZone
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
                if(this.data) {
                    this.facetService.clearFiltersSearch(this.data.column, true, this.query, this.name);
                }
            }
        });

        this.selectField = new Action({
            title: "Select field",
            updater: (action) => {
                if(this.aggregations && this.data){
                    action.text = this.appService.getPluralLabel(this.data.column);
                    action.children = this.aggregations
                        .map(a => this.facetService.getAggregation(a, this.results)!)
                        .filter(a => a && a?.name !== this.aggregation)
                        .map(agg => new Action({
                                text: this.appService.getPluralLabel(agg.column),
                                action : () => {
                                    this.aggregation = agg.name;
                                    this.aggregationChange.next(agg.name);
                                    this.selectField.update();
                                    this.updateData();
                                }
                            }));
                }
            }
        });

        this.selectType = new Action({
            title: "Select field",
            updater: (action) => {
                if(this.types){
                    action.text = this.types.find(t => t.type === this.type)?.display!;
                    action.children = this.types
                        .filter(t => t.type !== this.type)
                        .map(t => new Action({
                                text: t.display,
                                action : (item, event) => {
                                    this.type = t.type;
                                    this.isExternalType = !!this.externalTypes?.find(t => t.type === this.type);
                                    if (!this.isExternalType) {
                                      this.chartObj.chartType(this.type);
                                    }
                                    this.typeChange.next(t.type);
                                    this.selectType.update();
                                }
                            }));
                }
            }
        });

        this.subs.add(merge(this.intlService.events, this.selectionService.events)
            .subscribe(_ => this.updateData())
        );
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.data?.$filtered.length) {
            actions.push(this.clearFilters);
        }
        if(this.aggregations && this.aggregations.length > 0) {
            actions.push(this.selectField);
        }
        if(this.types) {
            actions.push(this.selectType);
        }
        return actions;
    }


    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngOnChanges(changes: SimpleChanges) {
        if(changes.results || changes.defaultColor || changes.filteredColor || changes.selectedColor) {
            this.updateData();
        }
        if(changes.chart || !this.dataSource.chart) {
            this.dataSource = {...this.dataSource, chart: this.chart};
        }
        this.isExternalType = !!this.externalTypes?.find(t => t.type === this.type);
        this.selectField.update();
        this.selectType.update();
    }

    // eslint-disable-next-line @angular-eslint/no-conflicting-lifecycle
    ngDoCheck(){
        // We check that the parent component (if any) as been expanded at least once so that the fusioncharts
        // gets created when it is visible (otherwise, there can be visual bugs...)
        this.ready = !this.cardComponent?._collapsed;
    }

    updateData() {
        // Get aggregation from the facet service
        this.data = this.facetService.getAggregation(this.aggregation, this.results);

        // Update the set of selected values (for chart coloring)
        this.updateSelectedValues();

        // Create the dataSource.data object, including the custom coloring
        this.dataSource = {
          ...this.dataSource,
          data: this.data?.items?.map(item => {
            const isSelected = item.value !== null && this.selectedValues.has(Utils.toSqlValue(item.value).toLowerCase()) && this.selectedColor;
            const isFiltered = item.$filtered && this.filteredColor;
            return {
                label: item.value? this.formatService.formatFieldValue(item as ValueItem, item.$column) : 'null',
                value: ""+item.count,
                color: isFiltered? this.filteredColor : isSelected? this.selectedColor : this.defaultColor
            };
          })
        };
        this.cardComponent.updateActions();
    }

    override isHidden(): boolean {
        return this.autohide && !this.dataSource.data?.length;
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
        this.zone.run(() => { // FusionCharts runs outside Angular zone, so we must re-enter it
            if (this.data) {
                const item = this.data?.items?.[$event.dataObj.index];
                if (item) {
                    if(!item.$filtered)
                        this.facetService.addFilterSearch(this.data, item, undefined, this.query, this.name);
                    else
                        this.facetService.removeFilterSearch(this.data, item, this.query, this.name);
                }
            }
        });
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
