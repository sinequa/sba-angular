import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Record} from "./query.web.service";
import {AuditEventType} from "./audit.web.service";

/**
 * Describes a rating configuration object
 */
export interface CCRating {
    ratingsColumn: string;
    averageColumn: string;

    updateDocWeight: boolean;

    ratingsDistribution: string[];
}

/**
 * Describes a user rating response object
 */
export interface UserRatingResponse {
    rating: number;
    averagerating: number;
}

/**
 * A service for calling the ratings web service
 */
@Injectable({
    providedIn: "root"
})
export class UserRatingsWebService extends HttpService {
    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    /**
     * Gets the current user rating for a document
     *
     * @param docid The id of a document for which to get the rating
     * @param config The ratings configuration
     */
    getRating(docid: string, config: CCRating): Observable<UserRatingResponse> {
        return this.httpClient.post<UserRatingResponse>(this.makeUrl("ratings"), {
            action: "get",
            docid,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution
        }).pipe(tap(
            r => {},
            error => console.log("ratingsService.getRating failure - error: ", error)
        ));
    }

    /**
     * Sets the current user rating for a document
     *
     * @param record The document for which to set the rating
     * @param rating A rating value
     * @param config The ratings configuration
     */
    setRating(record: Record, rating: number, config: CCRating): Observable<UserRatingResponse> {
        const ratingResponse = this.getRecordRating(record, config);
        const observable = this.httpClient.post<UserRatingResponse>(this.makeUrl("ratings"), {
            action: "set",
            docid: record.id,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution,
            updatedocweight: config.updateDocWeight,
            rating,
            $auditRecord: {
                auditEvents: [
                    {
                        type: AuditEventType.Rating_Set,
                        detail: {
                            "doc-id": record.id,
                            ratingnum: rating,
                            value: ratingResponse.rating,
                            average: ratingResponse.averagerating
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "addRating",
                        documentIds: record.id
                    }
                ]
            }
        });

        observable.subscribe(
            response => response,
            error => console.log("ratingsService.setRating failure - error: ", error)
        );

        return observable;
    }

    /**
     * Delete a rating for a document
     *
     * @param record The document for which to delete the rating
     * @param config The ratings configuration
     */
    deleteRating(record: Record, config: CCRating): Observable<UserRatingResponse> {
        const ratingResponse = this.getRecordRating(record, config);
        const observable = this.httpClient.post<UserRatingResponse>(this.makeUrl("ratings"), {
            action: "delete",
            docid: record.id,
            ratingscolumn: config.ratingsColumn,
            averagecolumn: config.averageColumn,
            ratingsdistribution: config.ratingsDistribution,
            updatedocweight: config.updateDocWeight,
            $auditRecord: {
                auditEvents: [
                    {
                        type: AuditEventType.Rating_Delete,
                        detail: {
                            "doc-id": record.id,
                            value: ratingResponse.rating,
                            average: ratingResponse.averagerating
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "removeRating",
                        documentIds: record.id
                    }
                ]
            }
        });

        observable.subscribe(
            response => response,
            error => console.log("ratingsService.deleteRating failure - error: ", error)
        );

        return observable;
    }

    /**
     * Gets user rating information from the given record
     *
     * @param record The record for which to get the rating
     * @param config The ratings configuration
     */
    getRecordRating(record: Record, config: CCRating): UserRatingResponse {
        return {
            rating: this.parseUserRating(record[config.ratingsColumn], config),
            averagerating: this.parseAverageRating(record[config.averageColumn], config)
        };
    }

    private parseAverageRating(columnEntries: string[], config: CCRating): number {
        if (config.ratingsDistribution && columnEntries) {
            return config.ratingsDistribution.indexOf(columnEntries[0]);
        }
        else {
            return -1;
        }
    }

    private parseUserRating(ratingValues: string[], config: CCRating): number {
        if(ratingValues) {
            if (config.ratingsDistribution) {
                return config.ratingsDistribution.indexOf(ratingValues[0]);
            }
        }
        return -1;
    }
}
