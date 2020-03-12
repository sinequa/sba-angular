import {Injectable, Inject, InjectionToken} from "@angular/core";
import {Subject} from "rxjs";
import {SearchService} from "@sinequa/components/search";

export interface ResultsView {
    type: string;
    name: string;
    display?: string;
    icon?: string;
    includedTabs?: string[];
    excludedTabs?: string[];
}


export const RESULTS_VIEWS = new InjectionToken<ResultsView[]>("RESULTS_VIEWS");
export const DEFAULT_VIEW = new InjectionToken<ResultsView>("DEFAULT_VIEW");

@Injectable({
    providedIn: 'root',
})
export class ResultsViewService {

    protected _resultsView : ResultsView;
    protected readonly _resultsViews : ResultsView[];

    public resultsViewSelected = new Subject<any>();
    

    /**
     * Constructor
     * @param userSettingsService
     */

    constructor(
        @Inject(DEFAULT_VIEW) public defaultView: ResultsView,
        @Inject(RESULTS_VIEWS) resultsViews: ResultsView[],
        private searchService: SearchService
    ){
        this._resultsViews = resultsViews;
        this._resultsView = this.defaultView;
    }

    // GETTERS

    public get resultsView(): ResultsView {
        return this._resultsView;
    }

    public get views(): ResultsView[] {
        return this._resultsViews;
    }

    // EVENT HANDLERS
    
    public selectResultsView(view: ResultsView){
        if (view) {
            this._resultsView = view;
            this.resultsViewSelected.next(view);
            // Set resultsview in URL : 
            this.searchService.queryStringParams.resultsView = view.name;
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