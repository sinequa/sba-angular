/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    FormControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators,
} from "@angular/forms";

/* Services */
import { Select, CCColumn } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import { SearchService } from "@sinequa/components/search";
import {
    AppService,
    Expr,
    ExprOperator,
    FormatService,
    Query,
    advancedFacetPrefix,
} from "@sinequa/core/app-utils";
import { ValidationService } from "@sinequa/core/validation";

/**
 * Defines the operators that can be used when specifying advanced search values
 */
export enum AdvancedOperator {
    NONE = "",
    EQ = "=",
    NEQ = "<>",
    LT = "<",
    LTE = "<=",
    GT = ">",
    GTE = ">=",
    /**
     * TODO
     */
    // LIKE = "LIKE",
    // CONTAINS = "CONTAINS",
    // IN = "IN",
}

/**
 * Defines the possible basic types of an advanced value
 */
export type BasicAdvancedValue = string | number | Date | boolean | undefined;

/**
 * Defines an advamced value type as either a single basic advanved value or an array of basic advanced values
 */
export type AdvancedValue = BasicAdvancedValue | BasicAdvancedValue[];

/**
 * Defines an advanced value with an operator
 */
export interface AdvancedValueWithOperator {
    /**
     * An advanced value
     */
    value: AdvancedValue;
    /**
     * An operator
     */
    operator: AdvancedOperator;
}

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
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    max: (
        max: string | number | Date,
        config:
            | BasicAdvancedConfig
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
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    number: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    date: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
    range: (
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox
    ) => ValidatorFn;
}

export interface BasicAdvancedConfig {
    type: string;
    field: string;
    label: string;
    name: string;
}

export interface AdvancedSelect extends BasicAdvancedConfig {
    list: string;
    aggregation: string;
    multiple: boolean;
    operator: AdvancedOperator;
}

export interface AdvancedRange extends BasicAdvancedConfig {
    min: string | number | Date;
    max: string | number | Date;
}

export interface AdvancedInput extends BasicAdvancedConfig {
    operator: AdvancedOperator;
}

export interface AdvancedCheckbox extends BasicAdvancedConfig {}

