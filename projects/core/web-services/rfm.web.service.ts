import { EMPTY, Observable } from "rxjs";

import { Injectable } from "@angular/core";

import { Utils } from "@sinequa/core/base";

import { HttpService } from "./http.service";
import { API_ENDPOINTS, RFMData, Results } from "./types";

/**
 * A service for calling the search.rfm web service
 */
@Injectable({
    providedIn: "root"
})
export class RfmWebService extends HttpService {
    private static readonly endpoint: API_ENDPOINTS = "search.rfm";

    /**
     * Get RFM data for a set of results
     *
     * @param rfm The name of the RFM
     * @param results The results for which to retrieve RFM data
     */
    getRfmData(rfm: string, results: Results): Observable<Record<string, RFMData>> {
        const ids: string[] = [];
        for (const record of results.records) {
            if (!!record.flags && record.flags.indexOf("r") !== -1) {
                ids.push(record.id);
            }
        }
        if (ids.length === 0) {
            return EMPTY;
        }
        const data = {
            rfm,
            queryHash: results.rfmQueryHash,
            ids
        };
        const observable = this.httpClient.post<Record<string, RFMData>>(this.makeUrl(RfmWebService.endpoint), data);
        Utils.subscribe(observable,
            (response) => response,
            (error) => {
                console.log("rfmService.getRfmData failure - error: ", error);
            });
        return observable;
    }
}
