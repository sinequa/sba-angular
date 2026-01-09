import {Component, Input, ChangeDetectionStrategy, OnChanges} from "@angular/core";
import {Record} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-result-thumbnail",
    templateUrl: "./result-thumbnail.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ResultThumbnail implements OnChanges {
    @Input() record: Record;
    @Input() linkBehavior = true;
    @Input() thumbnailColumn: string;
    @Input() defaultThumbnail: string;
    @Input() urlColumn = "url1";

    thumbnailUrl?: string;
    href?: string;

    constructor(
        private appService: AppService,
        private searchService: SearchService) {
    }

    ngOnChanges(): void {
        let url = this.record[this.thumbnailColumn] // Custom column, if any
               || this.record.thumbnailUrl // Standard column
               || this.defaultThumbnail; // Default column
        this.thumbnailUrl = this.appService.updateUrlForCors(url);
        this.href = this.linkBehavior? this.record[this.urlColumn] : undefined;
    }

    onClick() {
        this.searchService.notifyOpenOriginalDocument(this.record);
    }
}
