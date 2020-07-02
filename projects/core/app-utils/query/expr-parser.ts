import {Utils, MapOf, IRef, FieldValue} from "@sinequa/core/base";
import {AppService} from "../app.service";
import {AppServiceHelpers} from "../app-service-helpers";
import {CCColumn, EngineType} from "@sinequa/core/web-services";
import {IntlService} from "@sinequa/core/intl";
import {FormatService} from "../format.service";

/**
 * Describes a context for processing expressions
 */
export interface ExprContext {
    appService: AppService;
    formatService: FormatService;
    intlService: IntlService;
    disallowFulltext?: boolean;
}

/**
 * The operators accepted in fielded search expressions
 */
export const enum ExprOperator {
    none,
    eq,
    gt,
    gte,
    lt,
    lte,
    neq,
    regex,
    like,
    contains,
    in,
    between
}

/**
 * The range operators accepted in fielded search expressions
 */
export const enum ExprRange {
    none,
    gteLte,
    gteLt,
    gtLte,
    gtLt
}

/**
 * An object containing the data necessary to format an `Expr` using
 * [IntlService.formatMessage]{@link IntlService#formatMessage}
 */
export interface ExprMessage {
    /**
     * The `IntlService` compatible message string
     */
    message: string;
    /**
     * Any values referenced by `message`
     */
    values?: {
        [key: string]: FieldValue;
    };
}

/**
 * Options to be used with `Expr.toMessage`
 */
export interface ExprMessageOptions {
    /**
     * If `true`, field names are included in the message
     */
    withFields?: boolean;
    /**
     * If `true`, use any display value set in the expression
     */
    useDisplay?: boolean;
    /**
     * Include HTML formatting in the message
     */
    asHTML?: boolean;
    /**
     * If `true`, don't include any outer `NOT` operator in the message
     */
    hideOuterNot?: boolean;
}

/**
 * @ignore
 */
interface ExprMessageCtxt {
    inner: boolean;
    message: string[];
    values: {
        [key: string]: FieldValue
    };
    valueIndex: number;
}

/**
 * Describes a location in a fielded search expression
 */
export interface ExprLocation {
    start: number;
    length: number;
}

/**
 * Describes a location and value in a fielded search expression
 */
export interface ExprValueLocation extends ExprLocation {
    value: string;
}

/**
 * Describes a location, value and field in a fielded search expression
 */
export interface ExprValueInfo extends ExprValueLocation {
    field: string;
}

/**
 * Describes the data used in [Expr.evaluate]{@link Expr#evaluate}
 */
export interface ExprEvaluationContext {
    [key: string]: any;
}

/**
 * Describes an initialization object used in the construction of an {@link Expr} from a value
 */
export interface ExprValueInitializer {
    /**
     * The expression context
     */
    exprContext: ExprContext;
    /**
     * A single value
     */
    value?: string;
    /**
     * An array of values
     */
    values?: string[];
    /**
     * Locations of the values used in range expressions
     */
    locations?: ExprLocation[];
    /**
     * The operator used in the expression
     */
    operator?: ExprOperator;
    /**
     * The field name
     */
    field?: string;
    /**
     * The display value
     */
    display?: string;
}

/**
 * Describes an initialization object used in the construction of a boolean {@link Expr} with a pair of operands
 */
export interface ExprOperandsInitializer {
    /**
     * The expression context
     */
    exprContext: ExprContext;
    /**
     * The first operand
     */
    op1: Expr;
    /**
     * If `true` this `Expr` represents an `AND` expression, otherwise it represents an `OR` expression
     */
    and: boolean;
    /**
     * The second operand
     */
    op2: Expr;
    /**
     * The field name
     */
    field?: string;
    /**
     * The display value
     */
    display?: string;
}

/**
 * Represents a parsed fielded search expression. A tree of expression nodes is built when an expression
 * combines sub-expressions using boolean operators
 */
export class Expr {

    private _field: string | undefined = undefined;

    /**
     * Return the field name of this expression. Return the first ancestor's non-empty field
     * if the field on this node is empty
     */
    public get field(): string | undefined {
        let expr: Expr = this;
        while (expr) {
            if (!Utils.isEmpty(expr._field)) {
                return expr._field;
            }
            expr = expr.parent;
        }
        return undefined;
    }

    /**
     * Set the field name of this expression
     */
    public set field(value: string | undefined) {
        this._field = value;
    }

    private _display: string | undefined = undefined;
    private _displayObj: {label?: string, display?: string} | undefined = undefined;

    /**
     * Return the display value of this expression. Return the first ancestor's non-empty display value
     * if the display value on this node is empty
     */
    public get display(): string | undefined {
        let expr: Expr = this;
        while (expr) {
            if (!Utils.isEmpty(expr._display)) {
                return expr._display;
            }
            expr = expr.parent;
        }
        return undefined;
    }

    /**
     * Set the display value of this expression. If the display value is a valid stringified JSON object
     * then set `displayObj` to the parsed object
     */
    public set display(value: string | undefined) {
        this._display = value;
        if (!this._display) {
            this._displayObj = undefined;
        }
        else {
            if (this._display[0] === "{" && this._display[this._display.length - 1] === "}") {
                try {
                    this._displayObj = Utils.fromJson(this._display);
                }
                catch (e) {
                    this._displayObj = undefined;
                }
            }
            else {
                this._displayObj = undefined;
            }
        }
    }

    /**
     * Return the display object of this expression. Return the first ancestor's non-empty display object
     * if the display object on this node is empty
     */
    public get displayObj(): {label?: string, display?: string} | undefined {
        let expr: Expr = this;
        while (expr) {
            if (expr._displayObj) {
                return expr._displayObj;
            }
            expr = expr.parent;
        }
        return undefined;
    }

    /**
     * The values of this expression
     */
    public values: string[] | undefined = undefined;
    /**
     * The locations of the values of this expression
     */
    public locations: ExprLocation[] | undefined;

    /**
     * Return the value of this expression. Note that range expressions may have multiple values
     */
    public get value(): string | undefined {
        if (!this.values || this.values.length === 0) {
            return undefined;
        }
        return this.values[0];
    }

    /**
     * Set the value of this expression
     */
    public set value(value: string | undefined) {
        if (value === undefined) {
            this.values = undefined;
        }
        else {
            if (!this.values) {
                this.values = [];
            }
            this.values[0] = value;
            this.values.length = 1;
        }
    }

    /**
     * The operator of this expression
     */
    public operator: ExprOperator;
    /**
     * If `true` then this expression included the `NOT` boolean operator
     */
    public not: boolean;
    /**
     * If `true` then the operands of this expression are combined with the `AND` operator.
     * Otherwise the operands are combined with the `OR` operator
     */
    public and: boolean;
    /**
     * The operands of this expression, if any
     */
    public operands: Expr[];
    /**
     * The parent expression, if any
     */
    public parent: Expr;
    /**
     * The expression context
     */
    public exprContext: ExprContext;
    /**
     * The distance specified in a `NEAR` expression
     */
    public near: number;
    /**
     * The position of this expression's value in the original text
     */
    public start: number;
    /**
     * The length of this expression's value in the original text
     */
    public length: number;
    private mergedStructured: boolean;

    // for evaluate
    private _evaluationRegExps: MapOf<RegExp | undefined>;
    private get evaluationRegExps(): MapOf<RegExp | undefined> {
        if (!this._evaluationRegExps) {
            this._evaluationRegExps = {};
        }
        return this._evaluationRegExps;
    }

    constructor(init: ExprValueInitializer | ExprOperandsInitializer) {
        if (!(<ExprOperandsInitializer>init).op1) {
            const valueInit: ExprValueInitializer = <ExprValueInitializer>init;
            this.exprContext = valueInit.exprContext;
            if (!Utils.isUndefined(valueInit.value)) {
                this.value = ExprParser.unescape(valueInit.value);
            }
            else if (!Utils.isUndefined(valueInit.values)) {
                this.values = ExprParser.unescapeList(valueInit.values);
            }
            this.locations = valueInit.locations;
            this.field = valueInit.field;
            this.display = valueInit.display;
            this.operator = !Utils.isUndefined(valueInit.operator) ? valueInit.operator : ExprOperator.none;
            this.near = -1;
            this.start = -1;
            this.length = 0;
        }
        else {
            const opsInit: ExprOperandsInitializer = init as ExprOperandsInitializer;
            this.exprContext = opsInit.exprContext;
            this.field = opsInit.field;
            this.display = opsInit.display;
            this.addOperand(opsInit.op1);
            this.addOperand(opsInit.op2);
            this.and = opsInit.and;
            this.near = -1;
            this.start = -1;
            this.length = 0;
        }
    }

