import {Injectable, InjectionToken, Inject, Type, Optional} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, Subject, tap} from "rxjs";
import {AppService, Query} from "@sinequa/core/app-utils";
import {AuthenticationService} from "@sinequa/core/login";
import {PreviewWebService, PreviewData, AuditEventType, Record, AuditEvent, Results, CustomHighlights} from "@sinequa/core/web-services";
import {JsonObject, Utils} from "@sinequa/core/base";
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
    private rank: number;

    constructor(
        @Optional() @Inject(PREVIEW_MODAL) public previewModal: Type<any>,
        private router: Router,
        private previewWebService: PreviewWebService,
        private appService: AppService,
        private authenticationService: AuthenticationService,
        private searchService: SearchService,
        private modalService: ModalService,
        private recentDocumentsService: RecentDocumentsService
    ) {

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
        delete query.select;
        delete query.filters;
        return query;
    }

    public getPreviewData(id: string, query: Query, customHighlights?: CustomHighlights[], audit = true): Observable<PreviewData> {
        let auditEvent: AuditEvent | undefined;
        const record = this.searchService.getRecordFromId(id);
        const resultId = record ? this.searchService.results?.id : undefined;
        if (audit) {
            auditEvent = {
                type: AuditEventType.Doc_Preview,
                detail: this.getAuditPreviewDetail(id, query, record, resultId)
            };
        }
        query = this.makeQuery(query);
        this._events.next({type: PreviewEventType.Data, record, query});
        return this.previewWebService.get(id, query, customHighlights, auditEvent).pipe(
          tap(data => data.resultId = resultId || "")
        );
    }

    openModal(record: Record, query: Query, model: any) {
        model.record = record;
        model.query = query;

        this._events.next({type: PreviewEventType.Modal, record, query});

        this.modalService.open(this.previewModal, { model });
    }

    openNewWindow(record: Record, query: Query): Window | null {
        const params = {
            id: record.id,
            query: this.makeQuery(query).toJsonForQueryString(),
            app: this.appService.appName
        };

        if (this.authenticationService.userOverrideActive && this.authenticationService.userOverride) {
            params["overrideUser"] = this.authenticationService.userOverride.userName;
            params["overrideDomain"] = this.authenticationService.userOverride.domain;
        }
        const httpParams = Utils.makeHttpParams(params);
        const url = "#/preview?" + httpParams.toString();

        this._events.next({type: PreviewEventType.Window, record, query});

        return window.open(url, "_blank");
    }

    openRoute(record: Record, query: Query, path = "preview"): Promise<Boolean> {

        this._events.next({type:PreviewEventType.Route, record, query});
        this.rank = record.rank;

        return this.router.navigate([path], {
            queryParams: {
                id: record.id,
                query: this.makeQuery(query).toJsonForQueryString()
            }
        });
    }

    /**
     * Get the page number of a splitted document's record or undefined if
     * it is not in fact splitted. Stores the page number in the record itself ($page property)
     * @param record
     */
    getPageNumber(record: Record): number | undefined {
        const containerid: string | undefined = record.containerid;
        if(containerid && record.id.startsWith(containerid)) {
            const pageNumberStr = record.id.slice(containerid.length+1);
            if(/#\d+#/g.test(pageNumberStr)) {
                const pageNumber = parseInt(pageNumberStr.slice(1, pageNumberStr.length-1), 10);
                if(!isNaN(pageNumber)) {
                    record.$page = pageNumber;
                    return pageNumber;
                }
            }
        }
        return undefined;
    }

    /**
     * Returns the pages of a given record id
     * @param containerid
     * @param query
     */
    fetchPages(containerid: string, query: Query): Observable<Results> {
        query = this.makeQuery(query);
        query.groupBy = ""; // If the query web service uses GROUP BY containerid
        query.addFilter({field: "containerid", value: containerid});
        return this.searchService.getResults(query);
    }

    getAuditPreviewDetail(id: string, query: Query, record?: Record, resultId?: string): JsonObject {
        const queryLanguage = this.searchService.results?.queryAnalysis?.queryLanguage
            || this.searchService?.query?.questionLanguage
            || this.appService?.ccquery?.questionLanguage;
        const collectionColumn = record?.collection;
        const collection = !!collectionColumn ? collectionColumn[0] : Utils.split(id, "|")[0];
        const rank = !!record ? record.rank : this.rank || 0;
        const passages = record?.matchingpassages?.passages;
        const score = passages && passages.length ? passages[0].score : undefined;
        return {
            docid: id,
            rank,
            collection,
            source: Utils.treeFirstNode(collection),
            resultid: resultId,
            querylang: queryLanguage,
            querytext: query.text,
            filename: record?.filename,
            fileext: record?.fileext,
            score
        }
    }

}
