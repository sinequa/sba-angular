import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-action-menu',
  templateUrl: './action-menu.component.html'
})
export class DocActionMenuComponent extends BaseComponent {

  code1 = `<sq-action-menu [items]="actions"></sq-action-menu>`;
  code2 = `actions: Action[] = [
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
  ];`;

}
