import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy} from "@angular/core";
import {Results, Aggregation, AggregationItem} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: "sq-facet-list",
    templateUrl: "./facet-list.html",
    styleUrls: ["./facet-list.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsFacetList extends AbstractFacet implements OnChanges, OnInit, OnDestroy {
    @Input() name: string; // If ommited, the aggregation name is used
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() searchable: boolean = true; // Allow to search for items in the facet
    @Input() allowExclude: boolean = true; // Allow to exclude selected items
    @Input() allowOr: boolean = true; // Allow to search various items in OR mode
    @Input() allowAnd: boolean = true; // Allow to search various items in AND mode
    @Input() displayEmptyDistributionIntervals: boolean = false; // If the aggregration is a distribution, then this property controls whether empty distribution intervals will be displayed
    @Input() displayActions = false;

    // Aggregation from the Results object
    data$ = new BehaviorSubject<Aggregation | undefined>(undefined)
    items$ = new BehaviorSubject<AggregationItem[]>([]);
    data = () => this.data$.getValue();
    subscriptions: Subscription[] = [];

    filtering: boolean = false;

    // Search
    myGroup: FormGroup;
    searchQuery: FormControl; // ngModel for textarea
    searchBar = false; // Collapsed by default
    suggestDelay = 200;
    noResults = false;
    suggestions$: BehaviorSubject<AggregationItem[]> = new BehaviorSubject<AggregationItem[]>([]);

    // Select

    /**
     * Returns index of first element existing in suggestions or aggregations collection.
     * @param item `AggregrationItem` to find
     */
    private find = (item: AggregationItem) => this.hasSuggestions()
                                                    ? this.facetService.findAggregationItemIndex(this.suggestions$.getValue(), item)
                                                    : this.facetService.findAggregationItemIndex(this.items$.getValue() || [], item);
    selected: AggregationItem[] = [];


    // Loading more data
    skip = 0;
    count = 0;
    loadingMore = false;

    // Sets to keep track of selected/excluded/filtered items
    filtered: AggregationItem[] = [];

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly filterItemsOr: Action;
    private readonly filterItemsAnd: Action;
    private readonly excludeItems: Action;
    private readonly clearFilters: Action;
    private readonly searchItems: Action;


    constructor(
        private facetService: FacetService,
        private changeDetectorRef: ChangeDetectorRef) {
        super();

        this.myGroup = new FormGroup({
            searchQuery: new FormControl()
        });

        this.searchQuery = this.myGroup.get("searchQuery") as FormControl;
        this.subscriptions["suggest"] = this.suggest$(this.searchQuery.valueChanges).subscribe(values => this.suggestions$.next(values));

        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data() as Aggregation, this.getSelectedItems());
                }
            }
        });

        // Keep documents with ALL the selected items
        this.filterItemsAnd = new Action({
            icon: "fas fa-bullseye",
            title: "msg#facet.filterItemsAnd",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data() as Aggregation, this.getSelectedItems(), {and: true});
                }
            }
        });

        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => {
                if (this.data()) {
                    this.facetService.addFilterSearch(this.getName(), this.data() as Aggregation, this.getSelectedItems(), {not: true});
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
            action: (item, event) => {
                this.searchBar = !this.searchBar;
                if(!this.searchBar){
                    this.clearSearch();
                }
                event.stopPropagation();
                this.changeDetectorRef.markForCheck();
            }
        });
    }

    clearSearch() {
        this.searchQuery.setValue(""); // Remove suggestions if some remain
        this.noResults = false;
        this.suggestions$.next([]);
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
            this.skip = 0;
            this.searchBar = false;
            this.clearSearch();
            this.data$.next(this.facetService.getAggregation(this.aggregation, this.results));
        }
    }

    ngOnInit() {
        this.subscriptions["data"] = this.data$.pipe(
            map(data => {
                this.refreshFiltered(data as Aggregation);

                if (!data?.items) {
                    return [];
                }

                if (!data?.isDistribution || this.displayEmptyDistributionIntervals) {
                    return data.items.filter(item => !item.$filtered);
                } else {
                    return data.items.filter(item => item.count > 0 && !item.$filtered);
                }
            }),
        ).subscribe(items => {
            this.items$.next(items);
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
    refreshFiltered(data: Aggregation | undefined) {
        // refresh filters from breadcrumbs
        const items = this.facetService.getAggregationItemsFiltered(this.getName(), data?.valuesAreExpressions);
        items.forEach(item => {
            if (!this.isFiltered(data, item)) {
                item.$filtered = true;
                this.filtered.push(item);
            }
        });

        data?.items?.forEach(item => {
            // update $selected status
            item.$selected = this.isSelected(item);
            const indx = this.facetService.filteredIndex(data, this.filtered, item);
            if (this.facetService.itemFiltered(this.getName(), data, item)) {
                item.$filtered = true;
                if (!this.isFiltered(data, item)) {
                    this.filtered.push(item);
                } else {
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

    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(data: Aggregation | undefined, item: AggregationItem): boolean {
        return this.facetService.filteredIndex(data, this.filtered, item) !== -1;
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
    filterItem(item: AggregationItem, event) {
        const data = this.data();
        if (data) {
            this.filtering = true;
            if (!this.isFiltered(data, item)) {
                this.facetService.addFilterSearch(this.getName(), data, item);
            }
            else {
                this.facetService.removeFilterSearch(this.getName(), data, item);
            }
        }
        event.preventDefault();
    }


    // Selected items

    /**
     * Returns true if the given AggregationItem is selected
     * @param item
     */
    isSelected(item: AggregationItem) : boolean {
        return this.facetService.findAggregationItemIndex(this.selected, item) !== -1;
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
        return this.selected?.filter(item => this.find(item) === -1) || [];
    }

    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: AggregationItem, e: Event) {
        e.preventDefault();
        if(!this.filtering) {
            this.updateSelected(item);
            e.stopPropagation();
        }
        this.filtering = false;
    }

    private updateSelected(item: AggregationItem) {
        if (!this.isFiltered(this.data(), item)) {
            const index = this.facetService.findAggregationItemIndex(this.selected, item);
            if (index === -1) {
                item.$selected = true;
                this.selected.push(item);
            } else {
                item.$selected = false;
                this.selected.splice(index, 1);
            }
        }
    }


    // Loading more items

    /**
     * Returns true if this facet can get more data from the server
     * (The only way to guess is to check if the facet is "full", it capacity being the (skip+)count)
     */
    get hasMore(): boolean {
        return this.resultsLength >= this.skip + this.count;
    }

    get resultsLength() {
        return this.items$.getValue().length + this.filtered.length
    }

    /**
     * Called on loadMore button click
     */
    loadMore(e: Event) {
        e.stopPropagation();
        if (this.data()) {
            const skip = this.resultsLength;    // avoid hasMore() to return false when fetching data
            this.loadingMore = true;
            this.changeDetectorRef.markForCheck();

            Utils.subscribe(this.facetService.loadData(this.aggregation, skip, this.count),
                agg => {
                    this.skip = skip;
                    if (agg?.items && this.data()) {
                        agg.items = this.items$.getValue().concat(agg.items);
                        this.data$.next(agg);
                    }
                },
                undefined,
                () => {
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
        return this.suggestions$.getValue().length > 0 || this.noResults;
    }

    /**
     * Called on NgModel change (searchQuery)
     * Uses the suggestfield API to retrieve suggestions from the server
     * The suggestions "override" the data from the distribution (until search results are cleared)
     */
    suggest$ = (text$: Observable<string>) => text$.pipe(
        debounceTime(this.suggestDelay),
        distinctUntilChanged(),
        switchMap(term => {
            if (term.trim() === "") {
                this.noResults = false;
                return of([]);
            }
            return this.facetService.suggest(term, this.data()?.column || '').pipe(
                catchError(err => {
                    console.log(err);
                    this.noResults = false;
                    return of([]);
                }),
                map(items => {
                    const suggestions = items.slice(0, this.count)
                        .map(item => this.facetService.suggestionToAggregationItem(item))
                        .filter(item => !this.isFiltered(this.data(), item));

                    // update $selected status
                    suggestions.forEach(item => item.$selected = this.isSelected(item));

                    const hasSuggestions = (suggestions.length > 0);
                    this.noResults = !hasSuggestions && term.trim() !== "";
                    return suggestions;
                })
            )
        })
    )

    /* AbstractFacet abstract methods */
    isHidden(): boolean {
        return !this.data();
    }
}
