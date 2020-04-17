import {Injectable, Inject} from "@angular/core";
import {Observable, EMPTY} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils, MapOf} from "@sinequa/core/base";
import {Results, RFMData} from "./query.web.service";

/**
 * A service for calling the search.rfm web service
 */
@Injectable({
    providedIn: "root"
})
export class RfmWebService extends HttpService {
    private static readonly endpoint = "search.rfm";

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    /**
     * Get RFM data for a set of results
     *
     * @param rfm The name of the RFM
     * @param results The results for which to retrieve RFM data
     */
    getRfmData(rfm: string, results: Results): Observable<MapOf<RFMData>> {
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
        const observable = this.httpClient.post<MapOf<RFMData>>(this.makeUrl(RfmWebService.endpoint), data);
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("rfmService.getRfmData failure - error: ", error);
            });
        return observable;
    }
}
