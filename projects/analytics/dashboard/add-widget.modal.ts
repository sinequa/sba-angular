import { Component, Inject } from '@angular/core';
import { ModalButton, ModalResult } from '@sinequa/core/modal';
import { Action, BsActionModule } from '@sinequa/components/action';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { FormsModule, UntypedFormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalModule } from '@sinequa/components/modal';
import { IntlModule } from '@sinequa/core/intl';
import { WidgetOption } from './widget.model';


export interface AddWidgetModel {
  // Input of the modal
  options: WidgetOption[];

  // Output of the modal
  selectedOption?: WidgetOption;
}

@Component({
    selector: 'sq-add-widget-modal',
    templateUrl: './add-widget.modal.html',
    styleUrls: ['./add-widget.modal.scss'],
    imports: [CommonModule, FormsModule, IntlModule, BsModalModule, BsActionModule]
})
export class AddWidgetModal {

  actions: Action[];
  buttons: ModalButton[];
  validation = { valid: false };
  theme: string;

  constructor(
    @Inject(MODAL_MODEL) public model: AddWidgetModel
  ) {

    this.theme = document.body.classList.contains("dark") ? "dark" : "light";

    this.actions = model.options.map(option => new Action({
      icon: option.icon,
      text: option.text,
      messageParams: { values: { item: option.text } },
      action: (action: Action) => {
        this.actions.forEach(a => a.selected = false); // Unselect other actions
        action.selected = true; // Select this one
        model.selectedOption = option;
        this.validation.valid = true;
      }
    }));

    this.buttons = [
      new ModalButton({
        result: ModalResult.OK,
        primary: true,
        validation: this.validation as UntypedFormGroup
      }),
      new ModalButton({
        result: ModalResult.Cancel
      })
    ];
  }
}
