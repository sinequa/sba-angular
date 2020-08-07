import { Injectable, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SqHttpClient } from "./http-client";
import { HttpService } from './http.service';
import {Utils} from "@sinequa/core/base";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import { ExportOutputFormat, ExportSourceType } from './config/ccapp';
import { IQuery } from './query/query';
import { Results } from "./query.web.service";
import { AuditEventType } from './audit.web.service';

/**
 * A service to export the result of a query.
 */
@Injectable({
    providedIn: "root"
})
export class QueryExportWebService extends HttpService {

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    private logErrorToConsole(methodName: string, errorMessage: string): void {
        console.log(`queryExportService.${methodName} ${errorMessage}.`);
    }

    private preliminaryCheck(
        methodName: string,
        webService: string,
        format: ExportOutputFormat): Observable<HttpResponse<Blob>> | undefined {

        if (!this.appName) {
            const errorMessage = 'No app';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        if (!webService) {
            const errorMessage = 'No web service';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        if (!format || format as ExportOutputFormat === ExportOutputFormat.None) {
            const errorMessage = 'No output format';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        return undefined;
    }

    /**
     * Exports the current result.
     *
     * @param webService The configuration for the export web service.
     * @param query The query to export.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    public exportResult(
        webService: string,
        query: IQuery,
        results: Results | undefined,
        format: ExportOutputFormat,
        maxCount?: number,
        exportedColumns?: string[]
    ): Observable<HttpResponse<Blob>> {

        const methodName = 'exportResult';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }

        if (!query) {
            const errorMessage = 'No query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        const postData = {
            app: this.appName,
            webService,
            query,
            type: ExportSourceType[ExportSourceType.Result],
            format: ExportOutputFormat[format],
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            auditEvents: {
                type: AuditEventType.Search_ExportCSV,
                detail: {
                    "result-id": !!results ? results.id : undefined
                }
            }
        };

        return this.doExport(postData);
    }

    /**
     * Exports the current selected records.
     *
     * @param webService The configuration for the export web service.
     * @param query
     * @param selection
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    public exportSelection(
        webService: string,
        query: IQuery,
        results: Results | undefined,
        selection: string[],
        format: ExportOutputFormat,
        maxCount?: number,
        exportedColumns?: string[]
    ): Observable<HttpResponse<Blob>> {

        const methodName = 'exportSelection';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }

        if (!query) {
            const errorMessage = 'No query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        if (!selection || selection.length === 0) {
            const errorMessage = 'No selection';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        const postData = {
            app: this.appName,
            webService,
            query,
            selection,
            type: ExportSourceType[ExportSourceType.Selection],
            format: ExportOutputFormat[format],
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            auditEvents: {
                type: AuditEventType.Search_Selection_ExportCSV,
                detail: {
                    "result-id": !!results ? results.id : undefined
                }
            }
        };

        return this.doExport(postData);
    }

    /**
     * Exports the result of a saved query.
     *
     * @param webService The configuration for the export web service.
     * @param queryName The query name.
     * @param format The export format.
     * @param maxCount (Optional) The maximum number of exported rows.
     * @param exportedColumns (Optional) The columns to export, empty means all columns.
     */
    public exportSavedQuery(
        webService: string,
        queryName: string,
        format: ExportOutputFormat,
        maxCount?: number,
        exportedColumns?: string[]
    ): Observable<HttpResponse<Blob>> {

        const methodName = 'exportSavedQuery';
        const preliminaryCheckResult = this.preliminaryCheck(methodName, webService, format);
        if (preliminaryCheckResult) {
            return preliminaryCheckResult;
        }

        if (!queryName) {
            const errorMessage = 'No saved query';
            this.logErrorToConsole(methodName, errorMessage);
            return throwError({ error: errorMessage});
        }

        const postData = {
            app: this.appName,
            webService,
            type: ExportSourceType[ExportSourceType.SavedQuery],
            format: ExportOutputFormat[format],
            name: queryName,
            maxCount: maxCount ? maxCount.toString() : undefined,
            exportedColumns: exportedColumns,
            auditEvents: {
                type: AuditEventType.Search_SavedQuery_ExportCSV,
                detail: {
                    query: queryName
                }
            }
        };

        return this.doExport(postData);
    }

    private doExport(body: {}): Observable<HttpResponse<Blob>> {
        const observable = this.httpClient.post(
            this.makeUrl('query.export'),
            body,
            {
                observe: 'response',
                responseType: 'blob'
            }
        );

        Utils.subscribe(
            observable,
            (response: HttpResponse<Blob>) => {
                console.log('queryExportService.export success: ', this.readBlobFileName(response));
                return response;
            },
            (error) => {
                console.log('queryExportService.export failure - error: ', error);
            });

        return observable;
    }

    private readBlobFileName(response: HttpResponse<Blob>): string {
        const header = response.headers.get('content-disposition');
        return header ? header.split('filename=')[1].replace('"', '').replace('"', '') : "";
    }
}
