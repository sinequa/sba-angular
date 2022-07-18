import { Component, Inject } from '@angular/core';
import { ModalButton, ModalResult } from '@sinequa/core/modal';
import { Action } from '@sinequa/components/action';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { UntypedFormGroup } from '@angular/forms';
import { DashboardItemOption } from './dashboard.service';

export interface DashboardAddItemModel {
    // Input of the modal
    options: DashboardItemOption[];
    maxCols?: number;
    maxRows?: number;

    // Output of the modal
    selectedOption?: DashboardItemOption;
    cols?: number;
    rows?: number;
}

@Component({
    selector: 'sq-dashboard-add-item',
    templateUrl: './dashboard-add-item.component.html',
    styleUrls: ['./dashboard-add-item.component.scss']
})
export class DashboardAddItemComponent {

    rowsOptions: number[];
    colsOptions: number[];

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
                validation: this.validation as UntypedFormGroup
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];

        this.rowsOptions = Array(model.maxRows || 4).fill(0).map((_,i) => i+1);
        this.colsOptions = Array(model.maxCols || 4).fill(0).map((_,i) => i+1);
    }

    updateWidth(event: Event) {
        this.model.cols = +event.target!['value'];
    }
    
    updateHeight(event: Event) {
        this.model.rows = +event.target!['value'];
    }
}