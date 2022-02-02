import { Component, ComponentRef, Input } from "@angular/core";
import { MapOf } from "@sinequa/core/base";
import { Results } from "@sinequa/core/web-services";
import { FacetConfig } from "../../facet-config";
import { BsFacetCard } from "../facet-card/facet-card";
import { AbstractFacet } from '../../abstract-facet';
import { FacetService } from "../../facet.service";

@Component({
    selector: "sq-facet-bar",
    templateUrl: "./facet-bar.html",
})
export class BsFacetBar {
    @Input() results: Results;
    @Input() containerIndex: number = 0; // There could be various facet bars (but only one service and storage array)
    @Input() facetComponents: MapOf<any> = {};

    constructor(public facetService: FacetService) {}

    get facets(): any[] {
        // Which facets are actually displayed in this facet bar
        const facets = this.facetService.getFacets(this.containerIndex);
        return facets;
    }

    onFacetLoad(facetCard: BsFacetCard, componentRef: {componentRef: ComponentRef<AbstractFacet> | undefined;}) {
        facetCard._facetComponent = componentRef?.componentRef?.instance!;
    }

    getFacetInputs(facet: FacetConfig): MapOf<any> {
        return {
            ...this.facetService.flattenFacetConfig(facet),
            results: this.results,
        };
    }

    getComponent(type: string) {
        return this.facetComponents ? this.facetComponents[type] : undefined
    }
}
