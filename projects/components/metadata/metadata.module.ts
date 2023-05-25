import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";

import { MetadataComponent } from "./metadata/metadata.component";
import { MetadataItemComponent } from "./metadata/metadata-item/metadata-item.component";
import { BsActionModule } from "@sinequa/components/action";

@NgModule({
    declarations: [
        MetadataComponent, MetadataItemComponent
    ],
    exports: [
        MetadataComponent, MetadataItemComponent
    ],
    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
        BsActionModule
    ]
})
export class MetadataModule {
}