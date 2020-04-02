import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, ElementRef, ViewChild} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {LoadComponentService, LoadedComponent} from "@sinequa/core/load-component";
import * as d3 from "d3";
import {HeatmapTooltip} from "./heatmap-tooltip.component";

export interface HeatmapConfig {
    emitAxisSelects?: boolean;
    maxX?: number;
    maxY?: number;
    margin?: {top: number, bottom: number, left: number, right: number};
    gridSize?: number;
    minWidth?: number;
    buckets?: number;
}

@Component({
    selector: "sq-heatmap",
    templateUrl: "./heatmap.component.html"
})
export class Heatmap implements OnChanges, OnDestroy {
    @Input() data: Heatmap.Item[];
    @Input() config: HeatmapConfig;
    @Input("z-value") zValue: string;
    @Output("select") select = new EventEmitter<{value: Heatmap.Item, event: MouseEvent}>();
    @Output("x-select") xSelect = new EventEmitter<{value: string, event: MouseEvent}>();
    @Output("y-select") ySelect = new EventEmitter<{value: string, event: MouseEvent}>();
    options: HeatmapConfig;
    @ViewChild("svg", {static: false}) svg: ElementRef;
    tooltip: LoadedComponent;
    g: d3.Selection<any, any, any, any> | undefined;

    filteredDataAllZ: Heatmap.Item[];
    filteredData: Heatmap.Item[];
    xLabels: string[];
    yLabels: string[];

    constructor(
        private loadComponentService: LoadComponentService) {
    }

    handleData() {
        if (!this.data || this.data.length === 0) {
            this.clearHeatmap();
            return;
        }
        this.xLabels = Array.from(new Set(this.data.map(value => value.x))).slice(0, this.maxX);
        this.yLabels = Array.from(new Set(this.data.map(value => value.y))).slice(0, this.maxY);
        this.filteredData = this.filteredDataAllZ = this.data.filter(value => this.xLabels.includes(value.x) && this.yLabels.includes(value.y));
        if (!!this.zValue) {
            this.filteredData = this.filteredDataAllZ.filter(value => value.z === this.zValue);
        }
        this.drawHeatmap();
    }

    setItem(item: Heatmap.Item) {
        this.loadComponentService.bindComponent({component: HeatmapTooltip, inputs: {item: item}}, this.tooltip);
    }

    clearHeatmap() {
        if (this.g) {
            this.g.remove();
            this.g = undefined;
        }
    }

    private get maxX(): number {
        /*tslint:disable-next-line*/
        return this.options.maxX!;
    }

    private get maxY(): number {
        /*tslint:disable-next-line*/
        return this.options.maxY!;
    }

    private get margin(): {top: number, bottom: number, left: number, right: number} {
        /*tslint:disable-next-line*/
        return this.options.margin!;
    }

    private get gridSize(): number {
        /*tslint:disable-next-line*/
        return this.options.gridSize!;
    }

    private get minWidth(): number {
        /*tslint:disable-next-line*/
        return this.options.minWidth!;
    }

    private get buckets(): number {
        /*tslint:disable-next-line*/
        return this.options.buckets!;
    }

