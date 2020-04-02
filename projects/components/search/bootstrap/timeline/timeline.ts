import {ViewEncapsulation, Component, Input, OnChanges, SimpleChanges, OnInit, AfterViewInit, OnDestroy,
    ElementRef, ViewChild, ChangeDetectorRef} from "@angular/core";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {AppService, Query} from "@sinequa/core/app-utils";
import {IntlService} from "@sinequa/core/intl";
import {Results, ListAggregation, AggregationItem, CCAggregation, AdvancedOperator} from "@sinequa/core/web-services";
import * as d3 from "d3";
import moment from "moment";
import {SearchService} from "../../search.service";
import {UIService} from "@sinequa/components/utils";


@Component({
    selector: "sq-timeline",
    templateUrl: "./timeline.html",
    styleUrls: ["./timeline.scss"],
    encapsulation: ViewEncapsulation.None  // Needed for D3 SVG styling
})
export class BsTimeline implements OnChanges, OnInit, AfterViewInit, OnDestroy {
    @Input() results: Results;
    @Input() aggregationName: string = "timeline";
    @Input() zoomSelection: boolean = true;
    @Input() autoHide: boolean = true;
    @ViewChild("graph", {static: true}) graph: ElementRef;

    localeChange: Subscription;
    query: Query;
    ccaggregation: CCAggregation | undefined;
    aggregation: ListAggregation;

    field: string;

    viewInitDone: boolean;
    ready: boolean;
    timelineSvg: d3.Selection<any, any, any, any> | undefined;
    timelineG: d3.Selection<any, any, any, any>;
    xG: d3.Selection<any, any, any, any>;
    yG: d3.Selection<any, any, any, any>;
    xScale: d3.ScaleTime<number, number>;
    yScale: d3.ScaleLinear<number, number>;
    xAxis: d3.Axis<Date>;
    yAxis: d3.Axis<number>;
    axes: {xHeight: number, yWidth: number};
    margin: {top: number, right: number, bottom: number, left: number};
    area: d3.Area<AggregationItem>;
    prevChartWidth: number; prevChartHeight: number;
    updateTransistionMS = 100;
    brush: d3.BrushBehavior<any>;
    brushG: d3.Selection<any, any, any, any> | undefined;
    gripsG: d3.Selection<any, any, any, any>;
    selection: [Date, Date] | undefined;
    minDate: Date;
    maxDate: Date;
    hidden: boolean;

