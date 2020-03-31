import {Component, ViewEncapsulation, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ElementRef, ViewChild} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Query, AppService} from "@sinequa/core/app-utils";
import {Results} from "@sinequa/core/web-services";
import {LoadedComponent, LoadComponentService} from "@sinequa/core/load-component";
import {ResultsView, ResultsViewService} from "../results-view.service";
import {SearchService} from "@sinequa/components/search";

import * as d3 from "d3";
import {BsTimelineTooltip} from "../results-timeline-tooltip/results-timeline-tooltip";

export interface DateItem {
    date: Date;
    count: number;
    value: string;
    display: string;
}

export interface EventItem {
    date: Date;
    count: number;
    value: string;
    display: string;
    event: string;
}

export interface TimelineView extends ResultsView {
    timelinename: string;
    aggregation: string;
    aggregationEvent: string;
    selectView?: string;
    n_dates?: string;
    n_events?: string;
    datemin?: string;
    datemax?: string;
}

@Component({
    selector: "sq-results-timeline-view",
    encapsulation: ViewEncapsulation.None,
    templateUrl: "./results-timeline-view.html",
    styleUrls: ["./results-timeline-view.css"]
})
export class BsResultsTimelineView implements OnChanges {
    @Input() query: Query;
    @Input() results: Results;
    @Input() view: TimelineView;

    N_DATES = 5;
    N_EVENTS = 10;

    // Data
    datemin = new Date("2010-01-01");
    datemax = new Date("2020-01-01");
    dates: DateItem[] | undefined;
    events: EventItem[];
    datefield: string;
    eventfield: string;

    // Flags
    data_flags; // List of dates / events to be drawn
    flag_idx;   // Map of event type => array of all events of this type
    selectedFlags;  // Array of currently selected event types
    event_page = 0; // Pagination param
    n_flags;        // Number of event flags displayed

    // Elements
    @ViewChild("svg", {static: false}) svg: ElementRef;
    g: d3.Selection<any, any, any, any> | undefined;
    tooltip: LoadedComponent;

    // D3
    x: any;
    xAxis: any;
    y: any;
    colorscale : any;
    formatDayRequest = d3.timeFormat("%Y-%m-%d");
    formatDay = d3.timeFormat("%d %B %Y");
    formatMonth = d3.timeFormat("%B %Y");