    /**
     * Add an operand to this expression
     *
     * @param operand The operand to add
     * @param contextField The parser's field context, if any
     * @param prepend If `true` the operand is prepended to the operands
     */
    public addOperand(operand: Expr, contextField?: string, prepend = false) {
        if (Utils.isUndefined(contextField)) {
            contextField = this.field;
        }
        if (!this.operands) {
            this.operands = [];
        }
        if (!Utils.isEmpty(this.field) && Utils.isEmpty(operand.field) && !operand.isStructured) {
            if (Utils.isEmpty(contextField)) {
                // Prefer setting the fields explicitly on the target operands rather the Field to "text" on the source operand
                // operand.field = ExprParser.fieldPartnamePrefix + "text";
                for (const expr of this.operands) {
                    if (Utils.isEmpty(expr._field)) {
                        expr._field = this.field;
                    }
                }
                this.field = undefined;
            }
        }
        if (!Utils.eqNC(this.field || "", operand.field || "")) {
            operand._field = operand.field;
        }
        else {
            operand._field = undefined;
        }
        if (!Utils.isEmpty(this.display)) {
            operand._display = undefined;
        }
        if (prepend) {
            this.operands.unshift(operand);
        }
        else {
            this.operands.push(operand);
        }
        operand.parent = this;
    }

    /**
     * Return `true` if this expression is a leaf node (does not have a value)
     */
    public get isLeaf(): boolean {
        // if (this.value === null && !this.operands) throw "Expr.isLeaf - bad expression";
        return !!this.value;
    }

    /**
     * Make an expression object
     *
     * @param exprContext The expression context
     * @param text The value of the expression
     * @param field The parser's field context
     * @param display The display value
     * @param allowEmptyValue Determines how empty values will be processed when making the expression
     */
    public static makeExpr(exprContext: ExprContext, text: string, field: string, display: string, allowEmptyValue: boolean): Expr | undefined {
        if (!Expr.getIsStructuredField(exprContext, Expr.resolveField(exprContext, field))) {
            return new Expr({
                exprContext: exprContext,
                value: text,
                field: field,
                display: display
            });
        }

        const values: IRef<string[] | undefined> = {value: undefined};
        const locations: IRef<ExprLocation[] | undefined> = {value: undefined};
        const operator: IRef<ExprOperator> = {value: ExprOperator.none};
        const range: IRef<ExprRange> = {value: ExprRange.none};
        Expr.parseValue(exprContext, text, field, allowEmptyValue, values, locations, operator, range);
        if (range.value !== ExprRange.none && values.value && locations.value) {
            const value1 = values.value[0];
            const value2 = values.value[1];
            const location1 = locations.value[0];
            const location2 = locations.value[1];
            if (range.value === ExprRange.gteLte && !Utils.eqNC(value1, "*") && !Utils.eqNC(value2, "*")) {
                return new Expr({
                    exprContext: exprContext,
                    values: values.value,
                    locations: locations.value,
                    field: field,
                    display: display,
                    operator: ExprOperator.between
                });
            }
            const expr1 = !Utils.eqNC(value1, "*") ? new Expr({
                exprContext: exprContext,
                value: value1,
                locations: [location1],
                field: field,
                display: display,
                operator: range.value === ExprRange.gteLt || range.value === ExprRange.gteLte ? ExprOperator.gte : ExprOperator.gt
            }) : null;
            const expr2 = !Utils.eqNC(value2, "*") ? new Expr({
                exprContext: exprContext,
                value: value2,
                locations: [location2],
                field: field,
                display: display,
                operator: range.value === ExprRange.gteLte || range.value === ExprRange.gtLte ? ExprOperator.lte : ExprOperator.lt
            }) : undefined;
            if (!expr1 && !expr2) {
                return undefined;
            }
            if (!(!!expr1 && !!expr2)) return !!expr1 ? expr1 : expr2;
            return new Expr({
                exprContext: exprContext,
                op1: expr1,
                and: true,
                op2: expr2,
                display: display
            });
        }
        return new Expr({
            exprContext: exprContext,
            values: values.value,
            locations: locations.value,
            field: field,
            display: display,
            operator: operator.value
        });
    }

    private static resolveField(exprContext: ExprContext, field: string | null | undefined): string {
        if (Utils.isString(field)) {
            return exprContext.appService.resolveColumnName(field);
        }
        return "";
    }

    private static getColumn(exprContext: ExprContext, field: string | undefined): CCColumn | undefined {
        return exprContext.appService.getColumn(field);
    }

    /**
     * Return the {@link CCColumn} corresponding to this expression
     */
    get column(): CCColumn | undefined {
        return Expr.getColumn(this.exprContext, this.field);
    }

    private static getIsStructuredField(exprContext: ExprContext, field: string | undefined): boolean {
        if (!field) {
            return false;
        }
        if (exprContext.disallowFulltext) {
            return true;
        }
        else {
            if (field[0] === ":") {
                return false; // :: => take partname over column
            }
            if (Utils.eqNCN(field, "exists", "missing")) {
                return true;
            }
            return !!Expr.getColumn(exprContext, field);
        }
    }

    /**
     * Return `true` if the expression has a non-fulltext field. In this case the expression will be a leaf node
     */
    get isStructuredField(): boolean {
        if (!this.isLeaf) {
            return false;
        }
        return Expr.getIsStructuredField(this.exprContext, this.field);
    }

