import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {BsModalModule} from "@sinequa/components/modal";
import {BsActionModule} from "@sinequa/components/action";
import {UtilsModule} from "@sinequa/components/utils";

import {BsEditUserSettings} from "./edit-user-settings/edit-user-settings";
import {BsUserSettingsEditor} from './user-settings-editor/user-settings-editor';
import {BsUserMenuComponent} from './user-menu/user-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        IntlModule,
        ValidationModule,

        BsModalModule,
        BsActionModule,
        UtilsModule,
    ],
    declarations: [
        BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
    ],
    exports: [
        BsEditUserSettings, BsUserSettingsEditor, BsUserMenuComponent
    ],
})
export class BsUserSettingsModule {
}
