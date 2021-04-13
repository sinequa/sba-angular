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
    /** The record which title we want to display */
    @Input() record: Record;
    /**
     * "open" mode: Display a link which opens the original document (url1) if available, or emits a titleClicked event to perform an action otherwise
     * "action" mode: Display a link which emits a titleClicked event to perform an action
     * "open-if-url" mode: Display a link which opens the original document (url1) if available, or displays a SPAN with the title otherwise
     * "display" mode: Only display a SPAN element (no link)
     */
    @Input() titleLinkBehavior: "open" | "action" | "open-if-url" | "display" = "open";
    /** Optional field name containing the title. Otherwise displayTitle or title are used */
    @Input() field: string = "";
    /** Optional custom target used in the link */
    @Input() originalDocTarget: string | undefined;
    /** Event emitter to perform actions at the parent level */
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
        return this.titleLinkBehavior === "open" || (this.titleLinkBehavior === "open-if-url" && this.hasUrl);
    }

    /**
     * A span is shown in "display" mode or "open-if-url" mode when no url is present
     * A link is shown in all other cases (even in "open" mode with no url, which is equivalent to "action" mode)
     */
    get hasSpanBehaviour(): boolean {
        return this.titleLinkBehavior === "display" || (this.titleLinkBehavior === "open-if-url" && !this.hasUrl);
    }

    public get href(): string {
        return (this.hasLinkBehaviour && this.documentUrl) || "#";
    }

    public get target(): string {
        return (this.hasLinkBehaviour && this.documentUrl) ? this.originalDocTarget || '_blank' : "_self";
    }
    
    public get hasUrl(): boolean {
        return !!this.documentUrl;
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