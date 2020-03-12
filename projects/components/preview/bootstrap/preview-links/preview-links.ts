import {Component, Input, OnChanges} from "@angular/core";
import {Record} from "@sinequa/core/web-services";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-preview-links",
    // For highlight buttons...
    // http://stackoverflow.com/questions/21245541/min-and-max-width-mess-up-text-align-center
    templateUrl: "./preview-links.html",
    styleUrls: ["./preview-links.css"]
})
export class BsPreviewLinks implements OnChanges {
    @Input() record: Record;
    @Input() resultId: string;
    originalDocumentUrl: string;

    constructor(
        private searchService: SearchService) {
    }

    public ngOnChanges() {
        this.originalDocumentUrl = this.record.url1;
    }

    click() {
        this.searchService.notifyOpenOriginalDocument(this.record, this.resultId);
    }
}