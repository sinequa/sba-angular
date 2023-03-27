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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocModalModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-confirm', DocConfirmComponent);
    this.createElement('doc-editable', DocEditableComponent);
    this.createElement('doc-help', DocHelpComponent);
    this.createElement('doc-login', DocLoginComponent);
    this.createElement('doc-modal', DocModalComponent);
    this.createElement('doc-modal-footer', DocModalFooterComponent);
    this.createElement('doc-modal-header', DocModalHeaderComponent);
    this.createElement('doc-override-user', DocOverrideUserComponent);
    this.createElement('doc-prompt', DocPromptComponent);
  }
}
