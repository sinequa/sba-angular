import {Component, Input, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef, EventEmitter} from "@angular/core";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {AppService, FormatService, Query} from "@sinequa/core/app-utils";
import {IntlService} from "@sinequa/core/intl";
import {CCColumn, Results, Aggregation} from "@sinequa/core/web-services";
import {Options, LabelType, ChangeContext} from "@angular-slider/ngx-slider";
import { getDay, getTime, getWeek, getWeekYear, isValid, parseISO } from "date-fns";
import {FacetService} from "../../facet.service";
import {UIService} from "@sinequa/components/utils";
import {AbstractFacet} from "../../abstract-facet";
import { Action } from '@sinequa/components/action';
import { FacetConfig } from "../../facet-config";


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

export interface FacetRangeParams {
    min?: string | number | Date;
    max?: string | number | Date;
    stepDefs?: StepDef[];
}

export interface FacetRangeConfig extends FacetConfig<FacetRangeParams> {
    type: 'range';
}

@Component({
    selector: "sq-facet-range",
    templateUrl: "./facet-range.html"
})
export class BsFacetRange extends AbstractFacet implements FacetRangeParams, OnChanges, AfterViewInit, OnDestroy {
    @Input() name?: string;
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation: string;
    @Input() min : string | number | Date;
    @Input() max : string | number | Date;
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
        protected formatService: FormatService,
        protected intlService: IntlService,
        protected uiService: UIService) {

        super();

        this.clearFiltersAction = new Action({
            icon: "sq-filter-clear",
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
                return this.intlService.formatMessage(this.format, {date: date, time: Utils.getTime(date), weekDay: getDay(date), week: getWeek(date), weekYear: getWeekYear(date)});
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
                    const week = getWeek(date);
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
                // seconds must contains 2 digits
                dateStr = dateStr.substring(0, secondsSep + 1) + String(seconds).padStart(2, "0");
            }
        }
        return dateStr;
    }

    protected initMinMax() {
        let min = 0;
        let max = 0;
        if (!Utils.isEmpty(this.min) && (!Utils.isEmpty(this.max))) {
            min = this.parseValue(this.min);
            max = this.parseValue(this.max);
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

    protected parseValue(value: string | number | Date): number {
        if (Utils.isNumber(value)) { // number => number
            return value;
        }
        if (Utils.isDate(value)) { // Date => number
            return value.getTime();
        }
        if (!Utils.isString(value)) { // Ensure string
            return 0;
        }
        if (this.column?.parser) { // Parse string if needed (only parser implemented is memorysize)
            value = this.formatService.parseValue(value, this.column.parser);
        }
        if (Utils.testFloat(value)) { // Return as a plain number if it is one
          return Utils.toNumber(value, 0);
        }
        const date = parseISO(value); // Try parsing as a date
        if (isValid(date)) {
          return getTime(date);
        }
        // Finally, manage durations and sizes special formats
        if(this.column && AppService.isDate(this.column)) {
          return Utils.toDuration(value);
        }
        return Utils.toSize(value, 0);
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
            this.localeChange = Utils.subscribe(this.intlService.events, () => this.manualRefresh.emit());
        }
        if (changes.results) {
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

    getRange(): (number|undefined)[] {
        if (this.data) {
            const filter = this.facetService.findFilter(this.data.column, this.query);
            if (filter) {
                switch(filter.operator) {
                    case 'between': return [this.parseValue(filter.start), this.parseValue(filter.end)];
                    case 'gte': return [this.parseValue(filter.value), undefined];
                    case 'lte': return [undefined, this.parseValue(filter.value)];
                }
            }
        }
        return [undefined, undefined]
    }

    setRange(from: number | undefined, to: number | undefined) {
        if (this.column && this.data) {
            const valFrom = AppService.isDate(this.column) && Utils.isNumber(from) ? new Date(from) : from;
            const valTo = AppService.isDate(this.column) && Utils.isNumber(to) ? new Date(to) : to;
            const filter = this.facetService.makeRangeFilter(this.data.column, valFrom, valTo);
            if(filter) {
                this.facetService.applyFilterSearch(filter, this.query, true);
            }
        }
    }

    applyRange() {
        this.setRange(this.roundNearest(this.value), this.roundNearest(this.highValue));
    }

    clearRange() {
        if(this.data) {
            this.facetService.clearFiltersSearch(this.data.column, true, this.query, this.name);
        }
    }

    override get actions(): Action[] {
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
