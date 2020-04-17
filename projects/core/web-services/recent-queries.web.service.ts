import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils} from "@sinequa/core/base";
import {IQuery} from "./query/query";

export class RecentQueriesList {
    constructor(name: string) {
        this.name = name;
        this.queries = [];	// Make sure to have at least a valid "queries" member, to simplify tests in GUI code.
    }
    name: string;		// App name or user name the queries are related to.
    queries: IQuery[];
}

export class RecentQueries {
    app?: RecentQueriesList;
    user?: RecentQueriesList;
}

@Injectable({
    providedIn: "root"
})
export class RecentQueriesWebService extends HttpService {
    recentQueries: RecentQueries;

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    load(): Observable<RecentQueries> {
        const observable = this.httpClient.get<RecentQueries>(this.makeUrl("recentqueries"), {
            params: this.makeParams({
                app: this.appName,
                action: "load"
            })
        });
        Utils.subscribe(observable,
            (response) => {
                this.recentQueries = response;
                if (!this.recentQueries)
                    this.recentQueries = new RecentQueries();
                if (this.recentQueries) {
                    if (!this.recentQueries.app)
                        this.recentQueries.app = new RecentQueriesList(this.appName);
                    if (!this.recentQueries.user)
                        this.recentQueries.user = new RecentQueriesList("currentuser");
                }
                console.log("recentQueriesService.load success - data: ", response);
                return response;
            },
            (error) => {
                console.log("recentQueriesService.load failure - error: ", error);
            });
        return observable;
    }
    // No save/patch action for the recent queries: MRU lists are generated server side when the query is executed.

    appRecentQueries(): IQuery[]{
        if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
            return this.recentQueries.app.queries;
        else {
            return [];
        }
    }

    appRecentQueriesLength(): number{
        if (this.recentQueries && this.recentQueries.app && this.recentQueries.app.queries)
            return this.recentQueries.app.queries.length;
        else
            return 0;
    }

    userRecentQueries(): IQuery[]{
        if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
            return this.recentQueries.user.queries;
        else {
            return [];
        }
    }

    userRecentQueriesLength(): number{
        if (this.recentQueries && this.recentQueries.user && this.recentQueries.user.queries)
            return this.recentQueries.user.queries.length;
        else
            return 0;
    }
}