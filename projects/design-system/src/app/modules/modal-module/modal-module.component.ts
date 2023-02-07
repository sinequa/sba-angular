import { Component } from '@angular/core';
import { ConfirmComponent } from './confirm/confirm.component';
import { EditableComponent } from './editable/editable.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalComponent } from './modal/modal.component';
import { OverrideUserComponent } from './override-user/override-user.component';
import { PromptComponent } from './prompt/prompt.component';

@Component({
  selector: 'app-modal-module',
  templateUrl: '../module-template.html'
})
export class ModalModuleComponent {

  title = 'Modal Module';

  components = [
    ConfirmComponent,
    EditableComponent,
    HelpComponent,
    LoginComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    OverrideUserComponent,
    PromptComponent
  ];

  constructor() { }

}
