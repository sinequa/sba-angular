import {Injectable, Optional, OnDestroy, Inject, InjectionToken} from "@angular/core";
import {Subject} from "rxjs";
import {UserSettingsWebService, AuditEvents} from "@sinequa/core/web-services";
import {Query} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {SearchService} from "@sinequa/components/search";


export interface RecentQuery {
    query: Query;
    date: Date;
}


// from core/models/audit
export const enum RecentQueryEventType {
    Loaded = "RecentQuery_Loaded",
    Patched = "RecentQuery_Patched",
    Add = "RecentQuery_Add",
    Update = "RecentQuery_Update",
    Delete = "RecentQuery_Delete",
    Search = "Search_RecentQuery"
}

// Types of events triggering a change event
export const RECENT_QUERIES_CHANGE_EVENTS = [
    RecentQueryEventType.Add,
    RecentQueryEventType.Update,
    RecentQueryEventType.Delete,
];


// CRUD Events
export interface RecentQueryChangeEvent {
    type: RecentQueryEventType;
    recentquery?: RecentQuery;
}

export const MAX_QUERIES = new InjectionToken("MAX_QUERIES");

@Injectable({
    providedIn: 'root',
})
export class RecentQueriesService implements OnDestroy {

    private readonly _events = new Subject<RecentQueryChangeEvent>();
    private readonly _changes = new Subject<RecentQueryChangeEvent>();

    constructor(
        public userSettingsService: UserSettingsWebService,
        public searchService: SearchService,
        @Optional() @Inject(MAX_QUERIES) private maxQueries: number,
    ){
        if(!this.maxQueries){
            this.maxQueries = 20;
        }

        // Listen to the user settings
        this.userSettingsService.events.subscribe(event => {
            // E.g. new login occurs
            // ==> Revive dates
            this.recentqueries.forEach(rq => {
                if (Utils.isString(rq.date)) {
                    const date = Utils.toDate(rq.date);
                    if (date) {
                        rq.date = date;
                    }
                }
            });
            // ==> Menus need to be rebuilt
            this.events.next({type: RecentQueryEventType.Loaded});
        });
        // Listen to own events, to trigger change events
        this._events.subscribe(event => {
            if(RECENT_QUERIES_CHANGE_EVENTS.indexOf(event.type) !== -1){
                this.changes.next(event);
            }
        });
        // Listen to search service and store queries
        this.searchService.queryStream.subscribe((query) => {
                if (query) {
                    this.addRecentQuery({query: query.copy(), date: new Date()});
                }
            });
    }


    // GETTERS

    /**
     * Returns the list of this user's recent queries.
     * The list is stored in the user settings (this is a redirection).
     * Using this service creates the list of recent queries if it does not already exist.
     */
    public get recentqueries() : RecentQuery[]{
        if(!this.userSettingsService.userSettings)
            this.userSettingsService.userSettings = {};
        if(!this.userSettingsService.userSettings["recentQueries"])
            this.userSettingsService.userSettings["recentQueries"] = [];
        return this.userSettingsService.userSettings["recentQueries"];
    }

    /**
     * Triggers any event among RecentQueryChangeEvent
     * (use for fine-grained control of recent queries workflow)
     */
    public get events() : Subject<RecentQueryChangeEvent> {
        return this._events;
    }

    /**
     * Triggers when events affect the list of recent queries
     * (use to refresh recent queries menus)
     * Cf. CHANGE_EVENTS list
     */
    public get changes() : Subject<RecentQueryChangeEvent> {
        return this._changes;
    }

    /**
     * @returns true if there is at least one recent query
     */
    public get hasRecentQuery(): boolean {
        return this.recentqueries.length > 0;
    }

    /**
     * @returns a recent query with the given name or undefined if it does not exist
     * @param name
     */
    public recentquery(text: string): RecentQuery | undefined {
        const i = this.recentqueryIndex(text);
        return i>= 0? this.recentqueries[i] : undefined;
    }

