import { Component, Input, OnChanges, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable, of, Subject, combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Results, AggregationItem, Aggregation, CCAggregation, Record } from '@sinequa/core/web-services';
import { AppService, Expr } from '@sinequa/core/app-utils';
import { Utils } from '@sinequa/core/base';
import { Action } from '@sinequa/components/action';
import { AbstractFacet, FacetService } from '@sinequa/components/facet';
import { SearchService } from '@sinequa/components/search';
import { SelectionService } from '@sinequa/components/selection';
import { TimelineSeries, TimelineDate, TimelineEvent } from './timeline.component';

import * as d3 from 'd3';

export interface TimelineAggregation {
    name?: string;
    aggregation: string;
    primary: boolean;
    areaStyles?: {[key: string]: any};
    lineStyles?: {[key: string]: any};
    legend?: string;
}

export interface TimelineCombinedAggregations {
    aggregations: TimelineAggregation[];
    maxNMonths: number[]; // Maximum number of months for which to use this aggregation
    default: TimelineAggregation; // Aggregation to use by default 
    current?: TimelineAggregation; // (this field is overriden by the component when switching aggregation)
}

export interface TimelineRecords {
    showRecords: boolean;
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
    @Input() timelines: TimelineData[] = [];
    @Input() events: TimelineEventData[] = [{showRecords: true}];

    // Initial scale (prior to any zoom)
    @Input() minDate?: Date;
    @Input() maxDate?: Date;
    
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
    timelines$: ReplaySubject<TimelineSeries>[];
    events$: ReplaySubject<TimelineEvent[]>[];

    // Combination (combineLastest) of the timeline observables
    data$: Observable<TimelineSeries[]>;
    mergedEvents$: Observable<TimelineEvent[]>;

    // Current timeline selection
    selection?: [Date, Date];

    // Current range (undefined if no zoom / auto-scaling)
    currentRange?: [Date, Date];

    // Misc
    formatDayRequest = d3.timeFormat("%Y-%m-%d");

