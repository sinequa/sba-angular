import { Injectable } from "@angular/core";
import { AuditEvents, CCApp, CCAppRefresh, HttpService } from "@sinequa/core/web-services";
import { Observable, of } from "rxjs";
import { APP } from "../data/app";

@Injectable({
    providedIn: "root"
})
export class MockAppWebService extends HttpService {

    constructor() {
        super();
    }

    get(): Observable<CCApp> {
        return of(APP as any);
    }

    refresh(appVersionId: string, auditEvents?: AuditEvents): Observable<CCAppRefresh> {
        return of({ upToDate: true, app: APP as any });
    }
}