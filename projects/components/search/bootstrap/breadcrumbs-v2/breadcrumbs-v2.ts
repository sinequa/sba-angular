import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Results } from "@sinequa/core/web-services";
import { SearchService } from "../../search.service";
import { BreadcrumbsItem } from "../../breadcrumbs";

@Component({
    selector: "sq-breadcrumbs-v2",
    templateUrl: "./breadcrumbs-v2.html",
    styleUrls: ["./breadcrumbs-v2.scss"],
})
export class BsBreadcrumbsV2 implements OnChanges {

    @Input() results: Results;
    /** Display icon to delete items */
    @Input() allowDeletion: boolean = true;
    /** Display each item's field */
    @Input() displayFieldNames: boolean = false;
    /** Make the div collapsible */
    @Input() collapsible: boolean = false;
    /** Add a badge likely style to items */
    @Input() bordered: boolean = false;

    items: BreadcrumbsItem[] = [];
    collapsed = false;
    indexActive: number;

    constructor(public searchService: SearchService) {}

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            /** Ignore text and fielded search */
            this.items =
                this.searchService.breadcrumbs?.items.filter(
                    (item: BreadcrumbsItem) =>
                        !item.expr || (item.expr.isStructured && item.facet !== "search-form")
                ) || [];

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
                const fields = item.expr.getFields();
                return fields.join("-");
            }
        }
        return "unknown";
    }

    home() {
        this.searchService.home();
        return false;
    }

    selectItem(item: BreadcrumbsItem) {
        this.searchService.selectBreadcrumbsItem(item);
        return false;
    }

    removeItem(item: BreadcrumbsItem) {
        this.searchService.removeBreadcrumbsItem(item);
    }
}
