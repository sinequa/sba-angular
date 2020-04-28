import {
    Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, ChangeDetectorRef,
} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Query, AppService} from "@sinequa/core/app-utils";
import {Results} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";
import {ResultsView} from "../results-view.service";

import * as d3 from "d3";

export interface ScatterView extends ResultsView {
    plotname: string;
    aggregation: string;
}

export interface ValueItem {
    category: string;
    colorvalue: string;
    value: number;
    title: string;
    id: string;
    size: number;
    position: number;
}

@Component({
    selector: "sq-results-scatter-view",
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./results-scatter-view.html",
    styleUrls: ["./results-scatter-view.css"]
})
export class BsResultsScatterView implements OnChanges {
    @Input() query: Query;
    @Input() results: Results;
    @Input() view: ScatterView;

    // Data
    data: ValueItem[][] | undefined;
    colorvalues: string[];
    categories: string[];
    lengths: number[];
    field: string;
    fieldalias : string = "value"; // TODO: Get from config

    // Parameters
    count : number = 150;
    min_scale : number = 0.1;
    max_scale : number = 10000000000000;
    colors : string = "unit";
    orderby : string = "orderby";
    switch_cooc : boolean = false;

    // Elements
    @ViewChild("svg", {static: false}) svg: ElementRef;
    g: d3.Selection<any, any, any, any> | undefined;


    constructor(
        private appService: AppService,
        private searchService: SearchService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    getData() {

        const ccaggregation = this.appService.getCCAggregation(this.view.aggregation);
        //console.log(ccaggregation);
        if (!ccaggregation) {
            this.data = undefined;
            return;
        }
        this.field = ccaggregation.column;

        const query = Query.copy(this.searchService.query);
        query.action = "";
        query.aggregations = [this.view.aggregation];   // Override distribs with only the timeline
        query.pageSize = this.count;
        query.addSelect(this.field + ":<>''");
        console.log(query);

        Utils.subscribe(this.searchService.getResults(query),
            (results: Results) => {

                const dist_counts = {};

                results.aggregations[0].items.forEach((item) => dist_counts[item.value as string] = item.count);

                const data: any[] = [];
                this.colorvalues = [];
                this.categories = [];

                results.records.forEach((r) => {

                    r["value"].forEach((val) => {

                        const element = val.display;
                        const raw = val.value;
                        const positions = val.locations.split(",");
                        const cooc = element.replace(/[\(\)]/g, "").split("#");
                        const value = this.switch_cooc? cooc[0].split(" ") : cooc[1].split(" ");
                        const category = this.switch_cooc? cooc[1] : cooc[0];
                        //var size = r[3];
                        const size = raw in dist_counts ? dist_counts[raw] * 10 : 10;
                        const colorvalue = this.colors === 'unit'? (this.switch_cooc? value[1]: value[0]) :
                                        this.colors === 'source' ? r.collection[0].substring(1,r.collection[0].length-1) :
                                        "Document";

                        const datum = {
                            category: category,
                            colorvalue: colorvalue,
                            value: parseFloat(this.switch_cooc? value[0]: value[1]),
                            title: r.collection[0].substring(1, r.collection[0].length-1) + " - "+r.title,
                            id: r.id,
                            size: size,
                            position: positions
                        };

                        if(!isNaN(datum.value)){
                            data.push(datum);
                            if(this.colorvalues.indexOf(colorvalue) < 0)
                                this.colorvalues.push(colorvalue);
                        }

                    });

                });

                console.log(data);

                const datamap = this.groupBy(data, 'category');
                this.categories = Object.keys(datamap).sort() as string[];
                this.lengths = this.categories.map((k) => datamap[k].length);
                this.data = this.categories.map((k) => datamap[k]);

                this.plotData();
            });
    }

    plotData() {
        this.clearPlot();
        if (!this.data || this.data.length === 0) {
            return;
        }
        this.drawScatterplot();
    }

    clearPlot() {
        if (this.g) {
            this.g.remove();
            this.g = undefined;
        }
    }

    drawScatterplot(){
        if (!this.data) {
            return;
        }

        const instance = this;

        const margin = {top: 50, right: 30, bottom: 100, left: 40},
            width = 960 - margin.left - margin.right,
            height = 720 - margin.top - margin.bottom;

        const y = d3.scaleLog()
            .domain([this.min_scale, this.max_scale])
            .range([height, 0]);

        const x0 = d3.scaleBand()
            .domain(this.categories)
            .range([0, width]);

        const x1 = d3.scaleLinear()
            .domain([0, 1])
            .range([0, x0.bandwidth()]);

        const cur = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(this.colorvalues);

        const xAxis = d3.axisBottom(x0);

        const yAxis = d3.axisLeft(y)
            .tickSizeInner(-width)
            .ticks(10, ",.1s");

        // Define the div for the tooltip
        const div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const svg = d3.select(this.svg.nativeElement)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        this.g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // background rectangles
        this.g.append("g").selectAll("g")
            .data(Array.from(this.categories.keys()))
        .enter().append("rect")
            .attr("class", "category-rect")
            .attr("width", width / this.categories.length)
            .attr("height", height)
            .attr("x", (d, i) => i*width/this.categories.length)
            .attr("y", 0)
            .on("mouseover", function(d) {
                d3.select(this).style("fill", "rgba(255, 255, 100, 0.5)");
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", "rgba(255, 255, 255, 0.0)");
            });

        // Y axis
        this.g.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // X axis
        this.g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", function(d) {
                    return "rotate(-45)";
                    });

