/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    FormControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators,
} from "@angular/forms";

/* Services */
import { CCColumn } from "@sinequa/core/web-services";
import { Utils } from "@sinequa/core/base";
import { SearchService } from "@sinequa/components/search";
import {
    AppService,
    Expr,
    ExprOperator,
    FormatService,
    Query,
    advancedFacetPrefix,
    ExprBuilder, ValueItem
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
export type BaseAdvancedValue = string | number | Date | boolean | undefined;

/**
 * Defines an advamced value type as either a single basic advanved value or an array of basic advanced values
 */
export type AdvancedValue = BaseAdvancedValue | BaseAdvancedValue[];

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
    min: (min: string | number | Date, config: AdvancedConfig) => ValidatorFn;
    max: (max: string | number | Date, config: AdvancedConfig) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (config: AdvancedConfig) => ValidatorFn;
    number: (config: AdvancedConfig) => ValidatorFn;
    date: (config: AdvancedConfig) => ValidatorFn;
    range: (config: AdvancedConfig) => ValidatorFn;
}

export interface BaseAdvancedConfig {
    type: AdvancedFormType;
    field: string;
}

export interface AdvancedSelect extends BaseAdvancedConfig {
    list: string;
    aggregation: string;
    multiple: boolean;
    operator: AdvancedOperator;
}

export interface AdvancedRange extends BaseAdvancedConfig {
    min: string | number | Date;
    max: string | number | Date;
}

export interface AdvancedInput extends BaseAdvancedConfig {
    operator: AdvancedOperator;
}

export interface AdvancedCheckbox extends BaseAdvancedConfig {}

export type AdvancedConfig = AdvancedSelect | AdvancedRange | AdvancedInput | AdvancedCheckbox;

@Injectable({
    providedIn: "root",
})
export class AdvancedService {

    /**
     * Default form validators packaged within SBA to standardize advanced-search validation
     */
    public readonly validators: AdvancedFormValidators = {
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
        public formatService: FormatService,
        public exprBuilder: ExprBuilder
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
        config: AdvancedConfig,
        query = this.searchService.query
    ): AdvancedValue {
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
            }
        }
        return undefined;
    }
    
    public setSelect(field: string, value: AdvancedValue, query?: Query, combineWithAnd?: boolean) {
        let expr;
        if(value !== undefined) {
            let _value = this.asValueItems(value, field);
            if(combineWithAnd) {
                expr = this.exprBuilder.makeAndExpr(field, _value);
            }
            else {
                expr = this.exprBuilder.makeOrExpr(field, _value);
            }
        }
        // When expr is not defined, this simply removes the selection 
        this.setAdvancedSelect(query, field, expr);
    }

    public setNumericalSelect(
        field: string,
        value: string | Date | number | undefined,
        operator: '>' | '>=' | '<' | '<=' | '=' | '<>', 
        query?: Query) {
            
        let expr;
        if(value !== undefined) {
            value = this.parse(value, field);
            expr = this.exprBuilder.makeNumericalExpr(field, operator, value);
        }
        // When expr is not defined, this simply removes the selection 
        this.setAdvancedSelect(query, field, expr);
    }

    public setRangeSelect(
        field: string,
        range: (string | Date | number)[] | undefined,
        query?: Query) {

        let expr;
        if(range && range.length === 2) {
            let from = this.parse(range[0], field);
            let to = this.parse(range[1], field);
            if (from && to) {
                expr = this.exprBuilder.makeRangeExpr(field, from, to);
            } else if (from) {
                expr = this.exprBuilder.makeNumericalExpr(field, '>=', from);
            } else if (to) {
                expr = this.exprBuilder.makeNumericalExpr(field, '<=', to);
            }
        }
        // When expr is not defined, this simply removes the selection 
        this.setAdvancedSelect(query, field, expr);
    }

    protected setAdvancedSelect(query = this.searchService.query, field: string, expr?: string) {
        query.removeSelect(
            advancedFacetPrefix + field
        );
        if (expr) {
            query.addSelect(
                expr,
                advancedFacetPrefix + field
            );
        }
    }
    
    protected asValueItems(value: AdvancedValue, field: string): (string | ValueItem)[] {
        if(!Utils.isArray(value)) {
            value = [value];
        }
        return value.filter(v => !!v)
            .map(value => { return {value: this.parse(value, field) as string | Date | number | boolean} });
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
     * Format a given value according to its column definition
     * @param config
     * @param advancedValue
     */
    public formatAdvancedValue(
        config: AdvancedConfig,
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
        config: AdvancedConfig,
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
        config: BaseAdvancedConfig,
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
        config: BaseAdvancedConfig,
        value: BaseAdvancedValue
    ): BaseAdvancedValue {
        if (value !== undefined) {
            const column = this.appService.getColumn(config.field);
            if (!this._isDistribution(config)) {
                value = this.castAdvancedValue(value, column);
            }
        }
        return value;
    }

    protected parse<T>(value: T, field: string): T | string {
        const parser = this._parser(field);
        if (parser && Utils.isString(value)) {
            return this.formatService.parseValue(value, parser);
        }
        return value;
    }

    /**
     * Return the parser if existing in the given field
     * @param field
     */
    protected _parser(field: string): string | undefined {
        const column = this.appService.getColumn(field);
        return column ? column.parser : undefined;
    }

    protected _rangeType(
        config: AdvancedConfig
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
        config: AdvancedConfig
    ): boolean {
        if ("aggregation" in config && config.aggregation) {
            const ccaggregation = this.appService.getCCAggregation(
                config.aggregation
            );
            return !!ccaggregation && !!ccaggregation.distribution;
        }
        return false;
    }

}
