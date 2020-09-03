import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Results, Select, AggregationItem, TreeAggregationNode} from "@sinequa/core/web-services";
import {AppService, Expr} from "@sinequa/core/app-utils";
import {Utils} from "@sinequa/core/base";
import {FacetService} from "../../facet.service";
import { Action } from "@sinequa/components/action";
import {SearchService} from "@sinequa/components/search";
import { FacetConfig } from '../facet-multi/facet-multi.component';

@Component({
    selector: "sq-facet-filters",
    templateUrl: "./facet-filters.html",
    styleUrls: ["./facet-filters.css"]
})
export class BsFacetFilters implements OnChanges {
    @Input() results: Results;
    @Input() facets: FacetConfig[];
    @Input() enableAddFacet = true;
    @Input() itemCount: number = 5;
    
    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = 'xl';
    @Input() rightAligned: boolean = false;
    @Input() size: string;

    filters : Action[];
    hidden: boolean;

    facetStatus = {
        add : {
            title : "msg#facet.filters.add",
            icon  : "fas fa-plus"
        },
        remove : {
            title : "msg#facet.filters.remove",
            icon  : "fas fa-minus"
        }
    };

    constructor(
        public appService: AppService,
        public searchService: SearchService,
        private facetService : FacetService
    ) {
        this.hidden = false;
        this.filters = [];
    }

    ngOnChanges(changes : SimpleChanges) {
        if(!!this.results)
            this.buildFilters();

        if(!this.results)
            this.hidden=true;
    }

    //Returns the top 5 element for a given aggregation as an Action object
    getChildren(CCFacetItem: FacetConfig, previousActions: Action[]): Action[] {

        let childrenActions: Action[] = [];
        const aggregationName = CCFacetItem.aggregation;
        const facetName = CCFacetItem.name || aggregationName;
        const aggregation = this.results.aggregations.find(x => x.name === aggregationName);

        if(Utils.isUndefined(aggregation)) return [];

        // Get facet data
        let items: AggregationItem[] | undefined;
        if (aggregation.isTree) {
            const _aggregation = this.facetService.getTreeAggregation(facetName, aggregationName, this.results);
            if (_aggregation) {
                items = _aggregation.items;
            }
        }
        else {
            const _aggregation = this.facetService.getAggregation(aggregationName, this.results);
            if (_aggregation) {
                items = _aggregation.items;
            }
        }

        if(Utils.isUndefined(items)) return [];

        items = this.unpackChildren(items); // Flattening tree items

        // Remove already filtered iteams
        items = items.filter(item => previousActions.find(a => a.name === (item.value as string)) === undefined); // Filter out items which are already selected

        if(items.length === 0) return [];

        // Keep top values
        const topValues = (items.slice(0,this.itemCount).length === 0) ?  items : items.slice(0,this.itemCount);

        // Create select actions
        childrenActions = topValues.map(item => {
            const display : string = (item.display == null) ? item.value as string : item.display;
            const count : string = item.count? " ("+item.count+")" : "";
            return new Action({
                name: item.value as string,
                text: display,
                title: "Select "+display+count,
                action: () => {
                    const _aggregation = this.results.aggregations.find(x => x.name === aggregationName);
                    if (_aggregation) {
                        this.facetService.addFilterSearch(facetName, _aggregation, item);
                    }
                },
            });
        }, this);

        return childrenActions;
    }

    //Build filters bar : getting children and adding extra option (add/clear filter)
    buildFilters(){

        // For each facet
        this.facets.forEach((facet : FacetConfig) => {

            const childrenActions : Action[] = [];

            if(this.searchService.query.select)
                this.searchService.query.select
                    .filter(s => s.facet === facet.name) // Look for this facet in the selects
                    .map(s => this.removeSelect(s)) // Make a Remove select action for this facet
                    .forEach(a => childrenActions.push(a)); // Add it to the list of actions for this facet

            if(childrenActions.length > 0)
                childrenActions.push(new Action({ separator: true }));

            this.getChildren(facet, childrenActions)
                .forEach(a => childrenActions.push(a));

            if(childrenActions.length === 0){
                return;
            }

            if(this.enableAddFacet) {

                childrenActions.push(new Action({ separator: true }));

                const isOpened = this.facetService.isFacetOpened(facet.name);

                childrenActions.push(new Action({
                    name: "toggle-facet",
                    icon: isOpened? this.facetStatus.remove.icon : this.facetStatus.add.icon,
                    text: isOpened? this.facetStatus.remove.title : this.facetStatus.add.title,
                    title: isOpened? this.facetStatus.remove.title : this.facetStatus.add.title,
                    data: facet,
                    action: (ActionItem: Action, $event: UIEvent) => {
                        this.onClickToggleFacet(ActionItem,$event);
                    }
                }));

            }

            this.updateOrInitFilter(new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                children: childrenActions,
            }),this.filters.find(x => x.name === facet.name));

            return;
        });
    }

    onClickToggleFacet(item: Action, $event: UIEvent){

        const facet = item.data as any;

        if(item.title === this.facetStatus.add.title){
            item.text = item.title = this.facetStatus.remove.title;
            item.icon = this.facetStatus.remove.icon;
            this.facetService.addFacet({name:facet.name, position:0, hidden:false, expanded:true, view:""});
        }
        else{
            item.text = item.title =  this.facetStatus.add.title;
            item.icon = this.facetStatus.add.icon;
            this.facetService.removeFacet({name:facet.name, position:0, hidden:false, expanded:true, view:""});
        }

    }

    unpackChildren(items: AggregationItem[]): AggregationItem[] {
        const newItems: AggregationItem[] = [];
        items.forEach(item => {
            if ((item as TreeAggregationNode).items) {
                const unpackedItems = this.unpackChildren((item as TreeAggregationNode).items);
                unpackedItems
                    .forEach(upi => {
                        upi.display = (item.display || item.value) + " â€º "+ (upi.display || upi.value);
                        //upi.value = "/"+item.value+(upi.value.startsWith("/")? upi.value : "/"+upi.value+"/*");
                        newItems.push(upi);
                    });
            }
            else {
                newItems.push(Utils.copy(item));
            }
        });
        return newItems;
    }

    // TODO: Refactor to avoid unclear pop/push
    updateOrInitFilter(item: Action, current: Action | undefined): void {
        const index = current && this.filters.indexOf(current);
        if(current && index !== -1) {
            if(this.enableAddFacet){
                item.children.pop();
                const child = current.children.pop();
                if (child) {
                    item.children.push(child);
                }
            }
            this.filters[this.filters.indexOf(current)] = item;
            return;
        }
        this.filters.push(item);
    }

    removeSelect(select: Select): Action {

        const expr = this.appService.parseExpr(select.expression) as Expr;
        const display = expr.display || expr.value;

        return new Action({
            name: expr.value,
            text: display,
            title: "Unselect "+display,
            icon: this.facetStatus.remove.icon,
            action: () => {
                if (this.searchService.query.select) {
                    this.searchService.removeSelect(this.searchService.query.select.indexOf(select));
                }
            },
        });
    }

}
