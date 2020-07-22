import {Injectable, InjectionToken, Inject, Type} from "@angular/core";
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {AppService, Query} from "@sinequa/core/app-utils";
import {AuthenticationService} from "@sinequa/core/login";
import {PreviewWebService, PreviewData, AuditEventType, Record, AuditEvent} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {ModalService} from "@sinequa/core/modal";
import {SearchService} from "@sinequa/components/search";
import {RecentDocumentsService} from '@sinequa/components/saved-queries';

export const enum PreviewEventType {
    Data = "Preview_Data",
    Modal = "Preview_Modal",
    Route = "Preview_Route",
    Window = "Preview_Window"
}

export interface PreviewEvent {
    type: PreviewEventType;
    record?: Record;
    query: Query;
}

export const PREVIEW_MODAL = new InjectionToken<Type<any>>("PREVIEW_MODAL");


@Injectable({
    providedIn: "root"
})
export class PreviewService {

    private readonly _events = new Subject<PreviewEvent>();

    constructor(
        @Inject(PREVIEW_MODAL) public previewModal: Type<any>,
        private router: Router,
        private previewWebService: PreviewWebService,
        private appService: AppService,
        private authenticationService: AuthenticationService,
        private searchService: SearchService,
        private modalService: ModalService,
        private recentDocumentsService: RecentDocumentsService,
        private sanitizer: DomSanitizer) {

        // Subscribe to own events and add documents to the recent documents service
        this.events.subscribe(event => {
            if(event.record && (event.type === PreviewEventType.Modal || event.type === PreviewEventType.Route || event.type === PreviewEventType.Window)){
                this.recentDocumentsService.addDocument(event.record, false);
            }
        });
    }

    /**
     * Triggers any event among PreviewEvent
     */
    public get events() : Subject<PreviewEvent> {
        return this._events;
    }

    private makeQuery(query: Query): Query {
        query = Utils.copy(query);
        delete query.sort;
        delete query.scope;
        delete query.tab;
        delete query.basket;
        delete query.page;
        delete query.queryId;
        if (query.select) {
            query.select = query.select.filter(value => Utils.eqNC(value.facet, "refine"));
            if (query.select.length === 0) {
                delete query.select;
            }
        }
        return query;
    }

    public getPreviewData(id: string, query: Query, audit = true): Observable<PreviewData> {
        let auditEvent: AuditEvent | undefined;
        const record = this.searchService.getRecordFromId(id);
        const resultId = !!record ? this.searchService.results && this.searchService.results.id : undefined;
        if (audit) {
            const queryLanguage = this.searchService.results?.queryAnalysis?.queryLanguage
                || this.searchService?.query?.questionLanguage
                || this.appService?.ccquery?.questionLanguage;
            const collection = !!record ? record.collection[0] : Utils.split(id, "|")[0];
            const rank = !!record ? record.rank : 0;
            auditEvent = {
                type: AuditEventType.Doc_Preview,
                detail: {
                    "doc-id": id,
                    rank: rank,
                    collection: collection,
                    source: Utils.treeFirstNode(collection),
                    "resultid": resultId,
                    "querylang": queryLanguage
                }
            };
        }
        query = this.makeQuery(query);
        const observable = this.previewWebService.get(id, query, auditEvent);
        Utils.subscribe(observable,
            (previewData) => {
                previewData.resultId = resultId || "";
                return previewData;
            });
        this.events.next({type: PreviewEventType.Data, record: record, query: query});
        return observable;
    }

    public makeDownloadUrl(url: string): SafeResourceUrl | undefined {
        return url ? this.sanitizer.bypassSecurityTrustResourceUrl(this.appService.updateUrlForCors(url)) : undefined;
    }

    openModal(record: Record, query: Query, model: any) {
        model.record = record;
        model.query = query;

        this.events.next({type: PreviewEventType.Modal, record: record, query: query});

        this.modalService.open(this.previewModal, { model });
    }

    private getQueryStr(query: Query): string {
        query = this.makeQuery(query);
        return query.toJsonForQueryString();
    }

    openNewWindow(record: Record, query: Query): Window | null {
        const params = {
            id: record.id,
            query: this.getQueryStr(query),
            app: this.appService.appName
        };

        if (this.authenticationService.userOverrideActive && this.authenticationService.userOverride) {
            params["overrideUser"] = this.authenticationService.userOverride.userName;
            params["overrideDomain"] = this.authenticationService.userOverride.domain;
        }
        const httpParams = Utils.makeHttpParams(params);
        const url = "#/preview?" + httpParams.toString();

        this.events.next({type: PreviewEventType.Window, record: record, query: query});

        return window.open(url, "_blank");
    }

    openRoute(record: Record, query: Query, path = "preview") {

        this.events.next({type: PreviewEventType.Route, record: record, query: query});

        return this.router.navigate([path], {
            queryParams: {
                id: record.id,
                query: this.getQueryStr(query)
            }
        });
    }
}