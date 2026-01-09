import { Component } from '@angular/core';
import { ConfirmOptions, MODAL_MODEL } from '@sinequa/core/modal';
import { buttons } from '../modal.mock';

const confirmOptions: ConfirmOptions = {
  title: 'title',
  message: 'message',
  buttons: buttons
};

@Component({
    selector: 'doc-confirm',
    templateUrl: './confirm.component.html',
    providers: [{ provide: MODAL_MODEL, useValue: confirmOptions }],
    standalone: false
})
export class DocConfirmComponent {

  code1 = `<sq-confirm></sq-confirm>`;

  code2 = `const confirmOptions: ConfirmOptions = {
    title: 'title',
    message: 'message',
    buttons: [{
        result: ModalResult.Yes,
        primary: true,
        text: 'Yes',
        visible: true,
        validation: null as any,
        anchor: false,
        action: () => { },
        getText: () => { return 'Yes'; },
        click: () => { }
    },
    {
        result: ModalResult.No,
        primary: false,
        text: 'No',
        visible: true,
        validation: null as any,
        anchor: false,
        action: () => { },
        getText: () => { return 'No'; },
        click: () => { }
    }]
};

providers: [{ provide: MODAL_MODEL, useValue: confirmOptions }]`;

  constructor() { }

}
