import {Component, Input, OnChanges, OnInit, Type} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import { FacetConfig } from "../../facet-config";
import { MapOf } from "@sinequa/core/base";
import { BsFacetList } from "../facet-list/facet-list";
import { BsFacetTree } from "../facet-tree/facet-tree";

@Component({
    selector: "sq-facet-filters",
    templateUrl: "./facet-filters.html",
    styleUrls: ["./facet-filters.scss"]
})
export class BsFacetFilters implements OnInit, OnChanges {
    @Input() results: Results;
    @Input() facets: FacetConfig[];
    @Input() facetComponents: MapOf<Type<any>> =  {"list": BsFacetList, "tree": BsFacetTree};
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
            for (const facet of this.facets) this.facetService.defaultFacets.push({name: this.getName(facet), position: 0, hidden: false, expanded: true});
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
     * Name of the facet, used to retrieve selections
     * through the facet service.
     */
     getName(facet: FacetConfig) : string {
        return facet.parameters?.name || facet.parameters?.aggregation;
    }

    /**
     * Build filters bar actions
     */
    protected buildFilters() {

        // For each facet
        this.filters = this.filteredFacets.map((facet: FacetConfig) => {

            const children = [
                new Action({
                    component: this.facetComponents[facet['type']],
                    componentInputs: {
                        results: this.results,
                        ...(facet.parameters || {})
                    }
                })
            ];

            const disabled = !this.hasData(facet);
            const filtered = this.hasFiltered(this.getName(facet));

            return new Action({
                name: this.getName(facet),
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled,
                styles: filtered? "filtered" : disabled? "disabled" : undefined,
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
    protected hasFiltered(facetName): boolean {
        return this.facetService.hasFiltered(facetName);
    }

    /**
     * Use to disable menu item when no items in a facet
     * @param facet facet to check
     *
     * @returns true if facet contains at least one item otherwise false
     */
    protected hasData(facet: FacetConfig): boolean {
        return this.facetService.hasData(facet.parameters?.aggregation, this.results);
    }

    protected addFacetMenu() {
        const outFacets: Action[] = [];

        outFacets.push(new Action({
            name: `add_remove_all`,
            text: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            icon: this.hasFacetSelected ?
                    (this.userFacets.length < this.facets.length ? "far fa-minus-square me-1" : "far fa-check-square me-1")
                    : "far fa-square me-1",
            title: this.userFacets.length < this.facets.length ? "msg#facet.filters.addAll" : "msg#facet.filters.removeAll",
            action: () => {
                if (this.hasFacetSelected && this.userFacets.length === this.facets.length) this.facetService.removeAllFacet();
                else this.facetService.addAllFacet();
                this.buildFilters();
            }
        }));

        for (const facet of this.facets) {
            outFacets.push(new Action({
                name: `add_remove_${this.getName(facet)}`,
                text: facet.title,
                icon: facet.icon,
                selected: !!this.userFacets?.find(userFacet => userFacet.name === this.getName(facet)),
                title: !!this.userFacets?.find(userFacet => userFacet.name === this.getName(facet)) ? "msg#facet.filters.add" : "msg#facet.filters.remove",
                action: () => {
                    if (this.userFacets?.find(userFacet => userFacet.name === this.getName(facet))) this.facetService.removeFacet({name: this.getName(facet), position: 0, hidden: false, expanded: true})
                    else this.facetService.addFacet({name: this.getName(facet), position: 0, hidden: false, expanded: true});
                    this.buildFilters();
                }
            }));
        }

        const add_action = new Action({
            name: "facets_config",
            icon: "fas fa-cog",
            title: "msg#facet.filters.customizeFacets",
            children: outFacets
        });
        this.filters = [add_action, ...this.filters];
    }

    get filteredFacets() {
        const filtered = this.facets.filter(facet => (!facet.includedTabs || facet.includedTabs.includes(this.results.tab)) && !facet.excludedTabs?.includes(this.results.tab))

        if (!this.enableCustomization) return filtered;

        const new_facets: FacetConfig[] = [];

        if (this.userFacets) {
            for (const facet of filtered) {
                const pos = this.userFacets.findIndex((userFacet) => userFacet.name === this.getName(facet));
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
        for (const facet of this.facets) {
            if (this.userFacets.find(userFacet => userFacet.name === this.getName(facet))) return true;
        }
        return false;
    }
}
