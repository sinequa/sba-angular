import { Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation } from "@angular/core";

import { SearchService } from "@sinequa/components/search";
import { Utils } from "@sinequa/core/base";
import { AuditEventType, Record } from "@sinequa/core/web-services";


@Component({
    selector: "sq-result-title",
    templateUrl: "./result-title.html",
    styles: [`
sq-result-title {
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
    /** Column containing the original document's URL */
    @Input() urlColumn = "url1";
    /** Event emitter to perform actions at the parent level */
    @Output() titleClicked = new EventEmitter<boolean>();   // TODO: Custom options to get title & URL (replace pluginservice)

    public title: string;

    constructor(
        public searchService: SearchService) {
    }

    public ngOnChanges() {
        this.title = this.getTitle();
    }

    get hasLinkBehaviour(): boolean {
        return this.titleLinkBehavior === "open" || (this.titleLinkBehavior === "open-if-url" && !!this.url);
    }

    /**
     * A span is shown in "display" mode or "open-if-url" mode when no url is present
     * A link is shown in all other cases (even in "open" mode with no url, which is equivalent to "action" mode)
     */
    get hasSpanBehaviour(): boolean {
        return this.titleLinkBehavior === "display" || (this.titleLinkBehavior === "open-if-url" && !this.url);
    }

    public get href(): string {
        return (this.hasLinkBehaviour && this.url) || "#";
    }

    public get target(): string {
        return (this.hasLinkBehaviour && this.url) ? this.originalDocTarget || '_blank' : "_self";
    }

    public get url(): string | undefined {
        return this.record[this.urlColumn] || this.record.originalUrl;
    }

    private getTitle(): string {
        return Utils.escapeHtml(this.record[this.field])
            || this.record.displayTitle
            || Utils.escapeHtml(this.record.title);
    }

    public click() : boolean {
        const isLink = this.hasLinkBehaviour && !!this.url; // true if this is a regular link (performs the default action)
        if(isLink) {
          const type = this.record[this.urlColumn]? AuditEventType.Click_ResultLink : AuditEventType.Doc_CacheOriginal;
          this.searchService.notifyOpenOriginalDocument(this.record, undefined, type);
        }
        this.titleClicked.emit(isLink); // Can be use to trigger actions
        return isLink;
    }
}
