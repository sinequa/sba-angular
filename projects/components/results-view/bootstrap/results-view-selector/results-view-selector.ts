import {Component, Input, OnChanges, SimpleChanges, OnDestroy} from "@angular/core";
import {Utils} from "@sinequa/core/base";
import {Query} from "@sinequa/core/app-utils";
import {Results} from "@sinequa/core/web-services";
import {ResultsViewService, ResultsView} from "../../results-view.service";
import {Action} from "@sinequa/components/action";
import {Subscription} from 'rxjs';


@Component({
    selector: "sq-results-view-selector",
    templateUrl: "./results-view-selector.html"
})
export class BsResultsViewSelector implements OnChanges, OnDestroy {
    @Input() query: Query;  // Needed to get tab, and possibly include/exclude results views
    @Input() results: Results;  // Needed to detect Changes
    // UI inputs
    @Input() rightAligned: boolean;
    @Input() useDropdownMenu: boolean = true;
    @Input() size: string;

    private viewAction: Action | Action[] | undefined;
    items: Action[];

    constructor(
        public resultsViewService : ResultsViewService
    ) {
        this._subscription = this.resultsViewService.resultsViewSelected.subscribe(
            (view : ResultsView) => {
                this.setCurrentViewAction();
        });
    }

    private _subscription: Subscription;
    ngOnDestroy(){
        if(this._subscription){
            this._subscription.unsubscribe();
        }
    }

    private setCurrentViewAction() {
        if (!!this.viewAction && !!this.resultsViewService.resultsView) {
            if (!Utils.isArray(this.viewAction)) {
                const view = this.resultsViewService.views.find(view => Utils.eqNC(this.resultsViewService.resultsView.name, view.name));
                if (view) {
                    this.viewAction.text = view.display || view.name;
                    this.viewAction.icon = view.icon || 'fas fa-list';
                }
                else {
                    this.viewAction.text = "msg#results.unselectableViewDisplay";
                    this.viewAction.icon = "far fa-square fa-fw";
                }
                this.viewAction.messageParams = {values: {text: this.viewAction.text}}; // for title
            }
            else {
                this.viewAction.forEach(action => {
                    action.selected = Utils.eqNC(action.data.name, this.resultsViewService.resultsView.name);
                });
            }
        }
    }

    private buildViewAction() {
        if (this.resultsViewService.views.length <= 1) {
            this.viewAction = undefined;
            this.items = [];
            return;
        }
        const includedViews = this.getIncludedViews();
        if (includedViews.length <= 1) {
            this.viewAction = undefined;
            this.items = [];
            return;
        }
        if (this.useDropdownMenu) {
            this.viewAction = new Action({
                title: "msg#results.viewTitle",
                children: [
                ]
            });
            for (const view of includedViews) {
                this.viewAction.children.push(new Action({
                    text: view.display,
                    icon: view.icon,
                    data: view,
                    action: (item: Action, event: Event) => {
                        this.selectView(item.data);
                    }
                }));
            }
            this.items = [this.viewAction];
        }
        else {
            this.viewAction = [];
            for (const view of includedViews) {
                this.viewAction.push(new Action({
                    icon: view.icon,
                    title: view.display,
                    data: view,
                    action: (item: Action, event: Event) => {
                        this.selectView(item.data);
                    }
                }));
            }
            this.items = this.viewAction;
        }
        this.setCurrentViewAction();
    }

    private getIncludedViews(): ResultsView[] {
        // NOTE: this method returns the list of result views that are "included" with the current query tab
        // This is to reproduce the included results views configuration that can be done in profile but not in SBA due
        // to the fact that result tabs are configured in the SBA query thus has no knowledge of the results views.
        const views: ResultsView[] = [];
        const currentTab = this.query.tab;
        for (const view of this.resultsViewService.views) {
            const included = !!view.includedTabs
                ? view.includedTabs.includes(currentTab || "")
                : !view.excludedTabs || !view.excludedTabs.includes(currentTab || "");

            if (included) {
                views.push(view);
            }
        }
        return views;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.buildViewAction();
    }

    selectView(view: ResultsView) {
        this.resultsViewService.selectResultsView(view);
    }
}