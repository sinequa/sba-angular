import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { ExprBuilder } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Results, Record } from "@sinequa/core/web-services";
import { FormatService } from "@sinequa/core/app-utils";

import * as d3 from 'd3';

export interface MoneyDatum {
    value: number;
    currency: string;
    count: number;
    date: Date;
    rawvalue: string;
    record: Record;
}

@Component({
    selector: 'sq-money-timeline',
    templateUrl: './money-timeline.component.html',
    styleUrls: ['./money-timeline.component.scss']
})
export class MoneyTimelineComponent extends AbstractFacet implements OnChanges,AfterViewInit {
    @Input() name = "money-timeline"

    @Input() results: Results;
    /** The "money" column stores an entity in the form "<CURRENCY> <NUMERAL>", for example "USD 69420" */
    @Input() moneyColumn = "money";
    /** The "Money" aggregation must be computed over the money column */
    @Input() moneyAggregation = "Money";

    @Input() width = 600;
    @Input() height = 200;
    @Input() margin = {top: 15, bottom: 30, left: 40, right: 15};

    /** Displays a tooltip showing the current date */
    @Input() showTooltip = true;
    @Input() theme: "light" | "dark" = "light";

    @Output() recordClicked = new EventEmitter<Record>();

    data: MoneyDatum[];

    // Scales
    x: d3.ScaleTime<number, number>; // Read/Write
    y: d3.ScaleLogarithmic<number, number>; // Read-only / domain updated
    r: d3.ScaleLogarithmic<number,number>;
    c: d3.ScaleOrdinal<string, string>;

    // Elements
    @ViewChild("overlay") overlay: ElementRef;
    @ViewChild("xAxis") gx: ElementRef;
    @ViewChild("yAxis") gy: ElementRef;

    // Selections
    xAxis$: d3.Selection<SVGGElement, Date, null, undefined>;
    yAxis$: d3.Selection<SVGGElement, number, null, undefined>;
    
    // Tooltips
    tooltipX: number | undefined;
    tooltipItem: MoneyDatum | undefined;
    tooltipOrientation: "left" | "right";
    tooltipTop: number;
    tooltipRight: number;
    tooltipLeft: number;

    viewInit: boolean;
    
    clearFilters: Action;

