import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";
import {LoadComponentModule} from "@sinequa/core/load-component";
import {UtilsModule} from "@sinequa/components/utils";

import {BsActionButtons} from "./action-buttons/action-buttons";
import {BsActionItemContent} from "./action-item-content/action-item-content";
import {BsActionItem} from "./action-item/action-item";
import {BsActionMenu} from "./action-menu/action-menu";
import {BsDropdownMenu} from "./dropdown-menu/dropdown-menu";
import {BsDropdownDirective} from "./dropdown.directive";


@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        LoadComponentModule,
        UtilsModule
    ],
    declarations: [
        BsActionButtons,
        BsActionItemContent,
        BsActionItem,
        BsActionMenu,
        BsDropdownMenu,
        BsDropdownDirective
    ],
    exports: [
        BsActionButtons,
        BsActionMenu,
        BsActionItem,
        BsDropdownDirective
    ]
})
export class BsActionModule {
}