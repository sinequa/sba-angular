import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnChanges, SimpleChanges } from "@angular/core";

import { Action } from "@sinequa/components/action";
import { SearchService } from "@sinequa/components/search";
import { ExprPipe } from "@sinequa/components/utils/parser";
import { Expr, ExprParser } from "@sinequa/components/utils/parser/expr-parser";
import { AppService, FormatService } from "@sinequa/core/app-utils";
import { IntlModule, IntlService } from "@sinequa/core/intl";
import { EngineType, Results, Select } from "@sinequa/core/web-services";

import { AbstractFacet } from "../../abstract-facet";
import { FacetConfig } from "../../facet-config";
import { FacetService } from "../../facet.service";
export interface FacetMySearchParams {
    allowDeletion?: boolean;
    displayFieldNames?: boolean;
    collapsible?: boolean;
    useBadges?: boolean;
    ignoreText?: boolean;
    excludedFacets?: (string | undefined)[];
}

export interface FacetMySearchConfig extends FacetConfig<FacetMySearchParams> {
    type: 'my-search';
}

type FilterScalarOperator =
    | 'eq'
    | 'neq'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'like'
    | 'contains'
    | 'regex'
    | 'null'
    | 'notnull';
type FilterRangeOperator = 'in' | 'between';
type FilterExprOperator = 'and' | 'or' | 'not';
type FilterOperator = FilterScalarOperator | FilterRangeOperator | FilterExprOperator;


type LegacyFilter = {
    display: string,
    field: string,
    filters?: LegacyFilter | LegacyFilter[],
    operator?: FilterOperator,
    values?: string[],
    value?: string,
    start?: string | number,
    end?: string | number
}

type MySearchExpr = {
    expr?: Expr,
    display: Expr | string,
    filter?: LegacyFilter,
    select?: Select
};

@Component({
    selector: "sq-facet-mysearch",
    standalone: true,
    imports: [CommonModule, IntlModule, ExprPipe],
    templateUrl: "./facet-mysearch.html",
    styleUrls: ["./facet-mysearch.scss"],
})
export class BsMySearch extends AbstractFacet implements FacetMySearchParams, OnChanges {
    @Input() results: Results;
    /** Display icon to delete items */
    @Input() allowDeletion: boolean = true;
    /** Display each item's field */
    @Input() displayFieldNames: boolean = false;
    /** Make the div collapsible */
    @Input() collapsible: boolean = false;
    /** Add a badge likely style to items */
    @Input() useBadges: boolean = false;
    /** Wether we Ignore text and fielded search */
    @Input() ignoreText: boolean = true;
    /**
     * Items of those facets will be excluded
     * @deprecated Facet are not used anymore
     * */
    @Input() excludedFacets: (string | undefined)[] = ["search-form"];

    collapsed = false;
    items: MySearchExpr[] = [];
    fields: string[] = [];

    clearAction = new Action({
        icon: "far fa-minus-square",
        title: "msg#facet.filters.clear",
        action: () => this.clear(),
    });

    searchService = inject(SearchService);
    appService = inject(AppService);
    formatService = inject(FormatService);
    intlService = inject(IntlService);
    facetService = inject(FacetService);

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            this.items = [];
            this.initFilters();

