import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    AreaChartModule,
    BarChartModule,
    PieChartModule,
    TreeMapModule,
    NumberCardModule,
    GaugeModule} from "@swimlane/ngx-charts";
import {Ng5SliderModule} from "ng5-slider";

import {IntlModule} from "@sinequa/core/intl";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";
import {BsActionModule} from "@sinequa/components/action";   // needed for sq-action-button
import {BsSearchModule} from "@sinequa/components/search";   // needed for refine facet / didyoumean
import {BsAutocompleteModule} from "@sinequa/components/autocomplete";  // needed for refine facet

import {BsChart} from "./chart/chart";
import {BsFacetChart} from "./facet-chart/facet-chart";

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

        // ngx-charts
        //NgxChartsModule
        AreaChartModule,
        BarChartModule,
        PieChartModule,
        TreeMapModule,
        NumberCardModule,
        GaugeModule,     
        Ng5SliderModule
    ],
    declarations: [
        BsChart, BsFacetChart, BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar, 
        BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters, BsFacetFiltersBackground,
        BsFacetMultiComponent
    ],
    exports: [
        BsChart, BsFacetChart, BsRefine,
        BsFacetRange, BsMySearch, BsFacetBar, 
        BsFacetCard, BsFacetList, BsFacetTree,
        BsFacetFilters,
        BsFacetMultiComponent
    ],
})
export class BsFacetModule {    
    public static forRoot(allFacets: any[] = [], defaultFacets: FacetState[] = []): ModuleWithProviders {
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
