import { Component, Input, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { Utils } from "@sinequa/core/base";
import { LinkResult, SponsoredLinksWebService, AuditWebService, AuditEventType, AuditEvent } from "@sinequa/core/web-services";
import { AppService, Query } from "@sinequa/core/app-utils";
import {SearchService} from "@sinequa/components/search";

@Component({
    selector: 'sq-sponsored-results',
    templateUrl: './sponsored-results.html',
    styleUrls: ["./sponsored-results.scss"]
})

/**
 * Represent the component that display the sponsored results on result page.
 * NOTE: this class and (its containing file) could have been named SponsoredLinks but this naming causes
 * the file to be flagged as ads by Adblock.
 */
export class SponsoredResults implements OnChanges, OnInit {
    @Input() query: Query;
    public sponsoredlinks: LinkResult[];

    private lastText: string;
    private currentPage?: number;
    private linksQuery: Query;
    private initDone: boolean;
    private webService: string;

    constructor(
        private appService: AppService,
        private searchService: SearchService,
        private sponsoredResultsService: SponsoredLinksWebService,
        private auditService: AuditWebService,
        private changeDetectorRef: ChangeDetectorRef) {
    }

    /**
     * Considers the text of the new query and sees if the list of the sponsored lists needs to be updated.
     *
     * @param text The text of the new query.
     * @memberof SponsoredLinks
     */
    private updateSponsoredLinksIfNecessary(text: string): void {
        if (!this.appService.app) {
            return; // logout
        }

        let redoQuery = false;
        const currentWS = this.getWebService();
        if (!Utils.eqNC(this.webService, currentWS)) {
            this.webService = currentWS;
            redoQuery = true;
        }

        if (!redoQuery && !Utils.eqNC(this.lastText, text)) {
            this.lastText = text;
            redoQuery = true;
        }

        if (!redoQuery && this.currentPage !== this.searchService.query.page) {
            this.currentPage = this.searchService.query.page;
            redoQuery = true;
        }

        if (redoQuery) {
            if (!Utils.isEmpty(this.webService) && !Utils.isEmpty(text)) {
                this.linksQuery.text = text;
                this.linksQuery.page = this.currentPage;
                Utils.subscribe(
                    this.sponsoredResultsService.getLinks(this.linksQuery, this.webService),
                    (results) => {
                        this.sponsoredlinks = results.links;
                        this.auditLinksDisplay();
                        this.changeDetectorRef.markForCheck();
                    },
                    (error) => console.log(`Could not retrieve sponsored links: ${error}.`)
                );
            } else {
                this.sponsoredlinks = [];
            }
        }
    }

    /**
     * Retrieves the web service for sponsored links.
     * If it is defined both in the component configuration and the app configuration,
     * this method returns the one in the component configuration.
     *
     * @returns the web service for sponsored links.
     */
    private getWebService(): string {
        return (this.appService.app && this.appService.app.sponsoredLinks) || "";
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.initDone) {
            this.initialize();
        }

        if (changes['query'] || changes['results']) {
            this.updateSponsoredLinksIfNecessary(Utils.trim(this.query.text || ""));
        }
    }

    private initialize(): void {
        if (this.initDone) {
            return;
        }

        if (this.appService.ccquery) {
            this.linksQuery = new Query(this.appService.ccquery.name);
        } else {
            return;
        }
        this.initDone = true;
    }

    ngOnInit(): void {
        this.initialize();
    }

    auditLinksDisplay() {
        if (!!this.sponsoredlinks && this.sponsoredlinks.length > 0) {
            const auditEvents: AuditEvent[] = [];
            this.sponsoredlinks.forEach(link => {
                auditEvents.push({
                    type: AuditEventType.Link_Display,
                    detail: {
                        resultid: this.searchService.results && this.searchService.results.id,
                        linkid: link.id,
                        rank: link.rank,
                        title: link.title,
                        url: link.url
                    }
                });
            });
            this.auditService.notify(auditEvents);
        }
    }

    click(link: LinkResult) {
        this.auditService.notifySponsoredLink(AuditEventType.Link_Click, link,
            this.searchService.results && this.searchService.results.id || "");
    }
}
