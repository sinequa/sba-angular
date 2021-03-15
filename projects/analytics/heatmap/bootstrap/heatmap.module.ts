import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {BsSelectionModule} from "@sinequa/components/selection";
import {BsActionModule} from "@sinequa/components/action";

import {BsTooltipComponent} from "./tooltip.component";
import {BsHeatmapComponent} from "./heatmap.component";
import {BsFacetHeatmapComponent} from "./facet-heatmap.component";
import {BsResultsHeatmapView} from "./results-heatmap-view";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,

        BsSelectionModule,
        BsActionModule
    ],
    declarations: [
        BsResultsHeatmapView,
        BsTooltipComponent,
        BsHeatmapComponent,
        BsFacetHeatmapComponent
    ],
    exports: [
        BsResultsHeatmapView,
        BsTooltipComponent,
        BsHeatmapComponent,
        BsFacetHeatmapComponent
    ]
})
export class BsHeatmapModule {
}