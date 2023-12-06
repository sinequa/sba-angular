import { Observable, map } from "rxjs";

import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { Results } from "./types";

export type Dataset<T extends Results = Results> = {[key: string]: T|DatasetError};

export interface DatasetError {
    errorCode: number;
    errorMessage: string;
}

export interface DatasetDescription {
    name: string;
    description?: string;
}

export function isDatasetError<T extends Results = Results>(res: T|DatasetError): res is DatasetError {
    return !!(res as DatasetError).errorMessage;
}

/**
 * A service to notify the audit manager on the Sinequa server of client-side events
 */
@Injectable({
    providedIn: "root"
})
export class DatasetWebService<T extends Results = Results> extends HttpService {
    private static readonly endpoint = "search.dataset";

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
    get(webServiceName: string, query: string, parameters = {}): Observable<T> {
        const url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}/${query}`;
        return this.httpClient.post<{datasets: Dataset<T>}>(url, {parameters}).pipe(
            map(d => {
                const res = d.datasets[query];
                if(isDatasetError<T>(res)) {
                    throw new Error(res.errorMessage);
                }
                return res;
            })
        );
    }

    /**
     * Queries a specific datasets of the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     * @param datasets precise list of queries, defined in the web service, to be executed
     */
    getBulk(webServiceName: string, parameters = {}, datasets?: string[]): Observable<Dataset<T>> {
        const url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post<{datasets: Dataset<T>}>(url, {parameters, datasets}).pipe(
            map(d => d.datasets)
        );
    }

}
