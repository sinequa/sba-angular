import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IntlModule } from "@sinequa/core/intl";
import { UtilsModule } from "@sinequa/components/utils";
import { CollapseModule } from "@sinequa/components/collapse";

import { Metadata } from "./metadata/metadata";
import { MetadataItem } from "./metadata-item/metadata-item";
import { MetadataAccessListsItem } from "./metadata-access-lists-item/metadata-access-lists-item";
import { MetadataAccessListsItemSingleAccessList } from "./metadata-access-lists-item-single-access-list/metadata-access-lists-item-single-access-list";
import { MetadataListComponent } from "./metadata-list/metadata-list.component";
import { MetadataComponent } from "./metadata-list/metadata/metadata.component";
import { IconService, MetadataConfig, METADATA_CONFIG } from "./icon.service";
import { MetadataService } from "./metadata.service";
import { MetadataTreeComponent } from './metadata-list/metadata-tree/metadata-tree.component';
import { BsActionModule } from "../action";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
        BsActionModule
    ],
    declarations: [
        Metadata, MetadataItem,
        MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList,
        MetadataListComponent, MetadataComponent, MetadataTreeComponent
    ],
    exports: [
        Metadata, MetadataItem,
        MetadataListComponent, MetadataComponent
    ],
    providers: [
        IconService,
        MetadataService
    ]
})
export class MetadataModule {
    public static forRoot(metadataConfig?: MetadataConfig): ModuleWithProviders<MetadataModule> {
        return {
            ngModule: MetadataModule,
            providers: [
                {
                    provide: METADATA_CONFIG,
                    useValue: metadataConfig
                }
            ]
        }
    }
}