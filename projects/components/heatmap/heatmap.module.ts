import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";
import {Heatmap} from "./heatmap.component";
import {HeatmapTooltip} from "./heatmap-tooltip.component";

@NgModule({
    imports: [
        CommonModule,
        IntlModule
    ],
    declarations: [
        Heatmap, HeatmapTooltip,
    ],
    exports: [
        Heatmap, HeatmapTooltip,
    ],
})
export class HeatmapModule {
}
