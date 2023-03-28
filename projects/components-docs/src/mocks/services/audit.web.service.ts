import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { MapOf } from "@sinequa/core/base";
import { AuditEvents, AuditEventType, HttpService, Results, Record, LinkResult } from "@sinequa/core/web-services";

@Injectable({
    providedIn: "root"
})
export class MockAuditWebService extends HttpService {
    notifySponsoredLink(
        evt: AuditEventType, sl: LinkResult, resultId: string,
        parameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        return EMPTY;
    }

    notifyDocument(
        evt: AuditEventType, doc: Record, resultsOrId: Results | string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        return EMPTY;
    }

    notifyDocumentById(
        evt: AuditEventType, id: string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        return EMPTY;
    }

    notifyLogout(): Observable<void> {
        return EMPTY;
    }

    notifyLogin(): Observable<void> {
        return EMPTY;
    }

    notify(auditEvents: AuditEvents): Observable<void> {
        return EMPTY;
    }
}