    drawHeatmap() {
        let width = Math.max(this.gridSize * this.xLabels.length, this.minWidth);
        let height = this.gridSize * this.yLabels.length;
        let legendElementWidth = width / 10;
        let colorClasses: string[] = [];
        for (let i = 0, ic = this.options.buckets!; i < ic; i++) {
            colorClasses.push(`sq-heatmap-tile-fadein-${i}`);
        }

        this.clearHeatmap();

        let svg = d3.select(this.svg.nativeElement)
            .attr("width", width + this.margin.left + this.margin.right)
            .attr("height", height + this.margin.top + this.margin.bottom);

        this.g = svg.append("g")
            .attr("transform", `translate(${this.margin.left},${this.margin.top})`);

        let yAxis = this.g.selectAll(".sq-heatmap-y-label")
            .data(this.yLabels)
            .enter().append("text")
                .text(value => Utils.truncate(value, 25))
                    .attr("x", 0)
                    .attr("y", (value, i) => i * this.gridSize)
                    .attr("transform", `translate(-6,${this.gridSize / 1.5})`)
                    .attr("class", value => "sq-heatmap-y-label");

        let xAxis = this.g.selectAll(".sq-heatmap-x-label")
            .data(this.xLabels)
            .enter().append("g")
                .attr("transform", (value, i) => `translate(${(i + 0.5) * this.gridSize},-6)`)
                .append("text")
                    .text(value => Utils.truncate(value, 25))
                        .attr("transform", "rotate(-45)" )
                        .attr("class", value => "sq-heatmap-x-label");

        if (this.options.emitAxisSelects) {
            xAxis
                .style("cursor", "pointer")
                .on("click", value => {
                    this.xSelect.emit({value: value, event: d3.event});
                });
            yAxis
                .style("cursor", "pointer")
                .on("click", value => {
                    this.ySelect.emit({value: value, event: d3.event});
                });
        }

        this.g.selectAll(".sq-heatmap-tile").remove();
        this.g.selectAll(".sq-heatmap-legend").remove();

        let min_data = d3.min(this.filteredData, value => value.count);
        var max_data = d3.max(this.filteredData, value => value.count);

        let colorScale = d3.scaleQuantile<string>()
            .domain([min_data, this.buckets - 1, max_data])
            .range(colorClasses);

        let instance = this;
        let tooltip = d3.select(this.tooltip.componentRef.location.nativeElement);
        let tiles = this.g.selectAll(".sq-heatmap-tile")
            .data(this.filteredData);
        tiles.enter().append("rect")
            .attr("x", value => this.xLabels.indexOf(value.x) * this.gridSize)
            .attr("y", value => this.yLabels.indexOf(value.y) * this.gridSize)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("class", value => `sq-heatmap-tile ${colorScale(value.count)}`)
            .attr("width", this.gridSize)
            .attr("height", this.gridSize)
            .on("mouseover", function (value) {
                instance.setItem(value);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function (value) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0);
            })
            .on("click", value => {
                this.setItem(value);
                this.select.emit({value: value, event: d3.event});
            });
        tiles.exit().remove();

        let legend = this.g.selectAll<d3.BaseType, number>(".sq-heatmap-legend")
            .data(colorScale.quantiles(), value => value.toString());
        let legendG = legend.enter().append("g")
            .attr("class", "sq-heatmap-legend");
        legendG
            .append("rect")
                .attr("x", (value, i) => legendElementWidth * i)
                .attr("y", - this.margin.top + 5)
                .attr("width", legendElementWidth)
                .attr("height", this.gridSize / 2)
                .attr("class", (value, i) => `sq-heatmap-tile-color-${i}`);
        legendG
            .append("text")
                .attr("class", "sq-heatmap-legend-text")
                .text(value => `\u2265 ${Math.round(value)}`)
                    .attr("x", (value, i) => legendElementWidth * i)
                    .attr("y", - this.margin.top + this.gridSize + 10);
        legend.exit().remove();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.tooltip) {
            this.tooltip = this.loadComponentService.loadComponent({component: HeatmapTooltip});
            d3.select(this.tooltip.componentRef.location.nativeElement)
                .style("opacity", 0);
        }
        if (!this.options || !!changes["config"]) {
            let options: HeatmapConfig = this.config;
            this.options = Utils.merge({}, {
                maxX: 30,
                maxY: 100,
                margin: {top: 150, bottom: 20, left: 160, right: 50},
                gridSize: 30,
                minWidth: 500,
                buckets: 9 // must correspond to number of entries in $sq-heatmap-tile-colors (app.scss)
            }, options);
        }
        if (!!changes["data"]) {
            this.handleData();
        }
        else if (!!changes["zValue"]) {
            this.filteredData = this.filteredDataAllZ.filter(value => value.z === this.zValue);
            this.drawHeatmap();
        }
    }

    ngOnDestroy() {
        this.loadComponentService.unloadComponent(this.tooltip);
    }
}

export module Heatmap {
    export interface Item {
        x: string;
        y: string;
        z?: string;
        count: number;
        display: string;
        value: string;
    }
}
