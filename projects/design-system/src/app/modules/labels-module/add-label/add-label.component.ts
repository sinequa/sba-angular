import { Component } from '@angular/core';
import { MODAL_MODEL } from '@sinequa/core/modal';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  providers: [{ provide: MODAL_MODEL, useValue: {} }]
})
export class AddLabelComponent {

  code = `NullInjectorError: No provider for ModalRef!`;

  constructor() { }

}
