import { Injectable } from "@angular/core";
import { AuditEvents, HttpService, IQuery, PreviewData } from "@sinequa/core/web-services";
import { Observable, throwError, catchError, distinctUntilChanged, shareReplay, of } from "rxjs";
import { PREVIEW_DATA } from "../data/preview";

@Injectable({
    providedIn: "root"
})
export class MockPreviewWebService extends HttpService {

    public get(id: string, query: IQuery, auditEvents?: AuditEvents): Observable<PreviewData> {
        return of(PREVIEW_DATA as any);
    }

    public getHtmlPreview(url: string): Observable<any> {
        return this.httpClient.get(url, { responseType: "text" }).pipe(
            catchError(err => throwError(err)),
            distinctUntilChanged(),
            shareReplay(1)
        );
    }
}
