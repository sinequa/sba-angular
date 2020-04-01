import {Component, Input} from "@angular/core";
import {Results} from "@sinequa/core/web-services";
import {FacetService} from "../../facet.service";

@Component({
    selector: "sq-facet-bar",
    templateUrl: "./facet-bar.html"
})
export class BsFacetBar {
    @Input() results: Results;
    @Input() containerIndex: number = 0; // There could be various facet bars (but only one service and storage array)

    constructor(
        private facetService: FacetService) {
    }

    get facets(): any[] { // Which facets are actually displayed in this facet bar
        const facets = this.facetService.getFacets(this.containerIndex);
        return facets;
    }

}