import {Injectable, Inject} from "@angular/core";
import {HttpRequest} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PrincipalWebService, SqHttpClient, HttpService, START_CONFIG, StartConfig, AuditEvents, AuditRecord} from "@sinequa/core/web-services";
import {LoginService} from "@sinequa/core/login";
import {IntlService} from "@sinequa/core/intl";
import {AppService} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";

@Injectable({
    providedIn: "root"
})
export class MlAuditService extends HttpService {
    private static readonly Endpoint = "ml.audit.notify";
    session: MlAuditService.Session | undefined;
    query: MlAuditService.Query | undefined;
    results: MlAuditService.Results | undefined;

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        protected appService: AppService,
        protected loginService: LoginService,
        protected principalService: PrincipalWebService,
        protected intlService: IntlService,
        protected httpClient: SqHttpClient,
        protected searchService: SearchService) {
        super(startConfig);
    }

    newTimestamp(): string {
        return (new Date()).toISOString();
    }

    calcDwellTime(event: MlAuditService.Event, defaultValue?: number): number | undefined {
        if (!event.timestamp) {
            return defaultValue;
        }
        return Date.now() - (new Date(event.timestamp)).getTime();
    }

    startSession(): void {
        this.endSession();
        if (this.principalService.principal) {
            this.session = {
                type: "session",
                subType: "start",
                id: Utils.guid(false),
                timestamp: this.newTimestamp(),
                userId: this.principalService.principal.userId,
                isAdmin: this.principalService.principal.isAdministrator,
                locale: this.intlService.currentLocale.name
            };
        }
    }

    endSession(): void {
        this.endQuery();
        if (this.session && this.session.sent) {
            this.notifyEvent({
                type: "session",
                subType: "end",
                id: this.session.id,
                dwellTime: this.calcDwellTime(this.session)
            });
        }
        this.session = undefined;
        this.query = undefined;
        this.results = undefined;
    }

    newQuery(event: SearchService.NewQueryEvent): void {
        this.endQuery();
        if (event.query) {
            this.query = {
                type: "query",
                subType: "start",
                id: Utils.guid(false),
                sessionId: this.session ? this.session.id : undefined,
                indexes: this.appService.ccquery ? this.appService.ccquery.searchIndexes : undefined,
                timestamp: this.newTimestamp()
            };
        }
    }

    endQuery(): void {
        this.endResults();
        if (this.query && this.query.sent) {
            this.notifyEvent({
                type: "query",
                subType: "end",
                id: this.query.id,
                sessionId: this.session ? this.session.id : undefined,
                dwellTime: this.calcDwellTime(this.query)
            });
        }
        this.query = undefined;
        this.results = undefined;
    }

    newResults(): void {
        this.endResults();
        if (this.searchService.results && this.searchService.results.records) {
            this.results = {
                type: "results",
                subType: "start",
                id: Utils.guid(false),
                queryId: this.query ? this.query.id : undefined,
                sessionId: (!this.query && this.session) ? this.session.id : undefined,
                timestamp: this.newTimestamp(),
                queryText: this.searchService.query.text,
                queryHash: this.searchService.query.hash(),
                page: this.searchService.results.page,
                documentIds: this.searchService.results.records.map<string>(record => record.id),
            };
        }
    }

    endResults(): void {
        if (this.results && this.results.sent) {
            this.notifyEvent({
                type: "results",
                subType: "end",
                id: this.results.id,
                queryId: this.query ? this.query.id : undefined,
                sessionId: (!this.query && this.session) ? this.session.id : undefined,
                dwellTime: this.calcDwellTime(this.results)
            });
        }
        this.results = undefined;
    }

    private flushContext() {
        const events: MlAuditService.Event[] = [];
        if (this.session && !this.session.sent) {
            events.push(this.session);
        }
        if (this.query && !this.query.sent) {
            events.push(this.query);
        }
        if (this.results && !this.results.sent) {
            events.push(this.results);
        }
        if (events.length !== 0) {
            this.notifyEvent(events);
            events.forEach(event => event.sent = true);
        }
    }

    newAction(actionOrActionType: MlAuditService.ActionType | MlAuditService.ActionInitializer, documentIds?: string | string[]): MlAuditService.Action {
        this.flushContext();
        const action: MlAuditService.Action = {
            type: "action",
            subType: undefined,
            actionType: "click",
            id: Utils.guid(false),
            resultsId: this.results ? this.results.id : undefined,
            queryId: (!this.results && this.query) ? this.query.id : undefined,
            sessionId: (!this.results && !this.query && this.session) ? this.session.id : undefined,
            documentIds: []
        };
        delete action.actionType;
        delete action.documentIds;
        if (Utils.isObject(actionOrActionType)) {
            Utils.merge(action, actionOrActionType);
        }
        else {
            action.actionType = actionOrActionType;
            if (documentIds) {
                action.documentIds = documentIds;
            }
        }
        return action;
    }

    endAction(action: MlAuditService.Action) {
        if (action) {
            this.notifyEvent({
                type: "action",
                subType: "end",
                id: action.id,
                resultsId: this.results ? this.results.id : undefined,
                queryId: (!this.results && this.query) ? this.query.id : undefined,
                sessionId: (!this.results && !this.query && this.session) ? this.session.id : undefined,
                dwellTime: this.calcDwellTime(action)
            });
        }
    }

    init() {
        Utils.subscribe(this.loginService.events, (event) => {
            switch (event.type) {
                case "session-start":
                    this.startSession();
                    break;
                case "session-end":
                    this.endSession();
                    break;
            }
        });
        Utils.subscribe(this.searchService.events, (event) => {
            switch (event.type) {
                case "new-query":
                    this.newQuery(event);
                    break;
                case "new-results":
                    this.newResults();
                    break;
            }
        });
    }

    notifyEvent(events: MlAuditService.Event | MlAuditService.Event[]): Observable<void> {
        if (!this.startConfig.mlAuditEnabled) {
            return of(undefined);
        }
        const observable = this.httpClient.post<void>(this.makeUrl(MlAuditService.Endpoint), {
            events: events
        });
        Utils.subscribe(observable,
            (response) => {
                return response;
            },
            (error) => {
                console.log("MlAuditService.notify failure - error: ", error);
            });
        return observable;
    }

    notify(actions: MlAuditService.ActionInitializer | MlAuditService.ActionInitializer[] | MlAuditService.ActionType, documentIds?: string | string[]): Observable<void> {
        if (Utils.isString(actions)) {
            return this.notifyEvent(this.newAction(actions, documentIds));
        }
        else if (Utils.isArray(actions)) {
            return this.notifyEvent(actions.map(actionInit => this.newAction(actionInit)));
        }
        else {
            return this.notifyEvent(this.newAction(actions));
        }
    }

    private ensureAuditRecord(auditEvents: AuditEvents): AuditRecord {
        if (Utils.isObject(auditEvents)) {
            const auditRecord = <AuditRecord>auditEvents;
            if (auditRecord.auditEvents || auditRecord.mlAuditEvents) {
                if (auditRecord.mlAuditEvents) {
                    return {
                        auditEvents: auditRecord.auditEvents,
                        mlAuditEvents: auditRecord.mlAuditEvents.map(actionInit => this.newAction(actionInit))
                    };
                }
            }
        }
        return <AuditRecord>auditEvents; // leave unchanged
    }

    requestInitializer = (request: HttpRequest<any>): boolean => {
        request.body.$auditRecord = this.ensureAuditRecord(request.body.$auditRecord);
        return true;
    }
}

