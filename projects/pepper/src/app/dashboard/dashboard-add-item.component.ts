import { Component, Inject } from '@angular/core';
import { ModalButton, ModalResult } from '@sinequa/core/modal';
import { Action } from '@sinequa/components/action';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { FormGroup } from '@angular/forms';

export interface DashboardItemOption {
    type: string;
    icon: string;
    text: string;
    unique: boolean;
}

export const MAP_WIDGET: DashboardItemOption = {type: 'map', icon: 'fas fa-globe-americas fa-fw', text: 'Map', unique: true};
export const TIMELINE_WIDGET: DashboardItemOption = {type: 'timeline', icon: 'fas fa-chart-line fa-fw', text: 'Timeline', unique: true};
export const NETWORK_WIDGET: DashboardItemOption = {type: 'network', icon: 'fas fa-project-diagram fa-fw', text: 'Network', unique: true};
export const CHART_WIDGET: DashboardItemOption = {type: 'chart', icon: 'fas fa-chart-bar fa-fw', text: 'Chart', unique: false};
export const HEATMAP_WIDGET: DashboardItemOption = {type: 'heatmap', icon: 'fas fa-th fa-fw', text: 'Heatmap', unique: false};

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

    constructor(
        @Inject(MODAL_MODEL) public model: DashboardAddItemModel
    ) {
        this.actions = model.options.map(option => new Action({
            icon: option.icon,
            text: option.text,
            title: `Create a ${option.text} widget`,
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