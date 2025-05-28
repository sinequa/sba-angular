import { Component, ElementRef, Output, EventEmitter, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { axisLeft, axisTop } from 'd3-axis';
import { scaleBand, scaleQuantile } from 'd3-scale';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { schemeBlues, schemeReds, schemeGreens, schemeRdBu, schemeSpectral, schemeYlGnBu } from 'd3-scale-chromatic';
import { TooltipManager } from '@sinequa/analytics/tooltip';

export interface HeatmapItem {
    x: {value: string, display: string};
    y: {value: string, display: string};
    count: number;
    selected?: boolean;
}

export const colorSchemes = {
  schemeBlues,
  schemeReds,
  schemeGreens,
  schemeRdBu,
  schemeSpectral,
  schemeYlGnBu
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
    @Output() axisClicked = new EventEmitter<{value: string, display: string, axis: 'x' | 'y'}>();

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
    tooltipManager = new TooltipManager<HeatmapItem>();

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
        const xLabels = Array.from(new Set(this.data.map(value => value.x.value))).slice(0, this.maxX);
        const yLabels = Array.from(new Set(this.data.map(value => value.y.value))).slice(0, this.maxY);
        this.dataFiltered = this.data.filter(value => xLabels.includes(value.x.value) && yLabels.includes(value.y.value));

        // Create scales
        this.x = scaleBand<string>()
            .domain(xLabels)
            .range([0, this.width-this.margin.left-this.margin.right]);

        this.y = scaleBand<string>()
            .domain(yLabels)
            .range([0, this.height-this.margin.top-this.margin.bottom]);

        this.color = scaleQuantile<string>()
            .domain(this.dataFiltered.map(item => item.count))
            .range(colorSchemes[this.colorScheme][this.buckets]);

        // Note: ngOnChanges is always called once, before ngAfterViewInit
        if(this.viewInit) {
            this.buildChart(!!this.transition);
        }
    }

    // Note: In onAfterViewInit we can access gx and gy, obtained with @ViewChild.
    // At this point we can call buildChart()
    ngAfterViewInit(){
        this.xAxis = select(this.gx.nativeElement);
        this.yAxis = select(this.gy.nativeElement);
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
            const t = transition().duration(this.transition) as d3.Transition<any, any, any, any>;

            this.xAxis.transition(t)
                .call(axisTop<string>(this.x).tickSize(0).tickFormat(this.formatter('x')))
                .on("end", () => this.xAxis.selectAll<SVGTextElement, string>('text').each(this.wrap));

            this.yAxis.transition(t)
                .call(axisLeft<string>(this.y).tickSize(0).tickFormat(this.formatter('y')))
                .on("end", () => this.yAxis.selectAll<SVGTextElement, string>('text').each(this.wrap));

        }
        else {
            this.xAxis.call(axisTop<string>(this.x).tickSize(0).tickFormat(this.formatter('x')));
            this.yAxis.call(axisLeft<string>(this.y).tickSize(0).tickFormat(this.formatter('y')));
        }

        this.xAxis.selectAll(".domain").remove(); // Remove the axis line
        this.xAxis.selectAll<SVGTextElement, string>("text")  // Tilt the text
            .attr("transform", "rotate(-35)")
            .style("text-anchor", "start")
            .each(this.wrap)
            .on("click", (e,d) => this.onAxisClicked(d as any, 'x'));

        this.yAxis.selectAll(".domain").remove(); // Remove the axis line
        this.yAxis.selectAll<SVGTextElement, string>("text")
            .each(this.wrap)
            .on("click", (e,d) => this.onAxisClicked(d as any, 'y'));
    }

    /**
     * Called when the user hovers the mouse over a heatmap tile
     * @param item
     * @param event
     */
    onMouseOver(item: HeatmapItem, event: MouseEvent){

        const x = this.x(item.x.value) as number;
        const y = this.y(item.y.value) as number;

        // Since we use viewBox to auto-adjust the SVG to the container size, we have to
        // convert from the SVG coordinate system to the HTML coordinate system
        const actualWidth = (this.el.nativeElement as HTMLElement).offsetWidth;
        const scale = actualWidth / this.width;
        const relativeX = x / this.width;

        const top = scale * (this.margin.top + y + 0.5*this.y.bandwidth()); // Align tooltip arrow

        // Tooltip to the right
        if(relativeX < 0.5) {
            this.tooltipManager.show(item, 'right', top, scale * (this.margin.left + x + this.x.bandwidth() - 3));
        }
        // Tooltip to the left
        else {
            this.tooltipManager.show(item, 'left', top, actualWidth - scale * (this.margin.left + x + 3));
        }
    }

    onMouseOut() {
        this.tooltipManager.delayedHide();
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
            this.axisClicked.next({axis: axis, value: value, display: this.formatter(axis)(value)});
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
            if(color && (i === 0 || color !== legend[legend.length-1].color)){
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
        const self = select(nodes[i]);
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

    formatter(axis: 'x' | 'y') {
        return (v: string) => this.dataFiltered.find(d => d[axis].value === v)?.[axis].display || v;
    }
}
