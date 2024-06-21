import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, finalize, of, switchMap } from 'rxjs';

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from '@angular/forms';


import { SearchService } from "@sinequa/components/search";
import { Query } from "@sinequa/core/app-utils";
import { Utils } from "@sinequa/core/base";
import { Aggregation, AggregationItem, ListAggregation, Results, Suggestion, TreeAggregation, TreeAggregationNode } from "@sinequa/core/web-services";

import { AbstractFacet } from "../../abstract-facet";
import { FacetConfig } from "../../facet-config";
import { AddFilterOptions, FacetService } from "../../facet.service";

export interface FacetListParams {
    showCount?: boolean;
    searchable?: boolean;
    focusSearch?: boolean;
    allowExclude?: boolean;
    allowOr?: boolean;
    allowAnd?: boolean;
    displayEmptyDistributionIntervals?: boolean;
    acceptNonAggregationItemFilter?: boolean;
    replaceCurrent?: boolean;
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
export class BsFacetList extends AbstractFacet implements FacetListParams, OnChanges, OnDestroy, AfterViewInit {
    @Input() name: string; // If omitted, the aggregation name is used
    @Input() results: Results;
    @Input() query?: Query;
    @Input() aggregation: string;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() searchable: boolean = true; // Allow to search for items in the facet
    @Input() focusSearch: boolean = false;
    @Input() allowExclude: boolean = true; // Allow to exclude selected items
    @Input() allowOr: boolean = true; // Allow to search various items in OR mode
    @Input() allowAnd: boolean = false; // Allow to search various items in AND mode
    @Input() displayEmptyDistributionIntervals: boolean = false; // If the aggregation is a distribution, then this property controls whether empty distribution intervals will be displayed
    @Input() acceptNonAggregationItemFilter = true; // when false, filtered items which don't match an existing aggregation item, should not be added to filtered list
    @Input() replaceCurrent = false; // if true, the previous "select" is removed first
    // Specific to tree facets
    @Input() expandedLevel: number = 2;

    @ViewChild("searchInput") searchInput: ElementRef<HTMLInputElement>;

    /**
     * Template used with content projection strategy, allowing user to customize each list item
     * When not set, the default list item renderer is used.
     *
     * @example
     * ```typescript
     * <sq-facet-list [results]="results" aggregation="Person">
     *   <ng-template #itemTpl let-item>
     *      <li>{{ item.value }}</li>
     *   <ng-template>
     * </sq-facet-list>
     * ```
     */
    @ContentChild("itemTpl", { static: true, read: TemplateRef}) public itemTpl?: TemplateRef<any>;

    items: (AggregationItem | TreeAggregationNode)[] = [];

    data: ListAggregation | TreeAggregation | undefined;
    suggests: Suggestion[] | undefined;
    selected: AggregationItem[] = [];

    // Search
    searchGroup: FormGroup<{searchQuery: FormControl<string>}>;
    suggestDelay = 200;
    searchActive = new Subject<boolean>();

    showCheckbox = false;

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
        if (this.allowAnd === undefined) this.allowAnd = false;
        this.showCheckbox = this.allowOr || this.allowAnd || this.allowExclude;

        if (changes.results || changes.aggregation) {     // New data from the search service
            this.data = this.facetService.getAggregation(this.aggregation, this.results);
            if(this.data?.isTree && this.data.items) {
                this.expandItems(this.data.items as TreeAggregationNode[]);
            }
            this.data?.items?.forEach(item => item.$selected = false); // Reinitialize the source aggregation's selected items
            this.selected = [];
            this.clearSearch();
            this.updateItems();
        }
    }

    sub: Subscription = new Subscription();
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        if(this.focusSearch) {
            this.searchInput?.nativeElement.focus();
        }
    }

    updateItems() {
        if(!this.data) {
            this.items = [];
            return;
        }

        if (this.searchable && this.suggests) {
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
                lineage.filter(n => n.items?.length && n !== node).forEach(n => n.$opened = true);
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


    // Filtered items

    /**
     * Called when clicking on a facet item text
     * @param item
     * @param event
     */
    filterItem(item: AggregationItem, event?: Event) {
        if (!item.$filtered) {
            this.addFilter(item);
        }
        else {
            this.removeFilter(item);
        }
        event?.stopPropagation();
        return false;
    }

    addFilter(item: AggregationItem|AggregationItem[], options: AddFilterOptions = {}) {
        if(this.data) {
            options.replaceCurrent = this.replaceCurrent;
            if(!this.allowOr && this.allowAnd) {
              options.and = true; // The default mode is OR, unless explicitly forbidden
            }
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
     * Uses the `suggestfield` API to retrieve suggestions from the server
     * The suggestions **override** the data from the distribution (until search results are cleared)
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