@Injectable({
    providedIn: "root",
})
export class AdvancedService {
    /**
     * Default form validators packaged within SBA to standardize advanced-search validation
     */
    public readonly advancedFormValidators: AdvancedFormValidators = {
        min: (min, config) =>
            this.validationService.minValidator(
                min,
                this._parser(config.field)
            ),
        max: (max, config) =>
            this.validationService.maxValidator(
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
        public validationService: ValidationService,
        public formatService: FormatService
    ) {}

    /**
     * Return a standard FormControl compatible with a select component
     * @param config required configuration for the generic advanced-form-select
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createSelectControl(
        config: AdvancedSelect,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this.createControl(config, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a range-input component
     * @param config required configuration for the generic advanced-form-range
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createRangeControl(
        config: AdvancedRange,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this.createControl(config, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a text input component
     * @param config required configuration for the generic advanced-form-input
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createInputControl(
        config: AdvancedInput,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this.createControl(config, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a multi-value text input component
     * @param config required configuration for the generic advanced-form-multi-input
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createMultiInputControl(
        config: AdvancedInput,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this.createControl(config, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a checkbox component
     * @param config required configuration for the generic advanced-form-checkbox
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createCheckboxControl(
        config: AdvancedCheckbox,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return this.createControl(config, validators, asyncValidators);
    }

    /**
     * Retrieve the value to be set to a specific FormControl from the search Query
     * @param config advanced-search-form component's configuration
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public getAdvancedValue(
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
        query?: Query | undefined
    ): AdvancedValue {
        if (!query) {
            query = this.searchService.query;
        }
        let expr: Expr | string;
        const expression = query.findSelect(
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
     * Update the search query with a specific FormControl value
     * @param value new value to be updated in the query
     * @param config advanced-search-form component's configuration
     * @param query Query where to update advanced values, if omitted, use searchService.query
     */
    public setAdvancedValue(
        value: AdvancedValue,
        config:
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
        query?: Query | undefined
    ): void {
        if (!query) {
            query = this.searchService.query;
        }
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
        query.removeSelect(
            advancedFacetPrefix + config.field
        );
        if (expression) {
            query.addSelect(
                expression,
                advancedFacetPrefix + config.field
            );
        }
    }

    /**
     * Remove a specific advanced value by its field name.
     * By default, Trigger search() action
     * @param field
     * @param query Query from which will remove the specific advanced value, if omitted, use searchService.query
     * @param searchable
     */
    public removeAdvancedValue(
        field: string,
        searchable: boolean = true,
        query?: Query | undefined
    ): void {
        if (!!field) {
            if (!query) {
                query = this.searchService.query.copy();
            }
            query.removeSelect(advancedFacetPrefix + field);
            this.searchService.setQuery(query, false);
            if (searchable) {
                this.searchService.search();
            }
        }
    }

    /**
     * Remove all related advanced-search select(s) from a given query and update searchService.query accordingly
     * By default, Trigger search() action
     * @param query Query from which will remove all advanced values, if omitted, use searchService.query
     * @param searchable
     */
    public resetAdvancedValues(
      searchable: boolean = true,
      query?: Query | undefined
    ): void {
        if (!query) {
            query = this.searchService.query.copy();
        }
        this.searchService.setQuery(query.toStandard(), false);
        if (searchable) {
            this.searchService.search();
        }
    }

    /**
     * Return an object containing all the filled (field, value) in the advanced-search form
     * @param query Query from which will fetch advanced values, if omitted, use searchService.query
     */
    public getAdvancedValues(query?: Query | undefined): Object {
        if (!query) {
            query = this.searchService.query.copy();
        }
        const obj = new Object();
        const advancedSelect = query.select?.filter(
            (select: Select) => select.facet.startsWith(advancedFacetPrefix)
        );
        if (advancedSelect && advancedSelect.length > 0) {
            for (const select of advancedSelect) {
                const expression = select.expression;
                const expr = this.appService.parseExpr(expression);
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
                    if (!Utils.isArray(value)) {
                        if (expr.operator === ExprOperator.gte) {
                            value = [value, undefined];
                        } else if (expr.operator === ExprOperator.lte) {
                            value = [undefined, value];
                        }
                    }
                    const column = this.appService.getColumn(expr.field!);
                    if (column) {
                        if (Utils.isArray(value)) {
                            value = value.map((val) =>
                                val ? this.castAdvancedValue(val, column) : val
                            );
                        } else {
                            value = this.castAdvancedValue(value, column);
                        }
                        if (column.formatter) {
                            if (Utils.isArray(value)) {
                                value = value.map((val) =>
                                    val
                                        ? this.formatService.formatValue(
                                              val,
                                              column
                                          )
                                        : val
                                );
                            } else {
                                value = this.formatService.formatValue(
                                    value,
                                    column
                                );
                            }
                        }
                    }
                    obj[expr.field!] = value;
                }
            }
        }
        return obj;
    }

    /**
     * Return a string expression of a range select
     * @param field
     * @param from lower value of the range
     * @param to higher value of the range
     */
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

    /**
     * Return a string expression of a select
     * @param field
     * @param value
     */
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

    /**
     * Format a given value according to its column definition
     * @param config
     * @param advancedValue
     */
    public formatAdvancedValue(
        config:
            | BasicAdvancedConfig
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

    /**
     * Check the validity of value against its column
     * @param config
     * @param advancedValue
     */
    public ensureAdvancedValue(
        config:
            | BasicAdvancedConfig
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

    /**
     * Cast a given value as per its column definition
     * @param value
     * @param column
     */
    public castAdvancedValue(value: any, column: CCColumn | undefined): any {
        if (column) {
            if (Utils.isString(value)) {
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
        return value;
    }

    /**
     * Create a generic FormControl
     * @param config required configuration for the generic advanced-form-select
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    protected createControl(
        config: BasicAdvancedConfig,
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
            | BasicAdvancedConfig
            | AdvancedSelect
            | AdvancedRange
            | AdvancedInput
            | AdvancedCheckbox,
        value: BasicAdvancedValue
    ): BasicAdvancedValue {
        if (value !== undefined) {
            const column = this.appService.getColumn(config.field);
            if (!this._isDistribution(config)) {
                value = this.castAdvancedValue(value, column);
            }
        }
        return value;
    }

    /**
     * Return the parser if existing in the given field
     * @param field
     */
    private _parser(field: string): string | undefined {
        const column = this.appService.getColumn(field);
        return column ? column.parser : undefined;
    }

    private _rangeType(
        config:
            | BasicAdvancedConfig
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
            | BasicAdvancedConfig
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
