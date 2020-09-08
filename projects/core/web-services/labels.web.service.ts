import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
import {IQuery} from "./query/query";
import {AuditEventType} from "./audit.web.service";

/**
 * Describes the object returned by the list action of the labels web service
 */
export interface Labels {
    labels: string[];
}

/**
 * Describes the object returned by the getUserRights action of the labels web service
 */
export interface LabelsRights {
    canManagePublicLabels: boolean;
    canEditPublicLabels: boolean;
}

/**
 * A service for calling the labels web service
 */
@Injectable({
    providedIn: "root"
})
export class LabelsWebService extends HttpService {

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient,
        private intlService: IntlService) {
        super(startConfig);
    }

    /**
     * Calls the list action of the labels web service
     *
     * @param prefix The string that the returned labels should begin with
     * @param _public Determines whether public or private labels should be returned
     */
    list(
        prefix: string,
        _public: boolean): Observable<Labels> {
        const observable = this.httpClient.get<Labels>(this.makeUrl("labels"), {
            params: this.makeParams({
                app: this.appName,
                action: "list",
                q: prefix,
                public: _public,
                locale: this.intlService.currentLocale.name,
                localize: false
            })
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.list failure - error: ", error);
            });
        return observable;
    }

    /**
     * A wrapper around the list method. The matching labels are returned as an array of strings
     *
     * @param prefix The string that the returned labels should begin with
     * @param _public Determines whether public or private labels should be returned
     */
    array(
        prefix: string,
        _public: boolean): Observable<string[]> {
        return this.list(prefix, _public)
            .pipe(map((value) => {
                return value.labels;
            }));
    }

    /**
     * Calls the getUserRights action of the labels web service
     */

    getUserRights(): Observable<LabelsRights> {
        const observable = this.httpClient.get<LabelsRights>(
            this.makeUrl('labels'),
            {
                params: this.makeParams({
                    app: this.appName,
                    action: 'getUserRights'
                })
            }
        );
        Utils.subscribe(
            observable,
            response => response,
            error => console.log("labelsService.getUserRights failure - error: ", error)
        );
        return observable;
    }

    /**
     * Add labels to a set of documents
     *
     * @param labels The labels to add
     * @param ids The ids of the documents to which the labels should be added
     * @param _public Determines whether the labels are public or private
     */
    add(labels: string[],
        ids: string[],
        _public: boolean): Observable<void> {
        const observable = this.httpClient.post<void>(this.makeUrl("labels"), {
            app: this.appName,
            action: "add",
            labels: labels,
            ids: ids,
            public: _public,
            $auditRecord: {
                auditEvents: [
                    {
                        type: AuditEventType.Label_AddDoc,
                        detail: {
                            public: _public,
                            label: !!labels ? labels.toString() : null,
                            doccount: !!ids ? ids.length : 0
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "addToLabel",
                        documentIds: ids
                    }
                ]
            }
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.add failure - error: ", error);
            });
        return observable;
    }

    /**
     * Removes labels from a set of documents
     *
     * @param labels The labels to remove
     * @param ids The ids of the documents from which the labels should be removed
     * @param _public Determines whether the labels are public or private
     */
    remove(labels: string[],
        ids: string[],
        _public: boolean): Observable<void> {
        const observable = this.httpClient.post<void>(this.makeUrl("labels"), {
            app: this.appName,
            action: "remove",
            labels: labels,
            ids: ids,
            public: _public,
            $auditRecord: {
                auditEvents: [
                    {
                        type: AuditEventType.Label_RemoveDoc,
                        detail: {
                            public: _public,
                            label: !!labels ? labels.toString() : null,
                            doccount: !!ids ? ids.length : 0
                        }
                    }
                ],
                mlAuditEvents: [
                    {
                        actionType: "removeFromLabel",
                        documentIds: ids
                    }
                ]
            }
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.remove failure - error: ", error);
            });
        return observable;
    }

    /**
     * Renames a set of labels
     *
     * @param labels The labels to rename
     * @param newLabel The new name for the labels
     * @param _public Determines whether the labels are public or private
     */
    rename(labels: string[],
        newLabel: string,
        _public: boolean): Observable<void> {
        const observable = this.httpClient.post<void>(this.makeUrl("labels"), {
            app: this.appName,
            action: "rename",
            labels: labels,
            newLabel: newLabel,
            public: _public,
            auditEvents: {
                type: AuditEventType.Label_Rename,
                detail: {
                    public: _public,
                    oldlabel: !!labels ? labels.toString() : null,
                    label: newLabel
                }
            }
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.rename failure - error: ", error);
            });
        return observable;
    }

    /**
     * Deletes a set of labels
     *
     * @param labels The labels to be deleted
     * @param _public Determines whether the labels are public or private
     */
    delete(labels: string[],
        _public: boolean): Observable<void> {
        const observable = this.httpClient.post<void>(this.makeUrl("labels"), {
            app: this.appName,
            action: "delete",
            labels: labels,
            public: _public,
            auditEvents: {
                type: AuditEventType.Label_Delete,
                detail: {
                    public: _public,
                    label: !!labels ? labels.toString() : null
                }
            }
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.delete failure - error: ", error);
            });
        return observable;
    }

    /**
     * Adds labels to the documents identified by the passed query
     *
     * @param labels The labels to add
     * @param query The query to produce the documents to which the labels should be added
     * @param _public Determines whether the labels are public or private
     */
    bulkAdd(labels: string[],
        query: IQuery,
        _public: boolean): Observable<void> {
        const observable = this.httpClient.post<void>(this.makeUrl("labels"), {
            app: this.appName,
            action: "bulkAdd",
            labels: labels,
            query: query,
            public: _public,
            auditEvents: {
                type: AuditEventType.Label_Add,
                detail: {
                    public: _public,
                    label: !!labels ? labels.toString() : null,
                    query: query != null ? query.name : null
                }
            }
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.bulkAdd failure - error: ", error);
            });
        return observable;
    }

    /**
     * Removes labels from the documents identified by the passed query
     *
     * @param labels The labels to remove
     * @param query The query to produce the documents from which the labels should be removed
     * @param _public Determines whether the labels are public or private
     */
    bulkRemove(labels: string[],
        query: IQuery,
        _public: boolean): Observable<void> {
        const observable = this.httpClient.post<void>(this.makeUrl("labels"), {
            app: this.appName,
            action: "bulkRemove",
            labels: labels,
            query: query,
            public: _public,
            auditEvents: {
                type: AuditEventType.Label_Delete,
                detail: {
                    public: _public,
                    label: !!labels ? labels.toString() : null,
                    query: query != null ? query.name : null
                }
            }
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("labelsService.bulkRemove failure - error: ", error);
            });
        return observable;
    }
}
