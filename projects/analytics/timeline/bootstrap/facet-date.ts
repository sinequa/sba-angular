import {
    Component,
    OnDestroy,
    Input,
    OnChanges,
    SimpleChanges,
    ChangeDetectorRef
} from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { Action } from "@sinequa/components/action";
import { AdvancedService } from "@sinequa/components/advanced";
import { AbstractFacet, FacetConfig, FacetService } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import {
    AppService,
    Query
} from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import {
    Aggregation,
    AggregationItem,
    Filter,
    Results,
} from "@sinequa/core/web-services";
import { parseISO } from "date-fns";
import { Subscription, debounceTime, filter, map } from "rxjs";
import { BsFacetTimelineComponent } from "./facet-timeline.component";
import { TimelineSeries } from "./timeline.component";

export interface FacetDateParams {
    aggregation: string;
    showCount?: boolean;
    timelineAggregation?: string;
    displayEmptyDistributionIntervals?: boolean;
    allowPredefinedRange?: boolean;
    allowCustomRange?: boolean;
    showCustomRange?: boolean;
    replaceCurrent?: boolean;
    timelineWidth?: number;
    timelineHeight?: number;
    timelineMargin?: {top: number, bottom: number, left: number, right: number};
}

export interface FacetDateConfig extends FacetConfig<FacetDateParams> {
    type: 'date';
}

