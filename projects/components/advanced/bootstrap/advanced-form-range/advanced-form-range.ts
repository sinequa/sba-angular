import {Component, Input, OnInit, OnDestroy} from "@angular/core";
import {FormGroup, AbstractControl} from "@angular/forms";
import {Subscription} from "rxjs";
import {Utils} from "@sinequa/core/base";
import {CCColumn} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {Range} from "../advanced-models";

@Component({
    selector: "sq-advanced-form-range",
    templateUrl: "./advanced-form-range.html",
    styles: [`
.input-autocomplete{
    display: flex;
    flex-direction: column;
}
    `]
})
export class BsAdvancedFormRange implements OnInit, OnDestroy {
    @Input() form: FormGroup;
    @Input() config: Range;
    @Input() autocompleteEnabled: boolean;
    @Input() suggestQuery: string;
    name: string;
    fromName: string;
    toName: string;
    forName: string;
    column: CCColumn | undefined;
    label: string;
    minDate: Date | undefined;
    maxDate: Date | undefined;
    control: AbstractControl | null;
    value: (string | number | Date)[];
    valueChangesSubscription: Subscription;

    constructor(
        private appService: AppService) {
    }

    get isDate(): boolean {
        return !!this.column && AppService.isDate(this.column);
    }

    ngOnInit() {
        this.name = this.config.name || this.config.field;
        this.fromName = "from_" + this.name;
        this.toName = "to_" + this.name;
        this.forName = this.fromName;
        this.column = this.appService.getColumn(this.config.field);
        this.label = this.config.label || this.appService.getPluralLabel(this.config.field);
        if (this.isDate) {
            this.minDate = Utils.isDate(this.config.min) ? this.config.min : undefined;
            this.maxDate = Utils.isDate(this.config.max) ? this.config.max : undefined;
        }
        this.control = this.form.get(this.name);
        if (this.control) {
            this.value = this.control.value;
            this.valueChangesSubscription = Utils.subscribe(this.control.valueChanges,
                (value) => {
                    this.value = value;
                });
        }
    }

    ngOnDestroy() {
        if (this.valueChangesSubscription) {
            this.valueChangesSubscription.unsubscribe();
        }
    }

    ensureValue(value: string): string | number | Date {
        if (this.isDate) {
            let value1 = Utils.toDate(value);
            if (value1 !== undefined) {
                return value1;
            }
        }
        else if (this.column && AppService.isNumber(this.column)) {
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