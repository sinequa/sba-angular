import {Injectable} from "@angular/core";
import {Validators, ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms";
import {IntlService} from "@sinequa/core/intl";
import {FormatService} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";

/**
 * @ignore
 */
function isEmptyInputValue(value: any): boolean {
    // we don't check for string here so it also works with arrays
    return value === null || value === undefined || value.length === 0;
}

const processInputValue = (value: any) => { // add support for object values of the advanced search
  if (Utils.isArray(value)) {
    return value.map(
      (val) => {
        if (Utils.isObject(val) && val.hasOwnProperty("value")) {
          return val.value;
        }
        return val;
      }
    )
  } else {
    if (Utils.isObject(value) && value.hasOwnProperty("value")) {
      return [value.value];
    }
    return [value];
  }
}

// Email regular expression, taken from built-in Angular validators.
/**
 * @ignore
 */
const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;

/**
 * Enumerates the supported validator types.
 */
export enum ValidatorType {
    Min = "Min",
    Max = "Max",
    Required = "Required",
    Email = "Email",
    Pattern = "Pattern",
    Integer = "Integer",
    Number = "Number",
    Date = "Date",
    Range = "Range",
}

/**
 * Describes a `Validator` object.
 */
export interface Validator {
    /**
     * The validator's type.
     */
    type: ValidatorType;
    /**
     * The validator's name.
     */
    name: string;
    /**
     * The validator's error message to be displayed when a value is invalid.
     */
    errorMessage: string;
    /**
     * `true` if the validator is to be applied.
     */
    active: boolean;
}

/**
 * Defines the default error messages for each validator.
 */
const errorMessagesMap = {
    // Built-in Angular validators
    min: "msg#validation.min",
    max: "msg#validation.max",
    required: "msg#validation.required",
    requiredTrue: "msg#validation.requiredTrue",
    email: "msg#validation.email",
    minlength: "msg#validation.minLength",
    maxlength: "msg#validation.maxLength",
    pattern: "msg#validation.pattern",

    // Custom
    unique: "msg#validation.unique",
    integer: "msg#validation.integer",
    number: "msg#validation.number",
    date: "msg#validation.date",
    range: "msg#validation.range"
};


/**
 * This service provides a set of locale-sensitive validators with support for arrays.
 * The validator error messages are {@link IntlService} `msg#` messages of the form:
 * `msg#validation.<validator name>`.
 */
@Injectable({
    providedIn: "root"
})
export class ValidationService {
    constructor(
        protected formatService: FormatService,
        protected intlService: IntlService) {
    }

    /**
     * A pattern validator based on Angular's `Validators.pattern` with support for value arrays.
     *
     * @param pattern The pattern.
     * @returns The validation function.
     */
    static patternValidator(pattern: string | RegExp): ValidatorFn {
        // #region This code region is based on Validators.pattern()
        if (!pattern) {
            return Validators.nullValidator;
        }

        let regex: RegExp;
        let regexStr: string;
        if (typeof pattern === 'string') {
            regexStr = '';

            if (pattern.charAt(0) !== '^') {
                regexStr += '^';
            }

            regexStr += pattern;

            if (pattern.charAt(pattern.length - 1) !== '$') {
                regexStr += '$';
            }

            regex = new RegExp(regexStr);
        } else {
            regexStr = pattern.toString();
            regex = pattern;
        }
        // #endregion

        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) {
                return null;  // don't validate empty values to allow optional controls
            }

            let values: any[] = [];
            values = processInputValue(control.value);

            for (const value of values) {
                if (!regex.test(value)) {
                    return {pattern: {requiredPattern: pattern.toString(), actualValue: value}};
                }
            }

            return null;
        };
    }

    /**
     * A pattern validator based on Angular's `Validators.email` with support for value arrays.
     *
     * @param control The control to validate.
     * @returns The result.
     */
    static emailValidation(control: AbstractControl): ValidationErrors | null {
        if (isEmptyInputValue(control.value)) {
            return null;  // don't validate empty values to allow optional controls
        }

        let values: any[] = [];
        values = processInputValue(control.value);

        for (const value of values) {
            if (!EMAIL_REGEXP.test(value)) {
                return {email: true};
            }
        }

        return null;
    }

    /**
     * Get the name of the first validator in a map of validation errors.
     * @param errors The validation errors
     * @returns The name of the first validator, if any - `undefined` otherwise.
     */
    getFirstError(errors: ValidationErrors): string | undefined {
        if (errors) {
            return Object.keys(errors)[0];
        }
        return undefined;
    }

    /**
     * Get the error message associated with the passed validator.
     * @param name The name of a validator.
     * @returns The error message.
     */
    getErrorText(name?: string): string {
        const text = name ? errorMessagesMap[name] : undefined;
        if (!text) {
            return "Unknown validator: " + name;
        }
        return text;
    }

    /**
     * Get the error message associated with first validator in a map of validation errors.
     * @param errors The validation errors.
     * @returns The error message.
     */
    getFirstErrorText(errors: ValidationErrors): string | undefined {
        if (errors) {
            const error = this.getFirstError(errors);
            if (error) {
                return this.getErrorText(error);
            }
        }
        return undefined;
    }

    /**
     * Get the data held for the first error in a map of validation errors
     * @param errors The validation errors.
     */
    getFirstErrorInfo(errors: ValidationErrors): any {
        if (errors) {
            const error = this.getFirstError(errors);
            if (error) {
                return errors[error];
            }
        }
        return undefined;
    }

    /**
     * Get a validator function that validates that values are greater than or equal
     * to the passed `min` value. The function supports single values and arrays of
     * values and will optionally parse the values using the {@link FormatService} if
     * a parser is passed. Dates will be parsed according to the current locale.
     *
     * @param min The minimum value to test against. The type determines
     * how the test will be made.
     * @param parser An optional parser name.
     */
    minValidator(min: string | number | Date, parser?: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
                return null;  // don't validate empty values to allow optional controls
            }

            let values: any[] = [];
            values = processInputValue(control.value);

            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    let cmp = 0;
                    if (Utils.isNumber(min)) {
                        if (Utils.testFloat(value1)) {
                            value1 = Utils.toNumber(value1);
                            cmp = value1 - min;
                        }
                    }
                    else if (Utils.isString(min)) {
                        cmp = Utils.compare(value1, min);
                    }
                    else if (Utils.isDate(min)) {
                        if (Utils.isString(value1)) {
                            value1 = this.intlService.parseDate(value1);
                            if (value1) {
                                cmp = value1.getTime() - min.getTime();
                            }
                        }
                        else if (Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                            cmp = value1.getTime() - min.getTime();
                        }
                    }
                    if (cmp < 0) {
                        return {min: {min, actual: value}};
                    }
                }
            }
            return null;
        };
    }

    /**
     * Get a validator function that validates that values are less than or equal
     * to the passed `max` value. The function supports single values and arrays of
     * values and will optionally parse the values using the {@link FormatService} if
     * a parser is passed. Dates will be parsed according to the current locale.
     *
     * @param max The maximum value to test against. The type determines
     * how the test will be made.
     * @param parser An optional parser name.
     */
    maxValidator(max: string | number | Date, parser?: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
                return null;  // don't validate empty values to allow optional controls
            }
            let values: any[] = [];
            values = processInputValue(control.value);

            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    let cmp = 0;
                    if (Utils.isNumber(max)) {
                        if (Utils.testFloat(value1)) {
                            value1 = Utils.toNumber(value1);
                            cmp = value1 - max;
                        }
                    }
                    else if (Utils.isString(max)) {
                        cmp = Utils.compare(value1, max);
                    }
                    else if (Utils.isDate(max)) {
                        if (Utils.isString(value1)) {
                            value1 = this.intlService.parseDate(value1);
                            if (value1) {
                                cmp = value1.getTime() - max.getTime();
                            }
                        }
                        else if (Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                            cmp = value1.getTime() - max.getTime();
                        }
                    }
                    if (cmp > 0) {
                        return {max: {max, actual: value}};
                    }
                }
            }
            return null;
        };
    }

    /**
     * Get a validator function that validates that values are integers. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    integerValidator(parser?: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) {
                return null;  // don't validate empty values to allow optional controls
            }
            let values: any[] = [];
            values = processInputValue(control.value);

            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    if (!Utils.testInteger(value1)) {
                        return {integer: {value}};
                    }
                }
            }
            return null;
        };
    }

    /**
     * Get a validator function that validates that values are numeric. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed.
     *
     * @param parser An optional parser name.
     */
    numberValidator(parser?: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) {
                return null;  // don't validate empty values to allow optional controls
            }
            let values: any[] = [];
            values = processInputValue(control.value);

            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    let value1 = value;
                    if (parser) {
                        value1 = this.formatService.parseValue(value1, parser);
                    }
                    if (!Utils.testFloat(value1)) {
                        return {number: {value}};
                    }
                }
            }
            return null;
        };
    }

    /**
     * Get a validator function that validates that values are dates. The function
     * supports single values and arrays of values and will optionally parse the values
     * using the {@link FormatService} if a parser is passed. Dates will be parsed according
     * to the current locale.
     *
     * @param parser An optional parser name.
     */
    dateValidator(parser?: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value)) {
                return null;  // don't validate empty values to allow optional controls
            }
            let values: any[] = [];
            values = processInputValue(control.value);

            for (const value of values) {
                if (!isEmptyInputValue(value)) {
                    if (Utils.isString(value)) {
                        let value1 = value;
                        if (parser) {
                            value1 = this.formatService.parseValue(value1, parser);
                        }
                        if (!this.intlService.parseDate(value1)) {
                            return {date: {value}};
                        }
                    }
                    else if (Utils.isDate(value)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                        if (isNaN(value.getTime())) {
                            return {date: {value}};
                        }
                    }
                }
            }
            return null;
        };
    }

    /**
     * Get a validator function that validates that, for pair of values, the second value is
     * greater than the first. If one or both values are empty then the validation passes.
     * The validator function supports single values and arrays of values and will optionally
     * parse the values using the {@link FormatService} if a parser is passed. Dates will be
     * parsed according to the current locale.
     *
     * @param type A value whose type indicates how the range test will be made.
     * @param parser An optional parser name.
     */
    rangeValidator(type: string | number | Date, parser?: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (isEmptyInputValue(control.value) || !Utils.isArray(control.value) || control.value.length !== 2) {
                return null;  // don't validate empty values to allow optional controls
            }
            let value1 = control.value[0];
            let value2 = control.value[1];
            if (isEmptyInputValue(value1) || isEmptyInputValue(value2)) {
                return null;
            }
            if (parser) {
                value1 = this.formatService.parseValue(value1, parser);
                value2 = this.formatService.parseValue(value2, parser);
            }
            let cmp = 0;
            if (Utils.isString(type)) {
                cmp = Utils.compare(value2, value1);
            }
            else if (Utils.isDate(type)) {
                let date1: Date | undefined;
                let date2: Date | undefined;
                if (Utils.isString(value1)) {
                    date1 = this.intlService.parseDate(value1);
                }
                else if (Utils.isDate(value1)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                    date1 = value1;
                }
                if (Utils.isString(value2)) {
                    date2 = this.intlService.parseDate(value2);
                }
                else if (Utils.isDate(value2)) { // ngx-bootstrap returns date values (new Date(NaN) if invalid)
                    date2 = value2;
                }
                if (date1 && date2) {
                    cmp = date2.getTime() - date1.getTime();
                }
            }
            else if (Utils.isNumber(type)) {
                if (Utils.testFloat(value1) && Utils.testFloat(value2)) {
                    const num1 = Utils.toNumber(value1);
                    const num2 = Utils.toNumber(value2);
                    if (num1 !== null && num2 !== null) {
                        cmp = num2 - num1;
                    }
                }
            }
            return cmp < 0 ? {range: {value1, value2}} : null;
        };
    }
}
