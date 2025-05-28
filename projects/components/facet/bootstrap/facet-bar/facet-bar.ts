import { Component, ComponentRef, Input, Type } from "@angular/core";
import { MapOf } from "@sinequa/core/base";
import { Results } from "@sinequa/core/web-services";
import { FacetConfig, DEFAULT_FACET_COMPONENTS } from "../../facet-config";
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
    @Input() facetComponents: MapOf<Type<any>> = DEFAULT_FACET_COMPONENTS;

    constructor(public facetService: FacetService) {}

    get facets(): FacetConfig<{}>[] {
        // Which facets are actually displayed in this facet bar
        return this.facetService.getFacets(this.containerIndex, this.results);
    }

    onFacetLoad(facetCard: BsFacetCard, componentRef: {componentRef: ComponentRef<AbstractFacet> | undefined;}) {
        facetCard._facetComponent = componentRef?.componentRef?.instance!;
    }

    getFacetInputs(facet: FacetConfig<{}>): MapOf<any> {
        return {
            ...facet.parameters,
            name: facet.name,
            aggregation: facet.aggregation,
            results: this.results
        };
    }

    getComponent(type: string) {
        return this.facetComponents ? this.facetComponents[type] : undefined
    }
}
