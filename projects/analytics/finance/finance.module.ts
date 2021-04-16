import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { UtilsModule } from "@sinequa/components/utils";
import { MoneyTimelineComponent } from "./money-timeline/money-timeline.component";
import { BsHeatmapModule } from "@sinequa/analytics/heatmap";
import { BsActionModule } from "@sinequa/components/action";
import { MoneyCloudComponent } from "./money-cloud/money-cloud.component";


@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsHeatmapModule,
        BsActionModule
    ],
    declarations: [
        MoneyTimelineComponent,
        MoneyCloudComponent
    ],
    exports: [
        MoneyTimelineComponent,
        MoneyCloudComponent
    ],
})
export class FinanceModule {}