    // TODO: remove
    searchedTerm: string;

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
            const i = this.events.findIndex(e => (e as TimelineRecords).showRecords);
            if(i !== -1) {
                this.events$[i].next(this.getRecords(this.events[i] as TimelineRecords));
            }
        });
    }

    getMinDate(): Date | undefined {
        return this.currentRange? this.currentRange[0] : this.minDate;
    }

    getMaxDate(): Date | undefined {
        return this.currentRange? this.currentRange[1] : this.maxDate;
    }

    ngOnChanges(changes: SimpleChanges) {

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
        else if(!select) {
            this.selection = undefined; // If no select, it was possibly removed by the user, we need to update our selection
            this.currentRange = undefined; // current range is set by zoom events, we want to reset it only if there are no select (ie. no user interaction)
        }

        if(!this.timelines$ || changes["timeseries"]) {
            // Create one observable per timeline
            this.timelines$ = this.timelines.map(_ => new ReplaySubject<TimelineSeries>(1));
            this.data$ = combineLatest(this.timelines$);
        }

        if(!this.events$ || changes["events"]) {
            this.events$ = this.events.map(_ => new ReplaySubject<TimelineEvent[]>(1));
            this.mergedEvents$ = combineLatest(this.events$).pipe(
                map(events => ([] as TimelineEvent[]).concat(...events))
            );
        }

        this.timelines.forEach((config, i) => {

            const subject = this.timelines$[i];

            if((config as TimelineSeries).dates !== undefined) {
                subject.next(config as TimelineSeries);
            }

            else if((config as TimelineAggregation).aggregation !== undefined) {
                this.getTimeseries(config as TimelineAggregation, subject);
            }

            else {
                config = config as TimelineCombinedAggregations;
                // We want to set the default scale if it hasn't been set before
                // or if no zoom/selection has been made (so current scale may not be adapted to the new results)
                if(!this.currentRange || !config.current){
                    config.current = config.default;
                }
                this.getTimeseries(config.current, subject);
            }

        });

        this.events.forEach((config, i) => {
            const subject = this.events$[i];

            if((config as TimelineRecords).showRecords) {
                subject.next(this.getRecords(config as TimelineRecords));
            }
            else if((config as TimelineEventAggregation).aggregation){
                this.getEventAggregation(config as TimelineEventAggregation, subject)
            }
            else if(Array.isArray(config)){
                subject.next(config as TimelineEvent[]);
            }
        });
        
    }

    getEventAggregation(config: TimelineEventAggregation, subject: ReplaySubject<TimelineEvent[]>) {
        
        const ccaggregation = this.appService.getCCAggregation(config.aggregation);
        const aggregation = this.facetService.getAggregation(config.aggregation, this.results);
        
        if(aggregation && ccaggregation) {
            subject.next(
                BsFacetTimelineComponent.createAggregationEvents(config, aggregation, ccaggregation)
            );
        }

        else if(ccaggregation) {
            this.fetchEvents(config, ccaggregation).subscribe({
                next: v => subject.next(v),
                error: err => subject.error(err),
                //complete: () => timeseries.complete() // We don't want the subject to complete as there will be more elements
            });
        }

        else {
            throw new Error(`Aggregation ${config.aggregation} does not exist in the Query web service"`);
        }
    }


    getRecords(config: TimelineRecords): TimelineEvent[] {
        if(this.results) {
            return this.results.records
                .filter(r => !!r.modified)
                .map<TimelineEvent>(r => {
                    const selected =  this.selectionService.selectedRecords.indexOf(r.id) !== -1;
                    return {
                        id: r.id,
                        date: r.modified,
                        size: !config.size? 6 : typeof config.size === 'function'? config.size(r, selected) : config.size,
                        styles: !config.styles? this.defaultRecordStyle(selected) :
                                typeof config.styles === 'function'? config.styles(r, selected) : 
                                config.styles,
                        display: config.display? config.display(r) : r.title,
                        // Custom property for click action
                        record: r
                    }
                });
        }
        return [];
    }

    defaultRecordStyle(selected: boolean): {[key: string]: any} {
        return {
            'fill': selected? 'red' : 'green',
            'stroke': selected? 'red' : undefined,
            'stroke-width': selected? '2px' : undefined
        };
    }

    getTimeseries(config: TimelineAggregation, subject: Subject<TimelineSeries>, range?: [Date, Date]) {

        const ccaggregation = this.appService.getCCAggregation(config.aggregation);
        const aggregation = this.facetService.getAggregation(config.aggregation, this.results);
        
        if(aggregation && ccaggregation) {
            subject.next(
                BsFacetTimelineComponent.createTimeseries(config, aggregation, ccaggregation, range)
            );
        }

        else if(ccaggregation) {
            this.fetchTimeseries(config, ccaggregation, range).subscribe({
                next: v => subject.next(v),
                error: err => subject.error(err),
                //complete: () => timeseries.complete() // We don't want the subject to complete as there will be more elements
            });
        }

        else {
            throw new Error(`Aggregation ${config.aggregation} does not exist in the Query web service"`);
        }
    }


    /**
     * Get the given aggregation from the server and transform it into a time series
     * @param config 
     * @param ccaggregation 
     */
    fetchTimeseries(config: TimelineAggregation, ccaggregation: CCAggregation, range?: [Date, Date]): Observable<TimelineSeries> {
        return this.fetchAggregation(config.aggregation, ccaggregation, range).pipe(
            map(agg => BsFacetTimelineComponent.createTimeseries(config, agg, ccaggregation))
        );
    }

    /**
     * Get the given aggregation from the server and transform it into a list of events
     * @param config 
     * @param ccaggregation 
     */
    fetchEvents(config: TimelineEventAggregation, ccaggregation: CCAggregation) {
        return this.fetchAggregation(config.aggregation, ccaggregation).pipe(
            map(agg => BsFacetTimelineComponent.createAggregationEvents(config, agg, ccaggregation))
        );
    }

    /**
     * Get an aggregation from the server
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

    
    updateCombinedAggregation(config: TimelineCombinedAggregations, range: [Date, Date], iTimeseries: number) {
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
            const timeseries$ = this.timelines$[iTimeseries];
            this.getTimeseries(bestAggregation, timeseries$, range);
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

            this.timelines.forEach((config) => {
                    
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

        this.timelines.forEach((config, i) => {
            if((config as TimelineCombinedAggregations).aggregations !== undefined) {
                this.updateCombinedAggregation(config as TimelineCombinedAggregations, range, i);
            }
        });

        // Note: updateCombinedAggregation() compares currentRange and range
        // So this update must be kept after the forEach
        this.currentRange = range;        
    }

    onEventClicked(event: TimelineEvent, closeTooltip: () => void) {
        this.eventClicked.next(event);
        closeTooltip();
        return false;
    }

    // TODO: remove
    searchTermTrend() {
        const ccaggregation = this.appService.getCCAggregation('Timeline');

        const settings: TimelineAggregation = {
            name: 'Trend',
            aggregation: 'Timeline',
            primary: false
        };

        if(ccaggregation && this.searchedTerm.trim()){
            const query = Utils.copy(this.searchService.query);
            query.text = `[${this.searchedTerm.trim()}]`;
            query.aggregations = ['Timeline'];
            
            const subject = new ReplaySubject<TimelineSeries>(1); // Replay subject emits old values to new subscribers

            this.searchService.getResults(query, undefined, {searchInactive: true}).pipe(
                map(results => {
                    return BsFacetTimelineComponent.createTimeseries(settings, results.aggregations[0], ccaggregation);
                })
            ).subscribe({
                next: v => {
                    subject.next(v);            
                    this.data$ = combineLatest(this.timelines$); // Needed to add an observable to the list
                },
                error: err => subject.error(err),
                //complete: () => timeseries.complete() // We don't want the subject to complete as there will be more elements
            });

            this.timelines$.push(subject);

        }
    }

    
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

        let _items = items.map(item => {
            if(!(item.value instanceof Date)){
                item.value = new Date(item.value.toString());
            }
            return item;
        });

        if(range) {
            _items = _items.filter(item => 
                (item.value as Date) >= range[0] && (item.value as Date) <= range[1])
        }

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
     * Shift the date to the middle of their time bracket
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

    get actions(): Action[] {
        return [new Action({
            icon: 'fas fa-check',
            action: () => {
                this.data$ = combineLatest<TimelineSeries[]>([...this.timelines$, of({
                    name: "test",
                    primary: true,
                    dates: [
                        {date: new Date("2019-12-01"), value: 0},
                        {date: new Date("2020-01-01"), value: 1200},
                        {date: new Date("2020-02-01"), value: 2000},
                        {date: new Date("2020-03-01"), value: 1300},
                        {date: new Date("2020-04-01"), value: 300},
                        {date: new Date("2020-05-01"), value: 1500},
                        {date: new Date("2020-06-01"), value: 8000},
                        {date: new Date("2020-07-01"), value: 6000},
                        {date: new Date("2020-08-01"), value: 0}
                    ],
                    areaStyles: {fill: "lightblue"},
                    lineStyles: {stroke: "lightblue"}
                })]);
                
            }
        }),
        new Action({
            icon: 'fas fa-surprise',
            action: () => {
                this.data$ = combineLatest<TimelineSeries[]>([...this.timelines$, of({
                    name: "test",
                    primary: true,
                    dates: [
                        {date: new Date("2019-10-01"), value: 0},
                        {date: new Date("2019-11-01"), value: 10},
                        {date: new Date("2019-12-01"), value: 30},
                        {date: new Date("2020-01-01"), value: 120},
                        {date: new Date("2020-02-01"), value: 150},
                        {date: new Date("2020-03-01"), value: 100},
                        {date: new Date("2020-04-01"), value: 60},
                        {date: new Date("2020-05-01"), value: 20},
                        {date: new Date("2020-06-01"), value: 75},
                        {date: new Date("2020-07-01"), value: 50},
                        {date: new Date("2020-08-01"), value: 0}
                    ],
                    areaStyles: {fill: "lightgreen"},
                    lineStyles: {stroke: "lightgreen"}
                })]);                
            }
        }),
        new Action({
            icon: 'fas fa-user',
            action: () => {
                this.data$ = combineLatest<TimelineSeries[]>([...this.timelines$, of({
                    name: "test",
                    primary: true,
                    dates: [
                        {date: new Date("2019-12-01"), value: 0},
                        {date: new Date("2020-01-01"), value: 120},
                        {date: new Date("2020-02-01"), value: 200},
                        {date: new Date("2020-03-01"), value: 130},
                        {date: new Date("2020-04-01"), value: 30},
                        {date: new Date("2020-05-01"), value: 150},
                        {date: new Date("2020-06-01"), value: 800},
                        {date: new Date("2020-07-01"), value: 600},
                        {date: new Date("2020-08-01"), value: 0}
                    ],
                }),of({
                    name: "test2",
                    primary: false,
                    dates: [
                        {date: new Date("2019-10-01"), value: 0},
                        {date: new Date("2019-11-01"), value: 10},
                        {date: new Date("2019-12-01"), value: 30},
                        {date: new Date("2020-01-01"), value: 120},
                        {date: new Date("2020-02-01"), value: 150},
                        {date: new Date("2020-03-01"), value: 100},
                        {date: new Date("2020-04-01"), value: 60},
                        {date: new Date("2020-05-01"), value: 20},
                        {date: new Date("2020-06-01"), value: 75},
                        {date: new Date("2020-07-01"), value: 50},
                        {date: new Date("2020-08-01"), value: 0}
                    ],
                    areaStyles: {fill: "lightcoral"},
                    lineStyles: {stroke: "lightcoral"}
                })]);
            }
        }),
        new Action({
            icon: 'fas fa-times',
            action: () => {
                this.data$ = of([]);                
            }
        }),
        new Action({
            icon: 'fas fa-fire',
            action: () => {
                this.selection = undefined;                
            }
        }),
        new Action({
            icon: 'fas fa-users',
            action: () => {
                this.selection = [new Date('2020-04-24'), new Date('2020-06-30')];                
            }
        })];
    }
}