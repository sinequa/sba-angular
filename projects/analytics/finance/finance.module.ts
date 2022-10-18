import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from '@sinequa/core/intl';
import { UtilsModule } from "@sinequa/components/utils";
import { BsTooltipComponent } from "@sinequa/analytics/tooltip";
import { MoneyTimelineComponent } from "./money-timeline/money-timeline.component";
import { BsActionModule } from "@sinequa/components/action";
import { MoneyCloudComponent } from "./money-cloud/money-cloud.component";


@NgModule({

    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        BsTooltipComponent,
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
