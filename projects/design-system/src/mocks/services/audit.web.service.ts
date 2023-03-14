import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MapOf } from "@sinequa/core/base";
import { AuditEvents, AuditEventType, HttpService, Results, Record, LinkResult } from "@sinequa/core/web-services";

@Injectable({
    providedIn: "root"
})
export class MockAuditWebService extends HttpService {
    notifySponsoredLink(
        evt: AuditEventType, sl: LinkResult, resultId: string,
        parameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        return of();
    }

    notifyDocument(
        evt: AuditEventType, doc: Record, resultsOrId: Results | string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        return of();
    }

    notifyDocumentById(
        evt: AuditEventType, id: string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        return of();
    }

    notifyLogout(): Observable<void> {
        return of();
    }

    notifyLogin(): Observable<void> {
        return of();
    }

    notify(auditEvents: AuditEvents): Observable<void> {
        return of();
    }
}
