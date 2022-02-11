import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";
import {Record} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-result-thumbnail",
    templateUrl: "./result-thumbnail.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultThumbnail {
    @Input() record: Record;
    @Input() linkBehavior: "open" | "action" = "open";
    @Input() thumbnailColumn: string;
    @Input() defaultThumbnail: string;
    @Input() urlColumn = "url1";
    @Output() thumbnailClicked = new EventEmitter<boolean>();

    constructor(
        private appService: AppService,
        private searchService: SearchService) {
    }

    get thumbnailUrl(): string {
        let url = this.record[this.thumbnailColumn] // Custom column, if any
            || this.record.thumbnailUrl // Standard column
            || this.defaultThumbnail; // Default column
        return this.appService.updateUrlForCors(url);
    }

    get hasLinkBehaviour(): boolean {
        return this.linkBehavior === "open";
    }

    public get href(): string {
        return (this.hasLinkBehaviour && this.record[this.urlColumn]) || "#";
    }

    public get target(): string {
        return (this.hasLinkBehaviour && this.record[this.urlColumn]) ? "_blank" : "_self";
    }

    public click() : boolean {
        const isLink = this.hasLinkBehaviour && !!this.record[this.urlColumn]; // true if this is a regular link (performs the default action)
        if(isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.thumbnailClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}