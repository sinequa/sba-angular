import {Injectable, Inject, InjectionToken} from "@angular/core";
import {Subject, Observable} from "rxjs";

export interface ResultsView {
    type: string;
    name: string;
    display?: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
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

    /**
     * Constructor
     * @param userSettingsService
     */

    constructor(
        @Inject(DEFAULT_VIEW) public defaultView: ResultsView,
        @Inject(RESULTS_VIEWS) resultsViews: ResultsView[]
    ) {
        this._resultsViews = resultsViews;
        this._resultsView = this.defaultView;
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

    private setResultsView(view: ResultsView) {
        this._resultsView = view;
        this._events.next({type: "after-select", view});
        this._resultsViewSelected.next(view);
    }

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
                this.setResultsView(view);
            }
            else {
                Promise.all(beforeEvent.promises)
                    .then((results) => {
                        const ok = results.every(result => result);
                        if (ok) {
                            this.setResultsView(view);
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

    public selectResultsViewName(viewName: string){
        const view = this.views.find(v => v.name === viewName);
        if (view) {
            this.selectResultsView(view);
        }
    }

    public getView(viewName): ResultsView | undefined {
        return this.views.find(v => v.name === viewName);
    }

    // Former Search service methods

    /**
     * Gets the query params from the current view, combining those in the view configuration and the view settings.
     *
     * @returns {CCResults.QueryParams} The query params from the current view.
     */
    /*
    public getViewQueryParams(): CCResults.QueryParams {
        const queryParams = {};
        const viewName = this.resultsView ? this.resultsView.name : '';
        const userSettingsQueryParams = this.userSettingsService.getCurrentQueryParams(viewName);
        const configQueryParams = (this.resultsView && this.resultsView.queryParams)
            ? Utils.copyWithoutNullOrEmpty({}, this.resultsView.queryParams)
            : {};
        Utils.merge(queryParams, configQueryParams, userSettingsQueryParams);

        return queryParams;
    }


    updateQueryParams(query: Query, oldParams: CCResults.QueryParams, newParams: CCResults.QueryParams): void {

        if (!!query && !!oldParams && Object.keys(oldParams).length > 0) {
            for (let key of Object.keys(oldParams)) {
                const paramsValue = oldParams[key];
                const queryValue = query[key];
                if (paramsValue === queryValue) {
                    delete query[key];
                }
            }
        }

        if (!query || !newParams || Object.keys(newParams).length === 0) {
            return;
        }

        Utils.extend(query, newParams);

    }
    */
}