import {Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {Results, TreeAggregation, AggregationItem, TreeAggregationNode} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {AbstractFacet} from "../../abstract-facet";

@Component({
    selector: "sq-facet-tree",
    templateUrl: "./facet-tree.html",
    styles: [`
.item-opener {
    text-decoration: none !important;
}

a.filtered, a.filtered:hover {
    text-decoration: none;
    color: inherit;
    cursor: inherit;
}
`]
})
export class BsFacetTree extends AbstractFacet implements OnChanges {
    @Input() name: string; // If ommited, the aggregation name is used
    @Input() results: Results;
    @Input() aggregation: string;
    @Input() showCount: boolean = true; // Show the number of occurrences
    @Input() allowExclude: boolean = true; // Allow to exclude selected items
    @Input() allowOr: boolean = true; // Allow to search various items in OR mode
    @Input() expandedLevel: number = 2;

    // Aggregation from the Results object
    data: TreeAggregation | undefined;

    // Sets to keep track of selected/excluded/filtered items
    private readonly filtered = new Set<AggregationItem>();
    // TODO keep track of excluded terms and display them with specific color private
    // readonly filtered = new Set<AggregationItem>();

    // Actions (displayed in facet menu)
    // All actions are built in the constructor
    private readonly filterItemsOr: Action;
    private readonly excludeItems: Action;
    private readonly clearFilters: Action;


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
            this.filtered.clear();
            this.data = this.facetService.getTreeAggregation(this.getName(), this.aggregation, this.results, this.initNodes);

            this.refreshFiltered();
        }
    }

    // For each new node, set up properties necessary for display
    // This callback could also be used to filter or sorts nodes, etc.
    private initNodes = (nodes: TreeAggregationNode[], level: number, node?: TreeAggregationNode, opened?: boolean, filtered?: boolean) => {
        if (node) {
            if(filtered){
                this.filtered.add(node);
            }
            if(node.hasChildren && !opened && node.items && node.items.length >= 0 && level <= this.expandedLevel){
                node.$opened = true;
            }
        }
    }

    /**
     * Returns all the actions that are relevant in the current context
     */
    get actions(): Action[] {

        const actions: Action[] = [];

        const selected = this.getSelectedItems();

        if(selected.length > 0) {
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

        return actions;
    }


    // Filtered items

    /**
     * Actualize the state of filtered items (note that excluded terms are not in the distribution, so the equivalent cannot be done)
     */
    refreshFiltered(){
        if(this.data && this.data.items) {
            this.data.items.forEach(item => {
                if(this.data && this.facetService.itemFiltered(this.getName(), this.data, item)){
                    this.filtered.add(item);
                }
            });
        }
    }

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
    isSelected(item: AggregationItem) : boolean {
        return !!item.$selected;
    }

    /**
     * Returns all the selected items
     */
    getSelectedItems(): TreeAggregationNode[] {
        if (this.data) {
            return this._getSelectedItems(<TreeAggregationNode[]> this.data.items, []);
        }
        return [];
    }

    // Recursive helper function
    private _getSelectedItems(items: TreeAggregationNode[], selected: TreeAggregationNode[]){
        if(items){
            items.forEach(item => {
                if(this.isSelected(item))
                    selected.push(item);
                if(item.items){
                    this._getSelectedItems(item.items, selected);
                }
            });
        }
        return selected;
    }

    /**
     * Called when selecting/unselecting an item in the facet
     * @param item
     */
    selectItem(item: AggregationItem) : boolean {
        if(!this.isFiltered(item)){
            item.$selected = !item.$selected;
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
                            this.changeDetectorRef.markForCheck();
                        });
                }
            }
        }
        event.preventDefault();
        event.stopPropagation();
        return false; // Prevent default action
    }

    /* AbstractFacet abstract methods */
    isHidden(): boolean {
        return !this.data;
    }

}