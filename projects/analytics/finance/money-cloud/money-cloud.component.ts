import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Action } from "@sinequa/components/action";
import { AbstractFacet } from "@sinequa/components/facet";
import { SearchService } from "@sinequa/components/search";
import { SelectionService } from "@sinequa/components/selection";
import { ExprBuilder, FormatService, ValueItem } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { AggregationItem, Results } from "@sinequa/core/web-services";

import * as d3 from 'd3';


export interface MoneyCloudDatum {
    value: number;
    currency: string;
    count: number;
    category: string;
    i: number;
    rawvalue: string;
}

@Component({
    selector: 'sq-money-cloud',
    templateUrl: './money-cloud.component.html',
    styleUrls: ['./money-cloud.component.scss']
})
export class MoneyCloudComponent extends AbstractFacet implements OnChanges,AfterViewInit {
    @Input() name = "money-cloud"

    @Input() results: Results;
    /** The "money-value" column stores an entity in the form "(KEYWORD)#(<CURRENCY> <NUMERAL>)", for example "(DEAL)#(USD 69420)" */
    @Input() moneyValueColumn = "value_amount";
    /** The "Money-Value" aggregation must be computed over the money-value column */
    @Input() moneyAggregation = "ValueAmounts";

    @Input() width = 600;
    @Input() height = 200;
    @Input() margin = {top: 15, bottom: 30, left: 40, right: 15};

    @Input() showTooltip = true;
    @Input() theme: "light" | "dark" = "light";

    data: MoneyCloudDatum[];
    categories: string[];

    selectedItems: Set<string>;

    // Scales
    x: d3.ScaleBand<string>; // Read/Write
    x_inner: d3.ScaleLinear<number, number>; // Read/Write
    y: d3.ScaleLogarithmic<number, number>; // Read-only / domain updated
    r: d3.ScaleLogarithmic<number,number>; // Radius (function of counts)
    c: d3.ScaleOrdinal<string, string>; // Color

    // Elements
    @ViewChild("overlay") overlay: ElementRef;
    @ViewChild("xAxis") gx: ElementRef;
    @ViewChild("yAxis") gy: ElementRef;

    // Selections
    xAxis$: d3.Selection<SVGGElement, string, null, undefined>;
    yAxis$: d3.Selection<SVGGElement, number, null, undefined>;
    
    // Tooltips
    tooltipItem: MoneyCloudDatum | undefined;
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
        public selectionService: SelectionService,
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

        this.selectionService.events.subscribe(e => this.updateSelectedItems());
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
            this.x = d3.scaleBand<string>()
                .range([0, this.innerWidth]);
                
            this.x_inner = d3.scaleLinear<number, number>();

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
            .on("mousemove", () => this.onMousemove());
        
        this.viewInit = true;

        this.updateChart();
        
        // This is necessary to prevent "Expression has changed after check" errors
        // caused by calling updateChart inside ngAfterViewInit().
        // Unfortunately this is necessary because we need the DOM to be rendered in order fill the DOM
        // (for example gAxis needs to exist so we can draw the axis)
        this.cdRef.detectChanges();
    }

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

    updateData() {

        this.updateSelectedItems();
        
        const counts = new Map<string, number>();

        this.data = [];
        // Extract number of occurrences from the aggregation
        this.results.aggregations
            ?.find(a => a.name === this.moneyAggregation)
            ?.items
            ?.forEach(item => {
                const datum = this.parseEntity(item, counts);
                if(datum) {
                    this.data.push(datum);
                }
            });

        this.data.forEach(d => d.i = (d.i-0.5) / counts.get(d.category)!); // Normalize i between 0 and 1

    }

    /**
     * Parse the entity stored in the "money-value" column and returns a datum (incl. numerical value and currency)
     */
    @Input()
    parseEntity = (item: AggregationItem, counts: Map<string, number>): MoneyCloudDatum | undefined => {
        const rawvalue = item.value as string;
        const [category, amount] = item.display!.substr(1, item.display!.length-2).split(")#(");
        const [currency, valuestr] = amount.split(" ");
        const value = parseFloat(valuestr);
        // Check the data is valid
        if(isNaN(value) || value <= 0) {
            return undefined;
        }        
        counts.set(category, (counts.get(category) || 0) + 1);
        return {
            value,
            count: item.count,
            category,
            currency,
            rawvalue,
            i: counts.get(category)!
        };
    }

    updateScales() {

        if(this.data.length) {
            const yExtent = d3.extent<MoneyCloudDatum, number>(this.data, d => d.value);
            const rExtent = d3.extent<MoneyCloudDatum, number>(this.data, d => d.count);

            if(!yExtent[0] || !yExtent[1] || !rExtent[0] || !rExtent[1]) {
                return;
            }

            this.x.domain(this.data.map(d => d.category));
            this.x_inner
                .domain([0, 1])
                .range([0, this.x.bandwidth()]);
            this.y.domain(yExtent);
            this.r.domain(rExtent);
            this.c.domain(this.data.map(d => d.currency));

            this.categories = this.x.domain();

        }

    }

    public updateSelectedItems() {
        this.selectedItems = new Set<string>();
        this.selectionService.getSelectedItems().forEach(r => {
            r[this.moneyValueColumn]?.forEach((item: ValueItem) => {
                this.selectedItems.add(item.value as string);
            });
        });
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
        const xAxis = d3.axisBottom(this.x);
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
            .tickSizeInner(-this.innerWidth)
            .tickValues(yAxisTicks)
            .tickFormat(this.formatService.moneyFormatter); //https://github.com/d3/d3-format
        this.yAxis$.call(yAxis);
        //this.yAxis$.selectAll(".domain").remove(); // Remove the axis line
    }

    
    /**
     * Redraw the simple tooltip (vertical line)
     */
    onMousemove() {
        this.tooltipItem = undefined;
    }

    filterDatum(datum: MoneyCloudDatum) {
        const expr = this.exprBuilder.makeExpr(this.moneyValueColumn, datum.rawvalue)
        this.searchService.query.addSelect(expr, this.name);
        this.searchService.search();
    }

    onMouseEnterDatum(datum: MoneyCloudDatum) {

        let x = this.x(datum.category);
        const x_inner = this.x_inner(datum.i);
        const y = this.y(datum.value);
        const r = this.r(datum.count);

        if(Utils.isUndefined(x) || Utils.isUndefined(x_inner) || Utils.isUndefined(r) || Utils.isUndefined(y)) return;

        this.tooltipItem = datum;

        x += x_inner;

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
        }
    }
}