    private recentqueryIndex(text: string): number {
        for (let i = 0, ic = this.recentqueries.length; i < ic; i++) {
            const recentquery = this.recentqueries[i];
            if (recentquery && recentquery.query.text && recentquery.query.text.toLowerCase() === text.toLowerCase()) {
                return i;
            }
        }
        return -1;
    }

    private comparator(q1: RecentQuery, q2: RecentQuery){
        return q2.date.getTime() - q1.date.getTime();
    }


    // CRUD

    /**
     * Creates a new recent query unless it already exists, in which case the existing query is updated.
     * Emits an recentquery event.
     * Update the data on the server.
     * @param recentquery the recentquery to create
     * @returns true if recentquery was created
     */
    public addRecentQuery(recentquery: RecentQuery) : boolean {

        if(!recentquery.query || !recentquery.query.text || recentquery.query.text.trim() === ''){
            return false;
        }

        const i = this.recentqueryIndex(recentquery.query.text); // If the query already exists
        if(i >= 0){
            // Ignore identical queries issued within a certain time window (1s)
            // to avoid flooding the server. NB the request flooding mitigation in
            // SqHttpClient will not work in this case as the request payload includes
            // a timestamp
            if (Math.abs(recentquery.date.getTime() - this.recentqueries[i].date.getTime()) < 1000) {
                if (Utils.equals(this.recentqueries[i].query, recentquery.query)) {
                    return false;
                }
            }
            this.recentqueries[i].date = recentquery.date; // Update the date of the existing query
            this.recentqueries[i].query = recentquery.query;
            this.events.next({type : RecentQueryEventType.Update, recentquery: this.recentqueries[i]});
        }
        else {
            this.recentqueries.push(recentquery);
            this.events.next({type : RecentQueryEventType.Add, recentquery: recentquery});
        }

        // Sort the list
        this.recentqueries.sort(this.comparator);

        // Truncate the list
        if(this.maxQueries >=0 )
            this.recentqueries.splice(this.maxQueries);

        this.patchRecentQueries([{
            type: RecentQueryEventType.Add,
            detail: {
                recentquery: recentquery.query.text
            }
        }]);
        return true;
    }

    /**
     * Deletes the given RecentQuery (based on its name)
     * Emits an RecentQuery event.
     * Update the data on the server.
     * @param recentquery
     * @returns true if recent query was deleted
     */
    public deleteRecentQuery(recentquery: RecentQuery) : boolean {

        const index = this.recentqueryIndex(recentquery.query.text || "");

        if(index === -1)
            return false; // Nothing to delete

        this.recentqueries.splice(index, 1);
        this.events.next({type : RecentQueryEventType.Delete, recentquery: recentquery});
        this.patchRecentQueries([
            {
                type: RecentQueryEventType.Delete,
                detail: {
                    recentquery: recentquery.query.text
                }
            }
        ]);
        return true;
    }

    /**
     * Updates Recent Queries in User settings.
     * @param auditEvents : Audit Events to be triggered
     * @returns an Observable which can be used to trigger further events
     */
    private patchRecentQueries(auditEvents?: AuditEvents) {
        return this.userSettingsService.patch({recentQueries: this.recentqueries}, auditEvents)
            .subscribe(
                next => {
                    this.events.next({type: RecentQueryEventType.Patched});
                },
                error => {
                    console.error("Could not patch Recent queries!", error);
                }
            );
    }


    // EVENT HANDLERS (Menus)

    /**
     * Uses the SearchService to perform a search returning all
     * the documents matching this recent query.
     * @param recentquery
     * @returns the search service promise
     */
    searchRecentQuery(recentquery: RecentQuery, path?: string): Promise<boolean> {
        this.searchService.setQuery(Utils.extend(this.searchService.makeQuery(), Utils.copy(recentquery.query)));
        this.events.next({type: RecentQueryEventType.Search, recentquery: recentquery});
        return this.searchService.search({ path: path }, {
            type: RecentQueryEventType.Search,
            detail: {
                recentquery: recentquery.query.text
            }
        });
    }

    ngOnDestroy() {
        this.events.complete();
        this.changes.complete();
    }
}
