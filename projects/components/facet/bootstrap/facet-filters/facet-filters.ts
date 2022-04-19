import {Component, Input, OnChanges, OnDestroy, Type} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {FacetService} from "../../facet.service";
import {Action} from "@sinequa/components/action";
import { FacetConfig, default_facet_components } from "../../facet-config";
import { MapOf } from "@sinequa/core/base";
import { Subscription } from "rxjs";

declare interface FacetFiltersConfig extends FacetConfig<{aggregation?: string}> {}

@Component({
    selector: "sq-facet-filters",
    templateUrl: "./facet-filters.html",
    styleUrls: ["./facet-filters.scss"]
})
export class BsFacetFilters implements OnChanges, OnDestroy {
    @Input() results: Results;
    @Input() facets: FacetFiltersConfig[];
    @Input() facetComponents: MapOf<Type<any>> = default_facet_components;
    @Input() enableCustomization = false;

    @Input() autoAdjust: boolean = true;
    @Input() autoAdjustBreakpoint: string = 'xl';
    @Input() collapseBreakpoint: string = 'sm';
    @Input() rightAligned: boolean = false;
    @Input() size: string;

    filters: Action[] = [];
    hidden: boolean = false;

    sub: Subscription;

    constructor(
        private facetService: FacetService
    ) {
        this.hidden = false;
        this.filters = [];
    }

    ngOnChanges() {
        if (this.enableCustomization) {
            if (!this.facetService.defaultFacets) {
                this.facetService.defaultFacets = this.facets.map(
                    facet => ({name: facet.name, position: 0})
                );
            }

            if (!this.facetService.allFacets) {
                this.facetService.allFacets = this.facets;
            }
        }

        if(this.results) {
            this.buildFilters();
        }
        else {
            this.hidden=true;
        }

        if(!this.sub) {
            this.sub = this.facetService.changes.subscribe(() => this.buildFilters());
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /**
     * Build filters bar actions
     */
    protected buildFilters() {

        // For each facet
        this.filters = this.filteredFacets.map((facet: FacetFiltersConfig) => {

            const children = [
                new Action({
                    component: this.facetComponents[facet.type],
                    componentInputs: {
                        ...facet.parameters,
                        name: facet.name,
                        results: this.results,
                        displayActions: true
                    }
                })
            ];

            const disabled = !this.hasData(facet);
            const filtered = this.hasFiltered(facet.name);

            return new Action({
                name: facet.name,
                text: facet.title,
                title: facet.title,
                icon: facet.icon,
                disabled,
                styles: `${facet.className || ''} ${filtered? "filtered" : disabled? "disabled" : ''}`,
                children: children
            });
        });

        if (this.enableCustomization) {
          this.filters.unshift(this.facetService.createFacetMenu());
        }
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
    protected hasData(facet: FacetFiltersConfig): boolean {
        if(!facet.parameters?.aggregation) return false;
        return this.facetService.hasData(facet.parameters.aggregation, this.results);
    }


    get filteredFacets() {
        const filtered = this.facets.filter(facet => this.facetService.isFacetIncluded(facet, this.results))

        if (!this.enableCustomization) return filtered;

        const new_facets: FacetFiltersConfig[] = [];

        if (this.userFacets) {
            for (const facet of filtered) {
                const pos = this.userFacets.findIndex((userFacet) => userFacet.name === facet.name);
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
            if (this.userFacets.find(userFacet => userFacet.name === facet.name)) return true;
        }
        return false;
    }
}
