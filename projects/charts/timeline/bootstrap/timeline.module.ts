import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {UtilsModule} from "@sinequa/components/utils";
import {BsSelectionModule} from "@sinequa/components/selection";
import {BsActionModule} from "@sinequa/components/action";
import {BsHeatmapModule} from "@sinequa/components/heatmap";

import {BsTimelineComponent} from "./timeline.component";
import {BsFacetTimelineComponent} from "./facet-timeline.component";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,

        UtilsModule,
        BsSelectionModule,
        BsActionModule,
        BsHeatmapModule // We need the heatmap module for the tooltip component
    ],
    declarations: [
        BsTimelineComponent,
        BsFacetTimelineComponent
    ],
    exports: [
        BsTimelineComponent,
        BsFacetTimelineComponent
    ]
})
export class BsTimelineModule {
}