@Component({
    selector: "sq-facet-date",
    templateUrl: "./facet-date.html",
    styleUrls: ["./facet-date.scss"],
})
export class BsFacetDate
    extends AbstractFacet
    implements FacetDateParams, OnChanges, OnDestroy
{
    @Input() name: string = "Date";
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation: string = "Modified";
    @Input() timelineAggregation: string = "Timeline";
    @Input("field") _field?: string;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() displayEmptyDistributionIntervals: boolean = true; // Display items with count === 0
    @Input() allowPredefinedRange = true; // will allow or not the use of datepickers and timeline for custom range selection
    @Input() allowCustomRange = true; // will allow or not the use of datepickers and timeline for custom range selection
    @Input() showCustomRange = false; // will show/hide datepickers and timeline, once allowed
    @Input() replaceCurrent = true; // if true, the previous "select" is removed first
    @Input() timelineWidth = 250;
    @Input() timelineHeight = 150;
    @Input() timelineMargin = {top: 15, bottom: 20, left: 30, right: 15};

    clearFiltersAction: Action;
    items: AggregationItem[] = [];

    form: UntypedFormGroup;
    dateRangeControl: UntypedFormControl;

    timeSeries: TimelineSeries[] = [];
    selection: (Date | undefined)[] | undefined;

    protected subscriptions: Subscription[] = [];
    protected data: Aggregation | undefined;

    get field(): string {return this._field || this.data?.column || ''}

    constructor(
        protected facetService: FacetService,
        protected formBuilder: UntypedFormBuilder,
        protected searchService: SearchService,
        protected advancedService: AdvancedService,
        protected appService: AppService,
        public cdRef: ChangeDetectorRef
    ) {
        super();

        this.clearFiltersAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.filters.clear",
            action: () => {
                this.facetService.clearFiltersSearch(this.name, true, this.query);
            },
        });
    }

    init() {
        if (this.allowCustomRange) {
            this.dateRangeControl = new UntypedFormControl(
                [undefined, undefined],
                [
                    this.advancedService.validators.range(this.field),
                    this.advancedService.validators.date(this.field),
                ]
            );

            this.form = this.formBuilder.group({
                dateRange: this.dateRangeControl,
            });

            // Listen to query changes
            this.subscriptions.push(
                this.searchService.queryStream.subscribe(() => {
                    if(!this.query) {
                        this.onQueryChange(this.searchService.query);
                    }
                })
            );

            // Listen to form changes
            this.subscriptions.push(
                this.dateRangeControl.valueChanges
                    .pipe(
                        debounceTime(500),
                        filter(() => this.form.valid)
                    )
                    .subscribe((value: (undefined | Date)[]) => {
                        this.setCustomDateSelect(value);
                    })
            );
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.allowCustomRange) {
            this.updateTimeSeries(this.timelineAggregation);
        }

        if (changes.results) {
            this.data = this.getAggregation(this.aggregation);
            this.updateItems();
        }

        if (!this.dateRangeControl) {
            this.init();
        }

        if (changes.query && this.query) {
            this.onQueryChange(this.query);
        }
    }

    ngOnDestroy() {
        this.subscriptions.map((item) => item.unsubscribe());
    }

    override get actions(): Action[] {
        const actions: Action[] = [];
        if (this.facetService.hasFiltered(this.name, this.query) && actions.length === 0) {
            actions.push(this.clearFiltersAction);
        }
        return actions;
    }

    onQueryChange(query: Query) {
        const range = this.getRangeValue(query);
        this.dateRangeControl.setValue(range, { emitEvent: false });
        this.selection = !range[0] && !range[1] ? undefined : range;
    }

    filterItem(item: AggregationItem, event) {
        if (!this.isFiltered(item)) {
            this.facetService.addFilterSearch(this.name, this.data!, item, {
                replaceCurrent: this.replaceCurrent,
            }, this.query);
        } else {
            this.facetService.removeFilterSearch(this.name, this.data!, item, this.query);
        }
        event.preventDefault();
    }

    toggleCustomRange(event) {
        this.showCustomRange = !this.showCustomRange;
        event.stopPropagation();
    }

    private updateItems() {
        this.items = this.displayEmptyDistributionIntervals
            ? this.data?.items || []
            : this.data?.items?.filter((item) => item.count > 0) || [];
    }

    private updateTimeSeries(aggregationName: string) {
        this.timeSeries = [];
        const ccaggregation = this.appService.getCCAggregation(aggregationName);
        const aggregation = this.getAggregation(aggregationName);
        if (aggregation && ccaggregation)
            this.timeSeries.push(
                BsFacetTimelineComponent.createTimeseries(
                    { aggregation: aggregationName, primary: true },
                    aggregation,
                    ccaggregation
                )
            );
    }

    private getAggregation(aggregationName: string): Aggregation | undefined {
        let aggregation = this.facetService.getAggregation(
            aggregationName,
            this.results
        );

        if (!aggregation) {
            const query = Utils.copy(this.searchService.query);
            query.action = "aggregate";
            query.aggregations = [aggregationName];

            this.searchService
                .getResults(query, undefined, { searchInactive: true })
                .pipe(
                    map((results) => {
                        aggregation = results.aggregations[0];
                    })
                );
        }

        return aggregation;
    }

    private setCustomDateSelect(range: (undefined | Date)[] | undefined) {
        let filter: Filter | undefined;
        if (range) {
            const from = range[0];
            const to = range[1];

            // ommit time part of the Date in order to remove display dates with hh:mm:ss in the breadcrumb
            from?.setHours(0);
            from?.setMinutes(0);
            from?.setSeconds(0);
            from?.setMilliseconds(0);

            to?.setHours(0);
            to?.setMinutes(0);
            to?.setSeconds(0);
            to?.setMilliseconds(0);

            // update search query with current selection
            if (from && to) {
                filter = {field: this.field, operator: "between", start: from, end: to, facetName: this.name};
            } else if (from) {
                filter = {field: this.field, operator: "gte", value: from, facetName: this.name};
            } else if (to) {
                filter = {field: this.field, operator: "lte", value: to, facetName: this.name};
            }
        }

        if(filter) {
            this.facetService.applyFilterSearch(filter, this.query, true);
        }
    }

    private getRangeValue(query: Query): any {
        let from: Date|undefined;
        let to: Date|undefined;
        const filters = query.findAllFilters(f => f.facetName === this.name);
        for(let filter of filters) {
          switch(filter.operator) {
            case 'between':
              from = Utils.isDate(filter.start)? filter.start : Utils.isString(filter.start)? parseISO(filter.start) : undefined;
              to = Utils.isDate(filter.end)? filter.end : Utils.isString(filter.end)? parseISO(filter.end) : undefined;
              break;
            case 'gte': case 'gt':
              from = Utils.isDate(filter.value)? filter.value : Utils.isString(filter.value)? parseISO(filter.value) : undefined;
              break;
            case 'lte': case 'lt':
              to = Utils.isDate(filter.value)? filter.value : Utils.isString(filter.value)? parseISO(filter.value) : undefined;
              break;
          }
        }
        return [from, to];
    }

    public updateRange(range: Date[]) {
        if (!!range) {
            this.setCustomDateSelect(range);
        }
    }

    public isFiltered(item: AggregationItem): boolean {
        const filtered = this.facetService.getAggregationItemsFiltered(
            this.name, false, this.query
        );
        return (
            this.facetService.filteredIndex(this.data, filtered, item) !== -1
        );
    }
}
