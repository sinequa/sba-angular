import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";

import { Metadata } from "./metadata-old/metadata";
import { MetadataItem } from "./metadata-item/metadata-item";
import { MetadataAccessListsItem } from "./metadata-access-lists-item/metadata-access-lists-item";
import { MetadataAccessListsItemSingleAccessList } from "./metadata-access-lists-item-single-access-list/metadata-access-lists-item-single-access-list";
import { MetadataListComponent } from "./metadata/metadata-list/metadata-list.component";
import { MetadataComponent } from "./metadata/metadata.component";
import { IconService } from "./icon.service";
import { MetadataService } from "./metadata.service";
import { MetadataTreeComponent } from './metadata/metadata-tree/metadata-tree.component';
import { BsActionModule } from "../action";
import { MetadataTooltipComponent } from './metadata/metadata-tooltip/metadata-tooltip.component';
import { MetadataValueComponent } from './metadata/metadata-value/metadata-value.component';

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