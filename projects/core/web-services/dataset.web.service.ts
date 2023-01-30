import { Injectable } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { AppService } from "../app-utils";
import { HttpService } from "./http.service";
import { Record, Results } from "./query.web.service";

export type Dataset = {[key: string]: Results|DatasetError};

export interface DatasetError {
    errorCode: number;
    errorMessage: string;
}

export interface DatasetDescription {
    name: string;
    description?: string;
}

export function isResults(res: Results|DatasetError): res is Results {
    return !(res as DatasetError).errorMessage;
}

/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
@Injectable({
    providedIn: "root"
})
export class DatasetWebService extends HttpService {
    private static readonly endpoint = "search.dataset";

    constructor(
      public appService: AppService
    ) {
      super();
    }

    /**
     * Return the list of queries configured in the given
     * dataset web service.
     * @param webServiceName name of the web service
     */
    list(webServiceName: string): Observable<DatasetDescription[]> {
        return this.httpClient.get<DatasetDescription[]>(
            `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`
        );
    }

    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param query name of the query
     * @param params parameters of the queries
     */
    get(webServiceName: string, query: string, parameters = {}, resolveAliases = true): Observable<Results> {
        const url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}/${query}`;
        return this.httpClient.post<{datasets: Dataset}>(url, {parameters}).pipe(
            map(d => {
                const res = d.datasets[query];
                if(isResults(res)) {
                    if(resolveAliases) {
                        this.resolveAliases(res);
                    }
                    return res;
                }
                throw new Error(res.errorMessage);
            })
        );
    }

    /**
     * Queries a specific datasets of the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     * @param datasets precise list of queries, defined in the web service, to be executed
     */
    getBulk(webServiceName: string, parameters = {}, datasets?: string[], resolveAliases = true): Observable<Dataset> {
        const url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post<{datasets: Dataset}>(url, {parameters, datasets}).pipe(
            map(d => d.datasets),
            tap(d => {
                if(resolveAliases) {
                    for(let result of Object.values(d)) {
                        if(isResults(result)) {
                            this.resolveAliases(result);
                        }
                    }
                }
            })
        );
    }

    protected resolveAliases(res: Results) {
        // Resolve aggregation column names
        for(let agg of res.aggregations) {
            agg.column = this.appService.resolveColumnAlias(agg.column);
        }

        // Resolve record property names
        res.records = res.records.map(record => {
            const entries = Object.entries(record);
            for(let entry of entries) {
                entry[0] = this.appService.resolveColumnAlias(entry[0]);
            }
            return Object.fromEntries(entries) as Record;
        });
    }

}
