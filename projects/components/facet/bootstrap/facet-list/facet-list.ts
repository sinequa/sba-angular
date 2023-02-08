import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import {Results, Aggregation, AggregationItem, Suggestion, TreeAggregationNode, ListAggregation, TreeAggregation} from "@sinequa/core/web-services";
import {AddFilterOptions, FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";
import {Observable, debounceTime, distinctUntilChanged, switchMap, finalize, Subscription, of, Subject} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import { FacetConfig } from "../../facet-config";
import { Query } from "@sinequa/core/app-utils";
import { SearchService } from "@sinequa/components/search";
import { Utils } from "@sinequa/core/base";

export interface FacetListParams {
    showCheckbox?: boolean;
    showCount?: boolean;
    searchable?: boolean;
    allowExclude?: boolean;
    allowOr?: boolean;
    allowAnd?: boolean;
    displayEmptyDistributionIntervals?: boolean;
    acceptNonAggregationItemFilter?: boolean;
    replaceCurrent?: boolean;
    alwaysShowSearch?: boolean;
    suggestQuery?: string;
}

export interface FacetListConfig extends FacetConfig<FacetListParams> {
    type: 'list';
}

@Component({
    selector: "sq-facet-list",
    templateUrl: "./facet-list.html",
    styleUrls: ["./facet-list.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsFacetList extends AbstractFacet implements FacetListParams, OnChanges, OnDestroy {
    @Input() name: string; // If ommited, the aggregation name is used
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation: string;
    @Input() showCheckbox: boolean = true;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() searchable: boolean = true; // Allow to search for items in the facet
    @Input() allowExclude: boolean = true; // Allow to exclude selected items
    @Input() allowOr: boolean = true; // Allow to search various items in OR mode
    @Input() allowAnd: boolean = true; // Allow to search various items in AND mode
    @Input() displayEmptyDistributionIntervals: boolean = false; // If the aggregration is a distribution, then this property controls whether empty distribution intervals will be displayed
    @Input() acceptNonAggregationItemFilter = true; // when false, filtered items which don't match an existing aggregation item, should not be added to filtered list
    @Input() replaceCurrent = false; // if true, the previous "select" is removed first
    @Input() alwaysShowSearch = false;
    // Specific to tree facets
    @Input() expandedLevel: number = 2;

    items: (AggregationItem | TreeAggregationNode)[] = [];

    data: ListAggregation | TreeAggregation | undefined;
    suggests: Suggestion[] | undefined;
    selected: AggregationItem[] = [];

    // Search
    searchGroup: FormGroup<{searchQuery: FormControl<string>}>;
    suggestDelay = 200;
    searchActive = new Subject<boolean>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly filterItemsOr: Action;
    private readonly filterItemsAnd: Action;
    private readonly excludeItems: Action;
    private readonly clearFilters: Action;
    public readonly searchItems: Action;

    constructor(
        protected searchService: SearchService,
        protected facetService: FacetService,
        protected changeDetectorRef: ChangeDetectorRef
    ) {
        super();

        const searchQuery = new FormControl("", {nonNullable: true});
        this.searchGroup = new FormGroup({searchQuery});

        this.sub.add(
            searchQuery.valueChanges.pipe(
                debounceTime(this.suggestDelay),
                distinctUntilChanged(),
                switchMap(text => this.onSearch(text))
            ).subscribe(suggests => {
                this.suggests = suggests;
                this.updateItems()
            })
        );

        // Keep documents with ANY of the selected items
        this.filterItemsOr = new Action({
            icon: "fas fa-filter",
            title: "msg#facet.filterItems",
            action: () => this.addFilter(this.selected, {replaceCurrent: this.replaceCurrent})
        });

        // Keep documents with ALL the selected items
        this.filterItemsAnd = new Action({
            icon: "fas fa-bullseye",
            title: "msg#facet.filterItemsAnd",
            action: () => this.addFilter(this.selected, {and: true, replaceCurrent: this.replaceCurrent})
        });

        // Exclude document with selected items
        this.excludeItems = new Action({
            icon: "fas fa-times",
            title: "msg#facet.excludeItems",
            action: () => this.addFilter(this.selected, {not: true, replaceCurrent: this.replaceCurrent})
        });

        // Clear the current filters
        this.clearFilters = new Action({
            icon: "far fa-minus-square",
            title: "msg#facet.clearSelects",
            action: () => this.clearAllFilters()
        });

        // Search for a value in this list
        this.searchItems = new Action({
            icon: "fas fa-search",
            title: "msg#facet.searchItems",
            action: action => {
                action.selected = !action.selected;
                this.clearSearch();
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    /**
     * OnChanges listener awaits new results from the search service
     * This completely resets the display
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges) {
        if (this.showCount === undefined) this.showCount = true;
        if (this.searchable === undefined) this.searchable = true;
        if (this.allowExclude === undefined) this.allowExclude = true;
        if (this.allowOr === undefined) this.allowOr = true;
        if (this.allowAnd === undefined) this.allowAnd = true;

        if (changes.results || changes.aggregation) {     // New data from the search service
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            if(this.data?.isTree && this.data.items) {
                this.expandItems(this.data.items);
            }
            this.data?.items?.forEach(item => item.$selected = false); // Reinitialize the source aggregation's selected items
            this.searchItems.selected = !!this.alwaysShowSearch;
            this.selected = [];
            this.clearSearch();
            this.updateItems();
        }
    }

    sub: Subscription = new Subscription();
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    updateItems() {
        if(!this.data) {
            this.items = [];
            return;
        }

        if (this.searchMode && this.suggests) {
            if(this.data.isTree) {
                this.items = this.facetService.suggestionsToTreeAggregationNodes(this.suggests, this.searchControl.value, this.data);
            }
            else {
                this.items = this.suggests.slice(0, this.data.$cccount)
                    .map(item => this.facetService.suggestionToAggregationItem(item));
            }
        }
        else {
            this.items = this.data.items || [];
        }

        const selected = this.selected.slice();
        const filtered = this.data.$filtered.slice();

        if(this.data.isTree) {
            this.updateTreeItems(filtered, selected);
        }
        else {
            this.updateListItems(filtered, selected);
        }

        this.changeDetectorRef.detectChanges();
    }

    protected updateTreeItems(filtered: AggregationItem[], selected: AggregationItem[]) {
        // Set the $selected and $filtered flags
        Utils.traverse(this.items as TreeAggregationNode[], (lineage, node) => {
            node.$selected = this.findAndSplice(selected, node);
            node.$filtered = this.findAndSplice(filtered, node);
            if(node.$selected || node.$filtered) {
                lineage.filter(n => n.items?.length).forEach(n => n.$opened = true);
            }
            return false;
        });
    }

    protected updateListItems(filtered: AggregationItem[], selected: AggregationItem[]) {

        if(this.data?.isDistribution && !this.displayEmptyDistributionIntervals) {
            this.items = this.items.filter(item => item.count > 0);
        }

        // Set the $selected and $filtered flags
        for(const item of this.items) {
            item.$selected = this.findAndSplice(selected, item);
            item.$filtered = this.findAndSplice(filtered, item);
        }

        this.items = [
            ...filtered, // Remaining filtered items not found in this.items
            ...selected, // Remaining selected items not found in this.items
            ...this.items
        ];
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    override get actions(): Action[] {

        const actions: Action[] = [];

        if (this.selected.length > 0) {
            if(this.allowOr){
                actions.push(this.filterItemsOr);
            }
            if(this.allowAnd && this.selected.length > 1){
                actions.push(this.filterItemsAnd);
            }
            if(this.allowExclude){
                actions.push(this.excludeItems);
            }
        }

        if(this.data?.$filtered.length) {
            actions.push(this.clearFilters);
        }

        if(this.searchable && !this.alwaysShowSearch){
            actions.push(this.searchItems);
        }

        return actions;
    }


    // Filtered items

    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item: AggregationItem, event?: Event) {
        if (!item.$filtered) {
            this.addFilter(item, {replaceCurrent: this.replaceCurrent});
        }
        else {
            this.removeFilter(item);
        }
        event?.stopPropagation();
        return false;
    }

    addFilter(item: AggregationItem|AggregationItem[], options: AddFilterOptions) {
        if(this.data) {
            this.facetService.addFilterSearch(this.data, item, options, this.query, this.name);
        }
    }

    removeFilter(item: AggregationItem) {
        if(this.data) {
            this.facetService.removeFilterSearch(this.data, item, this.query, this.name);
        }
    }

    clearAllFilters() {
        if(this.data) {
            this.facetService.clearFiltersSearch(this.data.column, true, this.query, this.name);
        }
    }

    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: AggregationItem) {
        if (!item.$filtered) {
            const index = this.selected.findIndex(i => this.compareItems(item, i));
            if (index === -1) {
                this.selected.push(item);
                item.$selected = true;
            } else {
                this.selected.splice(index, 1);
                delete item.$selected;
            }
            this.updateItems();
        }
        // Filtered items cannot be selected.
        // So, the behavior becomes equivalent to a click on the item.
        else {
            this.filterItem(item);
        }
    }

    /**
     * Called on loadMore button click
     */
    loadMore() {
        if (this.data) {
            const query = this.facetService.getDataQuery(this.results, this.query);
            const data$ = this.facetService.loadData(this.data, query)
            this.whileSearchActive(data$)
                .subscribe(() => this.updateItems());
        }
        return false; // Avoids following href
    }


    /**
     * Expand/Collapse a Tree node (the data may need to downloaded from the server)
     * @param item
     */
     open(item: TreeAggregationNode, event: Event){
        if (this.data && item.hasChildren) {
            item.$opened = !item.$opened;
            if (!item.items || item.items.length === 0) {
                item.$opening = true;
                const query = this.facetService.getDataQuery(this.results, this.query);
                this.facetService.open(this.data as TreeAggregation, item, query, true, this.name)
                    .subscribe(() => {
                        item.$opening= false;
                        this.updateItems();
                    });
            }
        }
        event.stopPropagation();
        return false; // Prevent default action
    }

    expandItems(items: TreeAggregationNode[]) {
        Utils.traverse(items, (lineage, node, level) => {
            node.$selected = false;
            if(!node.$opened && node.items?.length >= 0 && level < this.expandedLevel){
                node.$opened = true;
            }
            return false;
        });
    }

    // Suggest / Search

    get searchControl(): FormControl {
        return this.searchGroup.get("searchQuery") as FormControl;
    }

    get searchMode(): boolean {
        return !!this.searchItems.selected;
    }

    onSearch(text: string): Observable<Suggestion[] | undefined> {
        if(text.trim() === '' || !this.data) {
            return of(undefined);
        }
        return this.getSuggests(text, this.data);
    }

    clearSearch() {
        if(this.searchControl?.value) {
            this.searchControl.setValue(""); // Remove suggestions if some remain
        }
    }

    /**
     * Uses the suggestfield API to retrieve suggestions from the server
     * The suggestions "override" the data from the distribution (until search results are cleared)
     */
    getSuggests(text: string, data: Aggregation): Observable<Suggestion[]> {
        const query = this.facetService.getDataQuery(this.results, this.query);
        const suggests$ = this.facetService.suggest(text, data.column, query);
        return this.whileSearchActive(suggests$);
    }


    protected whileSearchActive<T>(observable: Observable<T>) {
        this.searchActive.next(true);
        return observable.pipe(
            finalize(() => this.searchActive.next(false))
        );
    }

    protected compareItems(a: AggregationItem, b: AggregationItem) {
        // If the aggregation is a tree, we must compare paths, as "value" has a the value for a single node
        if(this.data?.isTree) {
            return (a as TreeAggregationNode).$path === (b as TreeAggregationNode).$path;
        }
        return a.value === b.value;
    }

    protected findAndSplice(items: AggregationItem[], item: AggregationItem) {
        const index = items.findIndex(i => this.compareItems(i, item));
        if(index !== -1) {
            items.splice(index, 1);
        }
        return index !== -1;
    }

    /* AbstractFacet abstract methods */
    override isHidden(): boolean {
        return !this.data?.items?.length;
    }

}
