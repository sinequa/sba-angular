/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    AsyncValidatorFn,
    Validators,
} from "@angular/forms";

/* Services */
import { AdvancedValue, AdvancedOperator } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import { SearchService } from "@sinequa/components/search";
import { AppService } from "@sinequa/core/app-utils";
import { ValidationService } from '@sinequa/core/validation';

export enum AdvancedFormType {
    Checkbox = "AdvancedFormCheckbox",
    Entry = "AdvancedFormEntry",
    Range = "AdvancedFormRange",
    Select = "AdvancedFormSelect",
    MultiEntry = "AdvancedFormMultiEntry",
}

export interface AdvancedFormValidators {
    min: (min: string | number | Date, config) => ValidatorFn;
    max: (max: string | number | Date, config) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (config) => ValidatorFn;
    number: (config) => ValidatorFn;
    date: (config) => ValidatorFn;
    range: (config) => ValidatorFn;
}

export interface Select {
    field: string;
    label: string;
    name: string;
    list: string;
    aggregation: string;
    multiple: boolean;
    operator: AdvancedOperator;
    type: string;
}

export interface Range {
    type: string;
    field: string;
    label: string;
    name: string;
    min: string | number | Date;
    max: string | number | Date;
}

export interface Entry {
    type: string;
    field: string;
    operator: AdvancedOperator;
    label: string;
    name: string;
    min?: string | number | Date;
    max?: string | number | Date;
}

@Injectable({
    providedIn: "root",
})
export class FormService {

    public readonly advancedFormValidators: AdvancedFormValidators = {
        min: (min, config) => this.validationService.minValidator(min, this._parser(config)),
        max: (max, config) => this.validationService.minValidator(max, this._parser(config)),
        required: Validators.required,
        email: Validators.email,
        pattern: (pattern: string | RegExp) => Validators.pattern(pattern),
        integer: (config) => this.validationService.integerValidator(this._parser(config)),
        number: (config) => this.validationService.numberValidator(this._parser(config)),
        date: (config) => this.validationService.dateValidator(this._parser(config)),
        range: (config) => this.validationService.rangeValidator(this._rangeType(config), this._parser(config))
    }

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public formBuilder: FormBuilder,
        private validationService: ValidationService,
    ) {}

    buildForm(): FormGroup {
        const search = new FormControl(
            {
                value: "",
                disabled: false,
            },
            {
                validators: [],
                updateOn: "change",
            }
        );

        return this.formBuilder.group({
            search: search,
        });
    }

    createSelectControl(
        config: Select,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createRangeControl(
        config: Range,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createEntryControl(
        config: Entry,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createMultiEntryControl(
        config: Entry,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    /**
     * Retrieve the value to be set to a specific form control from a given query
     * @param config the advanced-search-form field config
     */
    getAdvancedValue(
        config: Select | Range | Entry | any
    ): AdvancedValue | AdvancedValue[] {
        if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
            const range: AdvancedValue[] = [];
            range.push(this.searchService.query?.getAdvancedValue(
                config.field,
                AdvancedOperator.GTE
            )
            );
            range.push(this.searchService.query?.getAdvancedValue(
                    config.field,
                    AdvancedOperator.LTE
                )
            );
            return range;
        } else {
            const value:
                | AdvancedValue
                | AdvancedValue[] = this.searchService.query?.getAdvancedValue(
                config.field,
                config.operator
            );
            return value;
        }
    }

    /**
     * Update the query with the new values
     * @param value new value to be updated in the query
     * @param config the advanced-search-form field config
     */
    setAdvancedValue(
        value: AdvancedValue | AdvancedValue[],
        config: Select | Range | Entry | any
    ) {
        if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
            const range = value;
            const from = Utils.isArray(range)
                ? this._ensureAdvancedValue(config, range[0])
                : undefined;
            const to = Utils.isArray(range)
                ? this._ensureAdvancedValue(config, range[1])
                : undefined;
            this.searchService.query?.setAdvancedValue(
                config.field,
                from,
                AdvancedOperator.GTE
            );
            this.searchService.query?.setAdvancedValue(
                config.field,
                to,
                AdvancedOperator.LTE
            );
        } else {
            this.searchService.query?.setAdvancedValue(
                config.field,
                this._ensureAdvancedValue(config, value),
                config.operator,
                !this._isDistribution(config)
            );
        }
    }

    private _parser(config: Select | Range | any): string | undefined {
        const column = this.appService.getColumn(config.field);
        return column ? column.parser : undefined;
    }

    private _rangeType(config: Select | Range | any): string | number | Date {
        const column = this.appService.getColumn(config.field);
        let rangeType;
        if (
            column &&
            (AppService.isInteger(column) || AppService.isDouble(column))
        ) {
            rangeType = 0;
        } else if (column && AppService.isDate(column)) {
            rangeType = new Date();
        } else {
            rangeType = "";
        }
        return rangeType;
    }

    private _createControl(
        config: Select | Range | Entry | any,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return new FormControl(
            {
                value: this.getAdvancedValue(config),
                disabled: false,
            },
            {
                validators: !!validators ? validators : [],
                asyncValidators: !!asyncValidators ? asyncValidators : [],
                updateOn: "change",
            }
        );
    }

    private _ensureAdvancedValue(
        config: Select | any,
        value: any
    ): AdvancedValue {
        if (value !== undefined) {
            const column = this.appService.getColumn(config.field);
            if (column) {
                if (Utils.isString(value)) {
                    if (!this._isDistribution(config)) {
                        if (AppService.isDate(column)) {
                            value = Utils.toDate(value);
                        } else if (AppService.isInteger(column)) {
                            if (Utils.testInteger(value)) {
                                value = Utils.toInt(value);
                            }
                        } else if (AppService.isDouble(column)) {
                            if (Utils.testFloat(value)) {
                                value = Utils.toNumber(value);
                            }
                        } else if (AppService.isBoolean(column)) {
                            value = Utils.isTrue(value);
                        }
                    }
                }
            }
        }
        return value;
    }

    private _isDistribution(config: Select | any): boolean {
        if (config.aggregation) {
            const ccaggregation = this.appService.getCCAggregation(
                config.aggregation
            );
            return !!ccaggregation && !!ccaggregation.distribution;
        }
        return false;
    }
}
