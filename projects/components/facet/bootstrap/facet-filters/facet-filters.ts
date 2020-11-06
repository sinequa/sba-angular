import {Component, Input, OnChanges} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import {FacetConfig} from '../facet-multi/facet-multi.component';
import {BsFacetList} from '../facet-list/facet-list';
import {BsFacetTree} from '../facet-tree/facet-tree';

@Component({
    selector: "sq-facet-filters",
    templateUrl: "./facet-filters.html",
    styleUrls: ["./facet-filters.css"]
})
export class BsFacetFilters implements OnChanges {
    @Input() results: Results;
    @Input() facets: FacetConfig[];
    @Input() enableAddFacet = false;

    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = 'xl';
    @Input() rightAligned: boolean = false;
    @Input() size: string;

    filters: Action[] = [];
    hidden: boolean = false;

    facetStatus = {
        add: {
            title: "msg#facet.filters.add",
            icon: "fas fa-plus"
        },
        remove: {
            title: "msg#facet.filters.remove",
            icon: "fas fa-minus"
        }
    };

    constructor(
        private facetService: FacetService
    ) {
        this.hidden = false;
        this.filters = [];
    }

    ngOnChanges() {
        if(!!this.results)
            this.buildFilters();

        if(!this.results)
            this.hidden=true;
    }

    /**
     * Build filters bar actions
     */
    private buildFilters() {

        // For each facet
        this.filters = this.facets.map((facet: FacetConfig) => {

            const children = [
                new Action({
                    component: (facet.type === 'list') ? BsFacetList : BsFacetTree,
                    componentInputs: {results: this.results, name: facet.name, aggregation: facet.aggregation, searchable: facet.searchable, displayActions: true}
                })
            ];

            if (this.enableAddFacet) {
                const isOpened = this.facetService.isFacetOpened(facet.name);

                children.push(...[
                    new Action({separator: true}),
                    new Action({
                    name: "toggle-facet",
                    icon: isOpened ? this.facetStatus.remove.icon : this.facetStatus.add.icon,
                    text: isOpened ? this.facetStatus.remove.title : this.facetStatus.add.title,
                    title: isOpened ? this.facetStatus.remove.title : this.facetStatus.add.title,
                    data: facet,
                    action: (ActionItem: Action, $event: UIEvent) => {
                        this.onClickToggleFacet(ActionItem, $event);
                    }
                })]);
            }

            return new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled: !this.hasData(facet),
                styles: this.hasFiltered(facet.name) ? "ml-2 font-weight-bold" : "ml-2",
                children: children
            });
        });
    }

    onClickToggleFacet(item: Action, $event: UIEvent) {

        const facet = item.data as any;

        if (item.title === this.facetStatus.add.title) {
            item.text = item.title = this.facetStatus.remove.title;
            item.icon = this.facetStatus.remove.icon;
            this.facetService.addFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
        }
        else {
            item.text = item.title = this.facetStatus.add.title;
            item.icon = this.facetStatus.add.icon;
            this.facetService.removeFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
        }
    }

    /**
     * Use to outline facet when filters are sets
     * @param facetName facet name
     *
     * @returns true if filters are sets otherwise false
     */
    private hasFiltered(facetName): boolean {
        return this.facetService.hasFiltered(facetName);
    }

    /**
     * Use to disable menu item when no items in a facet
     * @param facet facet to check
     *
     * @returns true if facet contains at least one item otherwise false
     */
    private hasData(facet: FacetConfig): boolean {
        return this.facetService.hasData(facet, this.results);
    }

}
