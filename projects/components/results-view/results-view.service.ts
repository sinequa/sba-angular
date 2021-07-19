import { Injectable, Inject, InjectionToken } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Subject, Observable } from "rxjs";
import { Utils } from '@sinequa/core/base';
import { SearchService } from '@sinequa/components/search';
import { Query } from '@sinequa/core/app-utils';

/**
 * Configuration of a Results View
 */
export interface ResultsView {
    /** Name of the results view */
    name: string;
    /** Type of the results view (not used internally, but may be useful if multiple views share a common component) */
    type: string;
    /** How the results view should be displayed (default to the name) */
    display?: string;
    /** Icon class for the results view */
    icon?: string;
    /** List of tab for which this tab can be displayed (defaults to all if undefined) */
    includedTabs?: string[];
    /** List of tab for which this tab is excluded (defaults to none if undefined) */
    excludedTabs?: string[];
    /**
     * Method called when selecting this results view. It can be used to modify the search query
     * when a view has specific data to display. If the method returns true, then selecting this view
     * triggers a search and the view selection becomes effective upon results. If the method results false,
     * (or if the method is undefined), then selecting this view does not trigger a new search
     * and the view selection is immediate.
     */
    beforeSearch?: (query: Query, previousView: ResultsView) => boolean;
}

export interface ResultsViewEvent {
    type: "before-select" | "after-select" | "select-cancelled";
}

export interface ResultsViewBeforeSelectEvent extends ResultsViewEvent {
    type: "before-select";
    view: ResultsView;
    promises: Promise<boolean>[];
}

export interface ResultsViewAfterSelectEvent extends ResultsViewEvent {
    type: "after-select";
    view: ResultsView;
}

export interface ResultsViewSelectCancelledEvent extends ResultsViewEvent {
    type: "select-cancelled";
    view: ResultsView;
}

export type ResultsViewEvents =
    ResultsViewBeforeSelectEvent |
    ResultsViewAfterSelectEvent |
    ResultsViewSelectCancelledEvent;

export const RESULTS_VIEWS = new InjectionToken<ResultsView[]>("RESULTS_VIEWS");
export const DEFAULT_VIEW = new InjectionToken<ResultsView>("DEFAULT_VIEW");

@Injectable({
    providedIn: 'root',
})
export class ResultsViewService {

    protected _resultsView : ResultsView;
    protected readonly _resultsViews : ResultsView[];

    protected _resultsViewSelected = new Subject<ResultsView>();
    protected _events = new Subject<ResultsViewEvents>();

    protected pendingView: ResultsView | undefined;

