import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {Ng5SliderModule} from "ng5-slider";

import {IntlModule} from "@sinequa/core/intl";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";
import {BsActionModule} from "@sinequa/components/action";   // needed for sq-action-button
import {BsSearchModule} from "@sinequa/components/search";   // needed for refine facet / didyoumean
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";  // needed for refine facet

import {FacetState, ALL_FACETS, DEFAULT_FACETS} from "../facet.service";
import {BsRefine} from "./facet-refine/facet-refine";
import {BsFacetBar} from "./facet-bar/facet-bar";
import {BsMySearch} from "./facet-mysearch/facet-mysearch";
import {BsFacetRange} from "./facet-range/facet-range";
import {BsFacetCard} from "./facet-card/facet-card";
import {BsFacetList} from "./facet-list/facet-list";
import {BsFacetTree} from "./facet-tree/facet-tree";
import {BsFacetFilters} from "./facet-filters/facet-filters";
import {BsFacetFiltersBackground} from "./facet-filters-background/facet-filters-background";
import {BsFacetMultiComponent} from "./facet-multi/facet-multi.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        IntlModule,

        UtilsModule,
        CollapseModule,
        BsActionModule,
        BsSearchModule,
        BsAutocompleteModule,

        Ng5SliderModule
    ],
    declarations: [
        BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters, BsFacetFiltersBackground,
        BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar,
        BsFacetMultiComponent
    ],
    exports: [
        BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar,
        BsFacetMultiComponent
    ],
})
export class BsFacetModule {
    public static forRoot(allFacets: any[] = [], defaultFacets: FacetState[] = []): ModuleWithProviders<BsFacetModule> {
        return {
            ngModule: BsFacetModule,
            providers: [
                {
                    provide: ALL_FACETS,
                    useValue: allFacets
                },
                {
                    provide: DEFAULT_FACETS,
                    useValue: defaultFacets
                },
            ]
        };
    }
}
