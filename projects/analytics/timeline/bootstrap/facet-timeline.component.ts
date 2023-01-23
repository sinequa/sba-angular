import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, of, combineLatest, ReplaySubject, map } from 'rxjs';
import { Results, AggregationItem, Aggregation, CCAggregation, Record, AuditWebService, BetweenFilter, Filter } from '@sinequa/core/web-services';
import { AppService, Query } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { Action } from '@sinequa/components/action';
import { TimelineSeries, TimelineDate, TimelineEvent } from './timeline.component';
import { TimelineEventType } from './timeline-legend.component';
import { timeFormat } from 'd3-time-format';
import { timeMonth, timeDay, timeHour, timeWeek, timeYear } from 'd3-time';
import { isValid, parseISO, toDate } from 'date-fns';

export interface TimelineAggregation {
    name?: string;
    aggregation: string;
    primary: boolean;
    areaStyles?: {[key: string]: any};
    lineStyles?: {[key: string]: any};
    showDatapoints?: boolean;
}

export interface TimelineCombinedAggregations {
    aggregations: TimelineAggregation[];
    maxNMonths: number[]; // Maximum number of months for which to use this aggregation
    default: TimelineAggregation; // Aggregation to use by default
    current?: TimelineAggregation; // (this field is overriden by the component when switching aggregation)
}

export interface TimelineRecords {
    field: string;
    size?: number | ((record: Record, selected: boolean) => number);
    styles?: {[key: string]: any} | ((record: Record, selected: boolean) => {[key: string]: any});
    display?: (record: Record) => string;
}

export interface TimelineEventAggregation {
    aggregation: string;
    getDate: ((item: AggregationItem) => Date);
    getDisplay: ((item: AggregationItem) => string);
    size?: number | ((item: AggregationItem) => number);
    styles?: {[key: string]: any} | ((item: AggregationItem) => {[key: string]: any});
}

export function isSeries(data: TimelineData): data is TimelineSeries {
    return !!(data as TimelineSeries).dates;
}

export function isAggregation(data: TimelineData): data is TimelineAggregation {
  return !!(data as TimelineAggregation).aggregation;
}

export function isCombinedAggregations(data: TimelineData): data is TimelineCombinedAggregations {
  return !!(data as TimelineCombinedAggregations).aggregations;
}

export type TimelineData = TimelineSeries | TimelineAggregation | TimelineCombinedAggregations;

export type TimelineEventData = TimelineEvent[] | TimelineRecords | TimelineEventAggregation;

@Component({
    selector: 'sq-facet-timeline',
    templateUrl: './facet-timeline.component.html',
    styleUrls: ['./facet-timeline.component.scss']
})
export class BsFacetTimelineComponent extends AbstractFacet implements OnChanges {
    @Input() name = 'Timeline';
    @Input() results: Results;
    @Input() query?: Query;

    // By default, we show the standard Timeline aggregation and the list of current records
    @Input() timeseries: TimelineData[] = [{aggregation: 'Timeline', primary: true}];
    @Input() events: TimelineEventData[] = [{field: 'modified'}];

    // Initial scale (prior to any zoom)
    @Input() minDate?: Date;
    @Input() maxDate?: Date;
    // Date range to filter aggregations (ignored when combined aggregations are recomputed based on zoomed range)
    @Input() minAggregationDate?: Date;
    @Input() maxAggregationDate?: Date;

    @Input() zoomable = true;
    @Input() minZoomDays = 1; // Max 1 day scale
    @Input() maxZoomDays = 365 * 100; // Max 100 years scale

    @Input() width = 600;
    @Input() height = 200;
    @Input() margin = {top: 15, bottom: 20, left: 40, right: 15};

    @Input() curveType = "curveMonotoneX";

    @Input() showTooltip = true;
    @Input() theme: "light" | "dark" = "light";

    @Input() showLegend = false;
    @Input() legendStyles?: {[key:string]: any} = {'justify-content' : 'center'};
    @Input() legendEvents?: TimelineEventType[];
    @Input() legendOrientation?: "row"|"column" = "row";
    @Input() legendYOffset?: number = 3;

    @Output() eventClicked = new EventEmitter<TimelineEvent>();

