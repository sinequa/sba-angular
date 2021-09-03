import {Component, Input, OnChanges, OnInit} from "@angular/core";
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
export class BsFacetFilters implements OnInit, OnChanges {
    @Input() results: Results;
    @Input() facets: FacetConfig[];
    @Input() enableCustomization = false;

    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = 'xl';
    @Input() collapseBreakpoint: string = 'sm';
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

    ngOnInit() {
        if (!this.enableCustomization) return;

        if (!this.facetService.defaultFacets) {
            this.facetService.defaultFacets = [];
            for (let facet of this.facets) this.facetService.defaultFacets.push({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
        }

        if (!this.facetService.allFacets) this.facetService.allFacets = this.facets;
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
        this.filters = this.filteredFacets.map((facet: FacetConfig) => {

            const children = [
                new Action({
                    component: (facet.type === 'list') ? BsFacetList : BsFacetTree,
                    componentInputs: {results: this.results, name: facet.name, aggregation: facet.aggregation, searchable: facet.searchable, displayActions: true}
                })
            ];

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

        if (this.enableCustomization) this.addFacetMenu();
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
        return this.facetService.hasData(facet.aggregation, this.results);
    }

    private addFacetMenu() {
        let outFacets: Action[] = [];

        outFacets.push(new Action({
            name: `add_remove_all`,
            text: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            icon: this.hasFacetSelected ? 
                    (this.userFacets.length < this.facets.length ? "far fa-minus-square mr-1" : "far fa-check-square mr-1")
                    : "far fa-square mr-1",
            title: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            action: () => {
                if (this.hasFacetSelected && this.userFacets.length === this.facets.length) this.facetService.removeAllFacet();
                else this.facetService.addAllFacet();
                this.buildFilters();
            }
        }));

        for (let facet of this.facets) {
            outFacets.push(new Action({
                name: `add_remove_${facet.name}`,
                text: facet.title,
                icon: facet.icon,
                selected: !!this.userFacets?.find(userFacet => userFacet.name === facet.name),
                title: !!this.userFacets?.find(userFacet => userFacet.name === facet.name) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
                action: () => {
                    if (this.userFacets?.find(userFacet => userFacet.name === facet.name)) this.facetService.removeFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""})
                    else this.facetService.addFacet({name: facet.name, position: 0, hidden: false, expanded: true, view: ""});
                    this.buildFilters();
                }
            }));
        }

        let add_action = new Action({
            name: "facets_config",
            icon: "fas fa-cog",
            title: "msg#facet.filters.customizeFacets",
            children: outFacets
        });
        this.filters = [add_action, ...this.filters]; 
    }

    get filteredFacets() {
        if (!this.enableCustomization) return this.facets;
        let new_facets: FacetConfig[] = [];

        if (this.userFacets) {
            for (let facet of this.facets) {
                let pos = this.userFacets.findIndex((userFacet) => userFacet.name === facet.name);
                if (pos >= 0) new_facets.push(facet);
            }
        }
        return new_facets;
    }

    get userFacets() {
        return this.facetService.facets;
    }

    get hasFacetSelected() {
        if (this.userFacets.length === 0) return false;
        for (let facet of this.facets) {
            if (this.userFacets.find(userFacet => userFacet.name === facet.name)) return true;
        }
        return false;
    }
}
