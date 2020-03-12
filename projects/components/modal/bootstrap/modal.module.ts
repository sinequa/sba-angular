import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ModalModule as CoreModalModule} from "@sinequa/core/modal";
import {LoginModule} from "@sinequa/core/login";
import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";

import {BsModal} from "./modal.component";
import {BsModalHeader} from "./modal-header.component";
import {BsModalFooter} from "./modal-footer.component";
import {BsLogin} from "./login.component";
import {BsConfirm} from "./confirm.component";
import {BsHelp} from "./help/help";
import {BsOverrideUser} from "./override-user/override-user";
import {BsEditable} from "./editable/editable";

import {OverlayModule} from "@angular/cdk/overlay";
import {A11yModule} from "@angular/cdk/a11y";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        OverlayModule,
        A11yModule,

        IntlModule,
        ValidationModule,
        CoreModalModule.forRoot(BsConfirm),
        LoginModule.forRoot(BsLogin),

        UtilsModule,
    ],
    declarations: [
        BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
        BsHelp, BsOverrideUser, BsEditable
    ],
    exports: [
        BsModal, BsModalHeader, BsModalFooter, BsLogin, BsConfirm,
        BsHelp, BsOverrideUser, BsEditable
    ],
})
export class BsModalModule {
}