import {ViewEncapsulation, Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Record} from "@sinequa/core/web-services";
import {AppService} from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";


@Component({
    selector: "sq-result-title",
    templateUrl: "./result-title.html",
    styles: [`
sq-result-title {
    font-size: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.match-highlight {
    font-weight: bold;
    font-style: italic;
}
    `],
    encapsulation: ViewEncapsulation.None   // Currently necessary for the match-highlight
})
export class ResultTitle implements OnChanges {
    @Input() record: Record;
    @Input() titleLinkBehavior: "open" | "action" = "open";
    @Input() field: string = "";
    @Output() titleClicked = new EventEmitter<boolean>();   // TODO: Custom options to get title & URL (replace pluginservice)
    public title: string;
    private titleField: string;
    private documentUrl: string;

    constructor(
        public searchService: SearchService,
        private appService: AppService) {
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes["record"]) {
            this.titleField = this.appService.resolveColumnAlias(this.field);
            this.title = this.getTitle();
            this.documentUrl = this.record.url1;
        }
    }

    get hasLinkBehaviour(): boolean {
        return this.titleLinkBehavior === "open";
    }

    public get href(): string {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }

    public get target(): string {
        return (this.hasLinkBehaviour && this.documentUrl) ? "_blank" : "_self";
    }

    private getTitle(): string {
        let title;
        if (this.titleField) {
            title = Utils.escapeHtml(this.record[this.titleField]);
        }
        if (!title) {
            title = this.record.displayTitle || Utils.escapeHtml(this.record.title);
        }
        return title;
    }

    public click() : boolean {
        const isLink = this.hasLinkBehaviour && !!this.documentUrl; // true if this is a regular link (performs the default action)
        if(isLink)
            this.searchService.notifyOpenOriginalDocument(this.record);
        this.titleClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}