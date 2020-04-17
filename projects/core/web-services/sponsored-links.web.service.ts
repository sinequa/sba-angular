import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { SqHttpClient } from "./http-client";
import { HttpService } from './http.service';
import { IntlService } from "@sinequa/core/intl";
import {Utils} from "@sinequa/core/base";

import { START_CONFIG, StartConfig } from "./start-config.web.service";
import { IQuery } from './query/query';

/**
 * Describes a single sponsored link
 */
export interface LinkResult {
    id: string;
    title: string;
    url: string;
    icon: string;
    thumbnail: string;
    tooltip: string;
    summary: string;
    rank: number;
    relevance: number;
}

/**
 * Describes a set of sponsored links
 */
export interface LinksResults {
    sql: string[];
    links: LinkResult[];
}

/**
 * A service for calling the query.links web service.
 */
@Injectable({
    providedIn: "root"
})
export class SponsoredLinksWebService extends HttpService {

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient,
        private intlService: IntlService) {
        super(startConfig);
    }

    /**
     * Queries the server for sponsored links.
     *
     * @param query The query information.
     * @param webService The web service configuration.
     */
    getLinks(query: IQuery, webService: string): Observable<LinksResults> {
        if (!query) {
            return throwError({ error: "no query" });
        }

        const url = this.makeUrl("query.links");
        const observable = this.httpClient.post<LinksResults>(url, {
            app: this.appName,
            webservice: webService,
            query,
            locale: this.intlService.currentLocale.name
        });

        Utils.subscribe(observable,
            (response) => {
                console.log("SponsoredLinksService.getLinks success - data: ", response);
                return response;
            },
            (error) => {
                console.log("SponsoredLinksService.getLinks failure - error: ", error);
            });
        return observable;
    }
}
