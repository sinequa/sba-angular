import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";
import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";

import {Metadata} from "./metadata/metadata";
import {MetadataItem} from "./metadata-item/metadata-item";
import {MetadataAccessListsItem} from "./metadata-access-lists-item/metadata-access-lists-item";
import {MetadataAccessListsItemSingleAccessList} from "./metadata-access-lists-item-single-access-list/metadata-access-lists-item-single-access-list";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        UtilsModule,
        CollapseModule,
    ],
    declarations: [
        Metadata, MetadataItem,
        MetadataAccessListsItem, MetadataAccessListsItemSingleAccessList
    ],
    exports: [
        Metadata, MetadataItem
    ],
})
export class MetadataModule {
}