import {Query, AppService, ExprParser, Expr, ExprValueInitializer} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "./search.service";

export interface BreadcrumbsItem {
    expr: Expr | undefined;
    display: Expr | string; // Either expr or a label (error string, basket name or <empty search>)
    facet?: string; // associated facet, if any
    active?: boolean; // true if the active item
    hidden?: boolean; // true for "empty search" item when !ccquery.allowEmptySearch
}

/**
 * Description of the Breadcrumbs class - link to {@link SearchService}
 */
export class Breadcrumbs {
    appService: AppService;
    searchService: SearchService;
    items: BreadcrumbsItem[]; // always starts with the text expression followed by any selects
    advanced: Expr[];
    query: Query; // the associated query. Will be different to the current query if any item other than the last is selected
    fields: Set<string>;

    static create(appService: AppService, searchService: SearchService, query: Query): Breadcrumbs {
        const breadcrumbs = new Breadcrumbs(appService, searchService, query);
        return breadcrumbs.init();
    }

    private constructor(appService: AppService, searchService: SearchService, query: Query) {
        this.appService = appService;
        this.searchService = searchService;
        this.query = query.copy();
        this.items = [];
        this.advanced = [];
        this.fields = new Set<string>();
    }

    get activeIndex(): number {
        return this.items.findIndex(item => item.active);
    }

    get activeItem(): BreadcrumbsItem | undefined {
        const index = this.activeIndex;
        if (index !== -1) {
            return this.items[index];
        }
        return undefined;
    }

    get text(): Expr | string {
        return this.items[0].display;
    }

    get textExpr(): Expr | undefined {
        return this.items[0].expr;
    }

    get selects(): BreadcrumbsItem[] {
        return this.items.slice(1);
    }

    get activeSelects(): BreadcrumbsItem[] {
        return this.items.slice(1, this.activeIndex + 1);
    }

    get activeItems():  BreadcrumbsItem[] {
        return this.items.slice(0, this.activeIndex + 1);
    }

    get isEmpty(): boolean {
        if (this.items.length === 0) {
            return true;
        }
        if (this.items.length === 1 && this.items[0].hidden) {
            return true;
        }
        return false;
    }

    find(expr: Expr | ExprValueInitializer): Expr | undefined {
        let expr1 = expr as Expr;
        const init = expr as ExprValueInitializer;
        if (!(expr instanceof Expr)) {
            expr1 = new Expr(init);
        }
        if (!expr1.every((expr2) => {
            const field = expr2.exprContext.appService.resolveColumnAlias(expr2.field);
            return !field || this.fields.has(field);
        })) {
            return undefined;
        }
        for (const expr3 of this.advanced) {
            const expr2 = expr3.find(expr1);
            if (expr2) {
                return expr2;
            }
        }
        for (const select of this.selects) {
            if (select.expr) {
                const expr2 = select.expr.find(expr1);
                if (expr2) {
                    return expr2;
                }
            }
        }
        if (this.textExpr) {
            let expr2 = this.textExpr.find(expr1, (expr3) => expr3.isStructured);
            if (expr2) {
                return expr2;
            }
            expr2 = this.textExpr.find(expr1, (expr3) => !expr3.isStructured);
            if (expr2) {
                return expr2;
            }
        }
        return undefined;
    }

    findSelect(facet: string, exprOrField?: Expr | string): Expr | undefined {
        // Active selects only, most recent first
        const activeSelects = this.activeSelects;
        for (let i = activeSelects.length - 1; i >= 0; i--) {
            const select = activeSelects[i];
            if (select.expr && (!facet || Utils.eqNC(facet, select.facet || ""))) {
                if (!exprOrField ) {
                    return select.expr;
                }
                if (Utils.isString(exprOrField)) {
                    if (Utils.eqNC(exprOrField, select.expr.field || "")) {
                        return select.expr;
                    }
                }
                else {
                    const expr1 = select.expr.find(exprOrField);
                    if (expr1) {
                        return expr1;
                    }
                }
            }
        }
        return undefined;
    }

    private addFields(expr: Expr | undefined) {
        if (expr) {
            const fields = expr.getFields();
            fields.forEach((field) => {
                this.fields.add(field);
            });
        }
    }

    private makeBreadcrumbsItemFromExpr(text: string): BreadcrumbsItem {
        let expr = this.appService.parseExpr(text);
        if (!(expr instanceof Expr)) {
            expr = this.appService.parseExpr(ExprParser.escape(text));
        }
        if (expr instanceof Expr) {
            return {expr, display: expr};
        }
        else {
            return {expr: undefined, display: expr};
        }
    }

    private initItems() {
        // Text
        if (this.query && this.query.text) {
            const item = this.makeBreadcrumbsItemFromExpr(this.query.text);
            this.items.push(item);
            this.addFields(item.expr);
        }
        else {
            this.items.push({
                expr: undefined,
                display: this.query && this.query.basket ? this.query.basket : "msg#breadcrumbs.emptySearch",
                hidden: this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                    this.searchService.isEmptySearchIgnoreSelects(this.query)
            });
        }
        // Selects
        if (this.query && this.query.select) {
            for (const select of this.query.select) {
                const item = this.makeBreadcrumbsItemFromExpr(select.expression);
                item.facet = select.facet;
                this.items.push(item);
                this.addFields(item.expr);
            }
        }
        // Set last item active
        this.items[this.items.length - 1].active = true;
    }

    private init(): Breadcrumbs {
        this.initItems();
        return this;
    }

    selectItem(item: BreadcrumbsItem): Query | undefined {
        const index = this.items.indexOf(item);
        if (this.query && index !== -1) {
            const query = this.query.copy();
            if (query.select) {
                query.select.splice(index);
            }
            this.items.forEach(item1 => item1.active = false);
            item.active = true;
            return query;
        }
        return undefined;
    }

    removeItem(item: BreadcrumbsItem): BreadcrumbsItem | undefined {
        const index = this.items.indexOf(item);
        if (this.query && index !== -1) {
            let next: BreadcrumbsItem | undefined;
            if (index === 0) { // Text
                if (this.query.text || this.query.basket) {
                    delete this.query.text;
                    delete this.query.basket;
                    item.expr = undefined;
                    item.display = "msg#breadcrumbs.emptySearch";
                    item.hidden = this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                        this.searchService.isEmptySearchIgnoreSelects(this.query);
                }
                if (!item.hidden) {
                    next = this.activeItem;
                }
                else if (this.items.length > 1) {
                    next = this.items[this.items.length - 1];
                }
            }
            else {
                // Find next item to activate, if necessary
                const activeIndex = this.activeIndex;
                if (activeIndex >= index) {
                    if (activeIndex > index) {
                        next = this.items[activeIndex];
                    }
                    else {
                        if (index === this.items.length - 1) {
                            next = this.items[index - 1];
                        }
                        else {
                            next = this.items[index + 1];
                        }
                        if (next.hidden) {
                            next = undefined;
                        }
                    }
                }
                if (this.query.select) {
                    this.query.select.splice(index - 1, 1);
                }
                this.items.splice(index, 1);
            }
            return next;
        }
        return undefined;
    }

    update(query: Query) {
        if (!this.query) {
            this.query = query.copy();
        }
        this.query.text = query.text;
        this.query.basket = query.basket;
        if (!this.query.text && !this.query.basket) {
            const item = this.items[0];
            item.expr = undefined;
            item.display = "msg#breadcrumbs.emptySearch";
            item.hidden = this.appService.ccquery && !this.appService.ccquery.allowEmptySearch &&
                this.searchService.isEmptySearchIgnoreSelects(this.query);
        }
    }
}
