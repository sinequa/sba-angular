import { Component } from '@angular/core';
import { buttons } from '../modal.mock';

@Component({
    selector: 'doc-modal',
    templateUrl: './modal.component.html',
    standalone: false
})
export class DocModalComponent {

  buttons = buttons;

  code = `<sq-modal
    [title]="'title'"
    [buttons]="buttons">
</sq-modal>`;

  constructor() { }

}
