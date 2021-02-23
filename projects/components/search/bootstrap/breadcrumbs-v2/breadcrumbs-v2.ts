import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {SearchService} from "../../search.service";
import {BreadcrumbsItem} from "../../breadcrumbs";

@Component({
    selector: "sq-breadcrumbs-v2",
    templateUrl: "./breadcrumbs-v2.html",
    styleUrls: ["./breadcrumbs-v2.scss"]
})
export class BsBreadcrumbsV2 implements OnChanges {
    @Input() results: Results;
    @Input() allowDeletion: boolean = true;
    @Input() displayFieldNames: boolean = false;
    @Input() collapsible: boolean = true;
    @Input() bordered: boolean = false;

    collapsed = false;
    indexActive: number;

    constructor(
        public searchService: SearchService) {
    }

    ngOnChanges(changes: SimpleChanges) {
      if (!!changes["results"]) {
          console.log(this.searchService.breadcrumbs?.items)
          console.log(this.searchService.breadcrumbs?.items.findIndex((item: BreadcrumbsItem) => !!item.active))
          this.indexActive = this.searchService.breadcrumbs?.items.findIndex((item: BreadcrumbsItem) => !!item.active) || 0;
      }
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
