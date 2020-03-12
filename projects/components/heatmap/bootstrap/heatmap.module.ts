import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {BsActionModule} from "@sinequa/components/action";

import {HeatmapModule} from "../heatmap.module";
import {BsResultsHeatmapView} from "./results-heatmap-view/results-heatmap-view";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        CommonModule,
        IntlModule,

        HeatmapModule,
        BsActionModule
    ],
    declarations: [
        BsResultsHeatmapView
    ],
    exports: [
        HeatmapModule,
        BsResultsHeatmapView
    ]
})
export class BsHeatmapModule {
}