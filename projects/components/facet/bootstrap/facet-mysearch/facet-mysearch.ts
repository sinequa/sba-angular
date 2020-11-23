import { Component, Input } from "@angular/core";
import { AppService } from "@sinequa/core/app-utils";
import { Results } from "@sinequa/core/web-services";
import { SearchService, BreadcrumbsItem } from "@sinequa/components/search";
import { AbstractFacet } from "../../abstract-facet";
import { AdvancedService } from "@sinequa/components/advanced";

@Component({
    selector: "sq-facet-mysearch",
    templateUrl: "./facet-mysearch.html",
    styles: [
        `
            .badge {
                font-size: 12px;
            }
            .clickable {
                margin: 3px;
                cursor: pointer;
            }
            .clickable:hover {
                opacity: 85%;
            }
        `,
    ],
})
export class BsMySearch extends AbstractFacet {
    @Input() results: Results;
    @Input() allowDeletion: boolean = true;
    @Input() displayFieldNames: boolean = true;

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        public advancedService: AdvancedService
    ) {
        super();
    }

    removeItem(item: BreadcrumbsItem): boolean {
        this.searchService.removeBreadcrumbsItem(item);
        return false;
    }
}
