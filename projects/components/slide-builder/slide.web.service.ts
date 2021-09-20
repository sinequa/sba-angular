import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { AuditEvents, DownloadWebService, HttpService, SqHttpClient, StartConfig, START_CONFIG } from "@sinequa/core/web-services";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class SlideWebService extends HttpService {

    constructor(
        @Inject(START_CONFIG) public startConfig: StartConfig,
        private httpClient: SqHttpClient,
        public downloadService: DownloadWebService
    ){
        super(startConfig);
    }

    /*  Syntax Expected by SlideDeckJsonMethod (server side)
    {
        "action":"merge",
        "slideCollection":
        {
            "ids":
            [
                "\/test\/FS_nosizing\/|CoE Implementation best practices.pptx_slideNumber_0_slideId_636",
                "\/test\/FS_nosizing\/|CoE Implementation best practices.pptx_slideNumber_1_slideId_733"
            ]
        }
    }
    */
    exportSlides(ids: string[], auditEvents?: AuditEvents): Observable<HttpResponse<Blob>> {
        return this.httpClient.post(this.makeUrl("plugin/DeckBuilderJsonMethodPlugin"), 
        {
            app: this.startConfig.app,
            action: "merge",
            slideCollection: {
                ids
            },
            $auditRecord: auditEvents
        },
        {
            observe: 'response',
            responseType: 'blob'                
        });
    }

    downloadSlides(ids: string[], auditEvents?: AuditEvents): Observable<HttpResponse<Blob>> {
        const slides$ = this.exportSlides(ids, auditEvents);
        return this.downloadService.download(slides$);
    }
}