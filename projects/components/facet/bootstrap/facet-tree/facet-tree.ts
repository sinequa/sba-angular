import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy} from "@angular/core";
import {Results, TreeAggregation, AggregationItem, TreeAggregationNode} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from "rxjs/operators";

@Component({
    selector: "sq-facet-tree",
    templateUrl: "./facet-tree.html",
    styleUrls: ["./facet-tree.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsFacetTree extends AbstractFacet implements OnChanges {
    @Input() name: string; // If ommited, the aggregation name is used
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() allowExclude: boolean = true; // Allow to exclude selected items
    @Input() allowOr: boolean = true; // Allow to search various items in OR mode
    @Input() searchable: boolean = true; // Allow to search for items in the facet
    @Input() expandedLevel: number = 2;
    @Input() forceMaxHeight: boolean = true; // Allow to display a scrollbar automatically on long list items
    @Input() displayActions = false;

    // Aggregation from the Results object
    data: TreeAggregation | undefined;
    originalItems: AggregationItem[] | undefined;
    
    private readonly subscriptions: Subscription[] = [];

    // Sets to keep track of selected/excluded/filtered items
    private readonly filtered = new Set<AggregationItem>();
    
    readonly selected = new Map<string,TreeAggregationNode>();

    hiddenSelected: TreeAggregationNode[] = [];
    // TODO keep track of excluded terms and display them with specific color private
    // readonly filtered = new Set<AggregationItem>();

    // Search
    myGroup: FormGroup;
    searchQuery: FormControl; // ngModel for textarea
    suggestDelay = 200;
    searchActive = false;
    noResults = false;
    
    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly filterItemsOr: Action;
    private readonly excludeItems: Action;
    private readonly clearFilters: Action;
    public readonly searchItems: Action;


    constructor(
        private facetService: FacetService,
        private changeDetectorRef: ChangeDetectorRef){
            super();

            this.myGroup = new FormGroup({
                searchQuery: new FormControl()
            });
    
            this.searchQuery = this.myGroup.get("searchQuery") as FormControl;
            this.subscriptions["suggest"] = this.suggest$(this.searchQuery.valueChanges)
                .subscribe(values => {
                    if(this.data) {
                        let items = this.searchQuery.value? values : this.originalItems;
                        this.data = {
                            column: this.data.column,
                            name: this.data.name,
                            isTree: true,
                            items
                        }
                        // Refresh hiddenSelected list when the list of items is updated
                        this.refreshHiddenSelected();
                        this.searchActive = false;
                        this.changeDetectorRef.markForCheck();
                    }
                });
    
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
                action: (item, event) => {
                    item.selected = !item.selected;
                    if(!item.selected){
                        this.clearSearch();
                    }
                    event.stopPropagation();
                    this.changeDetectorRef.markForCheck();
                }
            });
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
        if (this.showCount === undefined) this.showCount = true;
        if (this.searchable === undefined) this.searchable = true;
        if (this.allowExclude === undefined) this.allowExclude = true;
        if (this.allowOr === undefined) this.allowOr = true;

        if (!!changes["results"]) {     // New data from the search service
            this.filtered.clear();
            this.selected.clear();
            this.hiddenSelected.length = 0;
            this.data = this.facetService.getAggregation(this.aggregation, this.results, {
                facetName: this.getName(),
                levelCallback: this.initNodes
            });
            this.originalItems = this.data?.items;
            this.searchItems.selected = false;
            this.clearSearch();
        }
    }

    // For each new node, set up properties necessary for display
    // This callback could also be used to filter or sorts nodes, etc.
    @Input()
    initNodes = (nodes: TreeAggregationNode[], level: number, node: TreeAggregationNode) => {
        if(node.$filtered){
            this.filtered.add(node);
        }
        if(node.hasChildren && !node.$opened && node.items && node.items.length >= 0 && level <= this.expandedLevel){
            node.$opened = true;
        }
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions(): Action[] {

        const actions: Action[] = [];

        if(this.selected.size > 0) {
            if(this.allowOr){
                actions.push(this.filterItemsOr);
            }
            if(this.allowExclude){
                actions.push(this.excludeItems);
            }
        }

        if(this.hasFiltered()) {
            actions.push(this.clearFilters);
        }
        
        if(this.searchable){
            actions.push(this.searchItems);
        }

        return actions;
    }


    // Filtered items

    /**
     * Returns true if the given AggregationItem is filtered
     * @param item
     */
    isFiltered(item: AggregationItem) : boolean {
        return this.filtered.has(item);
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
            if(!this.isFiltered(item)) {
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
    isSelected(item: TreeAggregationNode) : boolean {
        return this.selected.has(item.$path!);
    }

    /**
     * Returns all the selected items
     */
    getSelectedItems(): TreeAggregationNode[] {
        return Array.from(this.selected.values());
    }

    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: TreeAggregationNode) : boolean {
        if(!this.isFiltered(item)){
            if(this.selected.has(item.$path!)) {
                this.selected.delete(item.$path!);
            }
            else {
                this.selected.set(item.$path!, item);
            }
            this.refreshHiddenSelected();
        }
        return false;
    }

    refreshHiddenSelected() {
        this.hiddenSelected = this.getSelectedItems()
            .filter(item => !this.find(this.data?.items as TreeAggregationNode[], item));
    }

    find(items: TreeAggregationNode[] | undefined, item: TreeAggregationNode) {
        if(items) {
            for(let i of items) {
                if(i.$path === item.$path || (i.$opened && this.find(i.items, item))) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Expand/Collapse a Tree node (the data may need to downloaded from the server)
     * @param item
     */
    open(item: TreeAggregationNode, event: Event){
        if (item.hasChildren) {
            item.$opened = !item.$opened;
            if (!item.items || item.items.length === 0) {
                item['$opening'] = true;
                if (this.data) {
                    Utils.subscribe(this.facetService.open(this.getName(), this.data, item, this.initNodes),
                        (results) => {
                            item['$opening']= false;
                            this.refreshHiddenSelected();
                            this.changeDetectorRef.markForCheck();
                        });
                }
            }
            this.refreshHiddenSelected();
        }
        event.preventDefault();
        event.stopPropagation();
        return false; // Prevent default action
    }

    /* AbstractFacet abstract methods */
    isHidden(): boolean {
        return !this.data;
    }


    // Search    

    clearSearch() {
        this.searchQuery.setValue(""); // Remove suggestions if some remain
        this.noResults = false;
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
            this.changeDetectorRef.markForCheck();
            this.searchActive = true;
            return this.facetService.suggest(term, this.data?.column || '').pipe(
                catchError(err => {
                    console.log(err);
                    this.noResults = false;
                    return of([]);
                }),
                map(suggests => {
                    const items = this.facetService.suggestionsToTreeAggregationNodes(suggests, term, this.data);
                    this.noResults = items.length === 0 && term.trim() !== "";
                    return items;
                })
            )
        })
    )

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}