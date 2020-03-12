import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ModalModule as CoreModalModule, ModalService, MODAL_CONFIRM} from "@sinequa/core/modal";
import {LoginModule} from "@sinequa/core/login";
import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";
import {FlexLayoutModule} from "@angular/flex-layout";
import {OverlayModule} from "@angular/cdk/overlay";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button"; 
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MdModal} from "./modal.component";
import {MdModalHeader} from "./modal-header.component";
import {MdModalFooter} from "./modal-footer.component";
import {MdLogin} from "./login.component";
import {MdConfirm} from "./confirm.component";
import {MdModalService} from "./modal.service";
 
@NgModule({
    imports: [
        CommonModule,        
        FormsModule,
        ReactiveFormsModule,
        CoreModalModule,
        LoginModule,
        IntlModule,
        ValidationModule,
        FlexLayoutModule,
        OverlayModule,
        MatIconModule,
        MatButtonModule, 
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
    ],
    declarations: [
        MdModal,
        MdModalHeader,
        MdModalFooter,
        MdLogin,
        MdConfirm,
    ],
    exports: [
        MdModal,
        MdModalHeader,
        MdModalFooter,
        MdLogin,
        MdConfirm,
    ],
    providers: [
        {provide: ModalService, useClass: MdModalService},
        {provide: MODAL_CONFIRM, useValue: MdConfirm}
    ]
})
export class MdModalModule {
}