    redrawing : boolean;
    nmonths : number;

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public loadComponentService: LoadComponentService,
        public changeDetectorRef: ChangeDetectorRef,
        public resultsViewService: ResultsViewService) {
    }

    getData() {

        if (this.view.datemin) {
            const datemin = new Date(this.view.datemin);
            if (!isNaN(datemin.getTime())) {
                this.datemin = datemin;
            }
        }

        if (this.view.datemax) {
            const datemax = new Date(this.view.datemax);
            if (!isNaN(datemax.getTime())) {
                this.datemax = datemax;
            }
        }

        if (this.view.n_dates && !isNaN(parseInt(this.view.n_dates, 10))) {
            this.N_DATES = parseInt(this.view.n_dates, 10);
        }
        if (this.view.n_events && !isNaN(parseInt(this.view.n_events, 10))) {
            this.N_EVENTS = parseInt(this.view.n_events, 10);
        }

        let ccaggregation = this.appService.getCCAggregation(this.view.aggregation);
        //console.log(ccaggregation);
        if (!ccaggregation) {
            this.dates = undefined;
            return;
        }
        let query = Query.copy(this.searchService.query);
        query.action = "aggregate";
        query.aggregations = [this.view.aggregation];   // Override distribs with only the timeline
        this.datefield = ccaggregation.column;

        let ccaggregationevent = this.appService.getCCAggregation(this.view.aggregationEvent);
        if(ccaggregationevent){
            query.aggregations.push(this.view.aggregationEvent);
            this.eventfield = ccaggregationevent.column;
        }

        Utils.subscribe(this.searchService.getResults(query),
            (results: Results) => {
                this.dates = results.aggregations[0].items
                    .filter((item) => item.value && item.value > this.datemin && item.value <  this.datemax )
                    .map((item) => {
                        return {
                            "date" : item.value as Date,
                            "count" : item.count,
                            "value" : this.formatDayRequest(item.value as Date),
                            "display" : this.formatDay(item.value as Date)
                        }
                    });

                if(results.aggregations.length > 1 && !!results.aggregations[1].items){
                    //console.log(results.aggregations[1].items);
                    results.aggregations[1].items
                        .forEach((item) => {
                            var cooc = item.display as string;
                            var coocs = cooc.substr(1,cooc.length-2).split(")#(");
                            item["event"] = coocs[0];
                            item["date"] = new Date(coocs[1]);
                        });
                    this.events = results.aggregations[1].items
                        .filter((item) => item["date"] && item["date"] > this.datemin && item["date"] < this.datemax)
                        .map((item) => {
                            return {
                                "date" : item["date"],
                                "count" : item.count,
                                "event" : item["event"],
                                "display" : item["event"] + " (" + this.formatDay(item["date"])+")",
                                "value" : item["value"] as string
                            }
                        });
                    this.flag_idx = {};
                    this.selectedFlags =[]
                    this.events.forEach((item) => {
                        if(!(item["event"] in this.flag_idx)){
                            this.flag_idx[item["event"]] = []
                            this.selectedFlags.push(item["event"]);
                        }
                        this.flag_idx[item["event"]].push(item);
                    });
                    this.changeDetectorRef.detectChanges(); // This is needed so that the templates correctly updates with data
                }

                this.plotData();
            });
    }

    plotData() {
        this.clearPlot();
        if (!this.dates || this.dates.length === 0) {
            return;
        }
        this.drawTimeline();
    }

    clearPlot() {
        if (this.g) {
            this.g.remove();
            this.g = undefined;
        }
    }

    drawTimeline(){

        // Initial flags: top-5 dates + top-10 events
        if (!this.dates) {
            return;
        }
        this.data_flags = this.dates.slice(0,this.N_DATES);
        if(this.events)
            this.data_flags = this.data_flags.concat(this.events.slice(0,this.N_EVENTS));

        // Aggregates dates by months and weeks
        var data_hist = this.histo_data(this.dates, "months");
        var data_hist_weeks = this.histo_data(this.dates, "weeks");

        // console.log(data_hist);

        var margin = {top: 10, right: 20, bottom: 20, left: 20},
            width = 960 - margin.left - margin.right,
            height = 550 - margin.top - margin.bottom;

        this.colorscale = d3.scaleLinear<d3.RGBColor,number>()
            .domain([1,12])
            .range([d3.rgb('#225ea8'), d3.rgb('#7fcdbb')]);

        //console.log(data_hist.length)
        // the x-scale parameters
        this.x = d3.scaleTime<number,Date>()
            /*tslint:disable-next-line*/
            .domain([data_hist[0].x0!, data_hist[data_hist.length-1].x1!])
            .range([0, width]);

        var domain = this.x.domain();
        this.nmonths = d3.timeMonths(domain[0],domain[1]).length;

        // the y-scale parameters
        this.y = d3.scaleLinear()
            .domain([0, d3.max(data_hist, function(d){ return d["y"]})])
            .range([height, 0]);

        this.xAxis = d3.axisBottom(this.x);
            //.tickFormat(formatMonth);

        /*var line_ = d3.line()
            .x(function(this: any, d) { return this.x(d[0]); })
            .y(function(this: any, d) { return this.y(d[1]); });*/

        var brush = d3.brushX()
            .extent([[this.x.range()[0], 0], [this.x.range()[1], height]])
            .on('end', () => this.brushed(brush));

        var zoom_ = d3.zoom<SVGGElement, unknown>()
            .on("zoom", () => this.redraw());

        // Define the div for the tooltip
        //var div = d3.select("body").append("div")
        //    .attr("class", "tooltip")
        //    .style("opacity", 0);

        let svg = d3.select(this.svg.nativeElement)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        this.g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        this.g.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        this.g.append('g')
            .attr('class', 'x brush')
            .call(brush)
            .call(zoom_)
            .on("mousedown.zoom", null) // Deactivate mouse event (taken by brush)
            .on("touchstart.zoom", null)
            .on("touchmove.zoom", null)
            .on("touchend.zoom", null)
        .selectAll('rect')
            .attr('y', 0)
            .attr('height', height);

        var bars = this.g.selectAll(".bar")
            .data(data_hist.concat(data_hist_weeks))
            .enter().append("rect");

        this.draw_bars(bars, height, this.nmonths);
        this.add_tooltips(bars);

        this.draw_flags();

        // draw the axes
        this.g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(this.xAxis)

        /*svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        */
    }

    histo_data(data : DateItem[], scale : string){

        var date_extent = d3.extent(data, function(d){return d.date});

        var numHistBins : Date[];

        if(scale === "months")
            numHistBins = d3.timeMonths(d3.timeMonth.offset(date_extent[0]!,-1), d3.timeMonth.offset(date_extent[1]!,1))
        else
            numHistBins = d3.timeWeeks(d3.timeWeek.offset(date_extent[0]!,-1), d3.timeMonth.offset(date_extent[1]!,1))

        // the histogram function
        var histo = d3.histogram<DateItem,Date>()
            .value(function(d){ return d.date })
            .thresholds(numHistBins);

        var data_hist = histo(data);

        //console.log(data_hist);

        data_hist.forEach(function(d){
            d["y"] = d.reduce(function(acc,val){return acc + val.count}, 0);
            d["scale"] = scale;
        });

        return data_hist;
    }

    draw_bars(bars, height, nmonths){

        bars
            .attr("class", "bar")
            .attr("x", (d) => this.x(d.x0) + 1)
            .attr("width", (d) => this.x(d.x1) - this.x(d.x0))
            .attr("y", (d) => this.y(d.y))
            .attr("height", (d) => height - this.y(d.y))
            .attr("clip-path", "url(#clip)")
            .style("cursor", "pointer")
            .style("fill", (d) => this.colorscale(d.x0.getMonth()))
            .style("opacity", (d) => (d.scale === "months" && nmonths > 32) || (d.scale === "weeks" && nmonths <= 32) ? 1 : 0)
            ;

    }

    add_tooltips(bars){

        let tooltip = d3.select(this.tooltip.componentRef.location.nativeElement);
        let instance = this;

        bars
            .on("mouseover", function(this: any, d) {
                if(instance.redrawing) return;
                if(! ((d.scale === "months" && instance.nmonths > 32) || (d.scale === "weeks" && instance.nmonths <= 32))) return;
                d3.select(this)
                    //.transition("t1")
                    //.duration(200)
                    .style("fill", "#d00")
                tooltip //.transition("t2")
                    //.duration(200)
                    .style("opacity", .9);
                tooltip
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                instance.setTooltip(instance.formatMonth(d.x0), d);
                })
            .on("mouseout", function(this: any, d) {
                if(instance.redrawing) return;
                if(! ((d.scale === "months" && instance.nmonths > 32) || (d.scale === "weeks" && instance.nmonths <= 32))) return;
                tooltip	//.transition("t3")
                    //.duration(200)
                    .style("opacity", 0);
                d3.select(this)
                    //.transition("t4")
                    //.duration(200)
                    .style("fill", (d : any) => instance.colorscale(d.x0.getMonth()))
            })
            .on("click", (d) => {
                if(! ((d.scale === "months" && this.nmonths > 32) || (d.scale === "weeks" && this.nmonths <= 32))) return;
                var month_start = this.formatDayRequest(d.x0);
                var month_end = this.formatDayRequest(d.x1);
                this.filter(month_start, month_end);
            });
    }

    setTooltip(month, dates) {
        this.loadComponentService.bindComponent({component: BsTimelineTooltip, inputs: {month: month, dates: dates}}, this.tooltip);
    }

    draw_flags() {
        console.log(this.data_flags);
        if (!this.g) {
            return;
        }

        this.g.selectAll(".flag").remove();

        var flags = this.g.selectAll(".flag")
            .data(this.data_flags)
            .enter()
            .append("g").attr("class", "flag");

        flags.append("line")
            .attr("x1", (d : any) => this.x(d.date))
            .attr("y1", (d : any) => this.y(0))
            .attr("x2", (d : any) => this.x(d.date))
            .attr("y2", (d : any,i) => this.y_flag(i, this.data_flags.length))
            .attr("stroke-width", 2)
            .attr("stroke", "#888");
        flags.append("rect");   // placeholder for background rect, position and size will be defined later
        flags.append("text") // content of text will be defined later
            .attr("x", (d : any) => this.x(d.date)+10)
            .attr("y", (d : any,i) => {
                d.index = i;
                return this.y_flag(i, this.data_flags.length); })
            .attr("fill", "#000")
            .style("font-size", "10px")
            .attr("text-anchor", "left")
            .style("cursor", "pointer")
            .text((d : any) =>  d.display)
            .on("click", (d : any) => {
                if(d.event)
                    this.filter_cooc(d.value, d.value)
                else
                    this.filter_date(d.value, d.display);
            })
            .each(function(d : any) {
                d.bb = this.getBBox(); // get bounding box of text field and store it in texts array
            });

        flags.selectAll("rect")
            .attr("x", (d : any) => this.x(d.date))
            .attr("y", (d : any) => this.y_flag(d.index, this.data_flags.length) - d.bb.height)
            .attr("width", (d : any) => d.bb.width+15)
            .attr("height", (d : any) => d.bb.height+3)
            .attr("rx", 3)
            .attr("ry", 3);

    }

    y_flag(i, n_flags){
        return this.y(0)*(0.2+0.8*i/n_flags); // First at 30%, Last at ~80%
    }

    brushed(brush){
        console.log("brushed!", brush)
        if(d3.event.selection !== null){
            var ext = d3.event.selection.map(this.x.invert);
            this.filter(this.formatDayRequest(ext[0]), this.formatDayRequest(ext[1]));
        }
    }

    redraw(){

        console.log("redraw!");
        if (!this.g) {
            return;
        }

        this.redrawing = true;

        var xt = d3.event.transform.rescaleX(this.x);
        var scaledAxis = this.xAxis.scale(xt);

        var domain = xt.domain();
        this.nmonths = d3.timeMonths(domain[0],domain[1]).length;

        var t = d3.transition("redrawing").duration(500);

        this.g.select(".x.axis") // change the x axis
            .transition(t as any)
            .call(scaledAxis);

        this.g.selectAll(".bar")
            .transition(t as any)
            .attr("x", (d : any) => xt(d.x0) + 1 )
            .attr("width", (d : any) => xt(d.x1) - xt(d.x0) )
            .style("opacity", (d : any) => (d.scale === "months" && this.nmonths > 32) || (d.scale === "weeks" && this.nmonths <= 32) ? 1 : 0);

        //add_tooltips(bars);

        this.g.selectAll(".flag line")
            .transition(t as any)
            .attr("x1", (d : any) => xt(d.date))
            .attr("x2", (d : any) => xt(d.date));

        this.g.selectAll(".flag text")
            .transition(t as any)
            .attr("x", (d : any) => xt(d.date)+10);

        this.g.selectAll(".flag rect")
            .transition(t as any)
            .attr("x", (d : any) => xt(d.date));

        t.on("end", () => this.redrawing = false);

    }

    updateFlags() {
        if (!this.dates) {
            return;
        }

        var new_flags: any[] = [];

        this.selectedFlags.forEach((flag) => new_flags = new_flags.concat(this.flag_idx[flag]));

        new_flags = new_flags.sort(function(a,b){
            return b.count - a.count;
        });
        //console.log(new_flags);
        this.data_flags = this.dates.slice(0,this.N_DATES).concat(
            new_flags.slice(this.event_page*this.N_EVENTS, (this.event_page+1)*this.N_EVENTS));

        this.draw_flags();

        return new_flags.length;
    }

    previousEvents(){
        this.event_page--;
        this.n_flags = this.updateFlags();
    }

    nextEvents(){
        this.event_page++;
        this.n_flags = this.updateFlags();
    }

    // called from template
    flagSelected(){
        this.event_page = 0;
        this.n_flags = this.updateFlags();
    }

    filter(start, end){
        console.log("filter!", start, end);
        this.searchService.addFieldSelect(this.datefield, {value: this.datefield+":["+start+".."+end+"]"}, {valuesAreExpressions:true});
        this.searchService.search().then(
            results => {
                if (!!this.view.selectView) {
                    this.resultsViewService.selectResultsViewName(this.view.selectView);
                }
            });
    }

    filter_cooc(date, display){
        console.log("filter event!",date, display);
        this.searchService.addFieldSelect(this.eventfield, {value: date, display: display});
        this.searchService.search().then(
            results => {
                if (!!this.view.selectView) {
                    this.resultsViewService.selectResultsViewName(this.view.selectView);
                }
            });
    }

    filter_date(date, display){
        console.log("filter date!", this.datefield, date, display);
        this.searchService.addFieldSelect(this.datefield, {value: date, display: display});
        this.searchService.search().then(
            results => {
                if (!!this.view.selectView) {
                    this.resultsViewService.selectResultsViewName(this.view.selectView);
                }
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.tooltip) {
            this.tooltip = this.loadComponentService.loadComponent({component: BsTimelineTooltip});
            d3.select(this.tooltip.componentRef.location.nativeElement)
                .style("opacity", 0);
        }
        if (!!changes["results"]) {
            if (changes["results"].firstChange) {

            }
            this.getData();
        }
    }

    ngOnDestroy() {
        this.loadComponentService.unloadComponent(this.tooltip);
    }
}