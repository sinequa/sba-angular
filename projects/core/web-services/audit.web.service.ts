import { Observable, of } from "rxjs";

import { Injectable, Optional } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

import { Utils } from "@sinequa/core/base";

import { HttpService } from "./http.service";
import { AuditEvent, AuditEvents , AuditEventType , Record, Results } from "./types";
import { LinkResult } from "./sponsored-links.web.service";
import { AuditEventTypeValues } from "./types/audit/AuditEventType";

// this type is used only to avoid Record collision with the Record type from Typescript
type MapOf<T> = { [key: string]: T };

/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
@Injectable({
    providedIn: "root"
})
export class AuditWebService extends HttpService {
    private static readonly endpoint = "audit.notify";

    protected previousRoute: string | undefined;

    protected lastClickTime = 0;

    constructor(
        @Optional() public router?: Router
    ) {
        super();

        this.auditRouteChange();

        this.router?.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.auditRouteChange();
            }
        });
    }

    /**
     * Notify the Sinequa server of a sponsored link event
     *
     * @param evt The audit event type
     * @param sl The sponsored link
     * @param resultId The id of the results that showed the sponsored link
     * @param parameters Additional information
     */
    notifySponsoredLink(
        evt: AuditEventType | AuditEventTypeValues,
        sl: LinkResult,
        resultId: string,
        parameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        const detail = {
            linkid: sl.id,
            rank: sl.rank || 0,
            title: sl.title,
            url: sl.url,
            resultid: resultId
        };
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data: AuditEvent = {
            type: evt,
            detail
        };
        return this.notify(data);
    }

    /**
     * Notify the Sinequa server of a document event
     *
     * @param evt The audit event type
     * @param doc The document (record) in question
     * @param resultsOrId The results or resultid that contain the document
     * @param parameters Additional parameters
     * @param rfmParameters Additional RFM parameters
     */
    notifyDocument(
        evt: AuditEventType | AuditEventTypeValues,
        doc: Record,
        resultsOrId: Results | string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        let resultId: string | null;
        let results: Results | undefined;
        if (Utils.isString(resultsOrId)) {
            resultId = resultsOrId;
        }
        else {
            results = resultsOrId;
            resultId = results ? results.id : null;
        }
        const detail = {
            app: this.appName,
            docid: doc.id,
            rank: doc.rank,
            title: doc.title,
            source: Utils.treeFirstNode(doc.collection[0]),
            collection: doc.collection[0],
            resultid: resultId,
            filename: doc.filename,
            fileext: doc.fileext,
            index: doc.databasealias
        };
        if (results) {
            detail["resultcount"] = results.totalRowCount;
        }
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data: AuditEvent = {
            type: evt,
            detail
        };
        if (rfmParameters) {
            const rfmDetail = {};
            Object.keys(rfmParameters).forEach(key => rfmDetail[key] = rfmParameters[key]);
            data.rfmDetail = rfmDetail;
        }

        this.lastClickTime = Date.now();

        // Listen to the navigation event outside the app
        document.addEventListener('visibilitychange', () => {
            // Capture the navigation even triggered just after the click
            if (document.visibilityState === 'hidden' && (Date.now() - this.lastClickTime) < 1000) {
                // Second event triggered when we come back
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'visible') {
                        this.notify({ type: AuditEventType.Navigation_Return });
                    }
                }, { once: true });
            }
        }, { once: true });

        return this.notify(data);
    }

    /**
     * Notify the Sinequa server of a document event
     *
     * @param evt The audit event type
     * @param id The id of the document (record) in question
     * @param parameters Additional parameters
     * @param rfmParameters Additional RFM parameters
     */
    notifyDocumentById(
        evt: AuditEventType, id: string,
        parameters?: MapOf<string | number | boolean | undefined>,
        rfmParameters?: MapOf<string | number | boolean | undefined>): Observable<void> {
        const collection = id.substr(0, id.indexOf("|"));
        const detail = {
            app: this.appName,
            docid: id,
            rank: -1,
            source: Utils.treeFirstNode(collection),
            collection
        };
        if (parameters) {
            Object.keys(parameters).forEach(key => detail[key] = parameters[key]);
        }
        const data: AuditEvent = {
            type: evt,
            detail
        };
        if (rfmParameters) {
            const rfmDetail = {};
            Object.keys(rfmParameters).forEach(key => rfmDetail[key] = rfmParameters[key]);
            data.rfmDetail = rfmDetail;
        }
        return this.notify(data);
    }

    /**
     * Notify logout
     */
    notifyLogout(): Observable<void> {
        const detail = {
            app: this.appName,
        };

        const data: AuditEvent = {
            type: AuditEventType.Search_Exit_Logout,
            detail
        };

        return this.notify(data);
    }

    /**
     * It sends an audit event to the Audit Service.
     * @returns An Observable<void>
     */
    notifyLogin(): Observable<void> {
        const detail = {
            app: this.appName,
        };

        const data: AuditEvent = {
            type: AuditEventType.Search_Login_Success,
            detail
        };

        return this.notify(data)
    }

    /**
     * Notify the Sinequa server of a set of audit events
     *
     * @param auditEvents The audit events
     */
    notify(auditEvents: AuditEvents): Observable<void> {
        if (!this.startConfig.auditEnabled) {
            return of(undefined);
        }
        const observable = this.httpClient.post<void>(this.makeUrl(AuditWebService.endpoint), {
            event: AuditEventType.None,
            app: this.appName,
            $auditRecord: auditEvents
        });
        Utils.subscribe(observable,
            (response) => response,
            (error) => {
                console.log("auditService.notify failure - error: ", error);
            });
        return observable;
    }

    auditRouteChange() {
        const route = this.router?.url.substr(1).split('?')[0]; // Extract route name
        if (route && route !== this.previousRoute) {
            this.notify({
                type:  AuditEventType.Navigation_Route,
                detail: {
                    detail: route
                }
            });
        }
        this.previousRoute = route;
    }
}
