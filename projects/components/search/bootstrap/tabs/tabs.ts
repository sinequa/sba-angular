import {Component, Input, Output, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";
import {Results, Tab} from "@sinequa/core/web-services";
import {SearchService} from "../../search.service";

@Component({
    selector: "sq-tabs",
    templateUrl: "./tabs.html"
})
export class BsTabs implements OnChanges {

    @Input() results: Results;

    /**
     * List of custom tabs (complementing the search query tabs)
     * Actions can be performed on click via the events Output.
     *
     * When the results are updated (new search text, facet
     * selection...), the custom tab selection is discarded.
     * If the custom action updates the results, the tab selection
     * will revert to previous state unless the query is updated.
     */
    @Input() customtabs: Tab[];

    /**
     * Associate icon to a tab name ({tab1 : 'icon class 1', tab2 : ...})
     */
    @Input() iconMap: {[key: string]: string} = {};

    /**
     * Emits an event when a tab is selected
     */
    @Output() events = new EventEmitter<Tab>();

    currentTab: Tab | undefined;
    searchtabs: Tab[] | undefined;

    constructor(
        private searchService: SearchService) {
    }

    update() {
        if (this.results && this.results.tabs) {
            this.currentTab = this.searchService.getCurrentTab();
            this.searchtabs = this.results.tabs;
        }
        else {
            this.currentTab = undefined;
            this.searchtabs = undefined;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {
            this.update();
        }
    }

    selectTab(tab: Tab, search = true) {
        if (tab !== this.currentTab) {
            if(search){
                this.searchService.selectTab(tab); // the currentTab will be updated in update()
            } else {
                this.currentTab = tab;
            }
            this.events.next(tab);
        }
        return false;   // Stop following href
    }
}