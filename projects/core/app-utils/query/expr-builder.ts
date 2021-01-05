import { Injectable } from '@angular/core';
import { Utils } from '@sinequa/core/base';
import { Aggregation, AggregationItem, TreeAggregationNode } from '@sinequa/core/web-services';
import { ValueItem } from '../format.service';
import { ExprParser } from './expr-parser';

@Injectable({
    providedIn: 'root'
})
export class ExprBuilder {

    /**
     * Make a standard selection expression
     * (resulting in a SQL clause like "company contains 'BOEING'")
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the field to select (eg. "BOEING")
     * @param display Optional string to display that value (eg. "Boeing")
     */
    makeExpr(field: string, value: string, display?: string): string {
        field = this.formatField(field, display);
        return `${field}: ${ExprParser.escape(value)}`; // company`Boeing`: BOEING
    }

    /**
     * Make a boolean expression
     * @param field Name of the field to select (eg. "toto")
     * @param value Value of the field to select (eg. "true")
     * @param display Optional string to display that value (eg. "True")
     */
    makeBooleanExpr(field: string, value: boolean, display?: string): string {
        field = this.formatField(field, display);
        return `${field}: ${ExprParser.escape(Utils.toSqlValue(value))}`; // toto`True`: true
    }


    /**
     * Make a numerical expression using a comparison operator (>, <, <=, >=, etc.)
     * @param field Name of the field to select (eg. "modified")
     * @param operator Comparison operator used for that selection (eg. ">")
     * @param value Value of the field to select (eg. "2020-12-15")
     * @param display Optional string to display that value (eg. "After Dec 15 2020")
     */
    makeNumericalExpr(
        field: string,
        operator: '>' | '>=' | '<' | '<=' | '=' | '<>',
        value: number | Date | string,
        display?: string): string {

        field = this.formatField(field, display);

        if(Utils.isString(value)) {
            value = ExprParser.escape(value);
        }
        if(Utils.isDate(value) || Utils.isNumber(value)) {
            value = Utils.toSqlValue(value);
        }

        return `${field}:${operator} ${value}`; // modified`After Dec 15 2020`:> 2020-12-15
    }


    /**
     * Make a list expression
     * @param field Name of the field to select (eg. "docformat")
     * @param values Values of the field to select (eg. ['htm','pdf'])
     * @param display Optional string to display that value (eg. "htm, pdf")
     */
    makeListExpr(field: string, values: string[], display?: string): string {
        field = this.formatField(field, display);
        return `${field}: [${values.map(v => ExprParser.escape(v)).join(',')}]`; // docformat`htm, pdf`:[`htm`,`pdf`]
    }


    /**
     * Make a range expression
     * @param field Name of the field to select (eg. "modified")
     * @param from Begining of the range (eg. 2020-12-15)
     * @param to End of the range (eg. 2020-12-20)
     * @param display Optional string to display that value (eg. "[Dec 15 2020, Dec 20 2020]")
     */
    makeRangeExpr(
        field: string,
        from: number | Date | string,
        to: number | Date | string,
        display?: string): string {

        field = this.formatField(field, display);
        return `${field}: [${Utils.toSqlValue(from)}..${Utils.toSqlValue(to)}]`; // modified`[Dec 15 2020, Dec 20 2020]`: [2020-12-15..2020-12-20]
    }


    /**
     * Make a RegExp expression
     * @param field Name of the field to select (eg. "company")
     * @param value Value of the regular expression to match (eg. "BOE.*")
     * @param display Optional string to display that value (eg. "Boe...")
     */
    makeRegexpExpr(field: string, value: string, display?: string): string {
        field = this.formatField(field, display);
        return `${field}:~ ${ExprParser.escape(value)}`; // company`Boe...`:~ BOE.*
    }


    /**
     * Make a refine expression
     * @param text The text to add to the query
     */
    makeRefineExpr(text: string): string {
        return `refine: ${ExprParser.escape(text)}`;
    }


