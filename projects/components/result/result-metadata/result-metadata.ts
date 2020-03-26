import {Component, Input} from "@angular/core";
import {ValueItem} from "@sinequa/core/app-utils";
import {Record} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";
import {Spacing} from "@sinequa/components/metadata";

@Component({
    selector: "sq-result-metadata",
    templateUrl: "./result-metadata.html"
})
export class ResultMetadata {
    @Input() record: Record;
    @Input() items: string[];
    @Input() showTitles: boolean = true;
    @Input() showIcons: boolean = false;
    @Input() clickable: boolean = true;
    @Input() spacing: Spacing = "default";
    @Input() tabular: boolean = true;

    constructor(
        public searchService: SearchService) {
    }

    select = (item: string, valueItem: ValueItem) => {
        this.searchService.addFieldSelect(item, valueItem);
        this.searchService.search();
    }
}