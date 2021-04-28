import {Injectable, Inject} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {IQuery} from "./query/query";
import {Record} from "./query.web.service";
import {AuditEvents} from "./audit.web.service";
import {catchError, distinctUntilChanged, shareReplay} from "rxjs/operators";

/**
 * Describes highlight data for a set of categories
 */
export interface HighlightDataPerCategory {
    [key: string] : CategoryHighlightData;
}

/**
 * Describes highlight data for a category
 */
export interface CategoryHighlightData {
    categoryDisplayLabel: string;
    categoryDisplayLabelPlural: string;
    categoryFilterAllLabel: string;
    categoryFilterNoneLabel: string;
    values: HighlightValue[];
}

/**
 * Describes a highlight value
 */
export interface HighlightValue {
    value: string;
    displayValue: string;
    locations: Location[];
}

/**
 * Describes a single highlight location
 */
export interface Location {
    start: number;
    enclosingLength: number;
}

/**
 * Describes highlight data for a set of locations
 */
export interface HighlightDataPerLocation {
    [index: number]: {
        start: number,
        length: number,
        values: string[],
        displayValue: string,
        positionInCategories: { [category: string]: number }
    };

    size(): number;
}

/**
 * Describes the data returned by [PreviewWebService.get]{@link PreviewWebService#get}
 */
export interface PreviewData {
    record: Record;
    resultId: string;
    cacheId: string;
    highlightsPerCategory: HighlightDataPerCategory;
    highlightsPerLocation: HighlightDataPerLocation;
    documentCachedContentUrl: string;
}

/**
 * A service for calling the preview web service
 */
@Injectable({
    providedIn: "root"
})
export class PreviewWebService extends HttpService {

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    /**
     * Gets {@link PreviewData} for a document in the context of a {@link IQuery}
     *
     * @param id The document id
     * @param query The query context
     * @param auditEvents Audit events to store on the server
     */
    public get(id: string, query: IQuery, auditEvents?: AuditEvents): Observable<PreviewData> {
        return this.httpClient.post<PreviewData>(this.makeUrl("preview"), {
            app: this.appName,
            action: "get",
            id,
            query,
            browserUrl: this.startConfig.browserUrl,
            $auditRecord: auditEvents
        }).pipe(shareReplay(1));
    }
    
    /**
     * Gets document's preview HTML content
     * 
     * @param url The document preview URL
     * @returns 
     */
    public getHtmlPreview(url: string): Observable<any> {
        return this.httpClient.get(url, {responseType: "text"}).pipe(
            catchError(err => throwError(err)),
            distinctUntilChanged(),
            shareReplay(1)
        );                
    }
}
