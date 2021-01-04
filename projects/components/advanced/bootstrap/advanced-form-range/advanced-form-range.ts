import {
    Component,
    Input,
    OnInit,
    OnDestroy,
} from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { Utils } from "@sinequa/core/base";
import { CCColumn } from "@sinequa/core/web-services";
import { AppService } from "@sinequa/core/app-utils";

@Component({
    selector: "sq-advanced-form-range",
    templateUrl: "./advanced-form-range.html"
})
export class BsAdvancedFormRange implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() field: string;
    @Input() min: Date | number | string;
    @Input() max: Date | number | string;
    @Input() label: string;

    fromName: string;
    toName: string;
    forName: string;
    column: CCColumn | undefined;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    control: AbstractControl | null;
    value: (string | number | Date)[];
    isDate: boolean;
    private _valueChangesSubscription: Subscription;

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.fromName = "from_" + this.field;
        this.toName = "to_" + this.field;
        this.forName = this.fromName;
        this.column = this.appService.getColumn(this.field);
        if(this.label === undefined) {
            this.label = this.appService.getPluralLabel(this.field);
        }
        this.isDate = !!this.column && AppService.isDate(this.column);
        if (this.isDate) {
            this.minDate = Utils.isDate(this.min)
                ? this.min
                : undefined;
            this.maxDate = Utils.isDate(this.max)
                ? this.max
                : undefined;
        }
        this.control = this.form.get(this.field);
        if (this.control) {
            this.value = this.control.value;
            this._valueChangesSubscription = Utils.subscribe(
                this.control.valueChanges,
                (value) => {
                    this.value = value;
                }
            );
        }
        else {
            throw new Error("No form control named "+this.field);
        }
    }

    ngOnDestroy() {
        if (this._valueChangesSubscription) {
            this._valueChangesSubscription.unsubscribe();
        }
    }

    ensureValue(value: string): string | number | Date {
        if (this.isDate) {
            const value1 = Utils.toDate(value);
            if (value1 !== undefined) {
                return value1;
            }
        } else if (this.column && AppService.isNumber(this.column)) {
            if (Utils.testFloat(value)) {
                return Utils.toNumber(value);
            }
        }
        return value;
    }

    updateFrom(from: string) {
        this.value[0] = this.ensureValue(from);
        if (this.control) {
            this.control.markAsDirty();
            this.control.setValue(this.value);
        }
    }

    updateTo(to: string) {
        this.value[1] = this.ensureValue(to);
        if (this.control) {
            this.control.markAsDirty();
            this.control.setValue(this.value);
        }
    }
}
