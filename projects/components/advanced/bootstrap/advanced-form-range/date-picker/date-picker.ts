import {Component, Input, OnInit, AfterViewInit, OnDestroy, ViewChild, forwardRef, ElementRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {BsDatepickerDirective, BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import moment from "moment";

export const DATE_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDatePicker),
    multi: true
};

export interface DatePickerOptions {
    name?: string;
    system?: boolean; // default false
    minDate?: Date;
    maxDate?: Date;
}

@Component({
    selector: "sq-date-picker",
    template: `
        <div class="sq-date-picker form-row">
            <div class="col">
                <input type="text" #input class="form-control" autocomplete="off" bsDatepicker triggers="click" #picker="bsDatepicker" [bsConfig]="bsConfig()" [ngModel]="value" (ngModelChange)="updateValue($event)" [placeholder]="dateFormat" />
            </div>
        </div>
    `,
    providers: [DATE_PICKER_VALUE_ACCESSOR]
})
export class BsDatePicker implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    private readonly SystemFormat: string = 'YYYY-MM-DD';

    @Input() options: DatePickerOptions;
    value: Date;
    private onChangeCallback: (_: any) => void = () => {};
    private localeChange: Subscription;
    @ViewChild("picker", {static: false}) picker: BsDatepickerDirective;
    @ViewChild('input', {static: false}) input: ElementRef;

    constructor(
        public intlService: IntlService) {
    }

    ngOnInit() {
        if (!this.options) {
            this.options = {};
        }
    }

    public get dateFormat(): string {
        return this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L');
    }

    setLocale() {
        if (!!this.picker && this.picker.isOpen) {
            this.picker.hide();
            this.picker.show();
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

    bsConfig(): BsDatepickerConfig {
        return <any>{
            minDate: this.options.minDate,
            maxDate: this.options.maxDate,
            containerClass:'theme-default',
            showWeekNumbers: false,
            dateInputFormat: this.options.system ? this.SystemFormat : moment.localeData().longDateFormat('L')
        };
    }

    updateValue(value: Date) {
        this.value = value;
        this.zeroTimes(this.value);
        this.onChangeCallback(this.value);
        this.focus();
    }

    private zeroTimes(value: Date): void {
        if (Utils.isDate(value)) { // includes null checking
            value.setHours(0, 0, 0, 0);
        }
    }

    public focus(): void {
        if (this.input) {
            this.input.nativeElement.focus();
        }
    }

    //#region ControlValueAccessor
    writeValue(value: Date): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
    }
    //#endregion
}
