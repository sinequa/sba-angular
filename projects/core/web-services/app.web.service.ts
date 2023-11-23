import { Observable, catchError, throwError } from "rxjs";

import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { AuditEvents , CCApp, CCAppRefresh } from "./types";

/**
 * This service provides methods to retrieve and refresh the configuration of an app
 */
@Injectable({
    providedIn: "root"
})
export class AppWebService extends HttpService {

    constructor() {
        super();

        if (!this.appName) {
            console.error("Missing app name!");
        }
    }

    /**
     * Gets the app configuration for the app name
     *
     * @returns An observable of the app configuration
     */
    get(): Observable<CCApp> {
        return this.httpClient.get<CCApp>(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || ""
            })
        }).pipe(
            catchError((error) => {
                console.log("appWebService.get failure - reason: ", error);
                return throwError(() => error);
            })
        );
    }

    /**
     * Refreshes the app configuration based on a version identifier
     *
     * @param appVersionId The current app version id [CCApp.versionId]{@link CCApp#versionId}
     * @param auditEvents Audit events to be recorded for this call
     *
     * @returns An observable of an object containing a flag indicating whether the configuration was up to date. If false
     * then the app member of the object will be set to the new version of the configuration.
     */
    refresh(appVersionId: string, auditEvents?: AuditEvents): Observable<CCAppRefresh> {
        return this.httpClient.get<{ upToDate: boolean, app: CCApp }>(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || "",
                versionId: appVersionId,
                $auditRecord: auditEvents
            })
        }).pipe(
            catchError((error) => {
                console.log("appWebService.refresh failure - reason: ", error);
                return throwError(() => error);
            })
        );
    }
}