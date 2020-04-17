import {Component, Input} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {SearchService} from "../../search.service";
import {BreadcrumbsItem} from "../../breadcrumbs";

@Component({
    selector: "sq-breadcrumbs",
    templateUrl: "./breadcrumbs.html",
    styleUrls: ["./breadcrumbs.css"]
})
export class BsBreadcrumbs {
    @Input() results: Results;
    @Input() allowDeletion: boolean = true;
    @Input() displayFieldNames: boolean = true;

    constructor(
        public searchService: SearchService) {
    }

    getField(item: BreadcrumbsItem): string {
        if (item.expr) {
            if (item.expr.field) {
                return item.expr.field;
            }
            else {
                if (!item.expr.isStructured) {
                    return "text";
                }
                else {
                    const fields = item.expr.getFields();
                    return fields.join("-");
                }
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