    /**
     * Constructor: Expects the configuration for a list of views and
     * one default view. These views can be set when importing the module in the AppModule
     * with the ResultsViewModule.forRoot() method.
     */
    constructor(
        @Inject(DEFAULT_VIEW) public defaultView: ResultsView,
        @Inject(RESULTS_VIEWS) resultsViews: ResultsView[],
        protected router: Router,
        protected route: ActivatedRoute,
        protected searchService: SearchService
    ) {
        this._resultsViews = resultsViews;
        this._resultsView = this.defaultView;

        /**
         * Listener triggered whenever the URL changes
         */
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.handleNavigation();
            }
        });

        /**
         * Listener triggered whenever new results come in.
         * Some views must be displayed after a search, hence the
         * pendingView flag.
         */
        this.searchService.resultsStream.subscribe(results => {
            if(this.pendingView) {
                this.searchService.queryStringParams.view = this.pendingView.name;
                this.searchService.navigate({skipSearch: true});
                this.pendingView = undefined;
            }
        });

        // Automatically switch results views, if we go to a tab that has specific list of views
        this.searchService.events.subscribe(event => {
            // Event called just before the query for the new tab is searched
            if(event.type === "before-select-tab" && event.query.tab) {
                const views = this.getIncludedViews(event.query.tab);
                // If there are views for this tab and they don't include the current one...
                if(views.length > 0 && !views.includes(this.resultsView)) {
                    // Set the view as pending
                    this.pendingView = views[0];
                    // Modify the query if needed
                    if(this.pendingView.beforeSearch) {
                        this.pendingView.beforeSearch(event.query, this.resultsView);
                    }
                }
            }
        })
    }


    // GETTERS

    public get resultsViewSelected(): Observable<ResultsView> {
        return this._resultsViewSelected;
    }

    public get events(): Observable<ResultsViewEvents> {
        return this._events;
    }

    public get resultsView(): ResultsView {
        return this._resultsView;
    }

    public get views(): ResultsView[] {
        return this._resultsViews;
    }

    // EVENT HANDLERS

    /**
     * Navigate to a new URL including the given results view's name
     * @param view 
     */
    protected navigate(view: ResultsView) {
        let waitForResults = !!view.beforeSearch;
        if(view.beforeSearch) {
            waitForResults = view.beforeSearch(this.searchService.query, this.resultsView);
        }
        if(!waitForResults) {
            // We switch view immediately via the search service (which centralizes the navigation)
            this.searchService.queryStringParams.view = view.name;
            this.searchService.navigate({skipSearch: true});
        }
        else {
            // We set the view as "pending", that is waiting for new results to come in
            this.pendingView = view;
            this.searchService.search();
        }
    }

    /**
     * Responds to a change in the URL: Sets the results view if the URL
     * specifies a different results view name.
     */
    protected handleNavigation() {
        const url = Utils.makeURL(this.router.url);
        const view = this.getView(url.searchParams.get("view"));
        if(view && view !== this.resultsView) {
            this.searchService.queryStringParams.view = view.name; // Needed when refreshing the page
            this.setResultsView(view);
        } else {
            this.setResultsView(this.defaultView);
        }
    }

    /**
     * Sets the results view and emits an event
     * @param view 
     */
    protected setResultsView(view: ResultsView) {
        this._resultsView = view;
        this._events.next({type: "after-select", view});
        this._resultsViewSelected.next(view);
    }


    // PUBLIC API

    /**
     * Selects the given results view. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param view 
     */
    public selectResultsView(view: ResultsView) {
        if (view) {
            // Raise before event...
            const beforeEvent: ResultsViewBeforeSelectEvent = {
                type: "before-select",
                view,
                promises: []
            }
            this._events.next(beforeEvent);
            if (beforeEvent.promises.length === 0) {
                this.navigate(view);
            }
            else {
                Promise.all(beforeEvent.promises)
                    .then((results) => {
                        const ok = results.every(result => result);
                        if (ok) {
                            this.navigate(view);
                        }
                        else {
                            console.log("selectResultsView cancelled");
                            this._events.next({type: "select-cancelled", view});
                        }
                    })
                    .catch((reason) => {
                        console.log("selectResultsView error:", reason);
                        this._events.next({type: "select-cancelled", view});
                    });
            }
        }
        else {
            console.error("Undefined Results View");
        }
    }

    /**
     * Selects the results view with the given name. This method is asynchronous:
     * - The selected results view might modify the query before being displayed
     * - The view selection works with a navigation via the router (adding the view name to the URL)
     * @param viewName 
     */
    public selectResultsViewName(viewName: string){
        const view = this.getView(viewName);
        if (view) {
            this.selectResultsView(view);
        }
    }

    /**
     * Returns the results view with the given name
     * @param viewName 
     */
    public getView(viewName): ResultsView | undefined {
        return this.views.find(v => v.name === viewName);
    }

    /**
     * Returns the list of results views compatible with a given tab
     * @param tab 
     */
    public getIncludedViews(tab?: string): ResultsView[] {
        const views: ResultsView[] = [];
        for (const view of this.views) {
            const included = !!view.includedTabs
                ? view.includedTabs.includes(tab || "")
                : !view.excludedTabs || !view.excludedTabs.includes(tab || "");

            if (included) {
                views.push(view);
            }
        }
        return views;
    }

}