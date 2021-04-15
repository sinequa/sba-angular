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
    /** Items of those facets will be excluded  */
    @Input() excludedFacets: (string | undefined)[] = ["search-form"];


    collapsed = false;
    clearAction: Action;
    items: BreadcrumbsItem[] = [];
    fields: string[] = [];

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
                            item.expr && !(item.expr && !item.expr.field && !item.expr.isStructured) && !this.excludedFacets.includes(item.facet)
                    ) || []
                : this.searchService.breadcrumbs?.items || [];

            /** Retrieve the field name of each item */
            this.fields = [];
            for (const item of this.items) {
                this.fields.push(this.getField(item))
            }

        }
    }

    protected getField(item: BreadcrumbsItem): string {
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
