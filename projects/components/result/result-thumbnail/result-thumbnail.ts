import {Component, Input, Output, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";
import {Record} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: "sq-result-thumbnail",
    templateUrl: "./result-thumbnail.html"
})
export class ResultThumbnail implements OnChanges {
    @Input() record: Record;
    @Input() linkBehavior: "open" | "action" = "open";
    @Input() thumbnailColumn: string;
    @Input() defaultThumbnail: string = "";
    @Output() thumbnailClicked = new EventEmitter<boolean>();
    thumbnailUrl: string;
    private documentUrl: string;

    constructor(
        private appService: AppService,
        private searchService: SearchService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["record"]) {
            this.documentUrl = this.record.url1;
            if (!!this.thumbnailColumn) {
                this.thumbnailUrl = this.record[this.thumbnailColumn];
            }
            if (!this.thumbnailUrl && !!this.record.thumbnailUrl) {
                this.thumbnailUrl = this.record.thumbnailUrl;
            }
            if (!this.thumbnailUrl && !!this.defaultThumbnail) {
                this.thumbnailUrl = this.defaultThumbnail;
            }
            this.thumbnailUrl = this.appService.updateUrlForCors(this.thumbnailUrl);
        }
    }

    get hasLinkBehaviour(): boolean {
        return this.linkBehavior === "open";
    }

    public get href(): string {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }

    public get target(): string {
        return (this.hasLinkBehaviour && this.documentUrl) ? "_blank" : "_self";
    }

    public click() : boolean {
        const isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
        if(isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.thumbnailClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}