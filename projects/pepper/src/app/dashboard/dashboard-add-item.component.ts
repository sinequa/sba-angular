import { Component, Inject } from '@angular/core';
import { ModalButton, ModalResult } from '@sinequa/core/modal';
import { Action } from '@sinequa/components/action';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { FormGroup } from '@angular/forms';
import { DashboardItemOption } from './dashboard.service';

export interface DashboardAddItemModel {
    options: DashboardItemOption[]; // Input of the modal
    selectedOption?: DashboardItemOption; // Output of the modal
    width?: number;
    height?: number;
}

@Component({
    selector: 'sq-dashboard-add-item',
    templateUrl: './dashboard-add-item.component.html',
    styleUrls: ['./dashboard-add-item.component.scss']
})
export class DashboardAddItemComponent {

    actions: Action[];
    buttons: ModalButton[];
    validation = {valid: false};
    theme: string;

    constructor(
        @Inject(MODAL_MODEL) public model: DashboardAddItemModel
    ) {

        this.theme = document.body.classList.contains("dark")? "dark" : "light";

        this.actions = model.options.map(option => new Action({
            icon: option.icon,
            text: option.text,
            title: 'msg#dashboard.addWidgetItemTitle',
            messageParams: {values: {item: option.text}},
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
                validation: this.validation as FormGroup
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    updateWidth(event: Event) {
        this.model.width = +event.target!['value'];
    }
    
    updateHeight(event: Event) {
        this.model.height = +event.target!['value'];
    }
}