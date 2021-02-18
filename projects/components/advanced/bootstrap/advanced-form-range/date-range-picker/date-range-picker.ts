import {Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {BsDaterangepickerDirective, BsDaterangepickerConfig, BsDatepickerDirective, BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import moment from "moment";
import { DatePickerOptions } from '../date-picker/date-picker';

export const DATE_RANGE_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDateRangePicker),
    multi: true
};

export interface DateRangePickerOptions extends DatePickerOptions {
    closedRange?: boolean;
}

@Component({
    selector: "sq-date-range-picker",
    template: `
        <div *ngIf="options.closedRange" class="sq-date-range-picker form-row">
            <div class="col">
                <input type="text" autocomplete="off" class="form-control" bsDaterangepicker triggers="click" #fromTo="bsDaterangepicker" [bsConfig]="bsFromToConfig()" [ngModel]="value" (ngModelChange)="updateFromTo($event)" [placeholder]="dateFormat"/>
            </div>
        </div>
        <div *ngIf="!options.closedRange" class="sq-date-range-picker form-row">
            <div class="col-auto">
                <input type="text" autocomplete="off" [id]="fromName" class="form-control sq-range-from" bsDatepicker triggers="click" #from="bsDatepicker" [bsConfig]="bsFromConfig()" [ngModel]="value[0]" (ngModelChange)="updateFrom($event)" [placeholder]="dateFormat"/>
            </div>
            <div class="col-auto sq-separator">{{'msg#advanced.dateRangePicker.separator' | sqMessage}}</div>
            <div class="col-auto">
                <input type="text" autocomplete="off" [id]="toName" class="form-control sq-range-to" bsDatepicker triggers="click" #to="bsDatepicker" [bsConfig]="bsToConfig()" [ngModel]="value[1]" (ngModelChange)="updateTo($event)" [placeholder]="dateFormat"/>
            </div>
        </div>
    `,
    providers: [DATE_RANGE_PICKER_VALUE_ACCESSOR]
})
export class BsDateRangePicker implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    private readonly SystemFormat: string = 'YYYY-MM-DD';

    @Input() options: DateRangePickerOptions;
    value: (Date | undefined)[];
    private onChangeCallback: (_: any) => void = () => {};
    private localeChange: Subscription;
    @ViewChild("fromTo", {static: false}) fromToPicker: BsDaterangepickerDirective;
    @ViewChild("from", {static: false}) fromPicker: BsDatepickerDirective;
    @ViewChild("to", {static: false}) toPicker: BsDatepickerDirective;
    fromName: string;
    toName: string;

    constructor(
        public intlService: IntlService) {
    }

    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
        this.fromName = "from_" + this.options.name;
        this.toName = "to_" + this.options.name;

        if (!this.value) {
            this.value = [undefined, undefined];
        }
    }

    public get dateFormat(): string {
        return this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L');
    }

    setLocale() {
        if (!!this.fromToPicker && this.fromToPicker.isOpen) {
            this.fromToPicker.hide();
            this.fromToPicker.show();
        }
        if (!!this.fromPicker && this.fromPicker.isOpen) {
            this.fromPicker.hide();
            this.fromPicker.show();
        }
        if (!!this.toPicker && this.toPicker.isOpen) {
            this.toPicker.hide();
            this.toPicker.show();
        }
    }

    ngAfterViewInit() {
        this.setLocale();
        this.localeChange = Utils.subscribe(this.intlService.events,
            (value) => {
                this.setLocale();
            });
    }

    ngOnDestroy() {
        if (this.localeChange) {
            this.localeChange.unsubscribe();
        }
    }

    //#region closedRange
    bsFromToConfig(): BsDaterangepickerConfig {
        return <any>{
            minDate: this.options.minDate,
            maxDate: this.options.maxDate,
            containerClass:'theme-default',
            showWeekNumbers: false,
            rangeInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L')
        };
    }

    updateFromTo(fromTo: Date[]) {
        this.setValue([!!fromTo ? fromTo[0] : undefined, !!fromTo ? fromTo[1] : undefined]);
        this.onChangeCallback(this.value);
    }
    //#endregion closedRange

    //#region !closedRange
    maxDate: Date | undefined;
    minDate: Date | undefined;
    bsFromConfig(): BsDatepickerConfig {
        return <any>{
            minDate: this.options.minDate,
            maxDate: this.maxDate,
            containerClass:'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L'),
        };
    }

    bsToConfig(): BsDatepickerConfig {
        return <any>{
            minDate: this.minDate,
            maxDate: this.options.maxDate,
            containerClass:'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L'),
        };
    }

    setMinMaxDate() {
        this.maxDate = this.value[1] || this.options.maxDate;
        this.minDate = this.value[0] || this.options.minDate;
    }

    resetMinMaxDate() {
        this.maxDate = this.options.maxDate;
        this.minDate = this.options.minDate;
    }

    updateFrom(from: Date) {
        this.setValue([from, this.value[1]]);
        this.onChangeCallback(this.value);
    }

    updateTo(to: Date) {
        this.setValue([this.value[0], to]);
        this.onChangeCallback(this.value);
    }
    //#endregion !closedRange

    zeroTimes() {
        if (this.value) {
            if (Utils.isDate(this.value[0])) {
                const date = this.value[0];
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
            if (Utils.isDate(this.value[1])) {
                const date = this.value[1];
                date.setHours(0);
                date.setMinutes(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
            }
        }
    }

    setValue(value: (Date | undefined)[] | undefined) {
        if (!this.value || !value || !Utils.equals(this.value[0], value[0]) || !Utils.equals(this.value[1], value[1])) {
            if (!value) {
                value = [undefined, undefined];
            } else {
                value[0] = !!value[0] ? new Date(value[0]) : value[0];
                value[1] = !!value[1] ? new Date(value[1]) : value[1];
            }
            if (this.options.closedRange) {
                this.value = value;
                this.zeroTimes();
            } else {
                this.resetMinMaxDate();
                this.value = value;
                this.zeroTimes();
                this.setMinMaxDate();
            }
        }
    }

    //#region ControlValueAccessor
    writeValue(value: Date[]): void {
        this.setValue(value);
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
    }
    //#endregion
}
