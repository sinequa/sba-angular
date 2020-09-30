import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
import {Results, Aggregation, AggregationItem} from "@sinequa/core/web-services";
import {Utils, Keys, FieldValue} from "@sinequa/core/base";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";

@Component({
    selector: "sq-facet-list",
    templateUrl: "./facet-list.html",
    styleUrls: ["./facet-list.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsFacetList extends AbstractFacet implements OnChanges {
    @Input() name: string; // If ommited, the aggregation name is used
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() searchable: boolean = true; // Allow to search for items in the facet
    @Input() allowExclude: boolean = true; // Allow to exclude selected items
    @Input() allowOr: boolean = true; // Allow to search various items in OR mode
    @Input() allowAnd: boolean = true; // Allow to search various items in AND mode
    @Input() displayEmptyDistributionIntervals: boolean = false; // If the aggregration is a distribution, then this property controls whether empty distribution intervals will be displayed

    // Aggregation from the Results object
    data: Aggregation | undefined;

    // Search
    searchQuery = ""; // ngModel for textarea
    searchBar = false; // Collapsed by default
    suggestDelay = 200;
    noResults = false;
    private readonly debounceSuggest: () => void;
    suggestions: AggregationItem[] = [];

    // Select
    /**
     * Utility function to returns aggregation item's index in supplied array with fallback to `display` comparison.
     * Otherwise -1, indicating that no element passed the test.
     * @param arr The array findIndex() was called upon
     * @param value The value to be test
     */
    private findIndex = (arr: Array<AggregationItem>, item: AggregationItem) => {
        let index = arr.findIndex(it => it.value === item.value);
        if (index === -1) {
            // fallback to display comparison
            index = arr.findIndex(it => it.display === item.display);
        }
        return index;
    };

    /**
     * Returns index of first element existing in suggestions or aggregations collection.
     * @param item `AggregrationItem` to find
     */
    private find = (item: AggregationItem) => (this.hasSuggestions()) ? this.findIndex(this.suggestions, item) : this.findIndex(this.data?.items || [], item);
    selected: AggregationItem[] = [];


    // Loading more data
    skip = 0;
    count = 0;
    loadingMore = false;

    // Sets to keep track of selected/excluded/filtered items
    filtered: AggregationItem[] = [];
    // TODO keep track of excluded terms and display them with specific color private

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly filterItemsOr: Action;
    private readonly filterItemsAnd: Action;
    private readonly excludeItems: Action;
    private readonly clearFilters: Action;
    private readonly searchItems: Action;


    constructor(
        private facetService: FacetService,
        private changeDetectorRef: ChangeDetectorRef){
        super();

        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems());
                }
            }
        });

        // Keep documents with ALL the selected items
        this.filterItemsAnd = new Action({
            icon: "fas fa-bullseye",
            title: "msg#facet.filterItemsAnd",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems(), {and: true});
                }
            }
        });

        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => {
                if (this.data) {
                    this.facetService.addFilterSearch(this.getName(), this.data, this.getSelectedItems(), {not: true});
                }
            }
        });

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => {
                this.facetService.clearFiltersSearch(this.getName(), true);
            }
        });

        // Search for a value in this list
        this.searchItems = new Action({
            icon: "fas fa-search",
            title: "msg#facet.searchItems",
            action: () => {
                this.searchBar = !this.searchBar;
                if(!this.searchBar){
                    this.suggestions.splice(0);
                    this.searchQuery = ""; // Remove suggestions if some remain
                    this.noResults = false;
                }
                this.changeDetectorRef.markForCheck();
            }
        });

        // The suggest (autocomplete) query is debounded to avoid flooding the server
        this.debounceSuggest = Utils.debounce(() => {
            this._suggest();
        }, this.suggestDelay);
    }

    /**
     * Name of the facet, used to create and retrieve selections
     * through the facet service.
     */
    getName() : string {
        return this.name || this.aggregation;
    }

    /**
     * OnChanges listener awaits new results from the search service
     * This completely resets the display
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges) {
        if (!!changes["results"]) {     // New data from the search service
            if(!this.count){
                this.count = this.facetService.getAggregationCount(this.aggregation);
            }
            this.filtered.length = 0;
            this.selected.length = 0;
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            this.skip = 0;
            this.searchBar = false;
            this.searchQuery = "";
            this.noResults = false;
            this.suggestions.splice(0);
            this.refreshFiltered();
        }
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions(): Action[] {

        const actions: Action[] = [];

        const selected = this.getSelectedItems();

        if (selected.length > 0) {
            if(this.allowOr){
                actions.push(this.filterItemsOr);
            }
            if(this.allowAnd && selected.length > 1){
                actions.push(this.filterItemsAnd);
            }
            if(this.allowExclude){
                actions.push(this.excludeItems);
            }
        }

        if(!this.hasSuggestions() && this.hasFiltered()) {
            actions.push(this.clearFilters);
        }

        if(this.searchable){
            actions.push(this.searchItems);
        }

        return actions;
    }


    // Filtered items

    /**
     * Actualize the state of filtered items (note that excluded terms are not in the distribution, so the equivalent cannot be done)
     */
    refreshFiltered(){
        // refresh filters from breadcrumbs
        const items = this.facetService.getAggregationItemsFiltered(this.getName(), this.data?.valuesAreExpressions);
        items.forEach(item => {
            if (!this.isFiltered(item)) {
                item.$filtered = true;
                this.filtered.push(item);
            }
        });

        if (this.data && this.data.items) {
            this.data.items.forEach(item => {
                // update $selected status
                item.$selected = (this.isSelected(item)) ? true : false;
                const indx = this.filteredIndex(item);
                if (this.data && this.facetService.itemFiltered(this.getName(), this.data, item)) {
                    if (!this.isFiltered(item)) {
                        item.$filtered = true;
                        this.filtered.push(item);
                    } else {
                        item.$filtered = true;
                        this.filtered[indx].count = item.count;
                    }
                } else {
                    // sometime facetService.itemFiltered() could returns false but item is present in breadcrumbs
                    if (indx !== -1) {
                        item.$filtered = true;
                        this.filtered[indx].count = item.count;
                    }
                }
            });
        }
    }

    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(item: AggregationItem): boolean {
        return (this.filteredIndex(item)) === -1 ? false : true;
    }

    /**
     * Returns the index of the first element in the array
     * corresponding to `item.value` or -1 when not found.
     * A fallback to `item.display` is done before returning -1
     * @param item item to find
     */
    filteredIndex(item: AggregationItem): number {
        let indx = -1;
        // specific to Values Are Expressions where expression are not well formated by Expression Parser
        // eg: when values is : "> 0", Expression Parser returns : ">0" without space beetwen operator and value
        if (this.data?.valuesAreExpressions) {
            const value = this.trimAllWhitespace(item.value);
            const filtered = this.filtered.map(item => ({...item, value: this.trimAllWhitespace(item.value)})) || [];
            indx = filtered.findIndex(it => it.value === value);
        } else {
            indx = this.findIndex(this.filtered, item);
        }
        return indx;
    }

    /**
     * Returns true if there is an active selection (or exclusion) from this facet
     */
    hasFiltered(): boolean {
        return this.facetService.hasFiltered(this.getName());
    }

    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item: AggregationItem, event) : boolean {
        if (this.data) {
            if (!this.isFiltered(item)) {
                this.facetService.addFilterSearch(this.getName(), this.data, item);
            }
            else {
                this.facetService.removeFilterSearch(this.getName(), this.data, item);
            }
        }
        event.preventDefault();
        event.stopPropagation();
        return false;   // Stop the propagation of the event (link inside link)
    }


    // Selected items

    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item: AggregationItem) : boolean {
        return this.findIndex(this.selected, item) === -1 ? false : true;
    }

    /**
     * Returns all the selected items
     */
    getSelectedItems(): AggregationItem[] {
        return (!this.selected) ? [] : this.selected;
    }

    /**
     * Returns hidden selected items
     */
    get hiddenSelected(): AggregationItem[] {
        return (!this.selected) ? [] : this.selected.filter(item => this.find(item) === -1);
    }

    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: AggregationItem) : boolean {
        if(!this.isFiltered(item)){
            const index = this.findIndex(this.selected, item);
            if (index === -1) {
                item.$selected = true;
                this.selected.push(item);
            } else {
                this.selected.splice(index, 1);
            }
        }
        return false;
    }


    // Loading more items

    /**
     * Returns true if this facet can get more data from the server
     * (The only way to guess is to check if the facet is "full", it capacity being the (skip+)count)
     */
    get hasMore(): boolean {
        return !!this.data?.items && this.data.items.length >= this.skip + this.count;
    }

    /**
     * Called on loadMore button click
     */
    loadMore(){
        if (this.data?.items) {
            const skip = this.data.items.length;    // avoid hasMore() to return false when fetching data
            this.loadingMore = true;
            this.changeDetectorRef.markForCheck();

            Utils.subscribe(this.facetService.loadData(this.aggregation, skip, this.count),
                agg => {
                    this.skip = skip;
                    this.loadingMore = false;
                    if (agg && agg.items) {
                        if (this.data) {
                            this.data.items = this.data.items!.concat(agg.items);
                            this.refreshFiltered();
                        }
                    }
                    this.changeDetectorRef.markForCheck();
                },
                err => {
                    this.loadingMore = false;
                    this.changeDetectorRef.markForCheck();
                });
        }
        return false; // Avoids following href
    }


    // Suggest / Search

    /**
     * Returns true if the search mode is active (ie. there are suggestions to display in place of the aggregation)
     */
    hasSuggestions(): boolean {
        return this.suggestions.length > 0 || this.noResults;
    }

    /**
     * Called on keyup event on search input
     * @param event
     */
    search(event: KeyboardEvent){
        if(this.searchQuery.trim() === "")
            return;

        if(event.keyCode === Keys.enter){
            // Get new distribution with prefix
            // this.skip = 0;

            // TODO: when API allows for prefixes

            // empty the form
            this.searchQuery = "";
        }

    }

    /**
     * Called on NgModel change (searchQuery)
     * Uses the suggestfield API to retrieve suggestions from the server
     * The suggestions "override" the data from the distribution (until search results are cleared)
     */
    suggest(){

        // If nothing to suggest, switch to normal distribution
        if(this.searchQuery.trim() === ""){
            this.suggestions.splice(0);
        }
        // Use fielded autocomplete to populate facet
        // Debounce is used to avoid flooding the the server
        else {
            this.debounceSuggest();
        }

    }

    private _suggest() {
        // Use autocomplete to refresh list
        if (!this.data) {
            return;
        }
        Utils.subscribe(this.facetService.suggest(this.searchQuery, this.data.column),
            (items) => {
                this.suggestions = items.slice(0, this.count)
                    .map(item => this.facetService.suggestionToAggregationItem(item))
                    .filter(item => !this.isFiltered(item));

                // update $selected status
                this.suggestions.forEach(item => item.$selected = this.isSelected(item));

                const hasSuggestions = (this.suggestions.length > 0);
                this.noResults = (!hasSuggestions && this.searchQuery.trim() !== "") ? true : false;
            },
            (err) => {
                console.log(err);
                this.suggestions.splice(0);
            },
            () => {
                if(this.searchQuery.trim() === ""){
                    this.suggestions.splice(0); // Might happen if these results are late
                }
                this.changeDetectorRef.markForCheck();
            });
    }

    /* AbstractFacet abstract methods */
    isHidden(): boolean {
        return !this.data;
    }

    /**
     * The items in the aggregation without filtered.
     *
     * @readonly
     * @type {AggregationItem[]}
     * @memberof BsFacetList
     */
    public get items(): AggregationItem[] {
        if (!this.data?.items) {
            return [];
        }
        if (!this.data.isDistribution || this.displayEmptyDistributionIntervals) {
            return this.data.items.filter(item => !item.$filtered);
        }
        return this.data.items.filter(item => item.count > 0 && !!!item.$filtered);
    }

    /**
     * Useful to compare string expressions
     *
     * @param value string where spaces should be trimmed
     *
     * @returns value trimmed. eg: "a b c" => "abc"
     */
    private trimAllWhitespace = (value: FieldValue | undefined): FieldValue | undefined => {
        switch (typeof value) {
            case "string":
                return value.replace(/\s/g, '');
            default:
                return value;
        }
    };
}