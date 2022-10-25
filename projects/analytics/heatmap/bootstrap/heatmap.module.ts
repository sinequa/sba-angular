import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {BsSelectionModule} from "@sinequa/components/selection";
import {BsActionModule} from "@sinequa/components/action";

import {BsHeatmapComponent} from "./heatmap.component";
import {BsFacetHeatmapComponent} from "./facet-heatmap.component";
import {BsResultsHeatmapView} from "./results-heatmap-view";
import { BsTooltipComponent } from "@sinequa/analytics/tooltip";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,
        BsTooltipComponent,
        BsSelectionModule,
        BsActionModule
    ],
    declarations: [
        BsResultsHeatmapView,
        BsHeatmapComponent,
        BsFacetHeatmapComponent
    ],
    exports: [
        BsResultsHeatmapView,
        BsHeatmapComponent,
        BsFacetHeatmapComponent
    ]
})
export class BsHeatmapModule {
}
