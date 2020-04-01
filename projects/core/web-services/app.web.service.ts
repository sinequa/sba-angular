import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {AuditEvents} from "./audit.web.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {CCApp} from "./config/ccapp";

/**
 * Defines the object returned by a call to [AppWebService.refresh]{@link AppWebService#refresh}. If the upToDate
 * member is false then the app member contains the latest version of the app configuration
 */
export interface CCAppRefresh {
    upToDate: boolean;
    app?: CCApp;
}

/**
 * This service provides methods to retrieve and refresh the configuration of an app
 */
@Injectable({
    providedIn: "root"
})
export class AppWebService extends HttpService {
    /**
     * Constructor
     *
     * @param startConfig Provides the app name
     * @param httpClient The HTTP client
     */
    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);

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
        const observable = this.httpClient.get<CCApp>(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || ""
            })
        });
        observable
            .subscribe(
                (response) => {
                //console.log("appWebService.get success - data: ", response);
                    return response;
                },
                (error) => {
                    //console.log("appWebService.get failure - reason: ", error);
                });
        return observable;
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
        const observable = this.httpClient.get<{upToDate: boolean, app: CCApp}>(this.makeUrl("app"), {
            params: this.makeParams({
                app: this.appName || "",
                versionId: appVersionId,
                $auditRecord: auditEvents
            })
        });
        observable
            .subscribe(
                (response) => {
                    //console.log("appWebService.refresh success - data: ", response);
                    return response;
                },
                (error) => {
                    //console.log("appWebService.refresh failure - reason: ", error);
                });
        return observable;
    }
}