    constructor(
        private el: ElementRef,
        protected cdRef: ChangeDetectorRef,
        public searchService: SearchService,
        public exprBuilder: ExprBuilder,
        public formatService: FormatService
    ){
        super();

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.searchService.query.removeSelect(this.name, true);
                this.searchService.search();
            }
        });
    }

    get actions(): Action[] {
        const actions: Action[] = [];
        if(this.searchService.query.findSelect(this.name)){
            actions.push(this.clearFilters);
        }
        return actions;
    }

    get innerWidth(): number {
        return this.width - this.margin.left - this.margin.right;
    }

    get innerHeight(): number {
        return this.height - this.margin.top - this.margin.bottom;
    }

    ngOnChanges(changes: SimpleChanges) {

        if(!this.x) {
            
            // Scales
            this.x = d3.scaleUtc()
                .range([0, this.innerWidth]);

            this.y = d3.scaleLog()
                .range([this.innerHeight, 0]);

            this.r = d3.scaleLog()
                .range([4, 10]);

            this.c = d3.scaleOrdinal<string>()
                .range(d3.schemeCategory10);
                
        }
        
        // Resize handling

        if(changes["height"]) {
            this.y.range([this.innerHeight, 0]);
            if(this.viewInit) {
                this.drawYAxis();
            }
        }

        if(changes["width"]) {
            this.x.range([0, this.innerWidth]);
            if(this.viewInit) {
                this.drawXAxis();
            }
        }

        if(this.viewInit && changes["results"] && this.results){
            this.updateChart();
        }
    }

    ngAfterViewInit() {
        
        // Get native elements
        this.xAxis$ = d3.select(this.gx.nativeElement);
        this.yAxis$ = d3.select(this.gy.nativeElement);

        d3.select(this.overlay.nativeElement)        
            .on("mousemove", () => this.onMousemove())
            .on("mouseout", () => this.onMouseout());
        
        this.viewInit = true;

        this.updateChart();
        
        // This is necessary to prevent "Expression has changed after check" errors
        // caused by calling updateChart inside ngAfterViewInit().
        // Unfortunately this is necessary because we need the DOM to be rendered in order fill the DOM
        // (for example gAxis needs to exist so we can draw the axis)
        this.cdRef.detectChanges();
    }

    /**
     * Recomputes the data to display and update the chart's primitives
     */
    updateChart() {

        this.turnoffTooltip();

        if(this.results) {
            
            this.updateData();

            // Update scales
            this.updateScales();

            // Update Axes
            this.updateAxes();

        }
    }

    /**
     * Computes the data displayed in the chart in function of the raw data provided as input
     */
    updateData() {
        
        // Extract number of occurrences from the aggregation
        const counts = new Map<string,number>();
        this.results.aggregations
            ?.find(a => Utils.eqNC(a.name, this.moneyAggregation))
            ?.items
            ?.forEach(item => counts.set(item.value.toString(), item.count));

        this.data = [];
        this.results.records?.forEach(record =>
            record?.[this.moneyColumn]?.forEach(money => {
                const datum = this.parseEntity(money.value, record, counts.get(money.value) || 1);
                if(datum) {
                    this.data.push(datum);
                }
            })
        );

    }

    /**
     * Parse the entity stored in the "money" column and returns a datum (incl. numerical value and currency)
     */
    @Input()
    parseEntity = (rawvalue: string, record: Record, count): MoneyDatum | undefined => {
        const val = rawvalue.split(" "); // Split "USD 1000"
        // Check the data is valid
        if(!record.modified || isNaN(val[1] as any) || parseFloat(val[1]) <= 0) {
            return undefined;
        }
        return {
            value: parseFloat(val[1]),
            currency: val[0],
            date: new Date(record.modified),
            count,
            rawvalue,
            record
        };
    }

    /**
     * Update the axis domains in function of the data
     */
    updateScales() {

        if(this.data.length) {
            const xExtent = d3.extent<MoneyDatum, Date>(this.data, d => d.date);
            const yExtent = d3.extent<MoneyDatum, number>(this.data, d => d.value);
            const rExtent = d3.extent<MoneyDatum, number>(this.data, d => d.count);

            if(!xExtent[0] || !xExtent[1] || !yExtent[0] || !yExtent[1] || !rExtent[0] || !rExtent[1]) {
                return;
            }

            this.x.domain(xExtent);
            this.y.domain(yExtent);
            this.r.domain(rExtent);
            this.c.domain(this.data.map(d => d.record.id));
        }

    }
    
    /**
     * Update the x and y axes
     */
    protected updateAxes(){
        this.drawXAxis();
        this.drawYAxis();
    }

    /**
     * Draws the X axis
     */
     protected drawXAxis() {
        const xAxis = d3.axisBottom(this.x)
            .ticks(5);
        this.xAxis$.call(xAxis);
        //this.xAxis$.selectAll(".domain").remove(); // Remove the axis line
    }

    /**
     * Draws the Y axis
     */
    protected drawYAxis() {
        const yAxisTicks = this.y.ticks(5)
            .filter(tick => Number.isInteger(tick)); // Keep only integer ticks https://stackoverflow.com/questions/13576906/d3-tick-marks-on-integers-only/56821215

        const yAxis = d3.axisLeft<number>(this.y)
            .tickValues(yAxisTicks)
            .tickFormat(this.formatService.moneyFormatter); //https://github.com/d3/d3-format
        this.yAxis$.call(yAxis);
        //this.yAxis$.selectAll(".domain").remove(); // Remove the axis line
    }

    
    /**
     * Redraw the simple tooltip (vertical line)
     */
    onMousemove() {
        if(!this.tooltipItem && this.showTooltip) {
            this.tooltipX = d3.mouse(this.overlay.nativeElement)[0];
        }
        this.tooltipItem = undefined;
    }

    /**
     * Notify parent component that a record was clicked
     * @param datum
     */
    onRecordClicked(datum: MoneyDatum) {
        this.recordClicked.next(datum.record);
    }

    /**
     * Filter the search results with the clicked amount of money
     * @param datum 
     */
    filterDatum(datum: MoneyDatum) {
        const expr = this.exprBuilder.makeExpr(this.moneyColumn, datum.rawvalue, `${datum.currency} ${this.formatService.moneyFormatter(datum.value)}`)
        this.searchService.query.addSelect(expr, this.name);
        this.searchService.search();
    }

    /**
     * Remove the simple tooltip (vertical line)
     */
    onMouseout() {
        if(!this.tooltipItem) {
            this.tooltipX = undefined;
        }
    }

    /**
     * Compute the tooltip position when an amount of money is hovered
     * @param datum 
     */
    onMouseEnterDatum(datum: MoneyDatum) {

        const x = this.x(datum.date);
        const y = this.y(datum.value);
        const r = this.r(datum.count);

        if(!this.showTooltip || Utils.isUndefined(x) || Utils.isUndefined(r) || Utils.isUndefined(y)) return;

        this.tooltipItem = datum;

        // Since we use viewBox to auto-adjust the SVG to the container size, we have to
        // convert from the SVG coordinate system to the HTML coordinate system
        const actualWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
        const scale = actualWidth / this.width;
        const relativeX = x / this.width;

        // Tooltip to the right
        if(relativeX < 0.5) {
            this.tooltipOrientation = "right";
            this.tooltipLeft = scale * (this.margin.left + x + r);
        }
        // Tooltip to the left
        else {
            this.tooltipOrientation = "left";
            this.tooltipRight = actualWidth - scale * (this.margin.left + x - r);
        }
        this.tooltipTop = scale * (this.margin.top + y); // Align tooltip arrow
    }
    
    /**
     * Turns off the tooltip
     */
    turnoffTooltip = () => {
        if(this.tooltipItem) {
            this.tooltipItem = undefined;
            this.tooltipX = undefined;
        }
    }
}