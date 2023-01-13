/* Dépendences fonctionnelles internes d'Angular */
import { Injectable } from "@angular/core";
import {
    UntypedFormControl,
    ValidatorFn,
    AsyncValidatorFn,
    Validators,
    AbstractControl,
} from "@angular/forms";

/* Services */
import { Utils } from "@sinequa/core/base";
import { SearchService } from "@sinequa/components/search";
import {
    AppService,
    FormatService,
    Query,
    ValueItem,
} from "@sinequa/core/app-utils";
import { ValidationService } from "@sinequa/core/validation";
import { CCColumn, Filter, getFieldPredicate, ValueFilter } from "@sinequa/core/web-services";
import { FacetService } from "@sinequa/components/facet";

/**
 * Defines the possible basic types of an advanced value
 */
export type BaseAdvancedValue = string | number | Date | boolean | undefined;

/**
 * Defines an advanced value type as either a single basic advanced value or an array of basic advanced values
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
            this.validationService.minValidator(min, this._parser(field)),
        max: (max, field) =>
            this.validationService.maxValidator(max, this._parser(field)),
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
        public facetService: FacetService,
        public validationService: ValidationService,
        public formatService: FormatService,
    ) {}

    /**
     * Return a standard FormControl compatible with a select component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public createSelectControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): UntypedFormControl {
        const value = this.getValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a range-input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public createRangeControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): UntypedFormControl {
        const value = this.getRangeValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a text input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public createInputControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): UntypedFormControl {
        const value = this.getValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a multi-value text input component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public createMultiInputControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): UntypedFormControl {
        const value = this.getValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Return a standard FormControl compatible with a checkbox component
     * @param field
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public createCheckboxControl(
        field: string,
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[],
        query = this.searchService.query
    ): UntypedFormControl {
        const value = this.getBooleanValue(field, query);
        return this.createControl(value, validators, asyncValidators);
    }

    /**
     * Reset the supplied AbstractControl (and its validation) and sets its value to undefined
     * @param control
     */
    public resetControl(control: AbstractControl) {
        control.reset();
        control.setValue(undefined);
    }

    /**
     * Reset the supplied AbstractControl (and its validation) and sets its value to [undefined, undefined]
     * @param control
     */
    public resetRangeControl(control: AbstractControl) {
        control.reset();
        control.setValue([undefined, undefined]);
    }

    /**
     * Retrieve the value (ValueItem | ValueItem[] | undefined) to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public getValue(
        field: string,
        query = this.searchService.query
    ): ValueItem | ValueItem[] | undefined {
        const filter = this.getAdvancedFilter(field, query);
        if (filter) {
            let value: ValueItem | ValueItem[] = this.extractValues(filter);
            if(value.length > 0) {
                if(value.length === 1) {
                    value = value[0];
                }
                return this.formatValueItems(field, value);
            }
        }
        return undefined;
    }

    extractValues(filter: Filter): ValueItem[] {
        if(filter.operator === 'and' || filter.operator === 'or' || filter.operator === 'not') {
            return filter.filters.map(f => this.extractValues(f)).flat();
        }
        else if(typeof (filter as ValueFilter).value !== 'undefined') {
            return [{value: (filter as ValueFilter).value, display: filter.display}];
        }
        return [];
    }

    /**
     * Retrieve the boolean value to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public getBooleanValue(
        field: string,
        query = this.searchService.query
    ): boolean | undefined {
        const filter = this.getAdvancedFilter(field, query);
        if (typeof (filter as ValueFilter)?.value !== 'undefined') {
            return this.formatAdvancedValue(field, (filter as ValueFilter).value) as boolean;
        }
        return undefined;
    }

    /**
     * Retrieve the range value to be set to the FormControl from the Query
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    public getRangeValue(
        field: string,
        query = this.searchService.query
    ): AdvancedValue {
        const filter = this.getAdvancedFilter(field, query);
        if (filter) {
            if (filter.operator === 'between') {
                return [filter.start, filter.end].map(value => this.formatAdvancedValue(field, value)) as AdvancedValue;
            } else if(filter.operator === 'gte' || filter.operator === 'lte'){
                const _value = this.formatAdvancedValue(field, filter.value) as BaseAdvancedValue;
                return filter.operator === 'gte'? [_value, undefined] : [undefined, _value];
            }
        }
        return [undefined, undefined];
    }

    /**
     * Return the filter of an advanced filter
     * @param field
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     */
    protected getAdvancedFilter(
        field: string,
        query = this.searchService.query
    ): Filter | undefined {
        return query.findFilter(getFieldPredicate(field));
    }

    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and value(s)
     * @param field
     * @param value
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     * @param combineWithAnd
     */
    public setSelect(
        field: string,
        value: ValueItem | ValueItem[] | undefined,
        query?: Query,
        combineWithAnd?: boolean
    ) {
        let filter: Filter | undefined;
        if (value !== undefined) {
            const _value = this.asValueItems(value, field);
            const operator = combineWithAnd? 'and':'or';
            filter = {
                operator,
                filters: _value.map(v => {
                    if(Array.isArray(v.value)) { // Not sure this case can actually ever happen, but just in case...
                        return {operator: 'and', display: v.display, filters: v.value.map(fieldValue => ({
                            field, value: Utils.isString(fieldValue)? fieldValue : fieldValue.value, display: Utils.isString(fieldValue)? undefined : fieldValue.display
                        }))};
                    }
                    const value = v.value instanceof Date? Utils.toSysDateStr(v.value) : v.value;
                    return {field, value, display: v.display};
                })
            }
        }
        // When filter is not defined, this simply removes the selection
        this.setAdvancedSelect(field, filter, query);
    }

    /**
     * Sets a select on a query (defaults to searchService.query) for a given
     * field and a boolean value
     * @param field
     * @param value
     * @param discardFalsy by default it is 'false', so a false value is used to be undefined
     * @param query
     */
    public setBooleanSelect(
        field: string,
        value: boolean | undefined,
        allowFalsy: boolean = false,
        query?: Query
    ) {
        let filter: Filter | undefined;
        if (value === true || (value === false || allowFalsy)) {
            value = !!value;
            filter = {field, value};
        }
        // When filter is not defined, this simply removes the selection
        this.setAdvancedSelect(field, filter, query);
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
        value: string | Date | number | ValueItem | undefined,
        operator: "gt" | "gte" | "lt" | "lte" | "eq" | "neq",
        query?: Query
    ) {
        let filter: Filter | undefined;
        if (value !== undefined) {
            if (this._isValueItem(value)) {
                value = value.value as string | Date | number;
            }
            value = this.parse(value, field);
            if(value instanceof Date) {
                value = Utils.toSysDateStr(value);
            }
            filter = {field, operator, value};
        }
        // When filter is not defined, this simply removes the selection
        this.setAdvancedSelect(field, filter, query);
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
        query?: Query
    ) {
        let filter: Filter | undefined;
        if (range && range.length === 2) {
            const from = this.parse(range[0] || undefined, field);
            const to = this.parse(range[1] || undefined, field);
            filter = this.facetService.makeRangeFilter(field, from, to);
        }
        // When filter is not defined, this simply removes the selection
        this.setAdvancedSelect(field, filter, query);
    }

    /**
     * Sets a select for a given field and filter on the query (defaults to searchService.query)
     * @param query Query where to fetch advanced values, if omitted, use searchService.query
     * @param field
     * @param filter
     */
    protected setAdvancedSelect(
        field: string,
        filter: Filter | undefined,
        query = this.searchService.query
    ) {
        query.removeFieldFilters(field);
        if (filter) {
            query.addFilter(filter);
        }
    }

    /**
     * Remove a specific advanced value by its field name.
     * By default, Trigger search() action
     * @param field
     * @param query Query from which will remove the specific advanced value, if omitted, use searchService.query
     * @param search
     */
    public removeAdvancedValue(
        field: string,
        search: boolean = true,
        query: Query = this.searchService.query
    ): void {
        query.removeFieldFilters(field);
        this.searchService.setQuery(query, false);
        if (search) {
            this.searchService.search();
        }
    }

    /**
     * Transforms a value to a parsed ValueItem[]
     * @param value
     * @param field
     */
    protected asValueItems(
        value: ValueItem | ValueItem[],
        field: string
    ): ValueItem[] {
        if (this._isValueItemArray(value)) {
            return value.map((val) => ({
                value: this.parse(val.value, field) as
                    | string
                    | Date
                    | number
                    | boolean,
                display: val.display,
            }));
        }
        return [
            {
                value: this.parse(value.value, field) as
                    | string
                    | Date
                    | number
                    | boolean,
                display: value.display,
            },
        ];
    }

    public formatValueItems(
        field: string,
        value: ValueItem | ValueItem[]
    ): ValueItem | ValueItem[] {
        if (this._isValueItemArray(value)) {
            return value.map((val) => this.formatValueItem(field, val));
        }
        return this.formatValueItem(field, value);
    }

    /**
     * Format the display property of the ValueItem according its related column definition
     * @param field
     * @param value
     */
    protected formatValueItem(field: string, value: ValueItem): ValueItem {
        const column = this.appService.getColumn(field);
        if (column) {
            value.display = (this.formatBaseAdvancedValue(
                value.display!,
                column
            ) as string | Date | number | boolean).toString();
        }
        return value;
    }

    /**
     * Format a given advanced value according to its column definition
     * @param field
     * @param value
     */
    public formatAdvancedValue(
        field: string,
        value: AdvancedValue
    ): AdvancedValue {
        if (value) {
            const column = this.appService.getColumn(field);
            if (column) {
                if (Utils.isArray(value)) {
                    return value.map((v) =>
                        v ? this.formatBaseAdvancedValue(v, column) : v
                    );
                }
                return this.formatBaseAdvancedValue(value, column);
            }
        }
        return value;
    }

    protected formatBaseAdvancedValue(
        value: BaseAdvancedValue,
        column: CCColumn
    ): BaseAdvancedValue {
        if (value) {
            value = this.castAdvancedValue(value, column);
            return column.formatter ? this.formatService.formatValue(value!, column) : value;
        }
        return value;
    }

    /**
     * Cast a given value as per its column definition
     * @param value
     * @param column
     */
    public castAdvancedValue(
        value: BaseAdvancedValue,
        column: CCColumn | undefined
    ): BaseAdvancedValue {
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
     * @param value value of the FormControl
     * @param validators optional validators to be added to the returned FormControl
     * @param asyncValidators optional asyncValidators to be added to the returned FormControl
     */
    protected createControl(
        value: AdvancedValue | ValueItem | ValueItem[],
        validators?: ValidatorFn[],
        asyncValidators?: AsyncValidatorFn[]
    ): UntypedFormControl {
        return new UntypedFormControl(
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

    /**
     * Parse a value according to its column definition
     * @param value
     * @param field
     */
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

    protected _rangeType(field: string): string | number | Date {
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

    /**
     * Return `true` if the passed value is an `ValueItem[]`
     */
    protected _isValueItemArray(value: any): value is ValueItem[] {
        if (Utils.isArray(value)) {
            const condition = (element) => this._isValueItem(element);
            return value.every(condition);
        }
        return false;
    }

    /**
     * Return `true` if the passed value is an `ValueItem`
     */
    protected _isValueItem(value: any): value is ValueItem {
        if (
            Utils.isObject(value) &&
            !Utils.isArray(value) &&
            !Utils.isDate(value)
        ) {
            if (value.hasOwnProperty("value")) {
                return true;
            }
        }
        return false;
    }
}
