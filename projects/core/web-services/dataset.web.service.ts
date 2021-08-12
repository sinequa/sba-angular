import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { Results } from "./query.web.service";
import { StartConfig, START_CONFIG } from "./start-config.web.service";

export type Dataset = {[key: string]: Results|DatasetError};

export interface DatasetError {
    errorCode: number;
    errorMessage: string;
}

export interface DatasetDescription {
    name: string;
    description?: string;
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
        @Inject(START_CONFIG) startConfig: StartConfig,
        protected httpClient: SqHttpClient) {
        super(startConfig);
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
    get(webServiceName: string, query: string, parameters = {}): Observable<Results|DatasetError> {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}/${query}`;
        return this.httpClient.post<{datasets: Dataset}>(url, {parameters})
            .pipe(map(d => d.datasets[query]));
    }

    /**
     * Queries a specific datasets of the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     * @param datasets precise list of queries, defined in the web service, to be executed
     */
    getBulk(webServiceName: string, parameters = {}, datasets: string[]): Observable<Dataset> {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post<{datasets: Dataset}>(url, {parameters, datasets})
            .pipe(map(d => d.datasets));
    }

    /**
     * Queries the given web service.
     * @param webServiceName name of the web service
     * @param params parameters of the queries
     */
    getAll(webServiceName: string, parameters = {}): Observable<Dataset> {
        let url = `${this.makeUrl(DatasetWebService.endpoint)}/${webServiceName}`;
        return this.httpClient.post<{datasets: Dataset}>(url, {parameters})
            .pipe(map(d => d.datasets));
    }

}
