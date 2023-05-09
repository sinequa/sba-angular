import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";

import { MetadataComponent } from "./metadata/metadata.component";
import { MetadataItemComponent } from "./metadata/metadata-item/metadata-item.component";
import { MetadataTreeComponent } from './metadata/metadata-tree/metadata-tree.component';
import { BsActionModule } from "../action";
import { MetadataPopoverComponent } from './metadata/metadata-popover/metadata-popover.component';

@NgModule({
    declarations: [
        MetadataComponent, MetadataItemComponent, MetadataTreeComponent, MetadataPopoverComponent
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