    constructor(
        private root: ElementRef,
        private appService: AppService,
        private searchService: SearchService,
        private uiService: UIService,
        private intlService: IntlService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    private noSwipe = (event: Event) => {
        event.stopPropagation();
    }

    private measureAxes(g, xG, yG, xAxis, yAxis) {
        let opacity = g.style("opacity");
        g.style("opacity", "0");
        try {
            xG.call(xAxis);
            yG.call(yAxis);
            let xRect = xG.node().getBoundingClientRect();
            let yRect = yG.node().getBoundingClientRect();
            return {
                xHeight: Math.ceil(xRect.height),
                yWidth: Math.ceil(yRect.width)
            };
        }
        finally {
            xG.selectAll("*").remove();
            yG.selectAll("*").remove();
            g.style("opacity", opacity);
        }
    }

    moveBrush(selection: [number, number] | null, withTransition = false) {
        if (this.brushG) {
            if (withTransition) {
                this.brush.move(this.brushG.transition().duration(this.updateTransistionMS), selection as [number, number]);
            }
            else {
                this.brush.move(this.brushG, selection as [number, number]);
            }
        }
    }

    clearBrush() {
        this.moveBrush(null);
    }

    updateGrips(selection: [number, number]) {
        if (!selection) {
            this.gripsG.attr("display", "none");
        }
        else {
            this.gripsG.attr("display", null).attr("transform", (d, i) => { return "translate(" + selection[i] + ")"; });
        }
    }

    onResize = () => {
        this.updateGraph();
    }

    updateGraph(withTransition = false) {
        if (!this.ready) {
            return;
        }
        if (!this.aggregation.items) {
            return;
        }

        let chartWidth = Math.max(0, this.graph.nativeElement.offsetWidth - this.margin.left - this.margin.right);
        let chartHeight = Math.max(0, this.graph.nativeElement.offsetHeight - this.margin.top - this.margin.bottom);

        // only update if chart size has changed
        if (this.prevChartWidth !== chartWidth || this.prevChartHeight !== chartHeight) {
            let init = !this.prevChartWidth;
            this.prevChartWidth = chartWidth;
            this.prevChartHeight = chartHeight;

            //set the width and height of the timeline g element
            this.timelineG.attr("width", chartWidth + this.margin.left + this.margin.right)
                .attr("height", chartHeight + this.margin.top + this.margin.bottom);

            // ranges are based on the width and height available so reset
            this.xScale.range([0, chartWidth]);
            this.yScale.range([chartHeight, 0]);

            this.brush.extent([[0, -this.margin.top], [chartWidth, chartHeight]]);

            // Adjust number of ticks on x-axis to avoid overlapping
            let xTickCount = Math.max(Math.trunc(chartWidth / 80), 2);
            this.xAxis.ticks(xTickCount);

            if (init || !withTransition) {
                // if first run then just display axis with no transition
                this.timelineG.select<SVGGElement>(".x")
                    .attr("transform", "translate(0," + chartHeight + ")")
                    .call(this.xAxis);

                this.timelineG.select<SVGGElement>(".y")
                    .call(this.yAxis);
            }
            else {
                // for subsequent updates use a transistion to animate the axis to the new position
                let t = this.timelineG.transition().duration(this.updateTransistionMS);
                t.select<SVGGElement>(".x")
                    .attr("transform", "translate(0," + chartHeight + ")")
                    .call(this.xAxis);

                t.select<SVGGElement>(".y")
                    .call(this.yAxis as any);
            }

            this.area.y0(chartHeight);

            // bind up the data to the area
            let areas = this.timelineG.selectAll(".area").data([this.aggregation.items]);

            // transistion to new position if already exists
            if (withTransition) {
                areas.transition()
                    .duration(this.updateTransistionMS)
                    .attr("d", this.area);
            }
            else {
                areas.attr("d", this.area);
            }

            // add area if not already existing
            areas.enter().insert("path", ":first-child")
                .attr("class", "area")
                .attr("d", this.area);

            // add brush + grips if not already existing
            let newBrush = !this.brushG;
            if (!this.brushG) {
                this.brushG = this.timelineG.append("g")
                    .attr("class", "x brush");
            }
            this.brushG.call(this.brush);
            if (newBrush) {
                // grips
                this.gripsG = this.brushG.selectAll(".grip").data([{type: "w"}, {type: "e"}]).enter().append("g")
                    .attr("class", "grip")
                    .attr("display", "none");
                this.gripsG.append("path")
                    .attr("d", (d) => {
                    let gripHeight = Math.max(chartHeight / 8, 4);
                    let gripWidth = gripHeight;

                    let x = -gripWidth / 2;
                    let y = chartHeight / 2 - gripHeight / 2;

                    let path =
                        'M ' + x + ' ' + y +
                        ' l ' + -gripWidth + ' ' + gripHeight / 2 +
                        ' l ' + gripWidth + ' ' + gripHeight / 2 + ' z ' +
                        'M ' + -x + ' ' + y +
                        ' l ' + gripWidth + ' ' + gripHeight / 2 +
                        ' l ' + -gripWidth + ' ' + gripHeight / 2 + ' z ' +
                        'M 0 ' + (-this.margin.top) + ' l 0 ' + (chartHeight + this.margin.top) + ' z ';
                    return path;
                });
            }

            if (this.selection) {
                let selection: [number, number] = [this.xScale(this.selection[0]), this.xScale(this.selection[1])];
                this.moveBrush(selection, !newBrush && withTransition);
            }
            else {
                this.clearBrush();
            }
        }
    }

    drawGraphAsync() {
        if (!this.hidden) {
            Utils.delay().then(() => {
                if (this.graph.nativeElement.offsetParent) { // IE needs this
                    this.drawGraph();
                }
                else {
                    this.drawGraphAsync();
                }
            });
        }
    }

    drawGraph() {
        if(this.hidden) return;

        // Create svg and g to contain the chart contents
        if (this.timelineSvg) {
            this.timelineSvg.remove();
            this.timelineSvg = undefined;
        }

        if (!this.aggregation.items) {
            return;
        }

        this.timelineSvg = d3.select(this.graph.nativeElement).append("svg");
        this.timelineG = this.timelineSvg.append("g");

        // Create the x axis container
        this.xG = this.timelineG.append("g").attr("class", "x axis");

        // Create the y axis container
        this.yG = this.timelineG.append("g").attr("class", "y axis");

        this.xScale = d3.scaleTime().domain(d3.extent(this.aggregation.items, (d) => d["date"] as Date) as Date[]);
        this.yScale = d3.scaleLinear().domain([0, d3.max(this.aggregation.items, (d) => d.count) as number]);

        this.minDate = this.xScale.domain()[0];
        this.maxDate = this.xScale.domain()[1];

        this.xAxis = d3.axisBottom<Date>(this.xScale);
        const formatY = d3.format(",d");
        this.yAxis = d3.axisLeft<number>(this.yScale).ticks(3)
            .tickFormat((value: number): string => {
                if (Math.floor(value) !== value) {
                    return "";
                }
                return formatY(value);
            });

        this.axes = this.measureAxes(this.timelineG, this.xG, this.yG, this.xAxis, this.yAxis);
        this.margin = { top: 4, right: 4, bottom: this.axes.xHeight, left: this.axes.yWidth + 4 };

        this.timelineG.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.area = d3.area<AggregationItem>()
            .curve(d3.curveMonotoneX)
            .x((d) => this.xScale(d["date"]))
            .y0(0)
            .y1((d) => this.yScale(d["count"]));

        // NB we need the d3 this to pass to d3.select
        this.brush = d3.brushX()
            .on("brush", (datum, index) => {
                if (!this.brushG) {
                    return;
                }
                let numericSelection = <[number, number]>d3.brushSelection(this.brushG.node());
                this.updateGrips(numericSelection);
                if (!numericSelection) {
                    return;
                }
                if (!d3.event.sourceEvent || d3.event.sourceEvent.type === "brush") {
                    return;
                }
                let selection = [this.xScale.invert(numericSelection[0]), this.xScale.invert(numericSelection[1])];
                let selection1: Date[];
                // if dragging, preserve the width of the extent
                if (d3.event["mode"] === "move") {
                    let d0 = d3.timeDay.round(selection[0]),
                        d1 = d3.timeDay.offset(d0, Math.round((selection[1].getTime() - selection[0].getTime()) / 864e5));
                    selection1 = [d0, d1];
                }
                // otherwise, if resizing, round both dates
                else {
                    selection1 = selection.map<Date>(d3.timeDay.round);
                    // if empty when rounded, use floor & ceil instead
                    if (!Utils.equals(selection[0], selection[1]) && (selection1[0] >= selection1[1])) {
                        selection1[0] = d3.timeDay.floor(selection[0]);
                        selection1[1] = d3.timeDay.ceil(selection[1]);
                    }
                }
                if (!Utils.equals(selection, selection1)) {
                    this.moveBrush([this.xScale(selection1[0]), this.xScale(selection1[1])]);
                }
            })
            .on("end", (datum, index) => {
                if (!this.brushG) {
                    return;
                }
                let numericSelection = <[number, number]>d3.brushSelection(this.brushG.node());
                this.updateGrips(numericSelection);
                if (!d3.event.sourceEvent || d3.event.sourceEvent.type === "end") {
                    return;
                }
                if (!this.selection && !numericSelection) {
                    return;
                }
                let selection: [Date, Date] | undefined;
                if (numericSelection) {
                    selection = [this.xScale.invert(numericSelection[0]), this.xScale.invert(numericSelection[1])];
                    if (this.selection) {
                        if (selection[0].getTime() === this.selection[0].getTime() && selection[1].getTime() === this.selection[1].getTime()) {
                            return;
                        }
                    }
                }
                let from: Date | undefined;
                let to: Date | undefined;
                if (selection) {
                    from = selection[0];
                    to = selection[1];
                }
                if (!this.zoomSelection) {
                    this.selection = selection;
                }
                let query = this.searchService.query.copy();
                this.setFrom(query, from);
                this.setTo(query, to);
                this.searchService.applyAdvanced(query);
            });

        if (!this.zoomSelection) {
            this.selection = undefined;
            let from = this.getFrom(this.searchService.query);
            let to = this.getTo(this.searchService.query);
            if (from || to) {
                if (!from) {
                    from = this.minDate;
                }
                else {
                    from = new Date(Math.max(from.getTime(), this.minDate.getTime()));
                }
                if (!to) {
                    to = this.maxDate;
                }
                else {
                    to = new Date(Math.min(to.getTime(), this.maxDate.getTime()));
                }
                this.selection = [from, to];
            }
        }

        this.brushG = undefined;
        this.prevChartWidth = this.prevChartHeight = -1;
        this.ready = true;
        this.updateGraph();
    }

    getFrom(query: Query): Date {
        return <Date>query.getAdvancedValue(this.field, AdvancedOperator.GTE);
    }

    getTo(query: Query): Date {
        return <Date>query.getAdvancedValue(this.field, AdvancedOperator.LTE);
    }

    setFrom(query: Query, value: Date | undefined) {
        query.setAdvancedValue(this.field, value, AdvancedOperator.GTE);
    }

    setTo(query: Query, value: Date | undefined) {
        query.setAdvancedValue(this.field, value, AdvancedOperator.LTE);
    }

    hasSelection(query: Query): boolean {
        let from = this.getFrom(query);
        let to = this.getTo(query);
        return !!from || !!to;
    }

    setHidden(hidden: boolean) {
        if (!!this.hidden !== hidden) {
            this.hidden = hidden;
        }
    }

    handleResults = () => {
        if (!this.results || !this.ccaggregation) {
            if (this.timelineSvg) {
                this.timelineSvg.remove();
                this.timelineSvg = undefined;
            }
            this.setHidden(this.autoHide);
        }
        else {
            let query = this.searchService.query.copy();
            query.action = "aggregate";
            if (!this.zoomSelection) {
                this.setFrom(query, undefined);
                this.setTo(query, undefined);
            }
            query.aggregations = [this.ccaggregation.name];
            if (!this.zoomSelection && Utils.equals(query, this.query)) {
                if (this.brush && this.brushG) {
                    let from = this.getFrom(this.searchService.query);
                    let to = this.getTo(this.searchService.query);
                    if ((!from || !to) && !this.selection) {
                        return;
                    }
                    if (!Utils.equals(from, this.selection ? this.selection[0] :  undefined) ||
                        !Utils.equals(to, this.selection ? this.selection[1] : undefined)) {
                        if (!from && !to) {
                            this.selection = undefined;
                        }
                        else {
                            this.selection = [from ? from : this.minDate, to ? to : this.maxDate];
                        }
                        if (!this.selection) {
                            this.clearBrush();
                        }
                        else {
                            this.moveBrush([this.xScale(this.selection[0]), this.xScale(this.selection[1])], true);
                        }
                    }
                }
                return;
            }
            this.query = query;
            // Use the aggregation in results if possible
            const aggregation = this.searchService.results &&
                this.searchService.results.aggregations
                    .find(value => Utils.eqNC(value.name, this.ccaggregation ? this.ccaggregation.name : ""));
            if (!!aggregation && (!this.hasSelection(this.searchService.query) || this.zoomSelection)) {
                this.aggregation = Utils.copy(aggregation);
                this.fixAggregation();
                this.drawGraphAsync();
            }
            else {
                let subscription = Utils.subscribe(this.searchService.getResults(this.query),
                    (results) => {
                        console.log("timeline results: ", results);
                        this.aggregation = results.aggregations[0] as ListAggregation;
                        this.fixAggregation();
                        // Async as fixAggregation sets hidden flag (autoHide) and we do getBoundingClientRect in drawGraph
                        this.drawGraphAsync();
                        subscription.unsubscribe();
                        this.changeDetectorRef.markForCheck();
                    });
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            if (this.viewInitDone) {
                this.handleResults();
            }
        }
    }

    ngOnInit() {
        this.ccaggregation = this.appService.getCCAggregation(this.aggregationName);
        if (!this.ccaggregation) {
            console.log(`timeline aggregation not found: ${this.aggregation}`);
            return;
        }
        this.localeChange = Utils.subscribe(this.intlService.events,
            (value) => {
                this.drawGraph();
            });
    }

    ngAfterViewInit() {
        if (!this.ccaggregation) {
            return;
        }

        this.viewInitDone = true;

        this.field = this.ccaggregation.column;

        // Prevent swiping being activated on ancestors when selecting a range
        this.root.nativeElement.addEventListener("mousedown", this.noSwipe);
        this.root.nativeElement.addEventListener("touchstart", this.noSwipe);

        this.handleResults();

        this.uiService.addElementResizeListener(this.graph.nativeElement, this.onResize);
    }

    ngOnDestroy() {
        if (!this.ccaggregation) {
            return;
        }

        this.localeChange.unsubscribe();

        this.root.nativeElement.removeEventListener("mousedown", this.noSwipe);
        this.root.nativeElement.removeEventListener("touchstart", this.noSwipe);

        this.uiService.removeElementResizeListener(this.graph.nativeElement, this.onResize);
    }

    private nextTimelineDate(value: Date): Date {
        if (this.ccaggregation && Utils.isDate(value)) {
            switch (this.ccaggregation.mask) {
                case "YYYY-MM-DD":
                    return new Date(value.getFullYear(), value.getMonth(), value.getDate() + 1, value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
                case "YYYY-WW":
                    return new Date(value.getFullYear(), value.getMonth(), value.getDate() + 7, value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
                case "YYYY-MM":
                    return new Date(value.getFullYear(), value.getMonth() + 1, value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
                case "YYYY":
                    return new Date(value.getFullYear() + 1, value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
                default:
                    return value;
            }
        }
        return value;
    }

    private zeroComplete() {
        if (!this.ccaggregation) {
            return;
        }
        let rangeFunction: (start: Date, stop: Date, step?: number) => Date[];
        switch (this.ccaggregation.mask) {
            default:
            case "YYYY-MM-DD":
                rangeFunction = d3.timeDays;
                break;
            case "YYYY-WW":
                rangeFunction = d3.timeMonday.range;
                break;
            case "YYYY-MM":
                rangeFunction = d3.timeMonths;
                break;
            case "YYYY":
                rangeFunction = d3.timeYears;
                break;
        }
        if (!rangeFunction) {
            return;
        }

        // get the min/max dates
        let dateExtent = d3.extent(this.aggregation.items, (d) => { return d["date"]; }),
            // hash the existing days for easy lookup
            dateHash = this.aggregation.items.reduce((agg, d) => {
                agg[d["date"]] = true;
                return agg;
            }, {});
        // make even intervals
        rangeFunction(dateExtent[0], dateExtent[1])
            // drop the existing ones
            .filter((date: any) => {
            return !dateHash[date];
        })
            // and push them into the array
            .forEach((date) => {
                let emptyRow = { date: date, count: 0 };
                this.aggregation.items.push(<any>emptyRow);
            });
        // re-sort the data
        this.aggregation.items.sort((a, b) => { return d3.ascending(a["date"], b["date"]); });
    }

    private setDate(item: AggregationItem, postfix?: string, format?: any) {
        if (Utils.isDate(item.value)) { // has already been converted to date by Utils.toJson in HttpInterceptorService
            item["date"] = item.value;
        }
        else if (item.value && Utils.isString(item.value)) {
            if (!postfix) {
                postfix = "";
            }
            if (!format) {
                format = "YYYY-MM-DD";
            }
            let m = moment(item.value + postfix, format);
            if (m.isValid()) {
                item["date"] = m.toDate();
            }
        }
    }

    fixAggregation() {
        if (!this.ccaggregation || !this.aggregation.items) {
            this.setHidden(this.autoHide);
            return;
        }
        // Convert value fields to date ones
        switch (this.ccaggregation.mask) {
            case "YYYY-MM-DD":
                for (let i = 0, ic = this.aggregation.items.length; i < ic; i++) {
                    let item = this.aggregation.items[i];
                    if (item.value) {
                        this.setDate(item);
                    }
                    else {
                        // skip nulls
                        this.aggregation.items.splice(i, 1);
                        i--;
                        ic--;
                    }
                }
                break;

            case "YYYY-MM":
                for (let i = 0, ic = this.aggregation.items.length; i < ic; i++) {
                    let item = this.aggregation.items[i];
                    if (item.value) {
                        this.setDate(item, "-01");
                    }
                    else {
                        // skip nulls
                        this.aggregation.items.splice(i, 1);
                        i--;
                        ic--;
                    }
                }
                break;

            case "YYYY":
                for (let i = 0, ic = this.aggregation.items.length; i < ic; i++) {
                    let item = this.aggregation.items[i];
                    if (item.value) {
                        this.setDate(item, "-01-01");
                    }
                    else {
                        // skip nulls
                        this.aggregation.items.splice(i, 1);
                        i--;
                        ic--;
                    }
                }
                break;

            case "YYYY-WW":
                for (let i = 0, ic = this.aggregation.items.length; i < ic; i++) {
                    let item = this.aggregation.items[i];
                    if (item.value) {
                        this.setDate(item, "", moment.ISO_8601);
                    }
                    else {
                        // skip nulls
                        this.aggregation.items.splice(i, 1);
                        i--;
                        ic--;
                    }
                }
                break;
        }

        if (this.autoHide) {
            this.setHidden(this.aggregation.items.length < 2);
        }

        // Add a zero count data point to the end so a "before" selection of all the data is possible
        if (this.aggregation.items.length > 0) {
            let endItem = this.aggregation.items[this.aggregation.items.length - 1];
            if (endItem.value) {
                let nextItem = Utils.copy(endItem);
                let nextDate = this.nextTimelineDate(endItem["date"]);
                if (nextDate) {
                    nextItem.count = 0;
                    nextItem["date"] = nextDate;
                    this.aggregation.items.push(nextItem);
                }
            }
        }

        this.zeroComplete();
    }
}