import { Component } from '@angular/core';
import { UserOverride } from '@sinequa/core/login';
import { MODAL_MODEL } from '@sinequa/core/modal';

const userOverride: UserOverride = {
  userName: 'userName',
  domain: 'domain'
};

@Component({
  selector: 'doc-override-user',
  templateUrl: './override-user.component.html',
  providers: [{ provide: MODAL_MODEL, useValue: userOverride }]
})
export class DocOverrideUserComponent {

  code1 = `<sq-override-user></sq-override-user>`;

  code2 = `const userOverride: UserOverride = {
    userName: 'userName',
    domain: 'domain'
};

providers: [{ provide: MODAL_MODEL, useValue: userOverride }]`;

  constructor() { }

}