export module MlAuditService {
    export type EventType = "session" | "query" | "results" | "action";
    export type EventSubType = "start" | "end";
    export type ActionType = "click" | "preview" | "over" |
        "addToBasket" | "removeFromBasket" |
        "addToLabel" | "removeFromLabel" |
        "addRating" | "removeRating";

    export interface Event {
        type: EventType;
        subType?: EventSubType;
        id?: string;
        timestamp?: string;
        dwellTime?: number;
        sent?: boolean;
        [key: string]: any; // Allow arbitrary additions
    }

    export interface Session extends Event {
        userId: string;
        locale: string;
    }

    export interface Query extends Event {
        sessionId?: string;
        indexes?: string;
        typingHistory?: any;
        proposedExpansions?: any;
        selectedExpansions?: any;
    }

    export interface Results extends Event {
        queryId?: string;
        sessionId?: string;
        queryText?: string;
        queryHash?: string;
        documentIds?: string[];
        page?: number;
    }

    export interface Action extends Event {
        resultsId?: string;
        queryId?: string;
        sessionId?: string;
        actionType?: ActionType;
        documentIds?: string | string[];
    }

    export interface ActionInitializer {
        actionType: ActionType;
        documentIds: string | string[];
        [key: string]: any; // Allow arbitrary additions
    }
}
