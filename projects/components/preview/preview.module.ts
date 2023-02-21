import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";
import {WebServicesModule} from "@sinequa/core/web-services";
import {UtilsModule} from "@sinequa/components/utils";
import {BsSearchModule} from "@sinequa/components/search";
import {PreviewTooltip} from "./preview-tooltip.component";
import {PreviewTest} from "./preview.component";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        WebServicesModule,
        UtilsModule,
        BsSearchModule
    ],
    declarations: [
        PreviewTooltip, PreviewTest
    ],
    exports: [
        PreviewTooltip, PreviewTest
    ],
})
export class PreviewModule {}
