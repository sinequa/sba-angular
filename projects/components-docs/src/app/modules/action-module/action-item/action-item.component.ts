import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-action-item',
  templateUrl: './action-item.component.html'
})
export class DocActionItemComponent extends BaseComponent {

  code1 = `<div [sq-action-item]="{item: action}"></div>`;
  code2 = `action = new Action({
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
  })`;

  action = this.globalService.actions[1];

}