        // Bubbles
        this.g.append("g").selectAll("g")
            .data(this.data)
        .enter().append("g")
            //.style("fill", function(d, i) { return z(i); })
            .attr("transform", (d, i) => "translate(" + x0(this.categories[i]) + ",0)")
        .selectAll("circle")
            .data((d) => d)
        .enter().append("circle")
            .attr("class","bubble")
            .style("cursor", "pointer")
            .attr("r", (d) => this.getSize(d.size))
            .attr("cx", (d, i) => x1(i/this.lengths[this.categories.indexOf(d.category)]))
            .attr("cy", (d) => Math.min(height,Math.max(0, y(d.value))))
            .attr("fill", (d) => cur(d.colorvalue))
            .on("mouseover", function(d) {
                if (!instance.g) {
                    return;
                }
                instance.g.selectAll('.bubble')
                    .transition()
                    .duration(200)
                    .attr("r", (d_ : any) =>  (d.id === d_.id)? 15 : instance.getSize(d_.size));
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("<strong>"+d.title+"</strong><br>"+d.colorvalue+" "+instance.formatNumber(d.value)+" "+d.category)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
            .on("mouseout", function(d) {
                div	.transition()
                    .duration(200)
                    .style("opacity", 0);
                if (!instance.g) {
                    return;
                }
                instance.g.selectAll('.bubble')
                    .transition()
                    .duration(200)
                    .attr("r", (d_ : any) => instance.getSize(d_.size));
            })
            .on("click", function(d){
                //popup_extract(d.id, d.position, $(div), "docresult?id="+encodeURIComponent(d.id), d.title);
                //location.href = "docresult?id="+encodeURIComponent(d.id);
            });


        let dataL = 0;
        const offset = 30;

        const legend = this.g.selectAll('.legend')
            .data(this.colorvalues)
            .enter().append('g')
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                if (i === 0) {
                    dataL = d.length*10 + offset;
                    return "translate(0, -30)";
                } else {
                    const newdataL = dataL;
                    dataL +=  d.length*10 + offset;
                    return "translate(" + (newdataL) + ",-30)";
                }
            });

        legend.append('circle')
            .attr("cx", 5)
            .attr("cy", 5)
            .attr("r", 6)
            .style("fill", function (d, i) {
                return cur(d);
            });

        legend.append('text')
            .attr("x", 15)
            .attr("y", 10)
            .text(function (d, i) { return d; })
            .attr("class", "textselected")
            .style("text-anchor", "start")
            .style("font-size", 15);

        this.changeDetectorRef.detectChanges();
    }

    groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    formatNumber(nb) {
        if(nb >= 1000000000){
            return (nb/1000000000)+"B";
        }else if(nb >= 1000000){
            return (nb/1000000)+ "M";
        }else if(nb >= 1000){
            return (nb/1000)+ "K";
        }else{
            return ""+nb;
        }
    }

    getSize(size){
        return Math.min(8,Math.max(1, Math.sqrt(size)));
    }


    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            if (changes["results"].firstChange) {

            }
            this.getData();
        }
    }

}