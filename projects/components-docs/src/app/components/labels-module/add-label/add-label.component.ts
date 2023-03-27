import { Component } from '@angular/core';
import { MODAL_MODEL } from '@sinequa/core/modal';

@Component({
  selector: 'doc-add-label',
  templateUrl: './add-label.component.html',
  providers: [{ provide: MODAL_MODEL, useValue: {} }]
})
export class DocAddLabelComponent {

  code = `NullInjectorError: No provider for ModalRef!`;

  constructor() { }

}