    /**
     * Return an expression that selects multiple values for a field
     * (All values are ANDed)
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeAndExpr(field: string, values: (string | ValueItem)[], display?: string): string {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'AND')})`; // company: (IBM AND APPLE AND GOOGLE)
    }


    /**
     * Return an expression that selects multiple values for a field
     * (All values are ORed)
     * This function should be equivalent to using makeListExpr
     * @param field Name of the field to select (eg. "company")
     * @param values Values of the field to select (eg. ['IBM','APPLE'])
     * @param display Optional string to display that value (eg. "IBM and Apple")
     */
    makeOrExpr(field: string, values: (string | ValueItem)[], display?: string): string {
        field = this.formatField(field, display);
        return `${field}: (${this.concatWithOperator(values, 'OR')})`; // company: (IBM OR APPLE OR GOOGLE)
    }

    /**
     * Combine a list of values with AND or OR operators
     * @param values the list of values
     * @param operator the operator
     */
    private concatWithOperator(values: (string | ValueItem)[], operator: 'AND' | 'OR') {
        return values.map(v => {
            if (Utils.isString(v)){
                return ExprParser.escape(v);
            }
            if (v.display) {
                return `${ExprParser.escape(v.display)}:${ExprParser.escape(Utils.toSqlValue(v.value))}`;
            }
            return ExprParser.escape(Utils.toSqlValue(v.value));
        }).join(' '+operator+' ');
    }

    /**
     * Returns the negative expression of the given expression
     * eg. NOT(person:Bill GATES)
     * @param expr
     */
    makeNotExpr(expr: string): string {
        return `NOT (${expr})`;
    }

    /**
     * Returns an expression that is the union of given expressions
     * eg. person:Bill GATES OR company:MICROSOFT
     * @param exprs
     */
    concatOrExpr(exprs: string[]): string {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') OR (')})`;
    }


    /**
     * Returns an expression that is the intersection of given expressions
     * eg. person:Bill GATES AND company:MICROSOFT
     * @param exprs
     */
    concatAndExpr(exprs: string[]): string {
        if (exprs.length <= 1) {
            return exprs[0] || '';
        }
        return `(${exprs.join(') AND (')})`;
    }


    /**
     * Returns an expression to select the given item
     * @param field Name of the field to select (eg. "company")
     * @param items A single or list of ValueItem object(s) (eg. content of a record)
     */
    makeFieldExpr(field: string, items: ValueItem | ValueItem[], combineWithAnd?: boolean): string {
        if(!Utils.isArray(items)) {
            items = [items];
        }
        if(items.length === 0) {
            return ""; // Return a falsy string instead of "()" or "``" which would be truthy
        }
        return combineWithAnd? this.makeAndExpr(field, items) : this.makeOrExpr(field, items);
    }

    /**
     * Create an expression for the given aggregation item
     * @param aggregation The aggregation containing this object
     * @param items The AggregationItem(s) to select
     * @param combineWithAnd If there are multiple values, combine them with AND (instead of OR)
     */
    makeAggregationExpr(aggregation: Aggregation, items: AggregationItem | AggregationItem[], combineWithAnd?: boolean): string {
        if(!Utils.isArray(items)) {
            items = [items];
        }
        if(aggregation.valuesAreExpressions) {
            const exprs = items.map(i => i.value.toString()); // .toString() is to avoid typing issues. With valuesAreExpressions = true, item.value is expected to be a string
            return combineWithAnd? this.concatAndExpr(exprs) : this.concatOrExpr(exprs);
        }
        else {
            const _items = this.asValueItems(items, aggregation.isTree);
            return this.makeFieldExpr(aggregation.column, _items, combineWithAnd);
        }
    }


    /**
     * Combines the field with the optional display value(s)
     * @param field
     * @param display
     */
    private formatField(field: string, display?: string): string {
        if(display) {
            field = `${field}${ExprParser.escape(display)}`;
        }
        return field;
    }


    /**
     * Return the AggregationItem list as a ValueItem list
     * @param items
     * @param isTree
     */
    private asValueItems(items: AggregationItem[], isTree?: boolean): ValueItem[] {
        if(isTree) {
            return items.map(i => {
                return {
                    value: (i as TreeAggregationNode).$path + "*",
                    display: i.display || i.value as string
                };
            });
        }
        return items; // This works because ValueItem and AggregationItem share the value and display properties
    }
}
