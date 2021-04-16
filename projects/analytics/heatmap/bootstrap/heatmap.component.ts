import { Component, ElementRef, Output, EventEmitter, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';

import * as d3 from 'd3';

export interface HeatmapItem {
    x: string;
    y: string;
    count: number;
    value: string;
    display: string;
    selected?: boolean;
}

@Component({
    selector: "sq-heatmap",
    templateUrl: "./heatmap.component.html",
    styleUrls: ['./heatmap.component.scss']
})
export class BsHeatmapComponent implements OnChanges, AfterViewInit {
    /**
     * Raw data to display (will be filtered in function of maxX and maxY parameters)
     */
    @Input() data: HeatmapItem[];

    // Graphical parameters
    @Input() height = 600;
    @Input() width = 600;
    @Input() margin = {top: 100, bottom: 20, left: 100, right: 40};
    @Input() transition = 1000; // Transition time in ms (0 to avoid transitions)

    // Interaction parameters
    @Input() itemsClickable = true;
    @Input() axisClickable = true;

    // Axis/Scales parameters
    @Input() buckets = 9; // Color buckets
    @Input() colorScheme = "schemeBlues"; // Color scheme from D3
    @Input() maxX = 20; // Max items on X
    @Input() maxY = 20; // Max items on Y
    @Input() theme: "light" | "dark" = "light";
    
    // Events from user interactions
    @Output() itemClicked = new EventEmitter<HeatmapItem>();
    @Output() axisClicked = new EventEmitter<{value: string, axis: 'x' | 'y'}>();

    // D3 Scales
    x: d3.ScaleBand<string>;
    y: d3.ScaleBand<string>;
    color: d3.ScaleQuantile<string>;

    // Axes
    @ViewChild("xAxis") gx: ElementRef;
    @ViewChild("yAxis") gy: ElementRef;
    xAxis: d3.Selection<SVGGElement, string, null, undefined>;
    yAxis: d3.Selection<SVGGElement, string, null, undefined>;
    
    // Data actually displayed
    dataFiltered: HeatmapItem[] = [];

    // Tooltip    
    tooltipItem?: HeatmapItem;
    tooltipOrientation: "left" | "right";
    tooltipTop: number;
    tooltipRight: number;
    tooltipLeft: number;

    // Misc
    viewInit: boolean;
    originalCount: number;

    constructor(
        private el: ElementRef
    ){}

    /**
     * ngOnChanges is used to respond to changes in the data (or chart parameter)
     */
    ngOnChanges() {

        this.data = this.data || [];

        // Pre-process data
        const xLabels = Array.from(new Set(this.data.map(value => value.x))).slice(0, this.maxX);
        const yLabels = Array.from(new Set(this.data.map(value => value.y))).slice(0, this.maxY);
        this.dataFiltered = this.data.filter(value => xLabels.includes(value.x) && yLabels.includes(value.y));

        // Create scales
        this.x = d3.scaleBand<string>()
            .domain(xLabels)
            .range([0, this.width-this.margin.left-this.margin.right]);

        this.y = d3.scaleBand<string>()
            .domain(yLabels)
            .range([0, this.height-this.margin.top-this.margin.bottom]);

        this.color = d3.scaleQuantile<string>()
            .domain(this.dataFiltered.map(item => item.count))
            .range(d3[this.colorScheme][this.buckets]);

        // Note: ngOnChanges is always called once, before ngAfterViewInit
        if(this.viewInit) {
            this.buildChart(!!this.transition);
        }
    }

    // Note: In onAfterViewInit we can access gx and gy, obtained with @ViewChild.
    // At this point we can call buildChart()
    ngAfterViewInit(){
        this.xAxis = d3.select(this.gx.nativeElement);
        this.yAxis = d3.select(this.gy.nativeElement);
        this.viewInit = true;

        this.buildChart();
    }
    
    /**
     * buildChart() actually only builds the axes of the chart, since the
     * rest is build automatically with Angular syntax in the template.
     * We build axis programmatically (with D3 selects) to benefit from the
     * D3 abstractions and transitions.
     * @param update 
     */
    buildChart(update?: boolean){
                    
        if(update){
            const t = d3.transition().duration(this.transition) as d3.Transition<any, any, any, any>;
    
            this.xAxis.transition(t)
                .call(d3.axisTop<string>(this.x).tickSize(0))
                .on("end", () => this.xAxis.selectAll<SVGTextElement, string>('text').each(this.wrap));

            this.yAxis.transition(t)
                .call(d3.axisLeft<string>(this.y).tickSize(0))
                .on("end", () => this.yAxis.selectAll<SVGTextElement, string>('text').each(this.wrap));
            
        }
        else {
            this.xAxis.call(d3.axisTop<string>(this.x).tickSize(0));
            this.yAxis.call(d3.axisLeft<string>(this.y).tickSize(0));
        }

        this.xAxis.selectAll(".domain").remove(); // Remove the axis line
        this.xAxis.selectAll<SVGTextElement, string>("text")  // Tilt the text
            .attr("transform", "rotate(-35)")
            .style("text-anchor", "start")
            .each(this.wrap)
            .on("click", d => this.onAxisClicked(d, 'x'));

        this.yAxis.selectAll(".domain").remove(); // Remove the axis line
        this.yAxis.selectAll<SVGTextElement, string>("text")
            .each(this.wrap)
            .on("click", d => this.onAxisClicked(d, 'y'));
    }

    /**
     * Called when the user hovers the mouse over a heatmap tile
     * @param item 
     * @param event 
     */
    onMouseOver(item: HeatmapItem, event: MouseEvent){
        this.tooltipItem = item;

        const x = this.x(item.x) as number;
        const y = this.y(item.y) as number;

        // Since we use viewBox to auto-adjust the SVG to the container size, we have to
        // convert from the SVG coordinate system to the HTML coordinate system
        const actualWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
        const scale = actualWidth / this.width;
        const relativeX = x / this.width;

        // Tooltip to the right
        if(relativeX < 0.5) {
            this.tooltipOrientation = "right";
            this.tooltipLeft = scale * (this.margin.left + x + this.x.bandwidth() - 3);
        }
        // Tooltip to the left
        else {
            this.tooltipOrientation = "left";
            this.tooltipRight = actualWidth - scale * (this.margin.left + x + 3);
        }
        this.tooltipTop = scale * (this.margin.top + y + 0.5*this.y.bandwidth()); // Align tooltip arrow
    }

    /**
     * Called when the user clicks on a heatmap tile
     * @param item 
     */
    onItemClicked(item: HeatmapItem){
        if(this.itemsClickable){
            this.itemClicked.next(item);
        }
    }

    /**
     * Called when the user clicks on an axis item
     * @param value 
     * @param axis 
     */
    onAxisClicked(value: string, axis: 'x' | 'y'){
        if(this.axisClickable){
            this.axisClicked.next({axis: axis, value: value});
        }
    }

    /**
     * Builds the list of legend items
     */
    getLegend() {
        const legend: {x: number, width: number, color: string, start: number}[] = [];
        const quantiles = this.color.quantiles();
        const bucketWidth = (this.width - this.margin.left - this.margin.right) / this.buckets;
        for(let i=0; i < this.buckets; i++){
            const color = this.color(i===0? 0 : quantiles[i-1]);
            if(i === 0 || color !== legend[legend.length-1].color){
                legend.push({
                    x: legend.length * bucketWidth,
                    width: bucketWidth,
                    color: color,
                    start: i===0? 0 : quantiles[i-1]
                });
            }
        }
        return legend;
    }

    /**
     * Truncates the axis strings to fit inside 90px width
     */
    wrap = (d: string, i: number, nodes: SVGTextElement[] | ArrayLike<SVGTextElement>) => {
        const self = d3.select(nodes[i]);
        let textLength = nodes[i].getComputedTextLength();
        let text = self.text();
        const fullText = self.text();
        while (textLength > 90 && text.length > 0) {
          text = text.slice(0, -1)
          self.text(text + '...');
          textLength = nodes[i].getComputedTextLength();
        }
        self.append('svg:title').text(fullText);
    };
}
