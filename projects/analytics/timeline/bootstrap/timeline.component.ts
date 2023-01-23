import { Component, Input, Output, ElementRef, ViewChild, OnChanges, AfterViewInit, EventEmitter, SimpleChanges, OnDestroy, SimpleChange, ContentChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { IntlService } from '@sinequa/core/intl';
import { TooltipManager } from '@sinequa/analytics/tooltip';
import { bisector, extent, max } from 'd3-array';
import { scaleLinear, scaleUtc } from 'd3-scale';
import { line, area, curveBasis, curveBasisClosed, curveBasisOpen, curveBumpX, curveBumpY, curveLinear, curveLinearClosed, curveMonotoneX, curveMonotoneY, curveNatural, curveStep, curveStepAfter, curveStepBefore } from 'd3-shape';
import { brushX, brushSelection } from 'd3-brush';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { DataPoint, TimelineDate, TimelineEvent, TimelineEventType, TimelineSeries } from './timeline.model';

export const curveTypes = {
    curveBasis,
    curveBasisClosed,
    curveBasisOpen,
    curveBumpX,
    curveBumpY,
    curveLinear,
    curveLinearClosed,
    curveMonotoneX,
    curveMonotoneY,
    curveNatural,
    curveStep,
    curveStepAfter,
    curveStepBefore
}

@Component({
    selector: 'sq-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class BsTimelineComponent implements OnChanges, AfterViewInit, OnDestroy {

    @Input() data?: TimelineSeries[];
    @Input() events?: TimelineEvent[];

    @Input() selection?: [Date|undefined, Date|undefined];

    // Initial scale (prior to any zoom)
    @Input() minDate?: Date;
    @Input() maxDate?: Date;

    @Input() zoomable = true;
    @Input() minZoomDays = 1; // Max 1 day scale
    @Input() maxZoomDays = 365 * 100; // Max 100 years scale

    @Input() width = 600;
    @Input() height = 200;
    @Input() margin = {top: 15, bottom: 20, left: 40, right: 15};

    @Input() curveType = "curveMonotoneX";

    @Input() showTooltip = true;
    @Input() theme: "light" | "dark" = "light";

    @Output() selectionChange = new EventEmitter<(Date|undefined)[]|undefined>();
    @Output() rangeInit = new EventEmitter<Date[]>();
    @Output() rangeChange = new EventEmitter<Date[]>();

    @ContentChild("eventTooltipTpl", {static: false}) eventTooltipTpl: TemplateRef<any>;
    @ContentChild("dataPointTooltipTpl", {static: false}) dataPointTooltipTpl: TemplateRef<any>;

    @Input() showLegend = false;
    @Input() legendHeight?: number = 50;
    @Input() legendStyles?: {[key:string]: any} = {'justify-content' : 'center'};
    @Input() legendEvents?: TimelineEventType[];
    @Input() legendOrientation?: "row"|"column" = "row";
    @Input() legendYOffset?: number = 3;

    // Data
    groupedEvents: TimelineEvent[][] = [];

    // Scales
    x: d3.ScaleTime<number, number>; // Read/Write
    xt: d3.ScaleTime<number, number>; // Transformed X axis due to Zoom
    y: d3.ScaleLinear<number, number>; // Read-only / domain updated

    // Shapes
    area: d3.Area<TimelineDate>; // Read only
    line: d3.Line<TimelineDate>; // Read only

    // Behaviors
    brushBehavior: d3.BrushBehavior<any>; // Read only
    zoomBehavior: d3.ZoomBehavior<any,any>; // Read/Write
    brushSelection: [number, number] | null;
    currentSelection?: (Date|undefined)[]; // Read/Write

    // Elements
    @ViewChild("xAxis") gx: ElementRef<SVGGElement>;
    @ViewChild("yAxis") gy: ElementRef<SVGGElement>;
    @ViewChild("brush") gbrush: ElementRef<SVGGElement>;

    // Selections
    xAxis$: d3.Selection<SVGGElement, Date, null, undefined>;
    yAxis$: d3.Selection<SVGGElement, number, null, undefined>;
    brush$: d3.Selection<SVGGElement, undefined, null, undefined>;
    grips$: d3.Selection<SVGGElement, {type: string}, SVGGElement, undefined>;

    // Tooltip
    tooltipX: number | undefined;
    bisectDate = bisector<TimelineDate,Date>(d => { return d.date; }).left;
    eventsTooltipManager = new TooltipManager<TimelineEvent[]>();
    dataPointsTooltipManager = new TooltipManager<DataPoint[]>();

    // Misc
    viewInit: boolean;
    intlSubscription: Subscription;
    updateSubscription: Subscription;

    static counter = 0;
    instance: number;

    zooming: boolean;
    brushing: boolean;

    private noTimeSeries = true;
    private noEvents = true;

    constructor(
        protected el: ElementRef,
        protected intlService: IntlService,
        protected cdRef: ChangeDetectorRef
    ){
        // When the locale changes, we rebuild the X scale and axis
        this.intlSubscription = this.intlService.events.subscribe(e => this.updateXAxis());

        // // When data changes, check if display timeline / empty graph
        // this.combinedDataCheck$ = combineLatest([this.noTimeSeries$, this.noEvents$]);
        // this.updateSubscription = this.combinedDataCheck$
        //                             .pipe(
        //                                 map(([noTimeSeries, noEvents]) => !!noTimeSeries && !!noEvents)
        //                             )
        //                             .subscribe(
        //                                 (isNoData) => {
        //                                     //this.dataInit = true;
        //                                     this.isNoData = isNoData;
        //                                     if (!this.isNoData) {
        //                                         this.updateChart();
        //                                         this.updateEvents();
        //                                     }
        //                                     this.cdRef.detectChanges();
        //                                 }
        //                             )

        this.instance = BsTimelineComponent.counter++;

    }

    get isNoData(): boolean {
        return this.noTimeSeries && this.noEvents;
    }
    get innerWidth(): number {
        return this.width - this.margin.left - this.margin.right;
    }

    get innerHeight(): number {
        return this.height - this.margin.top - this.margin.bottom - (this.showLegend ? this.legendHeight! : 0);
    }

    // Note: ngOnChanges is always called once before ngAfterViewInit
    ngOnChanges(changes: SimpleChanges) {

        if(!this.x) {

            // Scales
            this.x = scaleUtc()
                .range([0, this.innerWidth]);
            this.xt = this.x;

            this.y = scaleLinear()
                .range([this.innerHeight, 0]);

            // Shapes
            this.area = area<TimelineDate>()
                .curve(curveTypes[this.curveType])
                .x(d => this.xt(d.date)!)
                .y0(this.y(0)!)
                .y1(d => this.y(d.value)!);

            this.line = line<TimelineDate>()
                .curve(curveTypes[this.curveType])
                .x(d => this.xt(d.date)!)
                .y(d => this.y(d.value)!);

            // Behaviors
            this.brushBehavior = brushX()
                .extent([[0, 0], [this.innerWidth, this.innerHeight]])
                .on("start", () => this.brushing = true)
                .on('brush', () => this.onBrush())
                .on('end', () => this.onBrushEnd());
        }

        // Resize handling

        if(changes["height"] || changes["showLegend"]) {
            this.y.range([this.innerHeight, 0]);
            this.area.y0(this.y(0)!);
            this.brushBehavior.extent([[0, 0], [this.innerWidth, this.innerHeight]]);
            if(this.viewInit) {
                this.drawYAxis();
                this.brush$.call(this.brushBehavior);
                this.grips$.selectAll("path").attr("d", this.drawGrips);
            }
        }

        if(changes["width"]) {
            this.x.range([0, this.innerWidth]);
            this.brushBehavior.extent([[0, 0], [this.innerWidth, this.innerHeight]]);
            if(this.viewInit) {
                this.drawXAxis();
                if(!changes["height"]) {
                    this.brush$.call(this.brushBehavior);
                    this.grips$.selectAll("path").attr("d", this.drawGrips);
                }
            }
        }

        // If the parent changes the selection, we want to update it
        // If not, we keep the current selection as is
        // (Important to keep this statement outside of the if bellow since
        // the change of selection can be combined with a change of data)
        const selectionChanged = changes["selection"] && this.updateSelection();

        // Only changes in data result in redrawing the chart
        // (other input, except selection, are expected to be static)
        if(this.viewInit && changes["data"] && this.checkDataChanges(changes["data"])){
            this.updateChart();
        }

        // If the parent changes the selection (even though the data hasn't changed),
        // we want to update the brush.
        // If not, we keep the current selection as is.
        // We can update the brush only if the view is initialized (viewInit).
        else if(this.viewInit && ((changes["selection"] && selectionChanged) || changes["width"])) {
            this.updateBrush();
        }

        if(changes["events"]) {
            this.updateEvents();
        }

    }

    // Note: In onAfterViewInit we can access gx, gy, etc., obtained with @ViewChild.
    // At this point we can initialize all the primitives and call updateChart()
    ngAfterViewInit() {

        // Get native elements
        this.xAxis$ = select(this.gx.nativeElement);
        this.yAxis$ = select(this.gy.nativeElement);
        this.brush$ = select(this.gbrush.nativeElement);

        this.brush$
            .call(this.brushBehavior)
            .on("mousemove", e => this.onMousemove(e as any as MouseEvent))
            .on("mouseout", () => this.onMouseout());

        // Add 2 "grips" to the brush group, on each side of the rectangle
        // Grips are inserted programmatically to appear on top the brush selection
        this.grips$ = this.brush$.selectAll<SVGGElement, {type: string}>(".grip")
            .data([{type: "w"}, {type: "e"}])
            .enter()
            .append("g")
            .attr("class", "grip")
            .attr("display", "none");

        this.grips$.append("path")
            .attr("d", this.drawGrips);

        this.grips$.append("text")
            .attr("class", "grip-text")
            .attr("text-anchor", d => d.type === "w"? 'end' : 'start')
            .attr("x", d => d.type === "w"? -5 : 5)
            .attr("y", 10);

        this.viewInit = true;
        this.updateChart();
        this.cdRef.detectChanges();

    }

    /**
     * Redraw the graph (needs to be called after ngAfterViewInit so that the DOM elements
     * are accessible)
     */
    updateChart() {

        this.turnoffTooltip();

        this.noTimeSeries = !(this.data && this.data.flatMap((timeSerie) => timeSerie.dates).length > 0);

        if(this.data && this.data.length) {

            // Update scales
            // Note: does not stop the update process even if the data is invalid/empty
            this.updateScales(this.data);

            // Update Axes
            this.updateAxes();

            // Update Zoom
            this.updateZoom();

            // Update brush
            this.updateBrush();

        }

    }


    /**
     * Update the x & y scales, based on the input data
     * @param data
     */
    protected updateScales(data: TimelineSeries[]) {

        // Set x and y scales with the primary series (or first one)
        const primarySeries = data.filter(s => s.primary) || [data[0]];
        const allPrimaryDates = ([] as TimelineDate[]).concat(...primarySeries.map(s => s.dates));

        const xExtent = extent<TimelineDate, Date>(allPrimaryDates, d => d.date);
        const yMax = max<TimelineSeries, number>(data,
            s => max<TimelineDate, number>(s.dates, d => d.value));

        // Check validity of data
        if(!xExtent[0] || !xExtent[1] || !yMax) {
            if (allPrimaryDates.length !== 0) {
                console.error('Invalid timeseries', primarySeries);
            }
            this.x.domain(this.xt.domain());
            this.xt = this.x;
            return;
        }

        // Enforce minimum date
        if(this.minDate) {
            xExtent[0] = this.minDate;
        }

        // Enforce maximum date
        if(this.maxDate) {
            xExtent[1] = this.maxDate;
        }

        // Enforce minimum scale (especially when the timeseries contains a single datapoint)
        const diff = xExtent[1].getTime() - xExtent[0].getTime();
        const minDiff = this.minZoomDays * 24 * 60 * 60 * 1000;
        if(diff < minDiff) {
            const delta = 0.5 * (minDiff - diff); // Delta is the amount of time missing before and after
            xExtent[0] = new Date(xExtent[0].getTime() - delta);
            xExtent[1] = new Date(xExtent[0].getTime() + delta);
        }

        this.x.domain(xExtent);
        this.xt = this.x;
        this.y.domain([0, yMax*1.1]);

        // Fire an initial rangeInit event so that the parent can initialize the currentRange property
        // The setTimeout prevents "expressionChangedAfterCheck" error (since the parent then updates the min/max dates)
        setTimeout(() => this.rangeInit.next(this.xt.domain()));
    }

    /**
     * Update the x and y axes
     */
    protected updateAxes(){
        this.drawXAxis();
        this.drawYAxis();
    }

    /**
     * The events are drawn in the template directly. This method simply
     * updates the grouping of events (when they are close to each other)
     */
    protected updateEvents() {
        this.noEvents = !(this.events && this.events.length > 0)
        this.groupedEvents = this.groupEvents(5);
    }

    /**
     * Update/reset the zoom behavior when new data comes in (and new scales, axes...)
     */
    protected updateZoom() {

        if(!this.zoomable) {
            return;
        }

        // Reset the previous zoom !
        if(this.zoomBehavior){
            this.zoomBehavior.on("zoom", null);
            this.zoomBehavior.on("end", null);
            this.zoomBehavior.transform(this.brush$, zoomIdentity);
        }

        // Compute the minimum and maximum zoom
        const xDomain = this.x.domain();
        const scaleExtent = (xDomain[1].getTime() - xDomain[0].getTime()) / 86400000; // current number of days on the scale

        // Create the behavior
        this.zoomBehavior = zoom()
            .extent([[0, 0], [this.innerWidth, this.innerHeight]])
            .scaleExtent([scaleExtent/this.maxZoomDays, scaleExtent/this.minZoomDays])
            .on("zoom", () => this.onZoom())
            .on("end", () => this.onZoomEnd());

        // Apply on to the brush element
        this.brush$
            .call(this.zoomBehavior)
            .on("mousedown.zoom", null) // Deactivate mouse event (taken by brush)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null);

    }

    /**
     * Updates the brush (or hides it if no currentSelection),
     * following a change of x scale.
     * Number.MIN_VALUE and Number.MAX_VALUE are used to support semi-open intervals
     */
    protected updateBrush() {
        if(this.currentSelection) {
            const x0 = this.currentSelection[0] ? this.xt(this.currentSelection[0])! : Number.MIN_VALUE;
            const x1 = this.currentSelection[1] ? this.xt(this.currentSelection[1])! : Number.MAX_VALUE;
            const selection: [number, number] = [x0,x1];
            this.brush$.call(this.brushBehavior.move, selection);
        }
        else {
            this.brush$.call(this.brushBehavior.move, null);
        }
    }

    /**
     * This method tests whether the input selection is different from the currentSelection
     * and updates it. It returns true if there is actually a change.
     */
    protected updateSelection(): boolean {
        const change = this.checkSelectionChange(this.selection, this.currentSelection);
        this.currentSelection = this.selection;
        return change;
    }

    /**
     * Recreate the x scale and axes (in the event of a language change)
     */
    protected updateXAxis(){
        this.x = scaleUtc()
            .domain(this.x.domain())
            .range(this.x.range());

        this.xt = scaleUtc()
            .domain(this.xt.domain())
            .range(this.xt.range());

        this.drawXAxis();
    }

    /**
     * Draws the X axis
     */
    protected drawXAxis() {
        const nTicks = Math.round(this.width / 100);
        this.xAxis$.call(axisBottom(this.xt).ticks(nTicks));
        this.xAxis$.selectAll(".domain").remove(); // Remove the axis line
    }

    /**
     * Draws the Y axis
     */
    protected drawYAxis() {
        const nTicks = Math.round(this.height / 40);

        const yAxisTicks = this.y.ticks(nTicks)
            .filter(tick => Number.isInteger(tick)); // Keep only integer ticks https://stackoverflow.com/questions/13576906/d3-tick-marks-on-integers-only/56821215

        const yAxis = axisLeft<number>(this.y)
            .tickValues(yAxisTicks)
            .tickFormat(format("~s")); //https://github.com/d3/d3-format
        this.yAxis$.call(yAxis);
        this.yAxis$.selectAll(".domain").remove(); // Remove the axis line
    }

    /**
     * Updates the display of the brush's grips when the brush has moved
     * When the selection is a semi-open interval, we don't display the infinite border
     * @param selection
     */
    protected updateGrips(selection: [number, number] | null) {
        if (!selection) {
            this.grips$.attr("display", "none");
        }
        else {
            this.grips$
                .attr("display", (d, i) => (selection[i] === Number.MAX_VALUE || selection[i] === Number.MIN_VALUE) ? "none" : null)
                .attr("transform", (d, i) => (selection[i] === Number.MAX_VALUE || selection[i] === Number.MIN_VALUE) ? null : "translate(" + selection[i] + ")");
            this.grips$.selectAll<SVGTextElement, {type:string}>('.grip-text')
                .text(
                    (d) => {
                        const index = d.type === 'w'? 0 : 1;
                        return (selection[index] === Number.MAX_VALUE || selection[index] === Number.MIN_VALUE) ? null : this.intlService.formatDate(this.xt.invert(selection[index]))
                    }
                );
        }
    }


    // Interaction callbacks

    onBrush() {
        this.turnoffTooltip();
        this.brushSelection = brushSelection(this.gbrush.nativeElement) as [number, number] | null;
        this.updateGrips(this.brushSelection);
    }

    onBrushEnd(){
        this.brushing = false;
        this.onBrush();
        const newSelection = this.brushSelection
            ?.sort((a,b)=>a-b)
            .map(x => (x === Number.MAX_VALUE || x === Number.MIN_VALUE) ? undefined : this.xt.invert(x));
        if(this.checkSelectionChange(this.currentSelection, newSelection)) {
            this.currentSelection = newSelection;
            this.selectionChange.next(this.currentSelection);
        }
    }

    onZoom(){

        this.turnoffTooltip();

        this.zooming = true;

        // Create a transformed scale without modifying the original (to enforce the limit of scaleExtent)
        const transform = zoomTransform(this.brush$.node() as Element);
        this.xt = transform.rescaleX(this.x);

        // Redraw the axis
        this.drawXAxis();

        // Update the brush position
        if(this.currentSelection){
            const x0 = this.currentSelection[0] ? this.xt(this.currentSelection[0])! : Number.MIN_VALUE;
            const x1 = this.currentSelection[1] ? this.xt(this.currentSelection[1])! : Number.MAX_VALUE;
            const selection: [number, number] = [x0,x1];
            this.brushBehavior.move(this.brush$, selection);
        }

    }

    onZoomEnd(){
        this.zooming = false;

        // At the end of a zoom, we need to reorganize the grouping of events
        this.updateEvents();

        // Fire an event
        this.rangeChange.next(this.xt.domain());
    }

    /**
     * Redraw the simple tooltip (vertical line)
     */
    onMousemove(event: MouseEvent) {
        if(!this.eventsTooltipManager.isShown && this.showTooltip) {
            this.tooltipX = this.point(this.gbrush.nativeElement, event)[0];
            const date = this.xt.invert(this.tooltipX);

            const points = this.data?.map(series => {
                                    if(!series.showDatapoints) return;
                                    const i = this.bisectDate(series.dates, date);
                                    const d0 = series.dates[i - 1];
                                    const d1 = series.dates[i];
                                    if(!d0 || !d1) return;
                                    return date.getTime() - d0.date.getTime() > d1.date.getTime() - date.getTime() ? {...d1, name: series.name} : {...d0, name: series.name};
                                }).filter(p => !!p) || [];

            const {orientation, top, dx} = this.tooltipCoordinates(event);

            const groupBy = (array, property) => array.reduce((grouped, element) => ({
                ...grouped,
                [element[property]]: [...(grouped[element[property]] || []), element]
            }), {})

            const groupedByDate = groupBy(points.filter(pt => !pt?.displayedDate), 'date');
            const groupedByDisplayedDate = groupBy(points.filter(pt => !!pt?.displayedDate), 'displayedDate');

            const data = Array.from(new Set(Object.keys(groupedByDate).concat(Object.keys(groupedByDisplayedDate))))
                            .map((_date) => ({date: _date, values: (groupedByDate[_date] || []).concat((groupedByDisplayedDate[_date] || []))}));

            if (data.length > 0) {
                this.dataPointsTooltipManager.show(data as any as DataPoint[], orientation, top, dx);
            } else {
                this.dataPointsTooltipManager.hide();
            }
        }
    }

    /**
     * Equivalent of former d3.mouse()
     */
    private point(node: SVGGElement, event: MouseEvent) {
        var point = new DOMPoint(event.clientX, event.clientY);
        point = point.matrixTransform(node.getScreenCTM()?.inverse());
        return [point.x, point.y];
    }

    /**
     * Remove the simple tooltip (vertical line)
     */
    onMouseout() {
        if(!this.eventsTooltipManager.isShown) {
            this.tooltipX = undefined
        }
        if (this.dataPointsTooltipManager.isShown) {
            this.dataPointsTooltipManager.hide()
        }
    }

    /**
     * Responds to a click on an event (triangle) by essentially turning tooltip on/off
     * @param event
     */
    onEventClick(event: TimelineEvent[]) {

        if(this.eventsTooltipManager.data === event) {
            this.turnoffTooltip();
        } else {
            this.tooltipX = this.xt(event[0].date);
            const {orientation, top, dx} = this.tooltipCoordinates(undefined);
            this.eventsTooltipManager.show(event, orientation, top, dx);
        }
    }

    private tooltipCoordinates(event: MouseEvent | undefined): {orientation: "right" | "left", top: number, dx: number} {
        // Since we use viewBox to auto-adjust the SVG to the container size, we have to
        // convert from the SVG coordinate system to the HTML coordinate system
        const x = this.margin.left + this.tooltipX!;
        const actualWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
        const scale = actualWidth / this.width;
        const relativeX = x / this.width;

        const mouseTopPosition = event?.offsetY || 0;
        let top = scale * (this.margin.top + 0.3*this.innerHeight); // Align tooltip arrow

        // if the cursor overlaps with the tooltip arrow, move it up/down
        const diff = top - mouseTopPosition;
        if (diff > 0 && diff < 15) {
            top = mouseTopPosition - 15;
        } else if (diff > -15 && diff <= 0) {
            top = mouseTopPosition + 15;
        }

        if (relativeX < 0.5) {
            return {orientation: 'right', top, dx: scale * x};
        } else {
            return {orientation: 'left', top, dx: actualWidth - scale * x}
        }
    }

    /**
     * Turns off the tooltip
     */
    turnoffTooltip = () => {
        this.eventsTooltipManager.hide();
        this.tooltipX = undefined;
    }

    ngOnDestroy(){
        this.intlSubscription.unsubscribe();
    }

    // Utilities

    /**
     * Transforms the input list of events into a list of list, by grouping events within a bin
     * when their dates are close together. This closeness is measured in "pixel per event".
     * Note: this currently uses a histogram-like algorithm, which could probably be improved (clustering?)
     * @param pixPerEvent
     */
    protected groupEvents(pixPerEvent: number): TimelineEvent[][] {
        const events: TimelineEvent[][] = [];

        if(this.events) {
            const nbins = Math.floor(this.innerWidth / pixPerEvent);
            const domain = this.xt.domain();
            const timeinterval = (domain[1].getTime() - domain[0].getTime()) / nbins;
            this.events.concat()
                .sort((a,b) => a.date.getTime() - b.date.getTime())
                .forEach(event => {
                    if(events.length === 0) {
                        events.push([event]);
                    }
                    else {
                        const last = events[events.length-1];
                        const lastbin = Math.floor(last[0].date.getTime() / timeinterval);
                        const bin = Math.floor(event.date.getTime() / timeinterval);
                        if(bin === lastbin) {
                            last.push(event);
                        }
                        else {
                            events.push([event]);
                        }
                    }
                });
        }

        return events;
    }

    /**
     * Return true if there are actual changes in the data
     * (in particular will ignore data refresh which change nothing)
     * @param change
     */
    protected checkDataChanges(change: SimpleChange): boolean {
        const previousValue = change.previousValue as TimelineSeries[] | undefined;
        const currentValue = change.currentValue as TimelineSeries[] | undefined;

        // Ignore null/undefined difference cause by | async
        // See: https://github.com/angular/angular/issues/16982
        if(currentValue === null && previousValue === undefined || currentValue === undefined && previousValue === null)
            return false;

        // Else, if one of them is null/undefined (or difference in length), there's clearly a change
        if(!previousValue || !currentValue || previousValue.length !== currentValue.length)
            return true;

        // If both defined and same size, we need to compare the data piece by piece
        for(let i=0; i<currentValue.length; i++) {

            const previousSeries = previousValue[i];
            const currentSeries = currentValue[i];
            if(previousSeries.name !== currentSeries.name
                || previousSeries.primary !== currentSeries.primary
                || previousSeries.areaStyles !== currentSeries.areaStyles
                || previousSeries.lineStyles !== currentSeries.lineStyles
                || previousSeries.dates.length !== currentSeries.dates.length) {
                return true;
            }
            for(let j=0; j<previousSeries.dates.length; j++) {
                if(previousSeries.dates[j].value !== currentSeries.dates[j].value
                    || previousSeries.dates[j].date.getTime() !== currentSeries.dates[j].date.getTime()){
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Compare the date selections with a second of tolerance (to handle interpolation errors)
     * @param selection1
     * @param selection2
     */
    protected checkSelectionChange(selection1: (Date|undefined)[] | undefined, selection2: (Date|undefined)[] | undefined): boolean {
        return !selection1 && !!selection2 ||
                !!selection1 && !selection2 ||
                !!selection1 && !!selection2 && (Math.floor(((selection1[0]?.getTime()||0) - (selection2[0]?.getTime()||0))/1000) !== 0 ||
                Math.floor(((selection1[1]?.getTime()||0) - (selection2[1]?.getTime()||0))/1000) !== 0);
    }

    /**
     * Returns a string containing the path coordinates of a "grip" to draw on each side of
     * the brush object
     */
    protected drawGrips = (d) => {
        const gripHeight = Math.min(10, Math.max((this.innerHeight) / 8, 4));
        const gripWidth = gripHeight;

        const x = -gripWidth / 2;
        const y = this.innerHeight / 2 - gripHeight / 2;

        const path =
            'M ' + x + ' ' + y +
            ' l ' + -gripWidth + ' ' + gripHeight / 2 +
            ' l ' + gripWidth + ' ' + gripHeight / 2 + ' z ' +
            'M ' + -x + ' ' + y +
            ' l ' + gripWidth + ' ' + gripHeight / 2 +
            ' l ' + -gripWidth + ' ' + gripHeight / 2 + ' z ' +
            'M 0 ' + 0 + ' l 0 ' + this.innerHeight + ' z ';
        return path;
    }

    /**
     * Returns the size of the triangle drawn for one event (or a group of events)
     * @param events
     */
    eventSize(events: TimelineEvent[]): number {
        if(events !== this.eventsTooltipManager.data) {
            return events[0].size || 6;
        }
        else {
            return events[0].sizeOpened || (events[0].size || 6)*2;
        }
    }

    /**
     * Return a string containing the path coordinates of a triangle for a given event (or group of events)
     * @param events
     * @param size
     */
    drawEvents(events: TimelineEvent[], size: number): string {
        const x = this.xt(events[0].date);
        return 'M ' + x + ' ' + (this.innerHeight - 3*size/2) +
            ' l ' + -size + ' ' + (3*size/2) +
            ' l ' + (2*size) + ' ' + 0 + ' z ';
    }
}
