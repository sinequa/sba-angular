import {Component, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef, EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {AppService, FormatService, Expr, ExprOperator, ExprBuilder} from "@sinequa/core/app-utils";
import {IntlService} from "@sinequa/core/intl";
import {CCColumn, Results, Aggregation} from "@sinequa/core/web-services";
import {Options, LabelType, ChangeContext} from "ng5-slider";
import moment from "moment";
import {FacetService} from "../../facet.service";
import {SearchService} from "@sinequa/components/search";
import {UIService} from "@sinequa/components/utils";
import {AbstractFacet} from "../../abstract-facet";
import {AdvancedService} from "@sinequa/components/advanced";
import { Action } from '@sinequa/components/action';

export enum RoundTarget {
    number,
    year,
    month,
    week, // ISO
    day
}

export enum RoundType {
    up,
    down,
    nearest
}

export interface StepDef {
    step: string;
    format: string;
    minRange: string;
    active: boolean;
}

@Component({
    selector: "sq-facet-range",
    templateUrl: "./facet-range.html"
})
export class BsFacetRange extends AbstractFacet implements OnChanges, AfterViewInit, OnDestroy {
    @Input() name: string; // If ommited, the aggregation name is used
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() min : string;
    @Input() max : string;
    @Input() stepDefs: StepDef[];
    @ViewChild("slider", {static: false}) slider: ElementRef;

    // Aggregation from the Results object
    data: Aggregation | undefined;

    options: Options;
    value: number;
    highValue: number;
    startValue: number;
    startHighValue: number;
    sliderActive: boolean;
    rangeActive: boolean;
    rangeSelected: boolean;
    manualRefresh = new EventEmitter<void>();
    initDone: boolean;
    protected column: CCColumn | undefined;
    protected roundTarget: RoundTarget;
    protected roundMultiple: number;
    protected localeChange: Subscription;
    protected format: string;

    clearFiltersAction: Action;
    applyFiltersAction: Action;
    constructor(
        private facetService: FacetService,
        protected appService: AppService,
        protected searchService: SearchService,
        protected formatService: FormatService,
        protected intlService: IntlService,
        protected uiService: UIService,
        protected advancedService: AdvancedService,
        protected exprBuilder: ExprBuilder) {

        super();

        this.clearFiltersAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.range.clear",
            action: () => this.clearRange()
        });

        this.applyFiltersAction = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.range.apply",
            action: () => this.applyRange()
        });
    }

    protected translate = (value: number, label: LabelType): string => {
        const value1 = this.roundNearest(value); // to accommodate fractional steps generated for years/months

        if (this.format) {
            if (this.column && AppService.isDate(this.column)) {
                const date = new Date(value1);
                const m = moment(date);
                return this.intlService.formatMessage(this.format, {date: date, time: Utils.getTime(date), weekDay: m.weekday(), week: m.week(), weekYear: m.weekYear()});
            }
            else {
                return this.intlService.formatMessage(this.format, {value: value1});
            }
        }
        return this.formatService.formatFieldValue(this.column && AppService.isDate(this.column) ? new Date(value1) : value1, this.column);
    }

    protected roundAdjustment(value: number, multiple: number, roundType: RoundType): number {
        switch (roundType) {
            case RoundType.up:
                return multiple - value % multiple;
            default:
            case RoundType.down:
                return -(value % multiple);
            case RoundType.nearest: {
                const adjustUp = multiple - value % multiple;
                const adjustDown = -(value % multiple);
                return Math.abs(adjustUp) <= Math.abs(adjustDown) ? adjustUp : adjustDown;
            }
        }
    }

    protected _roundNumberUp(value: number, step: number): number {
        return (value >= 0 ? Math.ceil(value / step) : Math.floor(value / step)) * step;
    }

    protected _roundNumberDown(value: number, step: number): number {
        return (value >= 0 ? Math.floor(value / step) : Math.ceil(value / step)) * step;
    }

    protected _roundNumber(value: number, step: number, roundType: RoundType): number {
        switch (roundType) {
            case RoundType.up:
                return this._roundNumberUp(value, step);
            default:
            case RoundType.down:
                return this._roundNumberDown(value, step);
            case RoundType.nearest: {
                const up = this._roundNumberUp(value, step);
                const down = this._roundNumberDown(value, step);
                return Math.abs(up - value) <= Math.abs(down - value) ? up : down;
            }
        }
    }

    protected _getNearestDate(date: Date, upper: Date, lower: Date): Date {
        return Math.abs(upper.getTime() - date.getTime()) <= Math.abs(lower.getTime() - date.getTime()) ? upper : lower;
    }

    protected _getNearestTargetDate(date: Date, target: RoundTarget): Date {
        switch (target) {
            case RoundTarget.year: {
                return this._getNearestDate(date, new Date(date.getFullYear() + 1, 0), new Date(date.getFullYear(), 0));
            }
            case RoundTarget.month: {
                return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth() + 1), new Date(date.getFullYear(), date.getMonth()));
            }
            default:
            case RoundTarget.week:
            case RoundTarget.day: {
                return this._getNearestDate(date, new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1), new Date(date.getFullYear(), date.getMonth(), date.getDate()));
            }
        }
    }

    protected _round(value: number, step: number, target: RoundTarget, multiple: number,  roundType = RoundType.down): number {
        if (this.column && AppService.isDate(this.column)) {
            let date = new Date(value);
            if (roundType === RoundType.nearest) {
                // round to the nearest target year, month or day to adjust for the linear step size and leap years
                date = this._getNearestTargetDate(date, target);
            }
            switch (target) {
                case RoundTarget.year: {
                    const year = date.getFullYear();
                    if (year % multiple !== 0 || date.getMonth() !== 0 || date.getDate() !== 1 ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(year + this.roundAdjustment(year, multiple, roundType), 0);
                    }
                    break;
                }
                case RoundTarget.month: {
                    const month = date.getMonth();
                    if (month % multiple !== 0 || date.getDate() !== 1 ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(date.getFullYear(), month + this.roundAdjustment(month, multiple, roundType));
                    }
                    break;
                }
                case RoundTarget.week: {
                    const day = date.getDay();
                    // First, round to Monday
                    if (day !== 1/*Monday*/ ||
                        date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        let adjust: number;
                        const up = 7 - (day - 1);
                        const down = -(day - 1);
                        switch (roundType) {
                            case RoundType.up:
                                adjust = up;
                                break;
                            default:
                            case RoundType.down:
                                adjust = down;
                                break;
                            case RoundType.nearest:
                                adjust = Math.abs(up) >= Math.abs(down) ? up : down;
                                break;
                        }
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + adjust);
                    }
                    // Then, round to week number
                    const m = moment(date);
                    const week = m.week();
                    if (week % multiple !== 0) {
                        date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (this.roundAdjustment(week, multiple, roundType) * 7));
                    }
                    break;
                }
                case RoundTarget.day: {
                    const _date = date.getDate();
                    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {
                        date = new Date(date.getFullYear(), date.getMonth(), _date + this.roundAdjustment(_date, multiple, roundType));
                    }
                    break;
                }
            }
            return date.getTime();
        }
        else {
            return this._roundNumber(value, step, roundType);
        }
    }

    protected round(value: number, roundType = RoundType.down): number {
        return this._round(value, this.options.step || 1, this.roundTarget, this.roundMultiple, roundType);
    }

    protected roundDown(value: number): number {
        return this.round(value, RoundType.down);
    }

    protected roundUp(value: number): number {
        return this.round(value, RoundType.up);
    }

    protected roundNearest(value: number): number {
        return this.round(value, RoundType.nearest);
    }

    //TODO - remove fix engine hack
    private fixDate(dateStr: string): string {
        if (dateStr) {
            const secondsSep = dateStr.lastIndexOf(":");
            if (secondsSep > 0) {
                let seconds = Utils.toInt(dateStr.substr(secondsSep + 1));
                if (seconds < 0) {
                    seconds = 0;
                }
                else if (seconds > 59) {
                    seconds = 59;
                }
                dateStr = dateStr.substr(0, secondsSep + 1) + seconds;
            }
        }
        return dateStr;
    }

    protected initMinMax() {
        let min = 0;
        let max = 0;
        if (!Utils.isEmpty(this.min) && (!Utils.isEmpty(this.max))) {
            min = this.parseValue(!!new Date(this.min).getDate()? new Date(this.min) : this.min);
            max = this.parseValue(!!new Date(this.max).getDate()? new Date(this.max) : this.max);
        }
        else {
            if (this.data?.items) {
                const item = this.data.items[0];
                if (item && item.operatorResults) {
                    if (this.column && AppService.isDate(this.column)) {
                        //TODO - remove fix engine hack
                        if (Utils.isString(item.operatorResults.min)) {
                            const date = Utils.fromSysDateStr(this.fixDate(item.operatorResults.min));
                            if (Utils.isDate(date)) {
                                item.operatorResults.min = date;
                            }
                        }
                        if (Utils.isString(item.operatorResults.max)) {
                            const date = Utils.fromSysDateStr(this.fixDate(item.operatorResults.max));
                            if (Utils.isDate(date)) {
                                item.operatorResults.max = date;
                            }
                        }
                        min = Utils.isDate(item.operatorResults.min) ? item.operatorResults.min.getTime() : 0;
                        max = Utils.isDate(item.operatorResults.max) ? item.operatorResults.max.getTime() : 0;
                    }
                    else {
                        min = Utils.isNumber(item.operatorResults.min) ? item.operatorResults.min : 0;
                        max = Utils.isNumber(item.operatorResults.max) ? item.operatorResults.max : 0;
                    }
                }
            }
        }
        this.options.floor = min;
        this.options.ceil = max;
    }

    protected parseValue(value: string | Date): number {
        if (Utils.isDate(value)) {
            return value.getTime();
        }
        if (!Utils.isString(value)) {
            return 0;
        }
        let _value: number | undefined;
        if (this.column && this.column.parser) {
            const str = this.formatService.parseValue(value, this.column.parser);
            _value = Utils.toNumber(str);
        }
        if (Utils.isUndefined(_value)) {
            _value = this.column && AppService.isDate(this.column) ?
                Utils.toDuration(value) :
                Utils.toSize(value);
        }
        return _value;
    }

    protected initStep() {
        // Select the first step definition where the range >= stepDef.minRange
        let format: string | undefined;
        let step: number | undefined;
        if (this.stepDefs) {
            for (const stepDef of this.stepDefs) {
                if (stepDef.step) {
                    const thisStep = this.parseValue(stepDef.step);
                    if (thisStep && stepDef.active) {
                        if (!stepDef.minRange) {
                            step = thisStep;
                            format = stepDef.format;
                            break;
                        }
                        else {
                            // Round min/max for thisStep
                            const {roundTarget, roundMultiple} = this.getRoundTarget(thisStep);
                            const min = this._round(this.options.floor || 0, thisStep, roundTarget, roundMultiple, RoundType.down);
                            const max = this._round(this.options.ceil || 0, thisStep, roundTarget, roundMultiple, RoundType.up);
                            const range = max - min;
                            const minRange = this.parseValue(stepDef.minRange);
                            if (range >= minRange) {
                                step = thisStep;
                                format = stepDef.format;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (!step) {
            // Default step, default formatting
            step = this.column && AppService.isDate(this.column) ? Utils.oneDay : 1;
        }
        // Adjust step for year/month rounding (we assume daylight savings will balance out over the year)
        const {roundTarget, roundMultiple} = this.getRoundTarget(step);
        switch (roundTarget) {
            case RoundTarget.year:
                step = roundMultiple * 365.25 * Utils.oneDay;
                break;
            case RoundTarget.month:
                step = roundMultiple * 365.25 * Utils.oneDay / 12;
                break;
        }
        this.roundTarget = roundTarget;
        this.roundMultiple = roundMultiple;
        // Set default format based on roundTarget
        if (!format) {
            switch (this.roundTarget) {
                case RoundTarget.year:
                    format = "msg#facet.range.year";
                    break;
                case RoundTarget.month:
                    format = "msg#facet.range.monthYear";
                    break;
                case RoundTarget.week:
                    format = "msg#facet.range.weekYear";
                    break;
                default:
                    format = "";
                    break;
            }
        }
        this.options.step = step;
        this.format = format;
    }

    protected getRoundTarget(step: number): { roundTarget: RoundTarget, roundMultiple: number } {
        const ret = {
            roundTarget: RoundTarget.number,
            roundMultiple: 1
        };
        if (this.column && AppService.isDate(this.column)) {
            if (step % (365 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.year;
                ret.roundMultiple = step / (365 * Utils.oneDay);
            }
            else if (step % (30 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.month;
                ret.roundMultiple = step / (30 * Utils.oneDay);
            }
            else if (step % (7 * Utils.oneDay) === 0) {
                ret.roundTarget = RoundTarget.week;
                ret.roundMultiple = step / (7 * Utils.oneDay);
            }
            else if (step % Utils.oneDay === 0) {
                ret.roundTarget = RoundTarget.day;
                ret.roundMultiple = step / Utils.oneDay;
            }
        }
        return ret;
    }

    protected init() {
        this.options = {
            draggableRange: true,
            enforceStep: false,
            translate: this.translate
        };
        this.initMinMax();
        this.initStep();
        let ceil = this.options.ceil || 0;
        let floor = this.options.floor || 0;
        this.sliderActive = ceil > floor;
        if (ceil > floor) {
            floor = this.options.floor = this.roundDown(floor);
            ceil = this.options.ceil = this.roundUp(ceil);
        }
        const [from, to] = this.getRange();
        this.rangeActive = !Utils.isUndefined(from) || !Utils.isUndefined(to);
        this.rangeSelected = false;
        this.value = this.startValue = Math.max(from || floor, floor);
        this.highValue = this.startHighValue = Math.min(to || ceil, ceil);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.initDone) {
            this.initDone = true;
            this.localeChange = Utils.subscribe(this.intlService.events,
                (value) => {
                    this.manualRefresh.emit();
                });
        }
        if (!!changes["results"]) {
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            this.column = this.data && this.appService.getColumn(this.data.column);
            this.init();
        }
    }

    protected onResize = () => {
        this.manualRefresh.emit();
    }

    ngAfterViewInit() {
        this.uiService.addElementResizeListener(this.slider.nativeElement, this.onResize);
    }

    ngOnDestroy() {
        if(this.localeChange) {
            this.localeChange.unsubscribe();
        }
        if(this.uiService && this.slider) {
            this.uiService.removeElementResizeListener(this.slider.nativeElement, this.onResize);
        }
    }

    onUserChangeEnd(changeContext: ChangeContext) {
        this.rangeSelected = this.value !== this.startValue || this.highValue !== this.startHighValue;
    }

    getRange(): number[] | undefined[] {
        if (this.column) {
            let expr: Expr | string;
            let value;
            const expression = this.searchService.query?.findSelect(this.column.name)?.expression;
            if (expression) {
                expr = this.appService.parseExpr(expression);
                if (expr instanceof Expr) {
                    if (expr.values && expr.values.length > 1) {
                        value = expr.values;
                    } else {
                        value = expr.value;
                    }
                    if (!Utils.isArray(value)) {
                        if (expr.operator === ExprOperator.gte) {
                            value = [value, undefined];
                        } else if (expr.operator === ExprOperator.lte) {
                            value = [undefined, value];
                        }
                    }
                    value =  value.map(
                        (val) => val ? this.advancedService.castAdvancedValue(val, this.column) : val
                    );
                    if (AppService.isDate(this.column)) {
                        value =  value.map(
                            (val) => val ? new Date(val).getTime() : val
                        );
                    }
                    return value;
                }
            }
        }
        return [undefined, undefined]
    }

    setRange(from: number | undefined, to: number | undefined) {
        let valFrom;
        let valTo;
        let expression: string | undefined;
        if (this.column) {
            valFrom = AppService.isDate(this.column) && Utils.isNumber(from) ? new Date(from) : from;
            valTo = AppService.isDate(this.column) && Utils.isNumber(to) ? new Date(to) : to;
            if (!!valFrom && !!valTo) {
                expression = this.exprBuilder.makeRangeExpr(this.column.name, valFrom, valTo);
            } else if (!!valFrom) {
                expression = this.exprBuilder.makeNumericalExpr(this.column.name, '>=', valFrom);
            } else if (!!valTo) {
                expression = this.exprBuilder.makeNumericalExpr(this.column.name, '<=', valTo);
            }
            this.searchService.query?.removeSelect(this.column.name);
            if (expression) {
                this.searchService.query?.addSelect(
                    expression,
                    this.column.name
                );
            }
        }
    }

    applyRange() {
        this.setRange(this.roundNearest(this.value), this.roundNearest(this.highValue));
        this.searchService.search();
    }

    clearRange() {
        this.setRange(undefined, undefined);
        this.searchService.search();
    }

    get actions(): Action[] {
        const actions: Action[] = [];
        if(this.rangeSelected){
            actions.push(this.applyFiltersAction);
        }
        if(this.rangeActive){
          actions.push(this.clearFiltersAction);
        }
        return actions;
    }
}
