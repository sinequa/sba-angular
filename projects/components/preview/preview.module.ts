import {NgModule, ModuleWithProviders, Type} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";
import {WebServicesModule} from "@sinequa/core/web-services";
import {UtilsModule} from "@sinequa/components/utils";
import {PreviewDocumentIframe} from "./preview-document-iframe.component";
import {PreviewTooltip} from "./preview-tooltip.component";
import {PREVIEW_MODAL} from "./preview.service";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        WebServicesModule,
        UtilsModule
    ],
    declarations: [
        PreviewDocumentIframe, PreviewTooltip
    ],
    exports: [
        PreviewDocumentIframe, PreviewTooltip
    ],
})
export class PreviewModule {
    static forRoot(previewModal: Type<any>) : ModuleWithProviders<PreviewModule> {
        return {
            ngModule: PreviewModule,
            providers: [
                {provide: PREVIEW_MODAL, useValue: previewModal},
            ]
        };
    }
}