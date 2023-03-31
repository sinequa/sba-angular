import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocModalModuleComponent } from './modal-module.component';
import { DocConfirmComponent } from './confirm/confirm.component';
import { DocEditableComponent } from './editable/editable.component';
import { DocHelpComponent } from './help/help.component';
import { DocLoginComponent } from './login/login.component';
import { DocModalComponent } from './modal/modal.component';
import { DocModalFooterComponent } from './modal-footer/modal-footer.component';
import { DocModalHeaderComponent } from './modal-header/modal-header.component';
import { DocOverrideUserComponent } from './override-user/override-user.component';
import { DocPromptComponent } from './prompt/prompt.component';
import { BsModalModule } from '@sinequa/components/modal';
import { ModalRef, MODAL_MODEL } from '@sinequa/core/modal';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocModalModuleComponent }
];

@NgModule({
  declarations: [
    DocModalModuleComponent,
    DocConfirmComponent,
    DocEditableComponent,
    DocHelpComponent,
    DocLoginComponent,
    DocModalComponent,
    DocModalFooterComponent,
    DocModalHeaderComponent,
    DocOverrideUserComponent,
    DocPromptComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsModalModule
  ],
  providers: [
    { provide: MODAL_MODEL, useValue: {} },
    { provide: ModalRef, useValue: {} }
  ]
})
export class DocModalModule {
  constructor() {
    createElement('doc-confirm', DocConfirmComponent);
    createElement('doc-editable', DocEditableComponent);
    createElement('doc-help', DocHelpComponent);
    createElement('doc-login', DocLoginComponent);
    createElement('doc-modal', DocModalComponent);
    createElement('doc-modal-footer', DocModalFooterComponent);
    createElement('doc-modal-header', DocModalHeaderComponent);
    createElement('doc-override-user', DocOverrideUserComponent);
    createElement('doc-prompt', DocPromptComponent);
  }
}
