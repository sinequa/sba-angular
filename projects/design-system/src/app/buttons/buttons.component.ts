import {Component, OnInit} from '@angular/core';
import {Action, ActionButtonsOptions} from "@sinequa/components/action";

const myAction = new Action({
    text: `Label`,
    action: () => {}
});
const iconAction = new Action({
    text: `Some label`,
    icon: 'fas fa-calendar',
    action: () => {}
});
const defaultIconAction = new Action({
    text: `Default`,
    icon: 'fas fa-calendar',
    action: () => {}
});
const primaryIconAction = new Action({
    text: `Primary`,
    icon: 'fas fa-calendar',
    action: () => {}
});
const secondaryIconAction = new Action({
    text: `Secondary`,
    icon: 'fas fa-calendar',
    action: () => {}
});
const outlineIconAction = new Action({
    text: `Outline`,
    icon: 'fas fa-calendar',
    action: () => {}
});
const fabAction = new Action({
    icon: 'fas fa-calendar',
    action: () => {}
});
const dropdownAction = new Action({
    text: `Dropdown Button`,
    children: [
        myAction,
        iconAction
    ]
});

@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html'
})
export class ButtonsComponent implements OnInit {

    buttonClass: string = 'normal';
    showIcon: boolean = false;
    hideText: boolean = false;
    disabled: boolean = false;
    blueBg: boolean = false;
    isFab: boolean = false;
    isSubMenu: boolean = false;

    code2: string = `<div class="btn-group" [sq-action-buttons]="defaultActionButtonsOptions"></div>
<div class="btn-group" [sq-action-buttons]="primaryActionButtonsOptions"></div>
<button class="btn btn-outline-primary mx-2">Outline Primary</button>
<button class="btn btn-outline-light mx-2">Outline Light</button>`;
    code3: string = `import {Action, ActionButtonsOptions} from "@sinequa/components/action";

defaultIconAction: Action = new Action({
    text: \`Default\`,
    icon: 'fas fa-calendar',
    action: () => {}
});

defaultActionButtonsOptions: ActionButtonsOptions = {
    items: defaultIconAction
};

primaryIconAction: Action = new Action({
    text: \`Primary\`,
    icon: 'fas fa-calendar',
    action: () => {}
});

primaryActionButtonsOptions: ActionButtonsOptions = {
    items: primaryIconAction,
    style: 'primary' // the additional class without the "btn-" prefix
};`;
    code6: string = `<div class="btn-group" [sq-action-buttons]="dropdownActionButtonsOptions"></div>`;
    code7: string = `import {Action, ActionButtonsOptions} from "@sinequa/components/action";

dropdownActionButtonsOptions: ActionButtonsOptions = {
    items: dropdownAction,
    style: 'primary'
}

myAction: Action = new Action({
    text: \`Label\`,
    action: () => {}
});
iconAction: Action = new Action({
    text: \`Some label\`,
    icon: 'fas fa-calendar',
    action: () => {}
});
dropdownAction: Action = new Action({
    text: \`Dropdown Button\`,
    children: [
        myAction,
        iconAction
    ]
});`;
    code8: string = `<div class="btn-group" [sq-action-buttons]="fabActionButtonsOptions"></div>`;
    code9: string = `import {Action, ActionButtonsOptions} from "@sinequa/components/action";

fabActionButtonsOptions: ActionButtonsOptions = {
    items: fabAction,
    style: 'fab'
}
    
fabAction: Action = new Action({
    icon: 'fas fa-calendar',
    action: () => {}
});`;

    defaultActionButtonsOptions: ActionButtonsOptions = {
        items: defaultIconAction
    }

    primaryActionButtonsOptions: ActionButtonsOptions = {
        items: primaryIconAction,
        style: 'primary'
    }

    secondaryActionButtonsOptions: ActionButtonsOptions = {
        items: secondaryIconAction,
        style: 'secondary'
    }

    outlineActionButtonsOptions: ActionButtonsOptions = {
        items: outlineIconAction,
        style: 'outline'
    }

    fabActionButtonsOptions: ActionButtonsOptions = {
        items: fabAction,
        style: 'fab'
    }

    dropdownActionButtonsOptions: ActionButtonsOptions = {
        items: dropdownAction,
        style: 'primary'
    }

    constructor() {
    }

    ngOnInit(): void {
    }

}
