import { Component } from '@angular/core';

@Component({
    selector: 'doc-modal-header',
    templateUrl: './modal-header.component.html',
    standalone: false
})
export class DocModalHeaderComponent {

  code = `<sq-modal-header
    [title]="'title'">
</sq-modal-header>`;

  constructor() { }

}
