import { Component } from '@angular/core';
import { ActionButtonsOptions } from '@sinequa/components/action';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-action-buttons',
  templateUrl: './action-buttons.component.html'
})
export class DocActionButtonsComponent extends BaseComponent {

  code1 = `<div [sq-action-buttons]="options"></div>`;
  code2 = `options: ActionButtonsOptions = {
    items: [
        new Action({
            icon: "fas fa-sync",
            title: "action 2",
            action: () => { }
        }),
        new Action({
            icon: "fas fa-shield-alt",
            title: "action 1",
            children: [
                new Action({
                    text: "sub action 1",
                    action: () => { }
                }),
                new Action({
                    text: "sub action 2",
                    action: () => { }
                }),
                ActionSeparator,
                new Action({
                    text: "sub action 3",
                    action: () => { }
                })
            ]
        })
    ]
  };`;

  options: ActionButtonsOptions = {
    items: this.globalService.actions
  };

}
