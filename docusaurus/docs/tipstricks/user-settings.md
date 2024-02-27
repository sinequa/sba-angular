---
layout: default
title: User settings
parent: Tips and Tricks
sidebar_position: 6
---

# User Settings

User Settings were already introduced in the [Tutorial](/tutorial/user-settings.md) and documented in the list of [Modules](/libraries/components/user-settings.md).

## Developing your own User-Settings service

The [Tutorial](/tutorial/user-settings.md#developing-your-own-user-settings-service) already introduces the main characteristics of a User-Settings service. In this section, we will go through the code of the Recent Queries service (`RecentQueriesService`) step by step, to explain the role of each part (other services follow a very similar structure).

### Data structure

The data structure is the type of object you want to store in the user-settings, on the server-side. In the case of the Recent Queries, it is the query object (which contains the searched text and filters), and the date at which this query was made.

```ts
export interface RecentQuery {
    query: Query;
    date: Date;
}
```

### Events and Event types

Your service should not be a black box. It should enable a Sinequa administrator to monitor its activity with **Audit event** and enable other SBA services to use its features and be notified of its **state changes**.

The following code includes:

- Event types: The list of all events possibly occurring in the service. These will be used for both the audit and the internal events.
- Change event types: This is a sublist of the event types which contains only the event that result in a change of the data (this is useful to refresh menus for example).
- Change event interface: An interface that contains an event type and an optional recent query object (the piece of data that has changed).

```ts
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
```

### Injection token

A service can be configured with global parameters, via [injection tokens](https://angular.io/guide/dependency-injection-providers). Here, we define a token named `MAX_QUERIES` (for a parameter of type `Number`), which we need to define a maximum number of recent queries to be stored by the service.

```ts
export const MAX_QUERIES = new InjectionToken<Number>("MAX_QUERIES");
```

### Class declaration and Constructor

Our service is defined like a regular service, using the `Injectable` annotation.

By convention, we define two private sources of events (`_events` and `_changes`, where `_changes` triggers a subset of the events of `_events`, as defined [above](#events-and-event-types)), and their public getters defined below (`get changes()` and `get events()`).

The constructor includes other services (in particular `UserSettingsWebService`), and the (optional) `maxQueries` parameter injected via the [`InjectionToken`](#injection-token) defined above (to inject a value for this parameter, add a provider to your `app.module.ts`, like `{ provide: MAX_QUERIES, useValue: 50 }`).

The service immediately subscribes to 3 types of events:

- User Settings events, which trigger when the data is first loaded (the event is simply "forwarded" by this service).
- Its own events (`this._events`), which is simply used to emit the "change" events (as defined [above](#events-and-event-types)), in function on their event type.
- External service(s): In this case we subscribe to `SearchService` events and create a new `RecentQuery` every time a query is created or modified.

```ts title="recent-queries.service.ts"
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
        this.searchService.queryStream.subscribe({
            next: (query: Query) => {
                if(query)
                    this.addRecentQuery({query: query.copy(), date: new Date()});
            }
        })
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
```

### CRUD API: Read

The following methods allow to retrieve the list of recent queries, directly from the User Settings. Notice that `this.recentqueries` is just a proxy for `this.userSettingsService.userSettings["recentQueries"]`, and this value is initialized as an empty list if it does not exist. Also notice in the code of `recentquery()` and `recentqueryIndex()` that recent queries are identified by their `query.text`: This is a strong assumption since a `Query` object has many other fields, but this allows to avoid near-duplicate queries and to store only the latest value (likely most relevant).

```ts title="recent-queries.service.ts"
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
 * @returns true if there is at least one recent query
 */
public get hasRecentQuery(): boolean {
    return this.recentqueries.length > 0;
}

/**
 * @returns a recent query with the given name or null if it does not exist
 * @param name
 */
public recentquery(text: string): RecentQuery {
    let i = this.recentqueryIndex(text);
    return i>= 0? this.recentqueries[i] : null;
}

private recentqueryIndex(text: string): number {
    for (let i = 0, ic = this.recentqueries.length; i < ic; i++) {
        let recentquery = this.recentqueries[i];
        if (recentquery && recentquery.query.text === text) {
            return i;
        }
    }
    return -1;
}
```

### CRUD API: Create and Update

The `addRecentQuery()` method allows to add a recent query to the user settings. It performs the following actions:

- Check that the input `RecentQuery` is valid.
- Check whether a recent query with the same text already exists. If so, only update the content of the existing object. If not, add the object to the user settings. In either case, it emits an event.
- Sort the list with a comparator, to keep the most recent queries on top of the list.
- Truncate the list based on the `maxQueries` parameter.
- Patch the User Settings (we only update the server with the part of the user settings that changed), which includes sending an Audit event.

```ts title="recent-queries.service.ts"
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

    let i = this.recentqueryIndex(recentquery.query.text); // If the query already exists
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
```

### CRUD API: Delete

The `deleteRecentQuery()` allows to delete a query from the user settings, based on the content of `query.text` (which should be unique, as explained [above](#crud-api-read)). The method also emits an event and updates the server, including an audit event.

```ts title="recent-queries.service.ts"
/**
 * Deletes the given RecentQuery (based on its query.text)
 * Emits an RecentQuery event.
 * Update the data on the server.
 * @param recentquery
 * @returns true if recent query was deleted
 */
public deleteRecentQuery(recentquery: RecentQuery) : boolean {

    let index = this.recentqueryIndex(recentquery.query.text);

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
```

### User Settings patch

This private method is used by `addRecentQuery()` and `deleteRecentQuery()` to patch the user settings on the server, via the `UserSettingsWebService.patch()` method.

```ts title="recent-queries.service.ts"
/**
 * Updates Recent Queries in User settings.
 * @param auditEvents : Audit Events to be triggered
 * @returns an Observable which can be used to trigger further events
 */
private patchRecentQueries(auditEvents: AuditEvents = null) {
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
```

### Other features

Your service can be a bit more than just a proxy to the `UserSettingsWebService`. In this case, we include a method to search a `RecentQuery` via the `SearchService` (if a user selects it in a facet for example).

```ts title="recent-queries.service.ts"
/**
 * Uses the SearchService to perform a search returning all
 * the documents matching this recent query.
 * @param recentquery
 * @returns the search service promise
 */
searchRecentQuery(recentquery: RecentQuery, path?: string): Promise<boolean> {
    this.searchService.query = Utils.extend(this.searchService.makeQuery(), Utils.copy(recentquery.query));
    this.events.next({type: RecentQueryEventType.Search, recentquery: recentquery});
    return this.searchService.search({ path: path }, {
        type: RecentQueryEventType.Search,
        detail: {
            recentquery: recentquery.query.text
        }
    });
}
```

Other services include high-level features to interact with the CRUD API. For example, the Alerts service lets you display a modal popup to create and edit an alert, and only then calls a `addAlert` method.
