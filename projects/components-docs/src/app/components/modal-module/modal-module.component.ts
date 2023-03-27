import { Component } from '@angular/core';
import { DocConfirmComponent } from './confirm/confirm.component';
import { DocEditableComponent } from './editable/editable.component';
import { DocHelpComponent } from './help/help.component';
import { DocLoginComponent } from './login/login.component';
import { DocModalFooterComponent } from './modal-footer/modal-footer.component';
import { DocModalHeaderComponent } from './modal-header/modal-header.component';
import { DocModalComponent } from './modal/modal.component';
import { DocOverrideUserComponent } from './override-user/override-user.component';
import { DocPromptComponent } from './prompt/prompt.component';

@Component({
  selector: 'doc-modal-module',
  templateUrl: '../../module-template.html'
})
export class DocModalModuleComponent {

  title = 'Modal Module';

  components = [
    DocConfirmComponent,
    DocEditableComponent,
    DocHelpComponent,
    DocLoginComponent,
    DocModalComponent,
    DocModalFooterComponent,
    DocModalHeaderComponent,
    DocOverrideUserComponent,
    DocPromptComponent
  ];

  constructor() { }

}
