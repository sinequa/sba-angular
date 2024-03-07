import { Observable, catchError, distinctUntilChanged, shareReplay, throwError } from "rxjs";

import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { AuditEvents, CustomHighlights, IQuery, PreviewData } from "./types";

/**
 * A service for calling the preview web service
 */
@Injectable({
    providedIn: "root"
})
export class PreviewWebService extends HttpService {

    /**
     * Gets {@link PreviewData} for a document in the context of a {@link IQuery}
     *
     * @param id The document id
     * @param query The query context
     * @param auditEvents Audit events to store on the server
     */
    public get(id: string, query: IQuery, customHighlights?: CustomHighlights[], auditEvents?: AuditEvents): Observable<PreviewData> {
        return this.httpClient.post<PreviewData>(this.makeUrl("preview"), {
            app: this.appName,
            action: "get",
            id,
            query,
            browserUrl: this.startConfig.browserUrl,
            customHighlights,
            $auditRecord: auditEvents
        }).pipe(shareReplay(1));
    }

    /**
     * Gets document's preview HTML content
     *
     * @param url The document preview URL
     * @returns
     */
    public getHtmlPreview(url: string): Observable<any> {
        return this.httpClient.get(url, {responseType: "text"}).pipe(
            catchError(err => throwError(() => err)),
            distinctUntilChanged(),
            shareReplay(1)
        );
    }
}