    /**
     * Return `true` if the expression only contains non-fulltext fields
     */
    public get isStructured(): boolean {
        if (this.mergedStructured) {
            return true;
        }
        if (this.isLeaf) {
            return this.isStructuredField;
        }
        if (!this.operands) {
            return false;
        }
        for (const operand of this.operands) {
            if (!operand.isStructured) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return `true` if the expression and its ancestors do not have `not` set to `true`
     */
    public get isPositive(): boolean {
        let positive = true;
        let current: Expr = this;
        while (current != null) {
            positive = positive && !current.not;
            current = current.parent;
        }
        return positive;
    }

    /**
     * Return an `ExprValueLocation` object for the passed text. Leading and trailing
     * whitespace is excluded
     */
    static getValueAndLocation(text: string): ExprValueLocation {
        let start = 0;
        let length = text.length;
        const value1 = Utils.trimStart(text);
        start += length - value1.length;
        length -= length - value1.length;
        const value2 = Utils.trimEnd(value1);
        length -= length - value2.length;
        return {
            value: value2,
            start: start,
            length: length
        };
    }

    private static parseValue(exprContext: ExprContext, text: string, field: string, allowEmptyValue: boolean, values: IRef<string[] | undefined>, locations: IRef<ExprLocation[] | undefined>, operator: IRef<ExprOperator>, range: IRef<ExprRange>) {
        if (Utils.isEmpty(text) && !allowEmptyValue) {
            return;
        }
        const first = text[0];
        const last = text[text.length - 1];
        let vl: ExprValueLocation;
        if ("[{".includes(first) && "]}".includes(last)) {
            text = text.substr(1, text.length - 2);
            let sepLen = 4;
            let sep = text.indexOf(" TO ");
            if (sep === -1) {
                sepLen = 2;
                sep = text.indexOf("..");
            }
            if (sep === -1) {
                const vls = ExprParser.valuesAndLocationsFromText(text, ',');
                values.value = [];
                locations.value = [];
                vls.forEach(vl1 => {
                    /*tslint:disable-next-line*/
                    values.value!.push(vl1.value);
                    /*tslint:disable-next-line*/
                    locations.value!.push({start: 1 + vl1.start, length: vl1.length});
                });
                operator.value = ExprOperator.in;
                return;
            }
            vl = Expr.getValueAndLocation(text.substr(0, sep));
            values.value = [vl.value];
            locations.value = [{start: 1 + vl.start, length: vl.length}];
            vl = Expr.getValueAndLocation(text.substr(sep + sepLen));
            values.value.push(vl.value);
            locations.value.push({start: 1 + sep + sepLen + vl.start, length: vl.length});
            if (first === "[") {
                range.value = last === "]" ? ExprRange.gteLte : ExprRange.gteLt;
            }
            else { // '{'
                range.value = last === "}" ? ExprRange.gtLt : ExprRange.gtLte;
            }
            return;
        }
        vl = {
            value: text,
            start: 0,
            length: text.length
        };
        if (text.startsWith("=")) {
            operator.value = ExprOperator.eq;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith(">=")) {
            operator.value = ExprOperator.gte;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith(">")) {
            operator.value = ExprOperator.gt;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith("<=")) {
            operator.value = ExprOperator.lte;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith("<>")) {
            operator.value = ExprOperator.neq;
            vl = Expr.getValueAndLocation(text.substr(2));
            vl.start += 2;
        }
        else if (text.startsWith("<")) {
            operator.value = ExprOperator.lt;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.startsWith("~")) {
            operator.value = ExprOperator.regex;
            vl = Expr.getValueAndLocation(text.substr(1));
            vl.start += 1;
        }
        else if (text.length > 1 && text.startsWith("/") && text.endsWith("/")) {
            operator.value = ExprOperator.regex;
            vl.value = text.substr(1, text.length - 2);
            vl.start = 1;
            vl.length = vl.value.length;
        }
        if (text.startsWith("\"") && text.endsWith("\"")) {
            vl.value = text.substr(1, text.length - 2);
            vl.start = 1;
            vl.length = vl.value.length;
        }
        values.value = [vl.value];
        locations.value = [{start: vl.start, length: vl.length}];
    }

    private static getOperatorText(operator: ExprOperator): string {
        switch (operator) {
            case ExprOperator.eq: return "=";
            case ExprOperator.gt: return ">";
            case ExprOperator.gte: return ">=";
            case ExprOperator.lt: return "<";
            case ExprOperator.lte: return "<=";
            case ExprOperator.neq: return "<>";
            case ExprOperator.regex: return "REGEXP";
            case ExprOperator.like: return "LIKE";
            case ExprOperator.contains: return "CONTAINS";
            case ExprOperator.in: return "IN";
            case ExprOperator.between: return "BETWEEN";
            default: return "=";
        }
    }

    /**
     * Find the first `ExprValueInfo` object from a starting position in this expression
     *
     * @param start The position at which to start the search
     */
    findValue(start: number): ExprValueInfo | undefined {
        if (this.isLeaf) {
            if (start >= this.start && start <= this.start + this.length) {
                if (!this.isStructured) {
                    return {
                        /*tslint:disable-next-line*/
                        value: this.value!,
                        /*tslint:disable-next-line*/
                        field: this.field!,
                        start: this.start,
                        length: this.length
                    };
                }
                else if (!!this.locations && this.values && this.values.length === this.locations.length) {
                    for (let i = 0, ic = this.values.length; i < ic; i++) {
                        const value = this.values[i];
                        const location = this.locations[i];
                        if (start >= this.start + location.start && start <= this.start + location.start + location.length) {
                            return {
                                value,
                                /*tslint:disable-next-line*/
                                field: this.field!,
                                start: this.start + location.start,
                                length: location.length
                            };
                        }
                    }
                }
            }
        }
        else if (!!this.operands) {
            for (const expr of this.operands) {
                const value = expr.findValue(start);
                if (value) {
                    return value;
                }
            }
        }
        return undefined;
    }

    /**
     * Combine two expressions into a single expression. The second expression will be added to
     * the first expression and the first expression returned if the first expression is non-leaf
     * and is an `AND` expression and not negated. Otherwise, a new `AND` expression will be created
     * to which both expressions are added as operands.
     */
    static combine(expr1: Expr, expr2: Expr): Expr {
        if (!expr1) {
            return expr2;
        }
        if (!expr2) {
            return expr1;
        }
        if (!expr1.isLeaf && expr1.and && !expr1.not) {
            if (expr1.isLeaf || !expr2.and || expr2.not) {
                expr1.addOperand(expr2);
            }
            else {
                for (const expr3 of expr2.operands) {
                    expr1.addOperand(expr3);
                }
            }
            return expr1;
        }
        return new Expr({
            exprContext: expr1.exprContext,
            op1: expr1,
            and: true,
            op2: expr2
        });
    }

    private normalizeField(field: string | undefined): string | undefined {
        if (field && field[0] === ExprParser.fieldPartnamePrefix) {
            return field.substr(1);
        }
        return field;
    }

    private shouldDisplayField(): boolean {
        if (!this.field && !this.parent) { // top level full text
            return true;
        }
        return !!this.field && (!this.parent || !Utils.eqNC(this.field, this.parent.field || ""));
    }

    private getOperatorString(): string {
        if (this.operator === ExprOperator.none || this.operator === ExprOperator.eq) {
            return "";
        }
        return Expr.getOperatorText(this.operator);
    }

    private escapeValue(value: string | null | undefined): string {
        if (!!value && !!this.column && (AppServiceHelpers.isString(this.column) || AppServiceHelpers.isCsv(this.column))) {
            return ExprParser.escape(value);
        }
        return "";
    }

    private getValueString(): string {
        if (this.operator === ExprOperator.between && this.values && this.values.length === 2) {
            return `[${this.escapeValue(this.values[0])}..${this.escapeValue(this.values[1])}]`;
        }
        if (this.values && this.values.length > 1) {
            const sb: string[] = [];
            for (const value of this.values) {
                if (sb.length > 0) {
                    sb.push(", ");
                }
                sb.push(this.escapeValue(value));
            }
            sb.unshift("[");
            sb.push("]");
            return sb.join("");
        }
        return this.escapeValue(this.value);
    }

    private addFieldToString(sb: string[]): boolean {
        let added = false;
        if (this.shouldDisplayField()) {
            sb.push(this.normalizeField(this.field) || "text");
            added = true;
        }
        if (this.display) {
            sb.push(ExprParser.escape(this.display));
            added = true;
        }
        if (added) {
            sb.push(":");
        }
        return added;
    }

    private _toString(withFields: boolean, inner: boolean): string {
        const sb: string[] = [];
        if (this.isLeaf) {
            if (this.not) {
                sb.push("NOT ");
            }
            if (withFields) {
                this.addFieldToString(sb);
            }
            sb.push(this.getOperatorString());
            sb.push(this.getValueString());
        }
        else {
            if (!this.operands) {
                return "";
            }
            if (this.not) {
                sb.push("NOT ");
            }
            let bracketed = inner;
            if (this.addFieldToString(sb)) {
                bracketed = true;
            }
            if (bracketed) {
                sb.push("(");
            }
            let first = true;
            for (const operand of this.operands) {
                if (!first) {
                    if (this.and) {
                        sb.push(" AND ");
                    }
                    else {
                        sb.push(" OR ");
                    }
                }
                first = false;
                sb.push(operand._toString(withFields, true));
            }
            if (bracketed) {
                sb.push(")");
            }
        }
        return sb.join("");
    }

    /**
     * Return a string representation of this expression
     *
     * @param withFields If `true`, include field names
     */
    toString(withFields = true): string {
        return this._toString(withFields, false);
    }

    private addDisplay(options: ExprMessageOptions, ctxt: ExprMessageCtxt, display: string) {
        this._addValue(options, ctxt, this.value || "", display);
    }

    private encodeHTML(text: string, options: ExprMessageOptions): string {
        if (options && options.asHTML) {
            return Utils.encodeHTML(text);
        }
        else {
            return text;
        }
    }

    private _addValue(options: ExprMessageOptions, ctxt: ExprMessageCtxt, value: string, display?: string) {
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-value">`);
        }
        const column = this.exprContext.appService.getColumn(this.field);
        const valueId = `value${ctxt.valueIndex++}`;
        let _value: FieldValue = value;
        let _display: string | undefined;
        if (display) {
            _display = this.encodeHTML(ExprParser.unescape(display), options);
        }
        if (column && AppServiceHelpers.isNumber(column) && Utils.testFloat(value)) {
            _value = +value;
        }
        else if (column && AppServiceHelpers.isDate(column)) {
            _value = Utils.fromSysDateStr(value) || value;
        }
        else if (column && AppServiceHelpers.isBoolean(column)) {
            _value = Utils.isTrue(value);
        }
        else if (Utils.isString(_value)) {
            _value = this.encodeHTML(_value, options);
        }
        ctxt.message.push(`{${valueId}}`);
        ctxt.values[valueId] = column
            ? this.exprContext.formatService.formatFieldValue({value: _value, display: _display}, column)
            : _display || _value;
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }

    private addValue(options: ExprMessageOptions, ctxt: ExprMessageCtxt) {
        if (this.values) {
            if (this.operator === ExprOperator.between && this.values.length === 2) {
                this._addValue(options, ctxt, this.values[0]);
                ctxt.message.push(" ");
                this.addOperator("AND", options, ctxt);
                ctxt.message.push(" ");
                this._addValue(options, ctxt, this.values[1]);
            }
            else if (this.values.length > 1) {
                let first = true;
                for (const value of this.values) {
                    ctxt.message.push(first ? "[" : ", ");
                    first = false;
                    this._addValue(options, ctxt, value);
                }
                ctxt.message.push("]");
            }
            else {
                this._addValue(options, ctxt, this.values[0]);
            }
        }
    }

    private addText(options: ExprMessageOptions, ctxt: ExprMessageCtxt, text: string) {
        const valueId = `value${ctxt.valueIndex++}`;
        const message = `{${valueId}}`;
        ctxt.message.push(message);
        ctxt.values[valueId] = this.encodeHTML(text, options);
    }

    private addFieldLabel(options: ExprMessageOptions, ctxt: ExprMessageCtxt) {
        const displayObj = this.displayObj;
        if (displayObj && displayObj.label) {
            this.addText(options, ctxt, displayObj.label);
        }
        else if (this.field) {
            const label = this.exprContext.appService.getLabel(this.normalizeField(this.field) || "");
            this.addText(options, ctxt, label);
        }
        else {
            if (!this.isStructured) {
                const label = this.exprContext.appService.getLabel("text");
                this.addText(options, ctxt, label);
            }
            else {
                const fields = this.getFields();
                fields.forEach((field, index) => {
                    if (index !== 0) {
                        this.addText(options, ctxt, "/");
                    }
                    const label = this.exprContext.appService.getLabel(field);
                    this.addText(options, ctxt, label);
                });
            }
        }
    }

    private addField(options: ExprMessageOptions, ctxt: ExprMessageCtxt) {
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-field">`);
        }
        this.addFieldLabel(options, ctxt);
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
            ctxt.message.push(`<span class="sq-separator">`);
        }
        this.addText(options, ctxt, "msg#system.fieldSeparator");
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }

    private addOperator(operator: string, options: ExprMessageOptions, ctxt: ExprMessageCtxt) {
        if (!operator) {
            return;
        }
        if (options.asHTML) {
            ctxt.message.push(`<span class="sq-operator">`);
        }
        ctxt.message.push(this.encodeHTML(operator, options));
        if (options.asHTML) {
            ctxt.message.push(`</span>`);
        }
    }

    private _toMessage(ctxt: ExprMessageCtxt, options?: ExprMessageOptions): ExprMessage {
        const inner = ctxt.inner;
        ctxt.inner = true;
        if (!options) {
            options = {};
        }
        if (Utils.isUndefined(options.useDisplay)) {
            options.useDisplay = true;
        }

        const displayObj = this.displayObj;
        const display = (displayObj ? displayObj.display : undefined) || this.display;
        const showNot = this.not && (inner || !options.hideOuterNot);
        const showField = (options.withFields || inner) && this.shouldDisplayField();
        if (options.useDisplay && !!display) {
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            if (showField) {
                this.addField(options, ctxt);
            }
            this.addDisplay(options, ctxt, display);
        }
        else if (this.isLeaf) {
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            if (showField) {
                this.addField(options, ctxt);
            }
            const operator = this.getOperatorString();
            if (operator) {
                this.addOperator(operator, options, ctxt);
                ctxt.message.push(" ");
            }
            this.addValue(options, ctxt);
        }
        else {
            if (!this.operands) {
                return {message: ""};
            }
            if (showNot) {
                this.addOperator("NOT", options, ctxt);
                ctxt.message.push(" ");
            }
            let bracketed = inner;
            if (showField) {
                this.addField(options, ctxt);
                bracketed = true;
            }
            if (bracketed) {
                ctxt.message.push("(");
            }
            let first = true;
            for (const operand of this.operands) {
                if (!first) {
                    if (this.and) {
                        ctxt.message.push(" ");
                        this.addOperator("AND", options, ctxt);
                        ctxt.message.push(" ");
                    }
                    else {
                        ctxt.message.push(" ");
                        this.addOperator("OR", options, ctxt);
                        ctxt.message.push(" ");
                    }
                }
                first = false;
                operand._toMessage(ctxt, options);
            }
            if (bracketed) {
                ctxt.message.push(")");
            }
        }
        if (inner) {
            return {message: ""};
        }
        return {
            message: ctxt.message.join(""),
            values: ctxt.values
        };
    }

    /**
     * Return an `ExprMessage` for the expression which can be used with [IntlService.formatMessage]{@link IntlService#formatMessage}
     * for display purposes
     */
    toMessage(options?: ExprMessageOptions): ExprMessage {
        return this._toMessage({
            inner: false,
            message: ["txt#"],
            values: {},
            valueIndex: 0
        }, options);
    }

    private static matchNode(context: ExprContext, expr1: Expr, expr2: Expr): boolean {
        if (expr1.isLeaf !== expr2.isLeaf) {
            return false;
        }
        if (expr1.isLeaf) {
            if (expr1.isStructured !== expr2.isStructured) {
                return false;
            }
            if (expr1.not !== expr2.not) {
                return false;
            }
            const field1 = context.appService.resolveColumnAlias(expr1.field);
            const field2 = context.appService.resolveColumnAlias(expr2.field);
            if (field1 !== field2) {
                return false;
            }
            const operator1 = expr1.operator === ExprOperator.none ? ExprOperator.eq : expr1.operator;
            const operator2 = expr2.operator === ExprOperator.none ? ExprOperator.eq : expr2.operator;
            if (operator1 !== operator2) {
                return false;
            }
        }
        if (!expr1.isLeaf) {
            if (expr1.and !== expr2.and) {
                return false;
            }
            // All of the structured and non-structured operands in expr2 must be in expr1 so check that there are at least enough
            // operands available. (The actual matching of the contents of the operand nodes is done in the recursive calls to MatchNode)
            if (!expr1.operands !== !expr2.operands) {
                return false;
            }
            let expr1StructuredCount = 0, expr1UnstructuredCount = 0, expr2StructuredCount = 0, expr2UnstructuredCount = 0;
            expr1.operands.forEach((operand) => { if (operand.isStructured) { expr1StructuredCount++; } else { expr1UnstructuredCount++; }});
            expr2.operands.forEach((operand) => { if (operand.isStructured) { expr2StructuredCount++; } else { expr2UnstructuredCount++; }});
            if ((expr2StructuredCount > expr1StructuredCount) || (expr2UnstructuredCount > expr1UnstructuredCount)) {
                return false;
            }
        }
        const values1Length = expr1.values ? expr1.values.length : 0;
        const values2Length = expr2.values ? expr2.values.length : 0;
        if (values1Length !== values2Length) {
            return false;
        }
        if (values1Length && expr1.values && expr2.values) {
            for (const value1 of expr1.values) {
                let found = false;
                for (const value2 of expr2.values) {
                    if (Utils.eqNC(value1, value2)) {
                        found = true;
                    }
                }
                if (!found) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Return `true` if this expression matches the passed one
     */
    matchNode(expr: Expr): boolean {
        return Expr.matchNode(this.exprContext, this, expr);
    }

    /**
     * Returns the matching expression or sub-expression in this expression with the passed one.
     *
     * @param expr The expression to match
     * @param filter An option filter function called on first level candidate sub-expressions
     * before matching within them
     */
    find(expr: Expr, filter?: (expr: Expr) => boolean): Expr | null {
        if (this.matchNode(expr)) {
            if (!this.isLeaf && this.operands) {
                for (const child1 of expr.operands) {
                    let found = false;
                    for (const child2 of this.operands) {
                        if (filter && filter(child2)) {
                            continue;
                        }
                        if (child2.find(child1)) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        return null;
                    }
                }
            }
            return this;
        }
        else {
            if (!this.isLeaf && this.operands) {
                for (const child of this.operands) {
                    if (filter && filter(child)) {
                        continue;
                    }
                    if (child.find(expr)) {
                        return child;
                    }
                }
            }
        }
        return null;
    }

    /**
     * Perform the passed `action` on this expression and any descendant operands
     *
     * @param action The action to perform
     */
    forEach(action: (expr: Expr) => void) {
        action(this);
        if (this.operands) {
            for (const operand of this.operands) {
                operand.forEach(action);
            }
        }
    }

    /**
     * Execute the callback function on this node and any descendants until the callback returns a truthy value
     * in which case immediately return `true`. Otherwise return `false`.
     */
    some(callback: (expr: Expr) => boolean): boolean {
        if (callback(this)) {
            return true;
        }
        if (this.operands) {
            for (const operand of this.operands) {
                if (operand.some(callback)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Execute the callback function on this node and any descendants until the callback returns a falsy value
     * in which case, immediately return `false`. Otherwise return `true`.
     */
    every(callback: (expr: Expr) => boolean): boolean {
        if (!callback(this)) {
            return false;
        }
        if (this.operands) {
            for (const operand of this.operands) {
                if (!operand.every(callback)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Return an array of all fields used in this expression
     */
    getFields(): string[] {
        const fields: string[] = [];
        this.forEach((expr) => {
            const field = this.exprContext.appService.resolveColumnAlias(expr.field);
            if (field) {
                if (!fields.find((field1) => Utils.eqNC(field, field1))) {
                    fields.push(field);
                }
            }
        });
        return fields;
    }

    /**
     * Return an array of all values used in this expression that pertain to the passed field and where the associated `isPositive`
     * field matches the passed `positive` parameter
     *
     * @param field The field for which values are to be returned
     * @param positive The value to test against `isPositive`
     */
    getValues(field: string, positive = true): string[] {
        const values: string[] = [];
        const column = this.exprContext.appService.resolveColumnName(field);
        this.forEach((expr) => {
            if (column) {
                const column1 = this.exprContext.appService.resolveColumnName(expr.field);
                if (!Utils.eqNC(column, column1)) {
                    return;
                }
            }
            if (expr.isLeaf && expr.isPositive === positive && expr.values) {
                values.push(...expr.values);
            }
        });
        return values;
    }

    private getDataValue(data: ExprEvaluationContext, field?: string, defaultScope?: string): any {
        if (!data) {
            return undefined;
        }
        const fields = Utils.split(field || "", ".");
        if (fields.length >= 1 && Utils.isUndefined(data[fields[0]]) && !!defaultScope) {
            // By default, look on the "defaultScope" sub-object
            fields.unshift(...Utils.split(defaultScope, "."));
        }
        let value: any = data;
        for (const _field of fields) {
            if (!value) {
                break;
            }
            value = value[_field];
        }
        return value;
    }

    private getWildcardRegExp(value: string): RegExp | undefined {
        if (value) {
            let regExp = this.evaluationRegExps[value];
            if (!Utils.isUndefined(regExp)) {
                return regExp;
            }
            let haveWildcards = false;
            let escaping = false;
            const sb: string[] = [];
            for (const ch of value) {
                switch (ch) {
                    // Handle wildcards and wildcard escaping
                    case "\\":
                        if (escaping) {
                            sb.push("\\\\");
                            escaping = false;
                        }
                        else {
                            escaping = true;
                        }
                        break;
                    case "*":
                        if (escaping) {
                            sb.push("\\");
                            sb.push(ch);
                            escaping = false;
                        }
                        else {
                            haveWildcards = true;
                            sb.push(".*?");
                        }
                        break;
                    case "?":
                        if (escaping) {
                            sb.push("\\");
                            sb.push(ch);
                            escaping = false;
                        }
                        else {
                            haveWildcards = true;
                            sb.push(".");
                        }
                        break;
                    // Escape other regexp special characters
                    case "-":
                    case "/":
                    case "^":
                    case "$":
                    case "+":
                    case ".":
                    case "(":
                    case ")":
                    case "|":
                    case "[":
                    case "]":
                    case "{":
                    case "}":
                        sb.push("\\");
                        sb.push(ch);
                        escaping = false;
                        break;
                    // All other characters just emit
                    default:
                        sb.push(ch);
                        escaping = false;
                        break;
                }
            }
            if (haveWildcards) {
                regExp = new RegExp("^" + sb.join("") + "$", "i");
                this.evaluationRegExps[value] = regExp;
                return regExp;
            }
            else {
                this.evaluationRegExps[value] = undefined;
            }
        }
        return undefined;
    }

    // NB comparisons with NaN always return false
    private compare(value: string | string[] | undefined, dataValue: any, equality?: boolean): number {
        if (Utils.isArray(dataValue) && dataValue.length === 0) {
            return NaN;
        }
        const column = Expr.getColumn(this.exprContext, this.field || "");
        if (Utils.isArray(dataValue) || Utils.isArray(value)) {
            // "in" / "contains"
            if (!Utils.isArray(dataValue)) {
                dataValue = [dataValue];
            }
            if (Utils.isArray(value)) {
                if (value.length === 0) {
                    return NaN;
                }
            }
            else {
                value = [value + ""];
            }
            // At least one value in the value array must match a value in the dataValue array
            for (const value1 of value) {
                for (const dataValue1 of dataValue) {
                    if (this.compare(value1, dataValue1, true) === 0) {
                        return 0;
                    }
                }
            }
            return NaN;
        }
        if (!Utils.isArray(value)) {
            value = ExprParser.unescape(value || "");
            if (column && column.parser) {
                value = this.exprContext.formatService.parseValue(value, column.parser);
            }
            if (AppService.isNumber(column)) {
                if (!Utils.isNumber(dataValue)) {
                    dataValue = 0;
                }
                const _value = Utils.toNumber(value);
                return dataValue - _value;
            }
            if (AppService.isDate(column)) {
                if (Utils.isString(dataValue)){
                    dataValue = Utils.toDate(dataValue);
                }
                if (Utils.isDate(dataValue)) {
                    const _value = this.exprContext.intlService.parseDate(value);
                    if (_value) {
                        return dataValue.getTime() - _value.getTime();
                    }
                }
                return NaN;
            }
            if (AppService.isBoolean(column)) {
                const _value = Utils.isTrue(value) ? 1 : 0;
                return (dataValue ? 1 : 0) - _value;
            }
            dataValue = dataValue || "";
            if (Utils.isString(dataValue)) {
                dataValue = ExprParser.unescape(dataValue);
                if (equality) {
                    const regExp = this.getWildcardRegExp(value);
                    if (regExp) {
                        return regExp.test(dataValue) ? 0 : -1;
                    }
                }
                return Utils.compare(dataValue, value);
            }
        }
        return NaN;
    }

    /**
     * Evaluate this expression using `data` to provide field values. Field values
     * can contain scopes (full stop separated components) to reference sub-objects
     * in the data
     *
     * @param data The field values to be used in the evaluation
     * @param defaultScope If a field value cannot be resolved then try to retrieve a value with this scope prepended to the field name
     * @return The boolean result of the expression evaluation
     */
    evaluate(data: ExprEvaluationContext, defaultScope?: string): boolean {
        let ret: boolean;
        if (this.isLeaf) {
            if (!this.isStructured) {
                ret = false;
            }
            else {
                if (Utils.eqNC(this.field || "", "exists")) {
                    const dataValue = this.getDataValue(data, this.value, defaultScope);
                    ret = !Utils.isUndefined(dataValue);
                }
                else if (Utils.eqNC(this.field || "", "missing")) {
                    const dataValue = this.getDataValue(data, this.value, defaultScope);
                    ret = Utils.isUndefined(dataValue);
                }
                else {
                    const dataValue = this.getDataValue(data, this.field, defaultScope);
                    switch (this.operator) {
                        case ExprOperator.none:
                        case ExprOperator.eq:
                            ret = this.compare(this.value, dataValue, true) === 0;
                            break;
                        case ExprOperator.gt:
                            ret = this.compare(this.value, dataValue) > 0;
                            break;
                        case ExprOperator.gte:
                            ret = this.compare(this.value, dataValue) >= 0;
                            break;
                        case ExprOperator.lt:
                            ret = this.compare(this.value, dataValue) < 0;
                            break;
                        case ExprOperator.lte:
                            ret = this.compare(this.value, dataValue) <= 0;
                            break;
                        case ExprOperator.neq:
                            ret = this.compare(this.value, dataValue, true) !== 0;
                            break;
                        case ExprOperator.regex: {
                            const regExp = new RegExp(this.value || "");
                            ret = regExp.test(dataValue + "");
                            break;
                        }
                        case ExprOperator.like: // not currently generated in parse
                            ret = this.compare(this.value + "*", dataValue, true) === 0;
                            break;
                        case ExprOperator.in:
                            ret = this.compare(this.values, dataValue, true) === 0;
                            break;
                        case ExprOperator.contains: // not currently generated in parse
                            ret = this.compare(this.value, dataValue, true) === 0;
                            break;
                        case ExprOperator.between:
                            ret = !!this.values &&
                                this.compare(this.values[0], dataValue) >= 0 && this.compare(this.values[1], dataValue) <= 0;
                            break;
                    }
                }
            }
        }
        else {
            ret = !!this.and;
            for (const operand of this.operands) {
                const ret1 = operand.evaluate(data, defaultScope);
                if (this.and) {
                    ret = ret && ret1;
                    if (!ret) {
                        break;
                    }
                }
                else {
                    ret = ret || ret1;
                }
            }
        }
        if (this.not) {
            ret = !ret;
        }
        return ret;
    }
}

/**
 * @ignore
 */
export const enum Token {
    invalid=-1,
    or=0,
    and=1,
    not=2,
    near=3,
    infixNear=4,
    lPar=5,
    rPar=6,
    eof=7,
    value=8
}

/**
 * @ignore
 */
const enum Act {
    s,  // shift
    r,  // reduce
    a,  // accept
    e1, // error : missing right parenthesis
    e2, // error : missing operator
    e3, // error : unbalanced right parenthesis
    e4  // error : invalid function argument
}

/**
 * Parsing options
 */
export interface ExprParserOptions {
    /**
     * If `true` then a fielded search expression with no value will not generate an error. This would be used
     * when providing feedback during text entry
     */
    allowEmptyValues?: boolean;
    /**
     * If `true`, fields can contain the scoping character (`.`). This is typically used with `Expr.evaluate`
     */
    allowScopedFields?: boolean;
    /**
     * If `true` then arbitrary field names are permitted. This is typically used with `Expr.evaluate`
     */
    disallowFulltext?: boolean;
}

/**
 * @ignore
 */
export class ExprParserOperator {
    public static invalid: ExprParserOperator = new ExprParserOperator(Token.invalid);
    public static or: ExprParserOperator = new ExprParserOperator(Token.or);
    public static and: ExprParserOperator = new ExprParserOperator(Token.and);
    public static not: ExprParserOperator = new ExprParserOperator(Token.not);
    public static lPar: ExprParserOperator = new ExprParserOperator(Token.lPar);
    public static rPar: ExprParserOperator = new ExprParserOperator(Token.rPar);
    public static eof: ExprParserOperator = new ExprParserOperator(Token.eof);

    public tok: Token;
    public tokValue: string;
    public tokValuePos: number;
    public tokValueLen: number;

    constructor(tok: Token, value: string = "", valuePos: number = -1, valueLen: number = -1) {
        this.tok = tok;
        this.tokValue = value;
        this.tokValuePos = valuePos;
        this.tokValueLen = valueLen;
    }
}

/**
 * A parser for Sinequa fielded search expressions. Such expressions allow filters to be specified in fulltext and
 * can be combined with boolean operators to build complex queries.
 *
 * A single fielded search clause has this form:
 * ``<fieldname>[`display value`]:[:][<operator>]<value>``
 *
 * A field name is either a column name or alias or a partname. In the case of a partname and column name clashing then
 * the field is treated as a column. Two colons can be specified as the separator to denote that the field is a partname.
 * An optional display value can follow the fieldname enclosed in backquote characters
 *
 * Operators are: `=` (default), `>=`, `>`, `<=`, `<`, `~` (regexp)
 * In addition, a regular expression can be specified by enclosing the value in `/` characters
 *
 * An inclusive range of values can be specified using a square bracket syntax: `[value1..value2]`
 * An exclusive range of values can be specified using a curly bracket syntax: `{value1..value2}`
 * The brackets can be mixed. For example: `age:{5..13]` expresses `13 >= age > 5`.
 *
 * For multi-value csv fields an `IN` condition can be expressed using a comma-separated list of values enclosed in square brackets.
 * For example: `authors:[Proust, Orwell, Dickens]`
 *
 * If a value contains reserved characters then it can be enclosed in backquote characters to prevent the parser interpreting them
 * incorrectly. For example: ``code: `a:b:c` ``
 *
 * The parser also supports a NEAR operator to allow searching for terms close to each other. There are two forms suppported:
 * * infix - `term1 NEAR[/n] term2` where `n` is the maximum number of words between the two terms for them to match
 * * function - `NEAR[/n](term1, term2, term3, ...)` where `n` is "window" size within which all the terms must be present for them
 * to match. The minimum useful value for n is thus equal to the number of terms passed to the operator.
 *
 * Fielded search expresions can be combined with the boolean operators `AND`, `OR` and `NOT` and brackets used for grouping.
 * For example: `football (age:>=7 AND (name:smith OR name:jones))`
 */
export class ExprParser {

    public static fieldPartnamePrefix = "@";
    private static parsetbl: Act[][] = [
    /* stk  ------------- input ------------*/
    /*		                                 INFIX                  */
    /*		         OR	   AND	 NOT   NEAR  NEAR  (	  )	     $  */
    /*OR */         [Act.r, Act.s, Act.s, Act.s, Act.s, Act.s, Act.r, Act.r],
    /*AND*/         [Act.r, Act.r, Act.s, Act.s, Act.s, Act.s, Act.r, Act.r],
    /*NOT*/         [Act.r, Act.r, Act.s, Act.s, Act.r, Act.s, Act.r, Act.r],
    /*NEAR*/        [Act.r, Act.r, Act.s, Act.s, Act.r, Act.s, Act.r, Act.r],
    /*INFIXNEAR*/   [Act.r, Act.r, Act.s, Act.s, Act.r, Act.s, Act.r, Act.r],
    /*(*/           [Act.s, Act.s, Act.s, Act.s, Act.s, Act.s, Act.s, Act.e1],
    /*)*/           [Act.r, Act.r, Act.r, Act.r, Act.r, Act.e2, Act.r, Act.r],
    /*$*/           [Act.s, Act.s, Act.s, Act.s, Act.s, Act.s, Act.e3, Act.a]
    ];

    private exprContext: ExprContext;
    private options: ExprParserOptions;
    private expressions: Expr[];
    private operators: ExprParserOperator[];
    private fields: string[]; // pushed on '(', popped on ')'
    private displays: string[]; // pushed on '(', popped on ')'
    private op: ExprParserOperator;
    private prevOp: ExprParserOperator;
    private saveOp: ExprParserOperator; // for default conjunction operator
    private field: string;
    private display: string;
    private text: string;
    private current: number;
    private length: number;

    private constructor(exprContext: ExprContext, options?: ExprParserOptions) {
        this.exprContext = exprContext;
        this.options = options || {};
        this.exprContext.disallowFulltext = this.options.disallowFulltext;
        this.expressions = [];
        this.operators = [];
        this.fields = [];
        this.displays = [];
        this.text = "";
        this.current = 0;
        this.length = 0;
        this.op = this.prevOp = this.saveOp = ExprParserOperator.invalid;
    }

    /**
     * Escape a string so that the characters in it are not processed by the fielded search expression parser.
     * Single occurrences of the backslash character are replaced by two backslashes and backquote characters
     * are prefixed by a backslash. Finally, the string is enclosed in backquotes.
     *
     * For example: `` a\`\b `` => `` a\\\`\\b ``
     */
    // \ => \\
    // ` => \`
    // then surround with ``
    public static escape(value: string | undefined): string {
        if (!value) {
            return "``";
        }
        value = String(value); // make sure we have a string
        if (value.search(/[\\`]/) === -1) {
            return "`" + value + "`";
        }
        const sb: string[] = ["`"];
        for (let i = 0, ic = value.length; i < ic; i++) {
            const ch = value[i];
            if (ch === "\\" || ch === "`") {
                sb.push("\\");
            }
            sb.push(ch);
        }
        sb.push("`");
        return sb.join("");
    }

    private static isEscaped(value: string | undefined): boolean {
        return !!value && value.length >= 2 && value[0] === "`" && value[value.length - 1] === "`";
    }

    /**
     * Perform the reverse operation to [ExprParser.escpae]{@link ExprParser#escape}
     */
    // remove surrounding ``
    // \\ => \
    // \` => `
    public static unescape(value: string): string {
        if (!ExprParser.isEscaped(value)) {
            return value;
        }
        const sb: string[] = [];
        for (let i = 1, ic = value.length - 1; i < ic; i++) {
            let ch = value[i];
            if (ch === "\\") {
                if (i >= ic - 1) { // we end with a \ => drop it
                    continue;
                }
                ch = value[++i];
            }
            sb.push(ch);
        }
        return sb.join("");
    }

    /**
     * @ignore
     */
    public static unescapeList(values: string[]): string[] {
        if (!values) {
            return values;
        }
        const values1: string[] = [];
        for (let _i = 0, _a = values; _i < _a.length; _i++) {
            const value = _a[_i];
            values1.push(ExprParser.unescape(value));
        }
        return values1;
    }

    /**
     * @ignore
     */
    public static valuesAndLocationsFromText(text: string, separator: string): ExprValueLocation[] {
        if (Utils.isEmpty(text)) {
            return [];
        }
        if (!text.includes(separator)) {
            return [{value: text, start: 0, length: text.length}];
        }
        const values: ExprValueLocation[] = [];
        const length = text.length;
        let current = 0;
        let currentStart = 0;
        const sb: string[] = [];
        let value: ExprValueLocation;
        while (true) {
            if (current >= length) {
                value = Expr.getValueAndLocation(sb.join(""));
                value.start += currentStart;
                if (!Utils.isEmpty(value.value)) {
                    values.push(value);
                }
                break;
            }
            const ch = text[current];
            if (ch === "\\") {
                sb.push(ch);
                current++;
                if (current < length) {
                    const ch1 = text[current];
                    if (ch1 === "\\" || ch1 === "`") {
                        sb.push(ch1);
                        current++;
                    }
                }
            }
            else if (ch === "`") {
                const last: IRef<number> = {value: 0};
                const s = ExprParser.matchUntil(text, length, current, current + 1, "`", last);
                if (!!s) {
                    sb.push(s);
                    current = last.value;
                }
                else {
                    sb.push(ch);
                    current++;
                }
            }
            else if (ch === separator) {
                value = Expr.getValueAndLocation(sb.join(""));
                value.start += currentStart;
                sb.length = 0;
                if (!Utils.isEmpty(value.value)) {
                    values.push(value);
                }
                current++;
                currentStart = current;
            }
            else {
                sb.push(ch);
                current++;
            }
        }
        return values;
    }

    private matchKeyword(keyword: string, sbCurrentValue: string[], suffixCh?: string): boolean {
        if (sbCurrentValue.length !== 0) {
            const currentValue = sbCurrentValue.join("");
            if (!!currentValue && !" \r\n\t".includes(currentValue[currentValue.length - 1])) {
                return false;
            }
        }
        if (Utils.isEmpty(keyword)) {
            return false;
        }
        const keywordLen = keyword.length;
        if (this.current + keywordLen > this.length) {
            return false;
        }
        for (let i = 0, ic = keywordLen; i < ic; i++) {
            const ch = this.text[this.current + i];
            const kh = keyword[i];
            if (ch !== kh) {
                return false;
            }
        }
        if (this.current + keywordLen < this.length) {
            const nch = this.text[this.current + keywordLen];
            if (nch !== suffixCh && !" \r\n\t(".includes(nch)) {
                return false;
            }
        }
        return true;
    }

    private matchUntil(first: number, start: number, endChars: string, last: IRef<number>): string | undefined {
        return ExprParser.matchUntil(this.text, this.length, first, start, endChars, last);
    }

    private static matchUntil(text: string, length: number, first: number, start: number, endChars: string, last: IRef<number>): string | undefined {
        last.value = start;
        let found = false;
        const sb: string[] = [text.substr(first, start - first)];
        while (last.value < length) {
            let ch = text[last.value++];
            if (ch === "\\") {
                sb.push(ch);
                if (last.value < length) {
                    ch = text[last.value++];
                    if (ch === "\\" || ch === "`") {
                        sb.push(ch);
                        continue;
                    }
                }
            }
            sb.push(ch);
            if (endChars.includes(ch)) {
                found = true;
                break;
            }
        }
        if (!found) {
            return undefined;
        }
        return sb.join("");
    }

    private matchSimpleValue(start: number): string {
        const first = this.current;
        let last = start;
        while (last < this.length) {
            const ch = this.text[last];
            if (" \r\n\t)".includes(ch)) {
                break;
            }
            last++;
        }
        if (last === start) {
            return "";
        }
        return this.text.substr(first, last - first);
    }

    private getTerminators(ch: string, allowRanges: boolean): string {
        if (ch === "\"") return "\"";
        if (ch === "[") return allowRanges ? "]}" : "]";
        if (ch === "{") return allowRanges ? "}]" : "}";
        if (ch === "/") return "/";
        if (ch === "(") return ")";
        if (ch === "`") return "`";
        return "";
    }

    private canBeTokValue(value: string, canBeEmpty = true) {
        return !Utils.isEmpty(value) || (canBeEmpty && this.options.allowEmptyValues && !Utils.isEmpty(this.field));
    }

    private _getTokValue(value: string, canBeEmpty = true): boolean {
        // Current is pointing at the next non-whitepspace character after this value
        if (value === null) return false;
        let pos = this.current;
        const len = value.length;
        value = Utils.trimEnd(value);
        pos -= len - value.length;
        value = value.trim();
        if (this.canBeTokValue(value, canBeEmpty)) {
            this.op = new ExprParserOperator(Token.value, value, pos - value.length, value.length);
            return true;
        }
        return false;
    }

    private getTokValue(sb: string[], canBeEmpty = true): boolean {
        if (!sb) {
            return false;
        }
        return this._getTokValue(sb.join(""), canBeEmpty);
    }

    private ensureNearValue(value: string): string {
        const defaultNearValue = this.exprContext.appService.ccquery ? this.exprContext.appService.ccquery.defaultNearValue : 0;
        let near = Utils.toInt(value, defaultNearValue);
        if (near < 0) {
            near = defaultNearValue;
        }
        return near.toString();
    }

    private findDisplay(value: string): number {
        if (!value || value.length < 3) {
            return -1;
        }
        if (value[value.length - 1] !== "`") {
            return -1;
        }
        let pos = value.length - 2;
        while (pos !== -1) {
            pos = value.lastIndexOf("`", pos);
            if (pos !== -1) {
                let escapes = 0;
                let pos1 = pos - 1;
                while (pos1 >= 0) {
                    if (value[pos1] !== "\\") {
                        break;
                    }
                    escapes++;
                    pos1--;
                }
                if (escapes % 2 === 0) {
                    return pos;
                }
                pos--;
            }
        }
        return -1;
    }

    private isValidFieldName(name: string): boolean {
        return this.options.allowScopedFields ? Utils.isValidScopedSimpleName(name) : Utils.isValidSimpleName(name);
    }

    private isAllowedField(field: string, forcePartname: boolean, isPartname: IRef<boolean>): boolean {
        isPartname.value = false;
        if (Utils.eqNCN(field, "exists", "missing")) {
            return true;
        }
        if (Utils.eqNCN(field, "text", "concepts", "refine", "matchingpartnames")) {
            // NB @concepts, @refine and @matchingpartnames must be handled specially by the caller
            isPartname.value = true;
            return true;
        }
        const ccquery = this.exprContext.appService.ccquery;
        if (ccquery) {
            forcePartname = forcePartname && !this.exprContext.disallowFulltext;
            let column = forcePartname ? undefined : this.exprContext.appService.getColumn(field);
            if (!!column) {
                if (column.eType === EngineType.varchar) { // only type not indexed
                    column = undefined;
                }
                else if ((ccquery.$columnFieldsPattern && ccquery.$columnFieldsPattern.hasPatterns()) &&
                    !ccquery.$columnFieldsPattern.isIncluded(field) &&
                    !ccquery.$columnFieldsPattern.isIncluded(column.name)) {
                    column = undefined;
                }
            }
            if (!this.exprContext.disallowFulltext && !column) {
                isPartname.value = true;
                if ((ccquery.$partnameFieldsPattern && ccquery.$partnameFieldsPattern.hasPatterns()) &&
                    !ccquery.$partnameFieldsPattern.isIncluded(field)) {
                    return false;
                }
            }
        }
        return true;
    }

    private readToken(): string | undefined {
        if (this.saveOp !== ExprParserOperator.invalid) {
            this.prevOp = this.op;
            this.op = this.saveOp;
            this.saveOp = ExprParserOperator.invalid;
            return undefined;
        }
        let ch;
        this.prevOp = this.op;
        let nextValue: string | undefined;
        const sbCurrentValue: string[] = [];
        let candidateFieldPos = -1;
        let fieldSpecified = false;
        while (true) {
            if (this.current >= this.length) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.eof;
                return undefined;
            }
            ch = this.text[this.current];
            if (ch === "\\") { // \ escapes \ and `
                sbCurrentValue.push(ch);
                this.current++;
                if (this.current < this.length) {
                    const ch1 = this.text[this.current];
                    if (ch1 === "\\" || ch1 === "`") {
                        sbCurrentValue.push(ch1);
                        this.current++;
                    }
                }
            }
            else if (ch === "(") {
                if (this.getTokValue(sbCurrentValue, false)) {
                    return undefined;
                }
                this.op = ExprParserOperator.lPar;
                this.current++;
                return undefined;
            }
            else if (ch === ")") {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.rPar;
                this.current++;
                return undefined;
            }
            else if (this.matchKeyword("AND", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.and;
                this.current += 3;
                return undefined;
            }
            else if (this.matchKeyword("OR", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.or;
                this.current += 2;
                return undefined;
            }
            else if (this.matchKeyword("NOT", sbCurrentValue)) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.op = ExprParserOperator.not;
                this.current += 3;
                return undefined;
            }
            else if (this.matchKeyword("NEAR", sbCurrentValue, "/")) {
                if (this.getTokValue(sbCurrentValue)) {
                    return undefined;
                }
                this.current += 4;
                nextValue = undefined;
                if (this.current < this.length && this.text[this.current] === "/") {
                    const last: IRef<number> = {value: 0};
                    nextValue = this.matchUntil(this.current + 1, this.current + 1, " \r\n\t`\"([/", last);
                    let near = -1;
                    if (nextValue !== undefined) {
                        nextValue = nextValue.substr(0, nextValue.length - 1);
                        near = Utils.toInt(nextValue, -1);
                    }
                    if (near < 0) {
                        return "bad operator";
                    }
                    this.current = last.value - 1;
                }
                nextValue = this.ensureNearValue(nextValue || "");
                const infix = this.current >= this.length || this.text[this.current] !== "(";
                // For infix, near value is the number of words between the two terms so add the 2 terms to
                // the window (near/0 = adjacent terms)
                this.op = infix ?
                    new ExprParserOperator(Token.infixNear, (Utils.toInt(nextValue) + 2).toString()) :
                    new ExprParserOperator(Token.near, nextValue);
                return undefined;
            }
            else if (ch === "+" || ch === "-") {
                if (this.current + 1 < this.length) {
                    const ch1 = this.text[this.current + 1];
                    const last: IRef<number> = {value: 0};
                    let length: number;
                    if ("(\"[/`".includes(ch1)) { // ( " [ / `
                        nextValue = this.matchUntil(this.current, this.current + 2, this.getTerminators(ch1, false), last);
                        length = last.value - this.current;
                    }
                    else {
                        nextValue = this.matchSimpleValue(this.current + 1);
                        length = !!nextValue ? nextValue.length : 0;
                    }
                    if (!!nextValue) {
                        sbCurrentValue.push(nextValue);
                        this.current += length;
                        continue;
                    }
                }
                return "bad operator: " + ch;
            }
            else if ("\"[{/`".includes(ch)) { // " [ { / `
                const last: IRef<number> = {value: 0};
                nextValue = this.matchUntil(this.current, this.current + 1, this.getTerminators(ch, true), last);
                if (!!nextValue) {
                    const forceRange = (fieldSpecified && "[{".includes(ch) && sbCurrentValue.length === 0);
                    sbCurrentValue.push(nextValue);
                    this.current = last.value;
                    if (forceRange && this.getTokValue(sbCurrentValue)) {
                        return undefined;
                    }
                    continue;
                }
                return "bad operator: " + ch;
            }
            else {
                if (ch === ":") { // Field
                    // Pick out previous value and/or field name
                    // Field specifier can be:
                    // field:value
                    // field`display`:value
                    // `display`:value
                    const currentValue = sbCurrentValue.join("");
                    if (candidateFieldPos === -1) {
                        // Check for display
                        candidateFieldPos = this.findDisplay(currentValue);
                        if (candidateFieldPos === -1) {
                            this.op = ExprParserOperator.invalid;
                            return "invalid token";
                        }
                    }
                    let field = currentValue.substr(candidateFieldPos).trim();
                    let display = "";
                    // Extract display
                    const displayStart = this.findDisplay(field);
                    if (displayStart !== -1) {
                        display = ExprParser.unescape(field.substr(displayStart, field.length - displayStart));
                        field = field.substr(0, displayStart);
                    }
                    if (this.isValidFieldName(field) || (Utils.isEmpty(field) && !Utils.isEmpty(display))) {
                        const value = currentValue.substr(0, candidateFieldPos);
                        if (this.canBeTokValue(value.trim())) {
                            this.current -= (sbCurrentValue.join("").length - candidateFieldPos); // back up to field
                            this._getTokValue(value);
                            return undefined;
                        }
                        if (!Utils.isEmpty(field)) {
                            let forcePartname = false;
                            if (this.current + 1 < this.length && this.text[this.current + 1] === ":") {
                                // :: => force partname over column
                                forcePartname = true;
                                this.current++;
                            }
                            const isPartname: IRef<boolean> = { value: false };
                            if (!this.isAllowedField(field, forcePartname, isPartname)) {
                                candidateFieldPos = -1;
                                sbCurrentValue.push(":");
                                if (forcePartname) {
                                    sbCurrentValue.push(":");
                                }
                                this.current++;
                                continue;
                            }
                            if (isPartname.value) {
                                field = ExprParser.fieldPartnamePrefix + field;
                            }
                        }
                        if (!Utils.isEmpty(field)) {
                            this.field = field;
                            fieldSpecified = true;
                        }
                        if (!Utils.isEmpty(display)) {
                            this.display = display;
                        }
                        sbCurrentValue.length = 0;
                        this.current++;
                        continue;
                    }
                }
                if (" \r\n\t)".includes(ch)) {
                    candidateFieldPos = -1;
                }
                else if (candidateFieldPos === -1) {
                    candidateFieldPos = sbCurrentValue.join("").length;
                }
                sbCurrentValue.push(ch);
                this.current++;
            }
        }
    }

    private clear() {
        this.text = "";
        this.current = 0;
        this.length = 0;
        this.operators.length = 0;
        this.expressions.length = 0;
        this.fields.length = 0;
        this.displays.length = 0;
    }

    /**
     * Parse some text using the Sinequa fielded search syntax
     *
     * @return The parsed `Expr` or an error string
     */
    public static parse(text: string, context: ExprContext, options?: ExprParserOptions): Expr | string {
        const parser = new ExprParser(context, options);
        const error = parser.parse(text);
        if (error) {
            return error;
        }
        return parser.parseResult();
    }

    private parseResult(): Expr | string {
        if (this.expressions.length !== 1) {
            return "no expression found";
        }
        return this.expressions[0];
    }

    private get contextField(): string {
        let field = this.field;
        if (Utils.isEmpty(field)) {
            field = this.peekField();
        }
        return field;
    }

    private get contextDisplay(): string {
        let display = this.display;
        if (Utils.isEmpty(display)) {
            display = this.peekDisplay();
        }
        return display;
    }

    private parse(text: string): string {
        this.clear();
        if (this.options.allowEmptyValues && !Utils.len(text.trim())) {
            const expr = Expr.makeExpr(this.exprContext, "", this.contextField, this.contextDisplay, this.options.allowEmptyValues);
            if (expr) {
                expr.start = 0;
                expr.length = 0;
                this.expressions.push(expr);
            }
            return "";
        }
        this.text = text || "";
        this.length = this.text.length;
        this.operators.push(ExprParserOperator.eof);
        let err = this.readToken();
        if (err) {
            return err;
        }
        while (true) {
            if ((this.op.tok === Token.value || this.op.tok === Token.lPar || this.op.tok === Token.not || this.op.tok === Token.near) &&
                (this.prevOp.tok === Token.value || this.prevOp.tok === Token.rPar)) {
                // Default to AND for space separated terms
                // NOT xxx => AND NOT xxx
                this.saveOp = this.op;
                this.op = ExprParserOperator.and;
            }

            let a: Act;
            if (this.op.tok === Token.value) {
                a = Act.s;
            }
            else {
                a = ExprParser.parsetbl[this.operators[this.operators.length - 1].tok][this.op.tok];
            }
            switch (a) {
                case Act.r:
                    err = this.reduce();
                    if (err) {
                        return err;
                    }
                    break;
                case Act.s:
                    err = this.shift();
                    if (err) {
                        return err;
                    }
                    break;
                case Act.a:
                    if (this.expressions.length !== 1) {
                        return "syntax error";
                    }
                    return "";
                case Act.e1:
                    return "missing ')'";
                case Act.e2:
                    return "missing operator (AND,OR,NOT)";
                case Act.e3:
                    return "missing '('";
                case Act.e4:
                    return "invalid argument";
            }
        }
    }

    private shift(): string | undefined {
        if (this.op.tok === Token.value) {
            const value = this.op.tokValue.trim();
            if (Utils.isEmpty(value) && !this.options.allowEmptyValues) {
                return "empty token";
            }
            const expr = Expr.makeExpr(this.exprContext, value, this.contextField, this.contextDisplay, !!this.options.allowEmptyValues);
            if (!expr) {
                return "invalid expression";
            }
            expr.start = this.op.tokValuePos;
            expr.length = this.op.tokValueLen;
            if (!!expr.operands) {
                expr.operands.forEach(operand => {
                    operand.start = this.op.tokValuePos;
                    operand.length = this.op.tokValueLen;
                });
            }
            this.expressions.push(expr);
            this.field = "";
            this.display = "";
        }
        else {
            this.operators.push(this.op);
            if (this.op.tok === Token.lPar) {
                if (Utils.isEmpty(this.field)) {
                    this.fields.push(this.peekField());
                }
                else {
                    this.fields.push(this.field);
                }
                this.field = "";
                if (Utils.isEmpty(this.display)) {
                    this.displays.push(this.peekDisplay());
                }
                else {
                    this.displays.push(this.display);
                }
                this.display = "";
            }
        }
        return this.readToken();
    }

    private peekField(): string {
        if (this.fields.length === 0) {
            return "";
        }
        return this.fields[this.fields.length - 1];
    }

    private peekDisplay(): string {
        if (this.displays.length === 0) {
            return "";
        }
        return this.displays[this.displays.length - 1];
    }

    private canBeMergeTarget(e: Expr, and: boolean): boolean {
        if (e.isLeaf) {
            return false;
        }
        if (e.near >= 0) {
            return false;
        }
        if (e.and !== and) {
            return false;
        }
        if (e.not) {
            return false;
        }
        return true;
    }

    private mergeExpr(e1: Expr, e2: Expr, and: boolean): Expr {
        let source: Expr, target: Expr;
        let prepend = false;
        if (this.canBeMergeTarget(e1, and)) {
            target = e1;
            source = e2;
        }
        else if (this.canBeMergeTarget(e2, and)) {
            target = e2;
            source = e1;
            prepend = true; // to keep the same order as in the input text
        }
        else {
            return new Expr({
                exprContext: e1.exprContext,
                op1: e1,
                and,
                op2: e2,
                field: this.peekField(),
                display: this.peekDisplay()
            });
        }
        if (source.isLeaf || source.and !== and || source.not || !Utils.eq(source.display || "", target.display || "")) {
            target.addOperand(source, this.peekField(), prepend);
        }
        else {
            if (source.operands) {
                for (const operand of source.operands) {
                    target.addOperand(operand, this.peekField(), prepend);
                }
            }
        }
        return target;
    }

    private reduce(): string | undefined {
        let e: Expr | undefined;
        let e1: Expr | undefined;
        let e2: Expr | undefined;
        const op: ExprParserOperator = this.operators[this.operators.length - 1];
        switch (op.tok) {
            case Token.not:
                // Apply E := NOT E
                e = this.expressions.pop();
                if (!e) {
                    return "syntax error";
                }
                e.not = !e.not;
                this.expressions.push(e);
                break;
            case Token.and:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                this.expressions.push(this.mergeExpr(e1, e2, true));
                break;
            case Token.or:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                this.expressions.push(this.mergeExpr(e1, e2, false));
                break;
            case Token.near:
                e = this.expressions.pop();
                if (!e) {
                    return "syntax error";
                }
                e.near = Utils.toInt(this.ensureNearValue(op.tokValue));
                this.expressions.push(e);
                break;
            case Token.infixNear:
                e2 = this.expressions.pop();
                e1 = this.expressions.pop();
                if (!e1 || !e2) {
                    return "syntax error";
                }
                if (!e2.isLeaf || e2.isStructured || !e1.isLeaf || e1.isStructured || e2.not || e1.not || !Utils.eqNC(e2.field || "", e1.field || "")) {
                    return "syntax error";
                }
                e = new Expr({
                    exprContext: e1.exprContext,
                    op1: e1,
                    and: false,
                    op2: e2,
                    field: this.peekField(),
                    display: this.peekDisplay()
                });
                e.near = Utils.toInt(this.ensureNearValue(op.tokValue));
                this.expressions.push(e);
                break;
            case Token.rPar:
                this.operators.pop();
                if (this.fields.length === 0) {
                    return "missing field";
                }
                if (this.expressions.length === 0) {
                    return "syntax error";
                }
                const field = this.fields.pop();
                const display = this.displays.pop();
                // Set Field for single term bracketed expressions
                e = this.expressions[this.expressions.length - 1];
                if (e.isLeaf) {
                    if (Utils.isEmpty(e.field)) {
                        e.field = field;
                    }
                    if (Utils.isEmpty(e.display)) {
                        e.display = display;
                    }
                }
                break;
        }
        this.operators.pop();
        return undefined;
    }
}
