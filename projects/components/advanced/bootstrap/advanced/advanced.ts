import {Component, Input, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {FormBuilder, FormGroup, Validators, ValidatorFn} from "@angular/forms";
import {Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {Utils, MapOf} from "@sinequa/core/base";
import {AdvancedValue, AdvancedOperator} from "@sinequa/core/web-services";
import {AppService, Query} from "@sinequa/core/app-utils";
import {ValidationService, ValidatorType} from "@sinequa/core/validation";
import {Control, AdvancedFormType} from "../advanced-models";
import { SearchService, FirstPageService } from "@sinequa/components/search";

@Component({
    selector: "sq-advanced",
    templateUrl: "./advanced.html"
})
export class BsAdvanced implements OnChanges, OnDestroy {
    @Input() query: Query;
    @Input() form: FormGroup;
    @Input() showing: boolean;

    // Former CCAdvanced
    @Input() items: Control[];
    @Input() autocompleteEnabled: boolean = true;
    @Input() suggestQuery: string;

    formInitDone: boolean;
    formChanges: Subscription;
    formUpdates: number; // Initialized to -1 so the first formChanges event (set by updateFormValues) can be ignored by testing for formUpdates > 0
    searchEvents: Subscription;

    initDone: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private searchService: SearchService,
        private firstPageService: FirstPageService,
        private appService: AppService,
        private validationService: ValidationService,
        private changeDetectorRef: ChangeDetectorRef) {

        // if firstPage values not needed for advanced form then no need to call firstPageService.getFirstPage - just set this.initDone = true
        // this.initDone = true;
        this.initDone = false;
        Utils.subscribe(this.firstPageService.getFirstPage(),
            (response) => {
                this.initDone = true;
                this.changeDetectorRef.markForCheck();
            });
    }

    getAdvancedValue(control: Control): AdvancedValue | AdvancedValue[] {
        let value: AdvancedValue | AdvancedValue[];
        if (Utils.eqNC(control.type, AdvancedFormType.Range)) {
            const range: AdvancedValue[] = [];
            range.push(this.query.getAdvancedValue(control.field, AdvancedOperator.GTE));
            range.push(this.query.getAdvancedValue(control.field, AdvancedOperator.LTE));
            return range;
        }
        else {
            value = this.query.getAdvancedValue(control.field, control.operator);
            return value;
        }
    }

    isDistribution(control: Control): boolean {
        if (control.aggregation) {
            const ccaggregation = this.appService.getCCAggregation(control.aggregation);
            return !!ccaggregation && !!ccaggregation.distribution;
        }
        return false;
    }

    makeValidatorFns(control: Control): ValidatorFn[] {
        const column = this.appService.getColumn(control.field);
        const parser = column ? column.parser : undefined;
        let doneMin = false;
        let doneMax = false;
        let donePattern = false;
        let doneInteger = false;
        let doneNumber = false;
        let doneDate = false;
        let doneRange = false;
        let rangeType;
        if (column && (AppService.isInteger(column) || AppService.isDouble(column))) {
            rangeType = 0;
        }
        else if (column && AppService.isDate(column)) {
            rangeType = new Date();
        }
        else {
            rangeType = "";
        }
        const fns: ValidatorFn[] = [];
        if (control.validators) {
            for (const validator of control.validators) {
                if (!validator.active) {
                    continue;
                }
                switch (validator.type) {
                    case ValidatorType.Min:
                        doneMin = true;
                        break;
                    case ValidatorType.Max:
                        doneMax = true;
                        break;
                    case ValidatorType.Pattern:
                        donePattern = true;
                        break;
                    case ValidatorType.Integer:
                        doneInteger = true;
                        break;
                    case ValidatorType.Number:
                        doneNumber = true;
                        break;
                    case ValidatorType.Date:
                        doneDate = true;
                        break;
                    case ValidatorType.Range:
                        doneRange = true;
                        break;
                }
                switch (validator.type) {
                    case ValidatorType.Min:
                        fns.push(this.validationService.minValidator(control.min, parser));
                        break;
                    case ValidatorType.Max:
                        fns.push(this.validationService.maxValidator(control.max, parser));
                        break;
                    case ValidatorType.Required:
                        fns.push(Validators.required);
                        break;
                    case ValidatorType.Email:
                        fns.push(Validators.email);
                        break;
                    case ValidatorType.Pattern:
                        fns.push(Validators.pattern(control.pattern));
                        break;
                    case ValidatorType.Integer:
                        fns.push(this.validationService.integerValidator(parser));
                        break;
                    case ValidatorType.Number:
                        fns.push(this.validationService.numberValidator(parser));
                        break;
                    case ValidatorType.Date:
                        fns.push(this.validationService.dateValidator(parser));
                        break;
                    case ValidatorType.Range:
                        fns.push(this.validationService.rangeValidator(rangeType, parser));
                        break;
                }
            }
        }
        if (!this.isDistribution(control)) {
            if (!doneMin && !Utils.isUndefined(control.min)) {
                fns.push(this.validationService.minValidator(control.min, parser));
            }
            if (!doneMax && !Utils.isUndefined(control.max)) {
                fns.push(this.validationService.maxValidator(control.max, parser));
            }
            if (!donePattern && !Utils.isUndefined(control.pattern)) {
                fns.push(Validators.pattern(control.pattern));
            }
            if (!doneInteger && column && AppService.isInteger(column)) {
                fns.push(this.validationService.integerValidator(parser));
            }
            if (!doneNumber && column && AppService.isDouble(column)) {
                fns.push(this.validationService.numberValidator(parser));
            }
            if (!doneDate && column && AppService.isDate(column)) {
                fns.push(this.validationService.dateValidator(parser));
            }
            if (!doneRange && Utils.eqNC(control.type, AdvancedFormType.Range)) {
                fns.push(this.validationService.rangeValidator(rangeType, parser));
            }
        }
        return fns;
    }

    makeAdvancedForm() {
        if (!!this.items) {
            const map: MapOf<any> = {};
            this.items.forEach(item => {
                if (item.active) {
                    const control = <Control>item;
                    const name = control.name || control.field;
                    if (name) {
                        const value = this.getAdvancedValue(control);
                        map[name] = [value, Validators.compose(this.makeValidatorFns(control))];
                    }
                }
            });
            const advanced = this.formBuilder.group(map);
            for (const name in advanced.controls) {
                this.form.addControl(name, advanced.controls[name]);
            }
        }
    }

    ensureAdvancedValue(control: Control, value: AdvancedValue): AdvancedValue {
        if (value !== undefined) {
            const column = this.appService.getColumn(control.field);
            if (column) {
                if (Utils.isString(value)) {
                    if (!this.isDistribution(control)) {
                        if (AppService.isDate(column)) {
                            value = Utils.toDate(value);
                        }
                        else if (AppService.isInteger(column)) {
                            if (Utils.testInteger(value)) {
                                value = Utils.toInt(value);
                            }
                        }
                        else if (AppService.isDouble(column)) {
                            if (Utils.testFloat(value)) {
                                value = Utils.toNumber(value);
                            }
                        }
                        else if (AppService.isBoolean(column)) {
                            value = Utils.isTrue(value);
                        }
                    }
                }
            }
        }
        return value;
    }

    setAdvancedValue(control: Control) {
        const name = control.name || control.field;
        if (name) {
            if (Utils.eqNC(control.type, AdvancedFormType.Range)) {
                const formControl = this.form.get(name);
                const range: AdvancedValue[] = formControl ? formControl.value : undefined;
                const from = Utils.isArray(range) ? this.ensureAdvancedValue(control, range[0]) : undefined;
                const to = Utils.isArray(range) ? this.ensureAdvancedValue(control, range[1]) : undefined;
                this.query.setAdvancedValue(control.field, from, AdvancedOperator.GTE);
                this.query.setAdvancedValue(control.field, to, AdvancedOperator.LTE);
            }
            else {
                const formControl = this.form.get(name);
                const value: AdvancedValue = this.ensureAdvancedValue(control, formControl ? formControl.value : undefined);
                this.query.setAdvancedValue(control.field, value, control.operator, !this.isDistribution(control));
            }
        }
    }

    fetchFormValues() {
        if (!!this.items) {
            this.items.forEach(item => {
                if (item.active) {
                    const control = item as Control;
                    this.setAdvancedValue(control);
                }
            });
        }
    }

    updateFormValues() {
        if (!!this.items) {
            this.items.forEach(item => {
                if (item.active) {
                    const control = <Control>item;
                    const name = control.name || control.field;
                    if (name) {
                        const value = this.getAdvancedValue(control);
                        const formControl = this.form.get(name);
                        if (formControl) {
                            formControl.setValue(value);
                        }
                    }
                }
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.formInitDone) {
            this.formInitDone = true;
            this.makeAdvancedForm();
            this.formUpdates = -1;
            this.formChanges = Utils.subscribe(this.form.valueChanges.pipe(debounceTime(100)),
                (value) => {
                    // console.log("advanced.formChanges: ", value);
                    this.fetchFormValues();
                    this.formUpdates++;
                });
            this.searchEvents = this.searchService.events.subscribe(
                (event) => {
                    if (event.type === "before-search") {
                        if (!this.validateForm()) {
                            if (!event.cancelReasons) {
                                event.cancelReasons = [];
                            }
                            event.cancelReasons.push("advanced-invalid");
                            event.cancel = true;
                        }
                    }
                }
            );
        }
        if (!!changes["query"]) {
            this.updateFormValues();
        }
    }

    ngOnDestroy() {
        this.formChanges.unsubscribe();
        this.searchEvents.unsubscribe();
    }

    private validateForm(): boolean {
        if (this.form.valid) {
            // Mark all controls as pristine
            for (const name of Object.keys(this.form.controls)) {
                const formControl = this.form.get(name);
                if (formControl) {
                    formControl.markAsPristine();
                }
            }
            return true;
        }
        else {
            // Mark all controls as dirty so validation errors are shown on all controls after a submit
            for (const name of Object.keys(this.form.controls)) {
                const formControl = this.form.get(name);
                if (formControl) {
                    formControl.markAsDirty();
                }
            }
            return false;
        }
    }
}