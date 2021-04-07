import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { UtilsModule } from "@sinequa/components/utils";
import { MoneyTimelineComponent } from "./money-timeline/money-timeline.component";
import { BsHeatmapModule } from "@sinequa/analytics/heatmap";
import { BsActionModule } from "@sinequa/components/action";


@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsHeatmapModule,
        BsActionModule
    ],
    declarations: [
        MoneyTimelineComponent
    ],
    exports: [
        MoneyTimelineComponent
    ],
})
export class FinanceModule {}