/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    FormControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators,
} from "@angular/forms";

/* Services */
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
import { CCColumn } from '@sinequa/core/web-services';

/**
 * Defines the possible basic types of an advanced value
 */
export type BaseAdvancedValue = string | number | Date | boolean | undefined;

/**
 * Defines an advamced value type as either a single basic advanved value or an array of basic advanced values
 */
export type AdvancedValue = BaseAdvancedValue | BaseAdvancedValue[];


export interface AdvancedFormValidators {
    min: (min: string | number | Date, field: string) => ValidatorFn;
    max: (max: string | number | Date, field: string) => ValidatorFn;
    required: ValidatorFn;
    email: ValidatorFn;
    pattern: (pattern: string | RegExp) => ValidatorFn;
    integer: (field: string) => ValidatorFn;
    number: (field: string) => ValidatorFn;
    date: (field: string) => ValidatorFn;
    range: (field: string) => ValidatorFn;
}

@Injectable({
    providedIn: "root",
})
export class AdvancedService {

    /**
     * Default form validators packaged within SBA to standardize advanced-search validation
     */
    public readonly validators: AdvancedFormValidators = {
        min: (min, field) =>
            this.validationService.minValidator(
                min,
                this._parser(field)
            ),
        max: (max, field) =>
            this.validationService.maxValidator(
                max,
                this._parser(field)
            ),
        required: Validators.required,
        email: Validators.email,
        pattern: (pattern: string | RegExp) => Validators.pattern(pattern),
        integer: (field) =>
            this.validationService.integerValidator(this._parser(field)),
        number: (field) =>
            this.validationService.numberValidator(this._parser(field)),
        date: (field) =>
            this.validationService.dateValidator(this._parser(field)),
        range: (field) =>
            this.validationService.rangeValidator(
                this._rangeType(field),
                this._parser(field)
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
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): FormControl {
        const value = this.getAdvancedValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a range-input component
     * @param config required configuration for the generic advanced-form-range
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createRangeControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): FormControl {
        const value = this.getRangeValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a text input component
     * @param config required configuration for the generic advanced-form-input
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createInputControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): FormControl {
        const value = this.getAdvancedValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a multi-value text input component
     * @param config required configuration for the generic advanced-form-multi-input
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createMultiInputControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): FormControl {
        const value = this.getAdvancedValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a checkbox component
     * @param config required configuration for the generic advanced-form-checkbox
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    public createCheckboxControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): FormControl {
        const value = this.getAdvancedValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Retrieve the value to be set to a specific FormControl from the search Query
     * @param config advanced-search-form component's configuration
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public getAdvancedValue(field: string, query = this.searchService.query): AdvancedValue {
        let expr = this.getAdvancedExpr(field, query);
        if (expr) {
            const value = this.getValueFromExpr(expr);
            return this.formatAdvancedValue(field, value);
        }
        return undefined;
    }

    public getRangeValue(field: string, query = this.searchService.query): AdvancedValue {
        const expr = this.getAdvancedExpr(field, query);
        if(expr) {
            let value = this.getValueFromExpr(expr);
            value = this.formatAdvancedValue(field, value);
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
        return [undefined, undefined];
    }

    protected getAdvancedExpr(field: string, query = this.searchService.query): Expr | undefined {
        let expr: Expr | string;
        const expression = query.findSelect(
            advancedFacetPrefix + field
        )?.expression;
        if (expression) {
            expr = this.appService.parseExpr(expression);
            if (expr instanceof Expr) {
                return expr;
            }
        }
        return undefined;
    }

    protected getValueFromExpr(expr: Expr): AdvancedValue {
        let value: AdvancedValue;
        if (Utils.isString(expr.value) && expr.value.indexOf("[") > -1) {
            value = JSON.parse(expr.value.replace(/`/g, '"'));
        }
        if (!value) {
            if (expr.values && expr.values.length > 1) {
                value = expr.values;
            } else {
                value = expr.value;
            }
        }
        return value;
    }
    
    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and value(s)
     * @param field 
     * @param value 
     * @param query 
     * @param combineWithAnd 
     */
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

    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field, operator and value
     * @param field 
     * @param value 
     * @param operator 
     * @param query 
     */
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

    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and range of values
     * @param field 
     * @param range 
     * @param query 
     */
    public setRangeSelect(
        field: string,
        range: (string | Date | number)[] | undefined,
        query?: Query) {

        let expr;
        if(range && range.length === 2) {
            let from = this.parse(range[0] || undefined, field);
            let to = this.parse(range[1] || undefined, field);
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

    /**
     * Sets a select for a given field and expression on the query (defaults to searchService.query)
     * @param query 
     * @param field 
     * @param expr 
     */
    protected setAdvancedSelect(query = this.searchService.query, field: string, expr: string | undefined) {
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
    
    /**
     * Transforms an AdvancedValue into a ValueItem[]
     * @param value 
     * @param field 
     */
    protected asValueItems(value: AdvancedValue, field: string): ValueItem[] {
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
        search: boolean = true,
        query?: Query | undefined
    ): void {
        if (field) {
            if (!query) {
                query = this.searchService.query.copy();
            }
            query.removeSelect(advancedFacetPrefix + field);
            this.searchService.setQuery(query, false);
            if (search) {
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
    public resetAdvancedValues(search: boolean = true, query?: Query | undefined): void {
        if (!query) {
            query = this.searchService.query.copy();
        }
        this.searchService.setQuery(query.toStandard(), false);
        if (search) {
            this.searchService.search();
        }
    }

    /**
     * Format a given value according to its column definition
     * @param config
     * @param advancedValue
     */
    public formatAdvancedValue(field: string, value: AdvancedValue): AdvancedValue {
        if (value) {
            const column = this.appService.getColumn(field);
            if (column && column.formatter) {
                if(Utils.isArray(value)){
                    return value.map(v => v? this.formatBaseAdvancedValue(v, column) : v)
                }
                return this.formatBaseAdvancedValue(value, column);
            }
        }
        return value;
    }

    protected formatBaseAdvancedValue(value: BaseAdvancedValue, column: CCColumn): BaseAdvancedValue {
        if(value) {
            value = this.castAdvancedValue(value, column);
            return this.formatService.formatValue(value!, column);
        }
        return value
    }
    
    /**
     * Cast a given value as per its column definition
     * @param value
     * @param column
     */
    public castAdvancedValue(value: BaseAdvancedValue, column: CCColumn | undefined): BaseAdvancedValue {
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
        value: AdvancedValue,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): FormControl {
        return new FormControl(
            {
                value,
                disabled: false,
            },
            {
                validators: !!validators ? validators : [],
                asyncValidators: !!asyncValidators ? asyncValidators : [],
                updateOn: "change",
            }
        );
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
        field: string
    ): string | number | Date {
        const column = this.appService.getColumn(field);
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

}
