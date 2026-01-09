import { Component } from '@angular/core';

@Component({
    selector: 'doc-login',
    templateUrl: './login.component.html',
    standalone: false
})
export class DocLoginComponent {

  code = `<sq-login></sq-login>`;

  constructor() { }

}
