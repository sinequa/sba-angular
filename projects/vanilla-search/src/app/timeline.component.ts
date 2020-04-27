import { Component, Input, Output, ElementRef, ViewChild, OnChanges, AfterViewInit, EventEmitter, SimpleChanges, OnDestroy, SimpleChange, ContentChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { IntlService } from '@sinequa/core/intl';

import * as d3 from 'd3';


export interface TimelineDate {
    date: Date;
    value: number;
}

export interface TimelineSeries {
    name: string;
    dates: TimelineDate[];
    primary: boolean;
    lineStyles?: {[key:string]: any};
    areaStyles?:  {[key:string]: any};
}

export interface TimelineEvent {
    date: Date;
    id: string;
    display: string;
    size?: number;
    sizeOpened?: number;
    styles?: {[key:string]: any};
}

@Component({
    selector: 'sq-timeline2',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss']
})
export class BsTimelineComponent implements OnChanges, AfterViewInit, OnDestroy {

    @Input() data?: TimelineSeries[];
    @Input() events?: TimelineEvent[];

    @Input() selection?: [Date, Date];

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

    @Output() selectionChange = new EventEmitter<Date[]>();
    @Output() rangeChange = new EventEmitter<Date[]>();

    @ContentChild("tooltipTpl", {static: false}) tooltipTpl: TemplateRef<any>;

    // Scales
    x: d3.ScaleTime<number, number>; // Read/Write
    xt: d3.ScaleTime<number, number>; // Transformed X axis due to Zoom
    y: d3.ScaleLinear<number, number>; // Read-only / domain updated

    // Axes
    yAxis: d3.Axis<number>; // Read only

    // Shapes
    area: d3.Area<TimelineDate>; // Read only
    line: d3.Line<TimelineDate>; // Read only
    zeroArea: d3.Area<TimelineDate>; // Read only / x updated
    zeroLine: d3.Line<TimelineDate>; // Read only / x updated

    // Behaviors
    brushBehavior: d3.BrushBehavior<any>; // Read only
    zoomBehavior: d3.ZoomBehavior<any,any>; // Read/Write
    brushSelection: [number, number] | null;
    currentSelection?: Date[]; // Read/Write

    // Elements
    @ViewChild("xAxis") gx: ElementRef;
    @ViewChild("yAxis") gy: ElementRef;
    @ViewChild("areas") gareas: ElementRef;
    @ViewChild("events") gevents: ElementRef;
    @ViewChild("brush") gbrush: ElementRef;
    
    // Selections
    xAxis$: d3.Selection<SVGGElement, Date, null, undefined>;
    yAxis$: d3.Selection<SVGGElement, number, null, undefined>;
    areas$: d3.Selection<SVGGElement, TimelineSeries, null, undefined>;
    events$: d3.Selection<SVGGElement, TimelineEvent[], null, undefined>;
    brush$: d3.Selection<SVGGElement, undefined, null, undefined>;
    grips$: d3.Selection<SVGGElement, {type: string}, SVGGElement, undefined>;
        
    // Tooltip
    tooltipItem: TimelineEvent[] | undefined;
    tooltipX: number | undefined;
    tooltipOrientation: "left" | "right";
    tooltipTop: number;
    tooltipRight: number;
    tooltipLeft: number;

    // Misc
    viewInit: boolean;
    _intlSubscription: Subscription;
    previousStateHadData: boolean;
    static counter = 0;
    instance: number;
    
    zooming: boolean;
    brushing: boolean;

    constructor(
        private el: ElementRef,
        protected intlService: IntlService,
    ){
        // When the locale changes, we rebuild the X scale and axis
        this._intlSubscription = this.intlService.events.subscribe(e => this.updateXAxis());
        
        this.instance = BsTimelineComponent.counter++;        
    }

    get innerWidth(): number {
        return this.width - this.margin.left - this.margin.right;
    }

    get innerHeight(): number {
        return this.height - this.margin.top - this.margin.bottom;
    }

    // Note: ngOnChanges is always called once before ngAfterViewInit
    ngOnChanges(changes: SimpleChanges) {

        // If the parent changes the selection, we want to update it
        // If not, we keep the current selection as is
        // (Important to keep this statement outside of the if bellow since 
        // the change of selection can be combined with a change of data)
        let selectionChanged = changes["selection"] && this.updateSelection();

        // Only changes in data result in redrawing the chart
        // (other input, except selection, are expected to be static)
        if(this.viewInit && changes["data"] && this.checkDataChanges(changes["data"])){
            this.updateChart();
        }

        // If the parent changes the selection or events (even though the data hasn't changed), 
        // we want to update them.
        // If not, we keep the current selection and events as is.
        // We can update the brush/events only if the view is initialized (viewInit).
        else if(this.viewInit) {

            if(changes["selection"] && selectionChanged){
                this.updateBrush();
            }

            if(changes["events"]) {
                this.updateEvents();
            }
        }
        
    }

    // Note: In onAfterViewInit we can access gx, gy, etc., obtained with @ViewChild.
    // At this point we can initialize all the primitives and call updateChart()
    ngAfterViewInit() {

        // Get native elements
        this.xAxis$ = d3.select(this.gx.nativeElement);
        this.yAxis$ = d3.select(this.gy.nativeElement);
        this.areas$ = d3.select(this.gareas.nativeElement);
        this.events$ = d3.select(this.gevents.nativeElement);
        this.brush$ = d3.select(this.gbrush.nativeElement);

        // Scales
        this.x = d3.scaleUtc()
            .range([0, this.innerWidth]);
        this.xt = this.x;

        this.y = d3.scaleLinear()
            .range([this.innerHeight, 0]);
            
        // Axes
        this.yAxis = d3.axisLeft<number>(this.y)
            .tickFormat(d3.format(".2s"));

        // Shapes
        this.area = d3.area<TimelineDate>()
            .curve(d3[this.curveType])
            .x(d => this.xt(d.date))
            .y0(this.y(0))
            .y1(d => this.y(d.value));
            
        this.line = d3.line<TimelineDate>()
            .curve(d3[this.curveType])
            .x(d => this.xt(d.date))
            .y(d => this.y(d.value));
            
        this.zeroArea = d3.area<TimelineDate>()
            .curve(d3[this.curveType])
            .x(d => this.xt(d.date))
            .y0(this.y(0))
            .y1(this.y(0));

        this.zeroLine = d3.line<TimelineDate>()
            .curve(d3[this.curveType])
            .x(d => this.xt(d.date))
            .y(this.y(0));
            
        // Behaviors
        this.brushBehavior = d3.brushX()
            .extent([[0, 0], [this.innerWidth, this.innerHeight]])
            .on("start", () => this.brushing = true)
            .on('brush', () => this.onBrush())
            .on('end', () => this.onBrushEnd());
        
        this.brush$
            .call(this.brushBehavior)
            .on("mousemove", () => this.onMousemove())
            .on("mouseout", () => this.onMouseout());
                        
        // Add 2 "grips" to the brush goup, on each side of the rectangle
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
    }

    /**
     * Redraw the graph
     */
    updateChart() {

        this.turnoffTooltip();

        // We don't want to animate curves and axes from the default scale
        if(this.previousStateHadData){
            const xCurrent = this.xt.copy();
            this.zeroArea.x(d => xCurrent(d.date));
            this.zeroLine.x(d => xCurrent(d.date));
        }

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

            this.previousStateHadData = true;
        }
        // If no data, we don't update the scale & axes (and the brush and zoom are hidden)
        else {
            this.previousStateHadData = false;
        }

        this.updateShapes();
        
        this.updateEvents();
    }


    /**
     * Update the x & y scales, based on the input data
     * @param data 
     */
    protected updateScales(data: TimelineSeries[]) {
        
        // Set x and y scales with the primary series (or first one)
        const primarySeries = data.find(s => s.primary) || data[0];

        const xExtent = d3.extent<TimelineDate, Date>(primarySeries.dates, d => d.date);
        const yMax = d3.max<TimelineSeries, number>(data, 
            s => d3.max<TimelineDate, number>(s.dates, d => d.value));

        if(!xExtent[0] || !xExtent[1] || !yMax) {
            console.error('Invalid timeseries', primarySeries);
            this.x.domain(this.xt.domain());
            this.xt = this.x;
            return;
        }

        if(this.minDate) {
            xExtent[0] = this.minDate;
        }

        if(this.maxDate) {
            xExtent[1] = this.maxDate;
        }

        this.x.domain(xExtent);
        this.xt = this.x;
        this.y.domain([0, yMax*1.1]);
    }

    /**
     * Update the x and y axes
     */
    protected updateAxes(){
        this.xAxis$.call(d3.axisBottom<Date>(this.x));
        this.xAxis$.selectAll(".domain").remove(); // Remove the axis line

        this.yAxis$.interrupt();
        this.yAxis$.call(this.yAxis);
        this.yAxis$.selectAll(".domain").remove(); // Remove the axis line
    }

    /**
     * Update the areas and lines
     */
    protected updateShapes() {
        
        // Selection of series g groups
        this.areas$.selectAll<SVGGElement, TimelineSeries>('.series')
            .data(this.data || [], d => d.name)
            .join<SVGGElement>(
                
                enter => {
                    const gseries = enter.append("g")
                        .attr("class", "series");
                    
                    const area = gseries
                        .append<SVGPathElement>("path")
                        .attr("class", "area")
                        .attr("d", d => this.area(d.dates));

                    this.applyStyles<TimelineSeries>(area, d => d.areaStyles);

                    const line = gseries
                        .append<SVGPathElement>("path")
                        .attr("class", "line")
                        .attr("d", d => this.line(d.dates));
                        
                    this.applyStyles<TimelineSeries>(line, d => d.lineStyles);

                    return gseries;
                },

                update => {
                    const area = update.select<SVGPathElement>(".area")
                        .attr("d", d => this.area(d.dates));

                    this.applyStyles<TimelineSeries>(area, d => d.areaStyles);

                    const line = update.select<SVGPathElement>(".line")
                        .attr("d", d => this.line(d.dates));
                    
                    this.applyStyles<TimelineSeries>(line, d => d.lineStyles);

                    return update;
                },

                exit => {
                    exit.remove();
                }
            );
    }

    
    protected updateEvents() {

        const events = this.groupEvents(5);

        this.events$.selectAll<SVGPathElement, TimelineEvent[]>('.event')
            .data<TimelineEvent[]>(events, d => d[0].id)
            .join<SVGPathElement, TimelineEvent[]>(               
                enter => {
                    const _enter = enter.append("path")
                        .attr("class", "event")
                        .attr("d", d => this.drawTriangle(d));

                    this.applyStyles<TimelineEvent[]>(_enter, d => d[0].styles);

                    _enter.on("click", (d,i,nodes) => this.onEventClick(d,i,nodes));

                    return _enter;
                },
                update => {
                    
                    update.attr("d", d => this.drawTriangle(d));
                        
                    this.applyStyles<TimelineEvent[]>(update, d => d[0].styles);
            
                    return update;
                },
                exit => exit.remove()
            );
    }

    /**
     * Update/reset the zoom behavior when new data comes in (and new scales, axes...)
     */
    protected updateZoom() {

        // Reset the previous zoom !
        if(this.zoomBehavior){
            this.zoomBehavior.on("zoom", null);
            this.zoomBehavior.on("end", null);
            this.zoomBehavior.transform(this.brush$, d3.zoomIdentity);
        }
        
        // Compute the minimum and maximum zoom
        const xDomain = this.x.domain();
        const scaleExtent = (xDomain[1].getTime() - xDomain[0].getTime()) / 86400000; // current number of days on the scale

        // Create the behavior
        this.zoomBehavior = d3.zoom()
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
     */
    protected updateBrush() {
        if(this.currentSelection) {
            const selection: [number, number] = [this.xt(this.currentSelection[0]), this.xt(this.currentSelection[1])];
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
        let change = this.checkSelectionChange(this.selection, this.currentSelection);
        this.currentSelection = this.selection;
        return change;
    }

    /**
     * Recreate the x scale and axes (in the event of a language change)
     */
    protected updateXAxis(){        
        this.x = d3.scaleUtc()
            .domain(this.x.domain())
            .range(this.x.range());
        
        this.xt = d3.scaleUtc()
            .domain(this.xt.domain())
            .range(this.xt.range());

        this.xAxis$.call(d3.axisBottom(this.xt));
        this.xAxis$.selectAll(".domain").remove(); // Remove the axis line   
    }

    /**
     * Updates the display of the brush's grips when the brush has moved
     * @param selection 
     */
    protected updateGrips(selection: [number, number] | null) {
        if (!selection) {
            this.grips$.attr("display", "none");
        }
        else {
            this.grips$
                .attr("display", null)
                .attr("transform", (d, i) => "translate(" + selection[i] + ")");
            this.grips$.selectAll<SVGTextElement, {type:string}>('.grip-text')
                .text(d => this.intlService.formatDate(this.xt.invert(selection[d.type === 'w'? 0 : 1])));
        }
    }


    // Interaction callbacks

    onBrush() {
        this.turnoffTooltip();
        this.brushSelection = d3.brushSelection(this.gbrush.nativeElement) as [number, number] | null;
        this.updateGrips(this.brushSelection);
    }

    onBrushEnd(){
        this.brushing = false;
        this.onBrush();
        const newSelection = this.brushSelection ? this.brushSelection.sort((a,b)=>a-b).map(this.xt.invert) : undefined;
        if(this.checkSelectionChange(this.currentSelection, newSelection)) {
            this.currentSelection = newSelection;
            this.selectionChange.next(this.currentSelection);
        }
    }    

    onZoom(){
        if(!this.zoomable) {
            return;
        }

        this.turnoffTooltip();

        this.zooming = true;

        // Create a transformed scale without modifying the original (to enforce the limit of scaleExtent)
        const transform = d3.zoomTransform(this.brush$.node() as Element);
        this.xt = transform.rescaleX(this.x);

        // Redraw the axis
        this.xAxis$.call(d3.axisBottom(this.xt));
        this.xAxis$.selectAll(".domain").remove(); // Remove the axis line

        // Redraw the data
        this.areas$.selectAll<SVGPathElement, TimelineSeries>('.series .area')
            .attr("d", d => this.area(d.dates));

        this.areas$.selectAll<SVGPathElement, TimelineSeries>('.series .line')
            .attr("d", d => this.line(d.dates));

        // Redraw the events
        this.events$.selectAll<SVGPathElement, TimelineEvent[]>(".event")
            .attr("d", d => this.drawTriangle(d));
            
        // Update the brush position
        if(this.currentSelection){
            const selection: [number, number] = [this.xt(this.currentSelection[0]), this.xt(this.currentSelection[1])];
            this.brushBehavior.move(this.brush$, selection);
        }

    }

    onZoomEnd(){
        this.zooming = false;

        this.updateEvents();

        // Fire an event
        this.rangeChange.next(this.xt.domain());
    }

    onMousemove() {
        if(!this.tooltipItem && this.showTooltip) {
            this.tooltipX = d3.mouse(this.gbrush.nativeElement)[0];
        }
    }

    onMouseout() {
        if(!this.tooltipItem) {
            this.tooltipX = undefined
        }
    }

    onEventClick(event: TimelineEvent[], i: number, nodes: SVGPathElement[] | ArrayLike<SVGPathElement>) {
        const marker = d3.select<SVGPathElement, TimelineEvent[]>(nodes[i]);

        if(this.tooltipItem === event) {
            this.turnoffTooltip();
        }

        else {

            if(this.tooltipItem) {
                this.turnoffTooltip();
            }

            this.tooltipItem = event;
            this.tooltipX = this.xt(event[0].date);

            marker.attr("d", d => this.drawTriangle(d, d[0].sizeOpened || (d[0].size || 6)*2));

            // Since we use viewBox to auto-adjust the SVG to the container size, we have to
            // convert from the SVG coordinate system to the HTML coordinate system
            const x = this.margin.left + this.tooltipX;
            const actualWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
            const scale = actualWidth / this.width;
            const relativeX = x / this.width;

            // Tooltip to the right
            if(relativeX < 0.5) {
                this.tooltipOrientation = "right";
                this.tooltipLeft = scale * x;
            }
            // Tooltip to the left
            else {
                this.tooltipOrientation = "left";
                this.tooltipRight = actualWidth - scale * x;
            }
            this.tooltipTop = scale * (this.margin.top + 0.3*this.innerHeight); // Align tooltip arrow

        }
    }

    turnoffTooltip = () => {
        if(this.tooltipItem) {    
            this.events$.selectAll<SVGPathElement, TimelineEvent[]>('.event')
                .filter(d => d === this.tooltipItem)
                .attr("d", d => this.drawTriangle(d));

            this.tooltipItem = undefined;
            this.tooltipX = undefined;
        }
    }

    ngOnDestroy(){
        this._intlSubscription.unsubscribe();
    }

    // Utilities

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
    protected checkSelectionChange(selection1: Date[] | undefined, selection2: Date[] | undefined): boolean {
        return !selection1 && !!selection2 ||
              !!selection1 && !selection2 ||
              !!selection1 && !!selection2 && 
                (Math.floor((selection1[0].getTime() - selection2[0].getTime())/1000) !== 0 ||
                 Math.floor((selection1[1].getTime() - selection2[1].getTime())/1000) !== 0);
    }
    
    protected applyStyles<Datum>(selection: d3.Selection<SVGPathElement, Datum, SVGGElement, Datum>, stylesAccessor: (d:Datum) => ({[key:string]: any} | undefined)){
        selection.each(function(d: Datum){
            const styles = stylesAccessor(d);
            if(styles){
                Object.entries(styles).forEach(e => {
                    d3.select(this).style(e[0], e[1]);
                });
            }
        });
    }

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

    protected drawTriangle = (d: TimelineEvent[], size?: number) => {
        const x = this.xt(d[0].date);
        size = size || d[0].size || 6;
        return 'M ' + x + ' ' + (this.innerHeight - 3*size/2) +
            ' l ' + -size + ' ' + (3*size/2) +
            ' l ' + (2*size) + ' ' + 0 + ' z ';
    }
}