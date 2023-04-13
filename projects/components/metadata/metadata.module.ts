import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";

import { Metadata } from "./metadata/metadata";
import { MetadataItem } from "./metadata-item/metadata-item";
import { MetadataAccessListsItem } from "./metadata-access-lists-item/metadata-access-lists-item";
import { MetadataAccessListsItemSingleAccessList } from "./metadata-access-lists-item-single-access-list/metadata-access-lists-item-single-access-list";
import { MetadataListComponent } from "./metadata-v2/metadata-list/metadata-list.component";
import { MetadataComponent } from "./metadata-v2/metadata/metadata.component";
import { IconService } from "./icon.service";
import { MetadataService } from "./metadata.service";
import { MetadataTreeComponent } from './metadata-v2/metadata/metadata-tree/metadata-tree.component';
import { BsActionModule } from "../action";
import { MetadataTooltipComponent } from './metadata-v2/metadata/metadata-tooltip/metadata-tooltip.component';
import { MetadataValueComponent } from './metadata-v2/metadata-value/metadata-value.component';

@NgModule({
    declarations: [
        Metadata, MetadataItem,
        MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList,
        MetadataListComponent, MetadataComponent, MetadataTreeComponent, MetadataTooltipComponent, MetadataValueComponent
    ],
    exports: [
        Metadata, MetadataItem,
        MetadataListComponent, MetadataComponent,
        MetadataValueComponent
    ],
    providers: [
        IconService,
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