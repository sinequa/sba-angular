import { Component } from '@angular/core';
import { MODAL_MODEL, PromptOptions } from '@sinequa/core/modal';
import { buttons } from '../modal.mock';

const promptOptions: PromptOptions = {
  output: 'output',
  title: 'title',
  message: 'message',
  buttons: buttons
};

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  providers: [{ provide: MODAL_MODEL, useValue: promptOptions }]
})
export class PromptComponent {

  code = `<sq-prompt></sq-prompt>`;

  code2 = `const promptOptions: PromptOptions = {
    output: 'output',
    title: 'title',
    message: 'message',
    buttons: buttons
};

providers: [{ provide: MODAL_MODEL, useValue: promptOptions }]`;

  constructor() { }

}
