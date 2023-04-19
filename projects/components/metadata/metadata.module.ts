import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";

import { MetadataListComponent } from "./metadata/metadata-list/metadata-list.component";
import { MetadataComponent } from "./metadata/metadata.component";
import { IconService } from "./icon.service";
import { MetadataService } from "./metadata.service";
import { MetadataTreeComponent } from './metadata/metadata-tree/metadata-tree.component';
import { BsActionModule } from "../action";
import { MetadataTooltipComponent } from './metadata/metadata-tooltip/metadata-tooltip.component';
import { HighlightService } from "./highlight.service";

@NgModule({
    declarations: [
        MetadataListComponent, MetadataComponent, MetadataTreeComponent, MetadataTooltipComponent
    ],
    exports: [
        MetadataListComponent, MetadataComponent
    ],
    providers: [
        IconService,
        HighlightService,
        MetadataService
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