            /** Retrieve the field name of each item */
            this.fields = [];
            for (const item of this.items) {
                this.fields.push(this.getField(item))
            }
        }
    }

    // function to set filters as expression (old way)
    protected initFilters() {
        const query = this.searchService.query;
        // Text
        if (this.ignoreText === false) {
            if (query && query.text) {
                const expr = this.makeBreadcrumbsItemFromExpr(query.text);
                this.items.push(expr);
            } else {
                this.items.push({ display: "msg#emptySearch" });
            }
        }

        // selects
        if (query && query.select) {
            for (const select of query.select) {
                const item = this.makeBreadcrumbsItemFromExpr(select.expression);
                item.select = select;
                this.items.push(item);
            }
        }
        // Filters
        if (query && query.filters) {
            const filters = query.filters as LegacyFilter;
            this.traverseFilters(filters);
        }
    }

    private traverseFilters(filters: LegacyFilter | LegacyFilter[]) {
        if (Array.isArray(filters)) {
            for (const filter of filters) {
                this.processFilter(filter);
            }
        } else {
            this.processFilter(filters);
        }
    }

    private makeBreadcrumbsItemFromDistributionFilter(filter: LegacyFilter, text: string) {
        const e = this.makeBreadcrumbsItemFromExpr(text);
        if (e.expr) e.expr.field = filter.field;
        if (e.display instanceof Expr) e.display.field = filter.field;
        e.filter = filter;
        this.items.push(e);
    }

    private processFilter(filter: LegacyFilter) {
        if (filter.field) {
            const agg = this.facetService.getAggregation(filter.field);
            if (agg && (agg.isDistribution || agg.$cccolumn?.eType === EngineType.csv)) {
                if (filter.display) {
                    this.makeBreadcrumbsItemFromDistributionFilter(filter, filter.display);
                    return;
                }
                else {
                    if (filter.operator !== 'between') {
                        this.makeBreadcrumbsItemFromDistributionFilter(filter, `${filter.operator} ${filter.value}`);
                        return;
                    }
                    else {
                        this.makeBreadcrumbsItemFromDistributionFilter(filter, `${filter.operator} ${filter.start} and ${filter.end}`);
                        return;
                    }
                }
            }
        }

        if (filter.operator === 'or' || filter.operator === 'and' || filter.operator === 'not') {
            for (const subFilter of filter.filters as LegacyFilter[]) {
                if (subFilter.field) {
                    const a = this.facetService.getAggregation(subFilter.field);
                    if (a && a.isDistribution) {
                        if(subFilter.operator !== 'between') {
                            const e = this.makeBreadcrumbsItemFromExpr(filter.display || subFilter.display);
                            if (e.expr) e.expr.field = subFilter.field;
                            if (e.display instanceof Expr) e.display.field = subFilter.field;
                            if(filter.display) {
                                e.filter = filter;
                                this.items.push(e);
                                return;
                            }
                            e.filter = subFilter;
                            this.items.push(e);
                        }
                        else {
                            this.processFilter(subFilter);
                        }
                        continue;
                    }
                }
                this.processFilter(subFilter);
            }
        } else {
            const expr = this.makeBreadcrumbsItemFromExpr(filter.value || filter.display);
            expr.filter = filter;
            if (expr.expr) {
                expr.expr.field = filter.field;
            }
            if (expr.display instanceof Expr) {
                expr.display.field = filter.field;
            }
            this.items.push(expr);
        }
    }

    private makeBreadcrumbsItemFromExpr(text: string): MySearchExpr {
        const context = { appService: this.appService, formatService: this.formatService, intlService: this.intlService }

        let expr = ExprParser.parse(text, context);
        if (!(expr instanceof Expr)) {
            expr = ExprParser.parse(ExprParser.escape(text), context);
        }
        if (expr instanceof Expr) {
            return { expr, display: expr };
        }
        else {
            return { expr: undefined, display: expr };
        }
    }


    protected getField(item): string {
        if (item.expr) {
            if (item.expr.field) {
                return item.expr.field;
            } else {
                if (!item.expr.isStructured) {
                    return "text";
                } else {
                    const fields = item.expr.getFields();
                    return fields.join("-");
                }
            }
        }
        return "unknown";
    }

    removeItem(item) {
        // this.searchService.removeBreadcrumbsItem(item);
        const index = this.items.indexOf(item);
        if (index === -1) return
        if (index === 0) {
            // query text
            this.searchService.query.text = "";
        }
        if (index > 0) {
            if (item.select) {
                this.searchService.query.select?.findIndex(s => s.expression === item.select?.expression);
                this.searchService.query.select?.splice(index - 1, 1);
            }
            if (item.filter) {
                this.searchService.query.removeFilters(f => f === item.filter);
            }
        }
        console.log("remove filter index", index);
        this.searchService.search();
    }

    get isEmpty() {
        return this.items.length === 0;
    }

    override get actions(): Action[] {
        const actions: Action[] = [];
        if (!this.isEmpty && this.allowDeletion) {
            actions.push(this.clearAction);
        }
        return actions;
    }

    protected clear() {
        this.items = [];
        this.searchService.query.clear();
        this.searchService.search();
    }
}
