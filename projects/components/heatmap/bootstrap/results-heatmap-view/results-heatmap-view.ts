import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Query, AppService, ExprParser} from "@sinequa/core/app-utils";
import {Results, ListAggregation} from "@sinequa/core/web-services";
import {HeatmapConfig, Heatmap} from "../../heatmap.component";
import {ResultsViewService, ResultsView} from "@sinequa/components/results-view";
import {Action} from "@sinequa/components/action";
import {SearchService} from "@sinequa/components/search";

export interface HeatmapResultsView extends ResultsView {
    aggregation: string;
    field: string;
    fieldIndices: string;
    xFields: string;
    yFields: string;
    zFields: string;
    selectView: string;
}

@Component({
    selector: "sq-results-heatmap-view",
    templateUrl: "./results-heatmap-view.html",
    styleUrls: ["./results-heatmap-view.css"]
})
export class BsResultsHeatmapView implements OnChanges {
    @Input() query: Query;
    @Input() results: Results;
    @Input() view: HeatmapResultsView;
    xFieldsAction: Action;
    yFieldsAction: Action;
    zFieldsAction: Action;
    zValuesAction: Action;
    xField: BsResultsHeatmapView.FieldName;
    yField: BsResultsHeatmapView.FieldName;
    zField: BsResultsHeatmapView.FieldName;
    zValue: string;
    heatmapOptions: HeatmapConfig;
    toolbarSize: string;
    data: Heatmap.Item[] | undefined;

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public changeDetectorRef: ChangeDetectorRef,
        public resultsViewService : ResultsViewService) {
        this.xField = {name: ""};
        this.yField = {name: ""};
        this.zField = {name: ""};
    }

    makeHeatmapOptions() {
        this.heatmapOptions = {
            emitAxisSelects: !this.view.field
        };
    }

    getData() {
        let ccaggregation = this.appService.getCCAggregation(this.view.aggregation);
        if (!ccaggregation) {
            this.data = undefined;
            this.zValue = "";
            this.buildZValuesAction([]);
            return;
        }
        let displayKeySeparator = ccaggregation.displayKeySeparator || ccaggregation.keySeparator || "/";
        let query = Utils.copy(this.searchService.query);
        query.action = "aggregate";
        query.aggregations = [this.view.aggregation];
        if (!!this.view.field) {
            query["heatmapField"] = this.view.field;
        }
        else {
            query["heatmapField1"] = this.xField.name;
            query["heatmapField2"] = this.yField.name;
            query["heatmapField3"] = this.zField.name;
        }
        let haveZ = false;
        Utils.subscribe(this.searchService.getResults(query),
            (results: Results) => {
                let indices = !!this.view.field ? Utils.split(this.view.fieldIndices, [",", ";", " "]).map(value => Utils.toInt(value)) : [];
                let xIndex = indices.length > 0 ? indices[0] : 0;
                let yIndex = indices.length > 1 ? indices[1] : 1;
                let zIndex = indices.length > 2 ? indices[2] : 2;
                let data: Heatmap.Item[] = [];
                let zValue = "";
                let rawData = results.aggregations[0] as ListAggregation;
                if (!!rawData.items) {
                    data = rawData.items.map(value => {
                        let parts = value.display ? value.display.split(displayKeySeparator) : [];
                        haveZ = parts.length >= 3;
                        return {
                            x: parts[xIndex],
                            y: parts[yIndex],
                            z: parts[zIndex],
                            count: value.count,
                            display: value.display || "",
                            value: value.value as string
                        };
                    });
                }
                let labelsZ: string[] = [];
                if (haveZ) {
                    labelsZ = Array.from(new Set(data.map(value => value.z || ""))).sort(Utils.compare);
                    // Initial z is the one with the highest frequency 'z'
                    let counts = labelsZ.map(() => 0);
                    data.forEach((value) => counts[labelsZ.indexOf(value.z || "")]++);
                    zValue = labelsZ[counts.indexOf(Math.max.apply(Math, counts))];
                }
                this.data = data;
                this.zValue = zValue;
                this.buildZValuesAction(labelsZ);
                this.changeDetectorRef.markForCheck();
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            if (changes["results"].firstChange) {
                this.toolbarSize = "sm";
                this.buildFieldActions();
                this.makeHeatmapOptions();
            }
            this.getData();
        }
    }

    setFieldName(fieldName: BsResultsHeatmapView.FieldName, field: string, fieldAction: Action) {
        fieldName.name = field;
        let column = this.appService.getColumn(field);
        fieldAction.text = (column && column.labelPlural) || field;
    }

    buildFieldAxisAction(fieldName: BsResultsHeatmapView.FieldName, fields: string): Action {
        let action = new Action({
            flattenable: true,
            children: []
        });
        let _fields = Utils.split(fields, [",", ";", " "]);
        for (let field of _fields) {
            let column = this.appService.getColumn(field);
            if (!!column) {
                if (!fieldName.name) {
                    this.setFieldName(fieldName, field, action);
                }
                action.children.push(new Action({
                    text: column.labelPlural || field,
                    data: column,
                    action: (item: Action) => {
                        if (!Utils.eqNC(fieldName.name, field)) {
                            this.setFieldName(fieldName, field, action);
                            this.getData();
                        }
                    }
                }));
            }
        }
        return action;
    }

    buildFieldActions() {
        this.xFieldsAction = this.buildFieldAxisAction(this.xField, this.view.xFields);
        this.yFieldsAction = this.buildFieldAxisAction(this.yField, this.view.yFields);
        this.zFieldsAction = this.buildFieldAxisAction(this.zField, this.view.zFields);
    }

    buildZValuesAction(values: string[]) {
        this.zValuesAction = new Action({
            text: this.zValue,
            scrollable: true,
            children: []
        });
        if (!!values) {
            for (let value of values) {
                this.zValuesAction.children.push(new Action({
                    text: value,
                    action: (item: Action) => {
                        this.zValue = this.zValuesAction.text = value;
                    }
                }));
            }
        }
    }

    onSelect(value: Heatmap.Item, event: MouseEvent) {
        let field: string;
        if (!!this.view.field) {
            field = this.view.field;
        }
        else {
            field = `${this.xField.name}/${this.yField.name}${!!this.zField.name ? '/' + this.zField.name : ''}`;
        }
        this.searchService.addFieldSelect(field, {value: value.value, display: value.display}, {valuesAreExpressions: true});
        this.searchService.search().then(
            results => {
                if (!event.ctrlKey && !!this.view.selectView) {
                    this.resultsViewService.selectResultsViewName(this.view.selectView);
                }
            });
    }

    onXSelect(value: string, event: MouseEvent) {
        let expr = `${ExprParser.escape(value)}:(${this.xField.name}:${ExprParser.escape(Utils.normalize(value))})`;
        this.searchService.addFieldSelect(this.xField.name, {value: expr}, {valuesAreExpressions: true});
        this.searchService.search().then(
            results => {
                if (!event.ctrlKey && !!this.view.selectView) {
                    this.resultsViewService.selectResultsViewName(this.view.selectView);
                }
            });
    }

    onYSelect(value: string, event: MouseEvent) {
        let expr = `${ExprParser.escape(value)}:(${this.yField.name}:${ExprParser.escape(Utils.normalize(value))})`;
        this.searchService.addFieldSelect(this.yField.name, {value: expr}, {valuesAreExpressions: true});
        this.searchService.search().then(
            results => {
                if (!event.ctrlKey && !!this.view.selectView) {
                    this.resultsViewService.selectResultsViewName(this.view.selectView);
                }
            });
    }
}

export module BsResultsHeatmapView {
    export interface FieldName {
        name: string;
    }
}