    // List of observables (one per timeseries / event type)
    timeseries$: ReplaySubject<TimelineSeries>[];
    events$: ReplaySubject<TimelineEvent[]>[];

    // Combination (combineLastest) of the timeline observables
    mergedTimeseries$: Observable<TimelineSeries[]>;
    mergedEvents$: Observable<TimelineEvent[]>;

    // Current timeline selection
    selection?: [Date, Date];

    // Current range (undefined if no zoom / auto-scaling)
    currentRange?: [Date, Date];

    // Formating method for search queries
    formatDayRequest = timeFormat("%Y-%m-%d");

    // Actions
    clearFilters: Action;
    hasFiltered = false;

    constructor(
        public facetService: FacetService,
        public searchService: SearchService,
        public appService: AppService,
        public selectionService: SelectionService,
        public cdRef: ChangeDetectorRef,
        public audit: AuditWebService
    ){
        super();

        // Update the events when the selection of records changes
        this.selectionService.events.subscribe(event => {
            const i = this.events.findIndex(e => (e as TimelineRecords).field);
            if(i !== -1) {
                this.events$[i].next(this.getRecordsAsEvents(this.events[i] as TimelineRecords));
            }
        });

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.selection = undefined;
                const fields = this.getConfigAggregations().map(a => a.column);
                this.facetService.clearFiltersSearch(fields, true, this.query, this.name);
            }
        });

    }

    getMinDate(): Date | undefined {
        return this.currentRange? this.currentRange[0] : this.minDate;
    }

    getMaxDate(): Date | undefined {
        return this.currentRange? this.currentRange[1] : this.maxDate;
    }

    override get actions(): Action[] {
        const actions: Action[] = [];
        if(this.hasFiltered){
            actions.push(this.clearFilters);
        }
        return actions;
    }

    ngOnChanges(changes: SimpleChanges) {

        // Skip simple changes (width, height, etc.) that don't require modifying the timeline data
        if(!changes.timeseries && !changes.events && !changes.results) {
            return;
        }

        // Retrieve the current active selection for this timeline (if any)
        const query = this.query || this.searchService.query;
        const fields = this.getConfigAggregations().map(cc => cc.column);
        const filter = query.findFilter(f => f.operator === 'between' && fields.includes(f.field)) as BetweenFilter;
        this.hasFiltered = !!filter;

        // Update the selection if it is not already set (which is the case on a page refresh)
        if(filter && !this.selection) {
            const from = Utils.isString(filter.start)? parseISO(filter.start) : Utils.isDate(filter.start)? filter.start : new Date(filter.start);
            const to = Utils.isString(filter.end)? parseISO(filter.end) : Utils.isDate(filter.end)? filter.end : new Date(filter.end);
            this.selection = [from, to];
            // Guess a current range based on the selection
            if(!this.currentRange) {
                const interval = from.getTime() - to.getTime();
                this.currentRange = [ // Selected Interval +10% on each side
                    toDate(from.getTime()-interval*0.1),
                    toDate(to.getTime()+interval*0.1)
                ];
            }
        }
        // If no active selection we remove the selection from the timeline, along with the current zoomed range
        else if(!filter) {
            this.selection = undefined; // If no select, it was possibly removed by the user, we need to update our selection
            this.currentRange = undefined; // current range is set by zoom events, we want to reset it only if there are no select (ie. no user interaction)
        }

        // Initialize timeseries
        if(!this.timeseries$ || changes["timeseries"]) {
            // Create one observable per timeline
            this.timeseries$ = this.timeseries.map(_ => new ReplaySubject<TimelineSeries>(1));
            this.mergedTimeseries$ = combineLatest(this.timeseries$);
        }

        this.updateTimeseries();

        // Initialize events
        if(!this.events$ || changes["events"]) {
            this.events$ = this.events.map(_ => new ReplaySubject<TimelineEvent[]>(1));
            this.mergedEvents$ = combineLatest(this.events$).pipe(
                map(events => ([] as TimelineEvent[]).concat(...events))
            );
        }

        this.updateEvents();

    }

    /**
     * For each timeseries configuration given as an input,
     * update the data via the list of observables (timelines$)
     */
    updateTimeseries() {
        this.timeseries.forEach((config, i) => {

            const subject = this.timeseries$[i];

            if((config as TimelineSeries).dates !== undefined) {
                subject.next(config as TimelineSeries);
            }

            else {
                let agg = config as TimelineAggregation;
                if(agg.aggregation === undefined){

                    config = config as TimelineCombinedAggregations;
                    // We want to set the default scale if it hasn't been set before
                    // or if no zoom/selection has been made (so current scale may not be adapted to the new results)
                    if(!this.currentRange || !config.current){
                        config.current = config.default;
                    }

                    agg = config.current;
                }

                const range: [Date, Date] | undefined = !!this.minAggregationDate && !!this.maxAggregationDate ?
                    [this.minAggregationDate, this.maxAggregationDate] : undefined;

                this.getTimeseries(agg, range).subscribe({
                    next: d => subject.next(d),
                    error: err => subject.error(err)
                });
            }

        });
    }

    /**
     * For each event configuration given as an input,
     * update the data via the list of observables (events$)
     */
    updateEvents() {
        this.events.forEach((config, i) => {
            const subject = this.events$[i];

            if((config as TimelineRecords).field) {
                subject.next(this.getRecordsAsEvents(config as TimelineRecords));
            }
            else if((config as TimelineEventAggregation).aggregation){
                this.getEventAggregation(config as TimelineEventAggregation).subscribe({
                    next: t => subject.next(t),
                    error: err => subject.error(err)
                });
            }
            else if(Array.isArray(config)){
                subject.next(config as TimelineEvent[]);
            }
        });
    }

    /**
     * Get a timeseries aggregation via the getAggregation method.
     * @param config
     * @param subject
     * @param range
     */
    getTimeseries(config: TimelineAggregation, range?: [Date, Date]): Observable<TimelineSeries> {
        return this.getAggregation(config.aggregation, range).pipe(
            map(d => BsFacetTimelineComponent.createTimeseries(config, d.aggregation, d.ccaggregation, range))
        );
    }

    /**
     * Get an aggregation of events via the getAggregation method
     * @param config
     * @param subject
     */
    getEventAggregation(config: TimelineEventAggregation): Observable<TimelineEvent[]> {
        return this.getAggregation(config.aggregation).pipe(
            map(d => BsFacetTimelineComponent.createAggregationEvents(config, d.aggregation, d.ccaggregation))
        );
    }

    /**
     * Returns the list of records from the results as a list of TimelineEvent when they have a
     * modified date. The size and styles of the events are determined from the given configuration (TimelineRecords)
     * @param config
     */
    getRecordsAsEvents(config: TimelineRecords): TimelineEvent[] {
        if (this.results) {
            return this.results.records
                .filter(r =>  isValid(parseISO(r[config.field])))
                .map<TimelineEvent>(r => ({
                        id: r.id,
                        date: parseISO(r[config.field]),
                        size: !config.size? 6 : typeof config.size === 'function'? config.size(r, r.$selected) : config.size,
                        styles: !config.styles? BsFacetTimelineComponent.defaultRecordStyle(r.$selected) :
                                typeof config.styles === 'function'? config.styles(r, r.$selected) :
                                config.styles,
                        display: config.display? config.display(r) : r.title,
                        // Custom property for click action
                        record: r
                    }));
        }
        return [];
    }


    /**
     * returns an aggregation and its configuration either directly from the facet service of
     * by fetching it from the server.
     * @param aggregationName
     * @param range
     */
    getAggregation(aggregationName: string, range?: [Date, Date]): Observable<{aggregation: Aggregation, ccaggregation: CCAggregation}> {

        const ccaggregation = this.appService.getCCAggregation(aggregationName);
        const aggregation = this.facetService.getAggregation(aggregationName, this.results);

        if(aggregation && ccaggregation) {
            return of({aggregation, ccaggregation});
        }

        else if(ccaggregation) {
            return this.fetchAggregation(aggregationName, ccaggregation, range).pipe(
                map(aggregation => ({aggregation, ccaggregation}))
            );
        }

        else {
            throw new Error(`Aggregation ${aggregationName} does not exist in the Query web service`);
        }
    }

    /**
     * Get an aggregation from the server, filtering by range if provided
     * @param aggregation
     * @param ccaggregation
     * @param range
     */
    fetchAggregation(aggregation: string, ccaggregation: CCAggregation, range?: [Date, Date]): Observable<Aggregation> {
        const query = (this.query || this.searchService.query).copy();
        query.action = "aggregate";
        query.aggregations = [aggregation];

        if(range){
            const filter = this.facetService.makeRangeFilter(ccaggregation.column, range[0], range[1])!;
            query.addFilter(filter);
        }

        return this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(
            map(results => results.aggregations[0])
        );
    }

    /**
     * Given a combined aggregation configuration and a range, this method searches for the most
     * adapted aggregation scale (years, months, weeks or days) and updates the data if necessary.
     * @param config
     * @param range
     * @param iTimeseries
     */
    updateCombinedAggregation(config: TimelineCombinedAggregations, range: [Date, Date], timeseries$: ReplaySubject<TimelineSeries>) {
        const nmonths = timeMonth.count(range[0], range[1]);

        if(!config.maxNMonths || config.maxNMonths.length !== config.aggregations.length) {
            console.error(config);
            throw new Error("maxNMonths and aggregations must have the same number of items");
        }

        // Find the aggregation with min maxNMonths with maxNMonths >= nmonths
        let jMin;
        config.maxNMonths.forEach((maxNMonths, j) => {
            if(maxNMonths >= nmonths && (jMin === undefined || maxNMonths < config.maxNMonths[jMin] || config.maxNMonths[jMin] === -1)
                || maxNMonths === -1 && jMin === undefined){
                jMin = j;
            }
        });

        const bestAggregation = config.aggregations[jMin];

        if(bestAggregation !== config.current
            || this.currentRange && (range[0] < this.currentRange[0] || range[1] > this.currentRange[1])) {

            config.current = bestAggregation;
            this.getTimeseries(bestAggregation, range).subscribe({
                next: d => timeseries$.next(d),
                error: err => timeseries$.error(err)
            });
        }

    }


    // Interaction callbacks

    /**
     * On selection is triggered when the user selects a range of dates on the timeline.
     * This has the effect of updating the query.select (either remove it or add/replace it)
     * and it updates the search.
     * @param selection
     */
    onSelectionChange(selection: [Date, Date] | undefined) {
        this.selection = selection;
        const aggregations = this.getConfigAggregations();
        const fields = aggregations.map(a => a.column);
        if(selection) {
            const from = this.formatDayRequest(selection[0]);
            const to = this.formatDayRequest(selection[1]);

            const filters: Filter[] = aggregations
                .map(agg => ({field: agg.column, operator: 'between', start: from, end: to}));

            if(filters.length > 0) {
                let filter = filters[0];
                if(filters.length > 1) {
                    filter = {operator: 'or', filters};
                }
                this.facetService.applyFilterSearch(filter, this.query, true, this.name);
            }
        }

        else if(this.facetService.hasFiltered(fields, this.query)) {
            this.facetService.clearFiltersSearch(fields, true, this.query, this.name);
        }
    }

    /**
     * On range is triggered when the user zooms in our out on the timeline,
     * which triggers a dynamic update of the combined aggregation timelines.
     * @param range
     */
    onRangeChange(range: [Date, Date]) {

        this.timeseries.forEach((config, i) => {
            if((config as TimelineCombinedAggregations).aggregations !== undefined) {
                this.updateCombinedAggregation(config as TimelineCombinedAggregations, range, this.timeseries$[i]);
            }
        });

        // Note: updateCombinedAggregation() compares currentRange and range
        // So this update must be kept after the forEach
        this.currentRange = range;
    }

    /**
     * When an event is clicked, the event is propagated to the parent, and the tooltip is closed
     * @param event
     * @param closeTooltip
     */
    onEventClicked(event: TimelineEvent, closeTooltip: () => void) {
        this.eventClicked.next(event);
        closeTooltip();
        return false;
    }

    getConfigAggregations(): CCAggregation[] {
        return this.timeseries.map(t => {
            if(isCombinedAggregations(t)) return t.default.aggregation;
            if(isAggregation(t)) return t.aggregation;
            return undefined;
        })
        .map(a => a && this.appService.getCCAggregation(a))
        .filter(agg => agg) as CCAggregation[];
    }


    // Static utility methods


    /**
     * Create a time series object from its config, data (aggregation) and configuration (ccaggregation)
     * @param config
     * @param aggregation
     * @param ccaggregation
     */
    static createTimeseries(config: TimelineAggregation, aggregation: Aggregation, ccaggregation: CCAggregation, range?: [Date, Date]): TimelineSeries {
        return {
            ...config,
            name: config.name || aggregation.name,
            dates: this.createDatapoints(aggregation.items, ccaggregation?.mask, range),
        }
    }

    /**
     * Create a list of events from its config, data (aggregation) and configuration (ccaggregation)
     * @param config
     * @param aggregation
     * @param ccaggregation
     */
    static createAggregationEvents(config: TimelineEventAggregation, aggregation: Aggregation, ccaggregation: CCAggregation): TimelineEvent[] {
        return !aggregation.items? [] : aggregation.items.map(item => ({
                id: config.getDate(item).toUTCString()+"|"+config.getDisplay(item),
                date: config.getDate(item),
                size: !config.size? 6 : typeof config.size === 'function'? config.size(item) : config.size,
                styles: !config.styles? undefined :
                        typeof config.styles === 'function'? config.styles(item) :
                        config.styles,
                display: config.getDisplay(item),

                // Custom params for click action
                item: item,
                aggregation: aggregation,
                ccaggregation: ccaggregation
            }));
    }

    /**
     * This methods transforms a raw list of aggregation items into
     * a time series completed with zeros, following the below scheme:
     * Aggregation:  [    # #         # # #   #     # #       # # #    ]
     * Series:       [  0 # # 0     0 # # # 0 # 0 0 # # 0   0 # # # 0  ]
     * @param items
     * @param resolution
     */
    static createDatapoints(items: AggregationItem[] | undefined, resolution: string, range?: [Date, Date]): TimelineDate[] {

        if(!items) {
            return [];
        }

        const timeInterval = this.getD3TimeInterval(resolution);

        const series: TimelineDate[] = [];

        const _items = items
            .map(item => {
                if(item.value){
                    const val = item.value.toString();
                    let date = parseISO(val.length <= 4? val + "-01" : val);
                    if(!isNaN(date.getTime())){
                        return {date, value: item.count}
                    }
                }
                return undefined!; // the ! is for excluding the filtered undefined from the inferred type
            })
            .filter(item => item && (!range || item.date >= range[0] && item.date <= range[1]));

        _items.forEach((item,i) => {
            if(i === 0 || timeInterval.offset(series[series.length-1].date, 1) < item.date) {
                series.push({date: timeInterval.offset(item.date, -1), value: 0});
            }

            series.push(item);

            if(i === _items.length-1 || timeInterval.offset(item.date, 1) < _items[i+1].date){
                series.push({date: timeInterval.offset(item.date, 1), value: 0});
            }
        });

        series.forEach(item => item.date = this.shiftDate(item.date, resolution));

        return series;
    }


    /**
     * Shift the date to the middle of their time bracket (2020 = middle of the year, April = middle of the month, etc.)
     * @param date
     * @param resolution
     */
    static shiftDate(date: Date, resolution: string): Date {
        switch(resolution){
            case "YYYY-MM-DD": return timeHour.offset(date, 12);
            case "YYYY-WW": return timeHour.offset(date, 84); // 3*24 + 12
            case "YYYY-MM": return timeDay.offset(date, 15);
            case "YYYY": return timeMonth.offset(date, 6);
        }
        return date;
    }


    static getD3TimeInterval(resolution: string): d3.CountableTimeInterval {
        switch(resolution){
            case "YYYY-MM-DD": return timeDay;
            case "YYYY-WW": return timeWeek;
            case "YYYY-MM": return timeMonth;
            case "YYYY": return timeYear;
        }
        return timeDay;
    }

    static defaultRecordStyle(selected: boolean): {[key: string]: any} {
        return {
            'fill': selected? 'red' : 'green',
            'stroke': selected? 'red' : undefined,
            'stroke-width': selected? '2px' : undefined
        };
    }
}
