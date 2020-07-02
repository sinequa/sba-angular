import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, of, combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Results, AggregationItem, Aggregation, CCAggregation, Record } from '@sinequa/core/web-services';
import { AppService, Expr } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { Action } from '@sinequa/components/action';
import { TimelineSeries, TimelineDate, TimelineEvent } from './timeline.component';
import moment from 'moment';
import * as d3 from 'd3';

export interface TimelineAggregation {
    name?: string;
    aggregation: string;
    primary: boolean;
    areaStyles?: {[key: string]: any};
    lineStyles?: {[key: string]: any};
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
    @Input() margin = {top: 15, bottom: 30, left: 40, right: 15};

    @Input() curveType = "curveMonotoneX";

    @Input() showTooltip = true;

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
    formatDayRequest = d3.timeFormat("%Y-%m-%d");

    // Actions
    clearFilters: Action;

    constructor(
        public facetService: FacetService,
        public searchService: SearchService,
        public appService: AppService,
        public selectionService: SelectionService,
        public cdRef: ChangeDetectorRef
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
                this.searchService.query.removeSelect(this.name);
                this.searchService.search();
            }
        });

    }

    getMinDate(): Date | undefined {
        return this.currentRange? this.currentRange[0] : this.minDate;
    }

    getMaxDate(): Date | undefined {
        return this.currentRange? this.currentRange[1] : this.maxDate;
    }

    get actions(): Action[] {
        const actions: Action[] = [];
        if(this.facetService.hasFiltered(this.name)){
            actions.push(this.clearFilters);
        }
        return actions;
    }

    ngOnChanges(changes: SimpleChanges) {

        // Retrieve the current active selection for this timeline (if any)
        const select = this.searchService.query.findSelect(this.name);

        // Update the selection if it is not already set (which is the case on a page refresh)
        if(select && !this.selection) {
            let parsedexpr = this.appService.parseExpr(select.expression) as Expr;
            if(!Utils.isString(parsedexpr)){
                while(!parsedexpr.isLeaf){ // The select might over multiple fields (modified between [...] AND created between [...])
                    parsedexpr = parsedexpr.operands[0];
                }
                if(parsedexpr.values){
                    this.selection = [new Date(parsedexpr.values[0]), new Date(parsedexpr.values[1])];
                }
            }
        }
        // If no active selection we remove the selection from the timeline, along with the current zoomed range
        else if(!select) {
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
                
                let range: [Date, Date] | undefined = !!this.minAggregationDate && !!this.maxAggregationDate ?
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
        if(this.results) {
            return this.results.records
                .filter(r => !!Utils.toDate(r[config.field]))
                .map<TimelineEvent>(r => {
                    return {
                        id: r.id,
                        date: Utils.toDate(r[config.field])!,
                        size: !config.size? 6 : typeof config.size === 'function'? config.size(r, r.$selected) : config.size,
                        styles: !config.styles? BsFacetTimelineComponent.defaultRecordStyle(r.$selected) :
                                typeof config.styles === 'function'? config.styles(r, r.$selected) : 
                                config.styles,
                        display: config.display? config.display(r) : r.title,
                        // Custom property for click action
                        record: r
                    }
                });
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
            return of({aggregation: aggregation, ccaggregation: ccaggregation});
        }

        else if(ccaggregation) {
            return this.fetchAggregation(aggregationName, ccaggregation, range).pipe(
                map(agg => {return {aggregation: agg, ccaggregation: ccaggregation} })
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
        const query = Utils.copy(this.searchService.query);
        query.action = "aggregate";
        query.aggregations = [aggregation];

        if(range){
            query.addSelect(`${ccaggregation.column}:[${this.formatDayRequest(range[0])}..${this.formatDayRequest(range[1])}]`);
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
        const nmonths = d3.timeMonth.count(range[0], range[1]);

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
        if(selection) {
            let expr = '';
            this.searchService.query.removeSelect(this.name);

            this.timeseries.forEach((config) => {
                    
                if((config as TimelineAggregation).aggregation !== undefined 
                || (config as TimelineCombinedAggregations).default !== undefined) {

                    const aggregation = (config as TimelineAggregation).aggregation || (config as TimelineCombinedAggregations).default.aggregation;
                    const ccaggregation = this.appService.getCCAggregation(aggregation);
                    if(ccaggregation) {
                        if(expr){
                            expr += " OR ";
                        }
                        expr += `${ccaggregation.column}:[${this.formatDayRequest(selection[0])}..${this.formatDayRequest(selection[1])}]`;
                    }
                }

            });

            if(expr) {
                this.searchService.query.addSelect(expr, this.name);
                this.searchService.search();
            }
        }

        else if(this.searchService.query.findSelect(this.name)) {
            this.searchService.query.removeSelect(this.name);
            this.searchService.search();
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


    // Static utility methods
    
    
    /**
     * Create a time series object from its config, data (aggregation) and configuration (ccaggregation)
     * @param config 
     * @param aggregation 
     * @param ccaggregation 
     */
    static createTimeseries(config: TimelineAggregation, aggregation: Aggregation, ccaggregation: CCAggregation, range?: [Date, Date]): TimelineSeries {
        return {
            name: config.name || aggregation.name,
            primary: config.primary,
            dates: this.createDatapoints(aggregation.items, ccaggregation?.mask, range),
            lineStyles: config.lineStyles,
            areaStyles: config.areaStyles
        }
    }

    /**
     * Create a list of events from its config, data (aggregation) and configuration (ccaggregation)
     * @param config 
     * @param aggregation 
     * @param ccaggregation 
     */
    static createAggregationEvents(config: TimelineEventAggregation, aggregation: Aggregation, ccaggregation: CCAggregation): TimelineEvent[] {
        return !aggregation.items? [] : aggregation.items.map(item => {
            return {
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
            }
        });
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

        let _items = items
            .map(item => {
                if(!!item.value && !(item.value instanceof Date)){
                    const val = item.value.toString();
                    item.value = moment(val.length <= 4? val + "-01" : val).toDate();
                    if(isNaN(item.value.getTime())){
                        item.value = <Date><unknown> undefined; // So it gets filtered out
                    }
                }
                return item;
            })
            .filter(item => !!item.value && (!range || ((item.value as Date) >= range[0] && (item.value as Date) <= range[1])));

        _items.forEach((item,i) => {
            let date = item.value as Date;
            
            if(i === 0 || timeInterval.offset(series[series.length-1].date, 1) < date) {
                series.push({date: timeInterval.offset(date, -1), value: 0});
            }

            series.push({date: date, value: item.count});

            if(i === _items.length-1 || timeInterval.offset(date, 1) < _items[i+1].value){
                series.push({date: timeInterval.offset(date, 1), value: 0});                    
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
            case "YYYY-MM-DD": return d3.timeHour.offset(date, 12);
            case "YYYY-WW": return d3.timeHour.offset(date, 84); // 3*24 + 12
            case "YYYY-MM": return d3.timeDay.offset(date, 15);
            case "YYYY": return d3.timeMonth.offset(date, 6);
        }
        return date;
    }


    static getD3TimeInterval(resolution: string): d3.CountableTimeInterval {
        switch(resolution){
            case "YYYY-MM-DD": return d3.timeDay;
            case "YYYY-WW": return d3.timeWeek;
            case "YYYY-MM": return d3.timeMonth;
            case "YYYY": return d3.timeYear;
        }
        return d3.timeDay;
    }

    static defaultRecordStyle(selected: boolean): {[key: string]: any} {
        return {
            'fill': selected? 'red' : 'green',
            'stroke': selected? 'red' : undefined,
            'stroke-width': selected? '2px' : undefined
        };
    }
}