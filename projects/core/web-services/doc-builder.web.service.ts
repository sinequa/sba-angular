import { HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuditEvents } from "./audit.web.service";
import { DownloadWebService } from "./download.web.service";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { StartConfig, START_CONFIG } from "./start-config.web.service";

@Injectable({providedIn: 'root'})
export class DocBuilderWebService extends HttpService {
    private static readonly endpoint = "OriginalDocMerge";

    constructor(
        @Inject(START_CONFIG) public override startConfig: StartConfig,
        private httpClient: SqHttpClient,
        public downloadService: DownloadWebService
    ){
        super(startConfig);
    }

    /**
     * Merge documents with the given ids into a single one. For this web service to work,
     * the original documents must be stored by Sinequa.
     * @param ids Documents to merge
     * @param type Type of merger
     * @param filename Name of the file in which to merge
     * @param includeNotes Include powerpoint notes
     * @param auditEvents Audit event to report
     * @returns Merged document as a binary
     */
    merge(ids: string[], type: 'slide' | 'pdf' | 'word', filename: string, includeNotes?: boolean, auditEvents?: AuditEvents): Observable<HttpResponse<Blob>> {
        return this.httpClient.post(this.makeUrl(DocBuilderWebService.endpoint), 
        {
            type,
            docIds: ids,
            mergedFilename: filename,
            includeNotes,
            $auditRecord: auditEvents
        },
        {
            observe: 'response',
            responseType: 'blob'                
        });
    }


    // Helper methods to merge specific document types

    /**
     * Merge slides into one presentation
     */
    mergeSlides(ids: string[], auditEvents?: AuditEvents, filename = "Presentation.pptx"): Observable<HttpResponse<Blob>> {
        return this.merge(ids, 'slide', filename, true, auditEvents);
    }
    
    /**
     * Merge pages into one PDF document
     */
    mergePdfs(ids: string[], auditEvents?: AuditEvents, filename = "Document.pdf"): Observable<HttpResponse<Blob>> {
        return this.merge(ids, 'pdf', filename, undefined, auditEvents);
    }
    
    /**
     * Merge pages into one docx document
     */
    mergeWords(ids: string[], auditEvents?: AuditEvents, filename = "Document.docx"): Observable<HttpResponse<Blob>> {
        return this.merge(ids, 'word', filename, undefined, auditEvents);
    }


    // Helper methods to merge and download specific document types

    /**
     * Merge and download multiple slides as one presentation
     */
    downloadSlides(ids: string[], auditEvents?: AuditEvents): Observable<HttpResponse<Blob>> {
        const slides$ = this.mergeSlides(ids, auditEvents);
        return this.downloadService.download(slides$);
    }
    
    /**
     * Merge and download pages as one PDF document
     */
    downloadPdfs(ids: string[], auditEvents?: AuditEvents): Observable<HttpResponse<Blob>> {
        const pdfs$ = this.mergePdfs(ids, auditEvents);
        return this.downloadService.download(pdfs$);
    }
    
    /**
     * Merge and download pages as one docx document
     */
    downloadWords(ids: string[], auditEvents?: AuditEvents): Observable<HttpResponse<Blob>> {
        const words$ = this.mergeWords(ids, auditEvents);
        return this.downloadService.download(words$);
    }
}