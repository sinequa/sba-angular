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
import {
    AdvancedValue,
    AdvancedOperator,
    AdvancedValueWithOperator,
    BasicAdvancedValue,
    advancedFacetPrefix,
} from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import { SearchService } from "@sinequa/components/search";
import {
    AppService,
    Expr,
    ExprOperator,
    FormatService,
} from "@sinequa/core/app-utils";
import { ValidationService } from "@sinequa/core/validation";

export enum AdvancedFormType {
    Checkbox = "AdvancedFormCheckbox",
    Input = "AdvancedFormInput",
    Range = "AdvancedFormRange",
    Select = "AdvancedFormSelect",
    MultiInput = "AdvancedFormMultiInput",
}

export interface AdvancedFormValidators {
    min: (
        min: string | number | Date,
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    max: (
        max: string | number | Date,
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    number: (
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    date: (
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    range: (
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
}

export interface BasicConfig {
    type: string;
    field: string;
    label: string;
    name: string;
}

export interface AdvancedSelect extends BasicConfig {
    list: string;
    aggregation: string;
    multiple: boolean;
    operator: AdvancedOperator;
}

export interface AdvancedRange extends BasicConfig {
    min: string | number | Date;
    max: string | number | Date;
}

export interface AdvancedInput extends BasicConfig {
    operator: AdvancedOperator;
}

export interface AdvancedCheckbox extends BasicConfig {}

@Injectable({
    providedIn: "root",
})
export class AdvancedService {
    public readonly advancedFormValidators: AdvancedFormValidators = {
        min: (min, config) =>
            this.validationService.minValidator(
                min,
                this._parser(config.field)
            ),
        max: (max, config) =>
            this.validationService.minValidator(
                max,
                this._parser(config.field)
            ),
        required: Validators.required,
        email: Validators.email,
        pattern: (pattern: string | RegExp) => Validators.pattern(pattern),
        integer: (config) =>
            this.validationService.integerValidator(this._parser(config.field)),
        number: (config) =>
            this.validationService.numberValidator(this._parser(config.field)),
        date: (config) =>
            this.validationService.dateValidator(this._parser(config.field)),
        range: (config) =>
            this.validationService.rangeValidator(
                this._rangeType(config),
                this._parser(config.field)
            ),
    };

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public formBuilder: FormBuilder,
        public validationService: ValidationService,
        public formatService: FormatService
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
        config: AdvancedSelect,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createRangeControl(
        config: AdvancedRange,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createInputControl(
        config: AdvancedInput,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createMultiInputControl(
        config: AdvancedInput,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this._createControl(config, validators, asyncValidators);
    }

    createCheckboxControl(
        config: AdvancedCheckbox,
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
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ): AdvancedValue {
        let expr: Expr | string;
        const expression = this.searchService.query?.findSelect(
            advancedFacetPrefix + config.field
        )?.expression;
        if (expression) {
            expr = this.appService.parseExpr(expression);
            if (expr instanceof Expr) {
                let value;
                if (
                    Utils.isString(expr.value) &&
                    expr.value.indexOf("[") > -1
                ) {
                    value = JSON.parse(expr.value.replace(/`/g, '"'));
                }
                if (!value) {
                    if (expr.values && expr.values.length > 1) {
                        value = expr.values;
                    } else {
                        value = expr.value;
                    }
                }
                value = this.formatAdvancedValue(config, value);
                if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
                    if (Utils.isArray(value)) {
                        return value;
                    } else {
                        if (expr.operator === ExprOperator.gte) {
                            return [value, undefined];
                        } else if (expr.operator === ExprOperator.lte) {
                            return [undefined, value];
                        }
                    }
                }
                return value;
            } else {
                if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
                    return [undefined, undefined];
                }
                return undefined;
            }
        } else {
            if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
                return [undefined, undefined];
            }
            return undefined;
        }
    }

    /**
     * Update the query with the new values
     * @param value new value to be updated in the query
     * @param config the advanced-search-form field config
     */
    setAdvancedValue(
        value: AdvancedValue,
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) {
        let expression: string | undefined;
        if (Utils.eqNC(config.type, AdvancedFormType.Range)) {
            const range = value;
            const from = Utils.isArray(range)
                ? this.ensureAdvancedValue(config, range[0])
                : undefined;
            const to = Utils.isArray(range)
                ? this.ensureAdvancedValue(config, range[1])
                : undefined;
            expression = this.makeRangeExpr(config.field, from, to);
        } else {
            if ("operator" in config) {
                expression = this.makeExpr(config.field, {
                    value: this.ensureAdvancedValue(config, value),
                    operator: config.operator,
                });
            } else {
                expression = this.makeExpr(
                    config.field,
                    this.ensureAdvancedValue(config, value)
                );
            }
        }
        this.searchService.query?.removeSelect(
            advancedFacetPrefix + config.field
        );
        if (expression) {
            this.searchService.query?.addSelect(
                expression,
                advancedFacetPrefix + config.field
            );
        }
    }

    /**
     * Remove all advanced search select(s) from the query
     * Trigger new search
     */
    resetAdvancedSearch(): void {
        this.searchService.setQuery(this.searchService.query?.toStandard());
        this.searchService.search();
    }

    public makeRangeExpr(
        field: string,
        from: AdvancedValue,
        to: AdvancedValue
    ): string | undefined {
        const parser = this._parser(field);
        if (parser) {
            from = this.formatService.parseValue(from, parser);
            to = this.formatService.parseValue(to, parser);
        }
        if (!Utils.isArray(from) && !Utils.isArray(to)) {
            if (!!from && !!to) {
                return `${field}:[${this.appService.escapeFieldValue(
                    field,
                    from
                )}..${this.appService.escapeFieldValue(field, to)}]`;
            } else if (!!from) {
                return this.makeExpr(field, {
                    value: this.appService.escapeFieldValue(field, from),
                    operator: AdvancedOperator.GTE,
                });
            } else if (!!to) {
                return this.makeExpr(field, {
                    value: this.appService.escapeFieldValue(field, to),
                    operator: AdvancedOperator.LTE,
                });
            }
        }
        return undefined;
    }

    public makeExpr(
        field: string,
        value: AdvancedValue | AdvancedValueWithOperator
    ): string | undefined {
        let expression = field + ":";
        let advancedValue: AdvancedValue;
        if (this._isAdvancedValueWithOperator(value)) {
            expression += value.operator;
            advancedValue = value.value;
        } else {
            advancedValue = value;
        }
        if (!advancedValue) {
            return undefined;
        } else {
            const parser = this._parser(field);
            if (parser) {
                advancedValue = this.formatService.parseValue(
                    advancedValue,
                    parser
                );
            }
        }
        if (Utils.isArray(advancedValue)) {
            expression += "[";
            advancedValue.forEach((value1, index) => {
                if (index > 0) {
                    expression += ",";
                }
                expression += this.appService.escapeFieldValue(field, value1);
            });
            expression += "]";
        } else {
            expression += this.appService.escapeFieldValue(
                field,
                advancedValue
            );
        }
        return expression;
    }

    public formatAdvancedValue(
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
        advancedValue: AdvancedValue
    ): AdvancedValue {
        advancedValue = this.ensureAdvancedValue(config, advancedValue);
        if (advancedValue) {
            const column = this.appService.getColumn(config.field);
            if (column && column.formatter) {
                if (Utils.isArray(advancedValue)) {
                    return advancedValue.map((value) =>
                        value
                            ? this.formatService.formatValue(value, column)
                            : value
                    );
                }
                return this.formatService.formatValue(advancedValue, column);
            }
        }
        return advancedValue;
    }

    public ensureAdvancedValue(
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
        advancedValue: AdvancedValue
    ): AdvancedValue {
        if (Utils.isArray(advancedValue)) {
            return advancedValue.map((value) =>
                this._ensureAdvancedValue(config, value)
            );
        }
        return this._ensureAdvancedValue(config, advancedValue);
    }

    private _createControl(
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
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
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
        value: BasicAdvancedValue
    ): BasicAdvancedValue {
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

    private _parser(field: string): string | undefined {
        const column = this.appService.getColumn(field);
        return column ? column.parser : undefined;
    }

    private _rangeType(
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ): string | number | Date {
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

    private _isDistribution(
        config:
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ): boolean {
        if ("aggregation" in config && config.aggregation) {
            const ccaggregation = this.appService.getCCAggregation(
                config.aggregation
            );
            return !!ccaggregation && !!ccaggregation.distribution;
        }
        return false;
    }

    /**
     * Return `true` if the passed value is an `AdvancedValueWithOperator`
     */
    private _isAdvancedValueWithOperator(
        value: any
    ): value is AdvancedValueWithOperator {
        if (
            Utils.isObject(value) &&
            !Utils.isArray(value) &&
            !Utils.isDate(value)
        ) {
            if (
                value.hasOwnProperty("value") &&
                value.hasOwnProperty("operator")
            ) {
                return true;
            }
        }
        return false;
    }
}
