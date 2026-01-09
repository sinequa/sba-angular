import { Component } from '@angular/core';

@Component({
    selector: 'doc-help',
    templateUrl: './help.component.html',
    standalone: false
})
export class DocHelpComponent {

  code = `<sq-help></sq-help>`;

  constructor() { }

}
