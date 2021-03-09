import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Results } from "@sinequa/core/web-services";
import { SearchService, BreadcrumbsItem } from "@sinequa/components/search";
import { AbstractFacet } from "../../abstract-facet";
import { Action } from "@sinequa/components/action";

@Component({
    selector: "sq-facet-mysearch",
    templateUrl: "./facet-mysearch.html",
    styleUrls: ["./facet-mysearch.scss"],
})
export class BsMySearch extends AbstractFacet implements OnChanges {
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

    collapsed = false;
    indexActive: number;
    clearAction: Action;
    items: BreadcrumbsItem[] = [];

    constructor(public searchService: SearchService) {
        super();

        this.clearAction = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.filters.clear",
            action: () => this.clear(),
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            /** Initialize items based on input values */
            this.items = this.ignoreText
                ? this.searchService.breadcrumbs?.items.filter(
                        (item: BreadcrumbsItem) =>
                            !item.expr || (item.expr.isStructured && item.facet !== "search-form")
                    ) || []
                : this.searchService.breadcrumbs?.items || [];

            /** index of active the breadcrumbsItem */
            this.indexActive =
                this.searchService.breadcrumbs?.items.findIndex(
                    (item: BreadcrumbsItem) => !!item.active
                ) || 0;
        }
    }

    getField(item: BreadcrumbsItem): string {
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

    selectItem(item: BreadcrumbsItem) {
        this.searchService.selectBreadcrumbsItem(item);
        return false;
    }

    removeItem(item: BreadcrumbsItem) {
        this.searchService.removeBreadcrumbsItem(item);
    }

    get isEmpty() {
        return this.items.length === 0;
    }

    get actions(): Action[] {
        const actions: Action[] = [];
        if (!this.isEmpty && this.allowDeletion) {
            actions.push(this.clearAction);
        }
        return actions;
    }

    protected clear() {
        for (const item of this.items) {
            this.searchService.removeBreadcrumbsItem(item);
        }
    }
}
