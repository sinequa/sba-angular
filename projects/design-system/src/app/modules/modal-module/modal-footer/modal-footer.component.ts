import { Component } from '@angular/core';
import { buttons } from '../modal.mock';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html'
})
export class ModalFooterComponent {

  buttons = buttons;

  code = `<sq-modal-footer
    [buttons]="buttons">
</sq-modal-footer>`;

  constructor() { }

}
