import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {NgxSliderModule} from "@angular-slider/ngx-slider";

import {IntlModule} from "@sinequa/core/intl";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";
import {BsActionModule} from "@sinequa/components/action";   // needed for sq-action-button
import {BsSearchModule} from "@sinequa/components/search";   // needed for refine facet / didyoumean
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";  // needed for refine facet

import {FacetState, ALL_FACETS, DEFAULT_FACETS, NamedFacetConfig} from "../facet.service";
import {BsRefine} from "./facet-refine/facet-refine";
import {BsFacetBar} from "./facet-bar/facet-bar";
import {BsFacetRange} from "./facet-range/facet-range";
import {BsFacetCard} from "./facet-card/facet-card";
import {BsFacetList} from "./facet-list/facet-list";
import {BsFacetFilters} from "./facet-filters/facet-filters";
import {BsFacetMultiComponent} from "./facet-multi/facet-multi.component";
import { BsFacetTagCloud } from './facet-tag-cloud/facet-tag-cloud';
import { LoadComponentModule } from "@sinequa/core/load-component";
import { FacetViewDirective } from "./facet-view.directive";
import { FacetContainerComponent } from "./facet-container/facet-container.component";
import { BsMySearch } from "./facet-mysearch/facet-mysearch";

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

        NgxSliderModule,
        LoadComponentModule,
        BsMySearch
    ],
    declarations: [
        BsFacetCard, FacetViewDirective, BsFacetList,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsFacetBar,
        BsFacetMultiComponent,
        BsFacetTagCloud,
        FacetContainerComponent
    ],
    exports: [
        BsFacetCard, FacetViewDirective, BsFacetList,
        BsFacetFilters,
        BsRefine,
        BsFacetRange, BsFacetBar,
        BsFacetMultiComponent,
        BsFacetTagCloud,
        FacetContainerComponent,
        BsMySearch
    ],
})
export class BsFacetModule {
    public static forRoot(allFacets?: NamedFacetConfig[], defaultFacets?: FacetState[]): ModuleWithProviders<BsFacetModule> {
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
