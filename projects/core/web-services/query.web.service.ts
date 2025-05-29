import { Observable, catchError, tap, throwError } from "rxjs";

import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { API_ENDPOINTS, AuditEvents, IMulti, IQuery, QueryIntentData, Results } from "./types";

/**
 * A service to call the query web service
 */
@Injectable({
    providedIn: "root"
})
export class QueryWebService<T extends Results = Results> extends HttpService {
    protected endPoint: API_ENDPOINTS = "query";

    /**
     * Get the results for the passed query
     *
     * @param query The query to execute
     * @param auditEvents Any audit events to store on the server
     * @param queryIntentData Any accompanying query intent data
     */
    public getResults(query: IQuery, auditEvents?: AuditEvents, queryIntentData?: QueryIntentData): Observable<T> {
        if (!query) {
            return throwError({ error: "no query" });
        }

        return this.httpClient.post<T>(this.makeUrl(this.endPoint), {
            app: this.appName,
            query,
            $auditRecord: auditEvents,
            queryIntentData
        }).pipe(
            tap(response => {
                if (response['errorCode'] !== undefined) {
                    throw new Error(response['errorMessage'])
                }
            }),
            catchError(error => {
                console.log("queryService.getResults failure - error: ", error);
                return throwError(() => new Error('Something bad happened; please try again later.'));
            }),
            tap(response => console.log("queryService.getResults success - data: ", response)),
        )
    }

    /**
     * Get the results for a set of queries
     *
     * @param queries The queries to execute
     * @param auditEvents Any audit events to store on the server
     */
    public getMultipleResults(queries: IQuery[], auditEvents?: AuditEvents): Observable<IMulti<T>> {
        const data: {
            methods: {
                method: string,
                app: string,
                query: IQuery
            }[],
            propagateErrors: true,
            $auditRecord?: AuditEvents
        } = {
            methods: [],
            propagateErrors: true,
            $auditRecord: auditEvents
        };
        for (const query of queries) {
            data.methods.push({
                method: this.endPoint,
                app: this.appName,
                query
            });
        }
        return this.httpClient.post<IMulti<T>>(this.makeUrl("multi"), data);
    }

}
