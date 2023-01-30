import { Component } from '@angular/core';
import { buttons } from '../modal.mock';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  buttons = buttons;

  code = `<sq-modal
    [title]="'title'"
    [buttons]="buttons">
</sq-modal>`;

  constructor() { }

}
