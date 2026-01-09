import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { parseISO } from "date-fns";
import { Subscription } from "rxjs";

import { Action } from "@sinequa/components/action";
import { AdvancedService, BsDateRangePicker } from "@sinequa/components/advanced";
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
    Results,
} from "@sinequa/core/web-services";
import { BsFacetTimelineComponent } from "./facet-timeline.component";
import { TimelineSeries } from "./timeline.model";

export type MaskProps = {
    value?: string,
    units?: { text: string, value?: string }[],
    visible?: boolean
}

export interface FacetDateParams {
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
    mask?: MaskProps;
}

export interface FacetDateConfig extends FacetConfig<FacetDateParams> {
    type: 'date';
}

@Component({
    selector: "sq-facet-date",
    templateUrl: "./facet-date.html",
    styleUrls: ["./facet-date.scss"],
    standalone: false
})
export class BsFacetDate extends AbstractFacet implements FacetDateParams, OnInit, OnChanges, OnDestroy {
    @ViewChild(BsDateRangePicker) dateRangePicker?: BsDateRangePicker;

    maskDefaults: MaskProps = {
        value: undefined,
        units: [
            { text: 'msg#facet.date.mask.none' },
            { text: 'msg#facet.date.mask.yearMonth', value: 'YYYY-MM' },
            { text: 'msg#facet.date.mask.year', value: 'YYYY' }
        ],
        visible: true
    };

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
    @Input() mask: MaskProps = this.maskDefaults;


    clearFiltersAction: Action;
    items: AggregationItem[] = [];

    form: UntypedFormGroup;
    dateRangeControl?: UntypedFormControl;

    timeSeries: TimelineSeries[] = [];
    selection: (Date | undefined)[] | undefined;

    protected subscriptions: Subscription[] = [];
    protected data: Aggregation | undefined;

    // Unique ID for the date facet
    id = Utils.sha512(new Date().getTime().toString()).substring(0, 8);

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
            icon: "sq-filter-clear",
            title: "msg#facet.clearSelects",
            action: () => {
                if(this.data) {
                    this.facetService.clearFiltersSearch(this.data.column, true, this.query);
                }
            },
        });

    }

    init() {
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
    }

    ngOnInit() {
        // Listen to global query changes (only if this.query is not defined)
        this.subscriptions.push(
            this.searchService.queryStream.subscribe(() => {
                if(!this.query) {
                    this.onQueryChange(this.searchService.query);
                }
            })
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.results) {
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            this.updateItems(); // Update the list of standard date intervals ("since last year", etc.)
        }

        if (this.allowCustomRange) {
            if (!this.dateRangeControl) {
                this.init(); // Set up the date picker control
            }
            this.updateTimeSeries(this.timelineAggregation); // Update the timeseries data for the timeline component
        }

        if (changes.query && this.query) {
            this.onQueryChange(this.query); // When the query changes, update the date-picker and timeline selection
        }

        if(changes.mask && this.mask){
            // override the mask value with the new one
            this.mask = { ...this.maskDefaults, ...this.mask };
        }
    }

    ngOnDestroy() {
        this.subscriptions.map((item) => item.unsubscribe());
    }

    override get actions(): Action[] {
        const actions: Action[] = [];
        if (this.data && this.facetService.hasFiltered(this.data.column, this.query)) {
            actions.push(this.clearFiltersAction);
        }
        return actions;
    }

    onQueryChange(query: Query) {
        const range = this.getRangeValue(query);
        this.dateRangeControl?.setValue(range, { emitEvent: false });
        this.selection = !range[0] && !range[1] ? undefined : range;

        // Update the mask value
        if(query.aggregation_overrides) {
            this.mask.value = query.aggregation_overrides[this.name]?.mask;
        }
    }

    filterItem(item: AggregationItem, event: Event) {
        if(this.data) {
            if (!item.$filtered) {
                this.facetService.addFilterSearch(this.data, item, {replaceCurrent: this.replaceCurrent}, this.query, this.name);
            } else {
                this.facetService.removeFilterSearch(this.data, item, this.query, this.name);
            }
        }
        event.preventDefault();
    }

    private updateItems() {
        this.items = this.displayEmptyDistributionIntervals
            ? this.data?.items || []
            : this.data?.items?.filter((item) => item.count > 0) || [];
    }

    private updateTimeSeries(aggregationName: string) {
        this.timeSeries = [];
        const ccaggregation = this.appService.getCCAggregation(aggregationName);
        const aggregation = this.facetService.getAggregation(aggregationName, this.results);
        if (aggregation && ccaggregation)
            this.timeSeries.push(
                BsFacetTimelineComponent.createTimeseries(
                    { aggregation: aggregationName, primary: true },
                    aggregation,
                    ccaggregation
                )
            );
    }


    private setCustomDateSelect(range: (undefined | Date)[] | undefined) {
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

            // retrieve the fromOperator from the date range picker component
            const fromOperator = this.dateRangePicker?.fromOperator;

            // update search query with current selection
            const newFilter = this.facetService.makeRangeFilter(this.field, from, to, fromOperator);
            if (newFilter) {
                // get the aggregation overrides
                const query = this.query || this.searchService.query;
                if (!this.mask.value) {
                    query.aggregation_overrides = undefined;
                }
                else {
                    query.aggregation_overrides = {
                        [this.name]: {
                            mask: this.mask.value
                        }
                    }
                }
                this.query = query;
                this.facetService.applyFilterSearch(newFilter, this.query, true, this.name);
            }
        }
    }

    public applyCustomRange() {
        if (this.dateRangeControl?.valid) {
            this.setCustomDateSelect(this.dateRangeControl.value);
        }
    }

    private getRangeValue(query: Query): [Date|undefined, Date|undefined] {
        let from: Date|undefined;
        let to: Date|undefined;
        const filters = query.findFieldFilters(this.field);
        for(const filter of filters) {
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

    public setMask(value: string | undefined) {
        // option return 'undefined' as string, so we need to convert it to undefined
        if(value === 'undefined') value = undefined;
        this.mask.value = value;
    }
}
