import { Component } from '@angular/core';
import { DocActionButtonsComponent } from './action-buttons/action-buttons.component';
import { DocActionItemComponent } from './action-item/action-item.component';
import { DocActionMenuComponent } from './action-menu/action-menu.component';

@Component({
    selector: 'doc-action-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocActionModuleComponent {

  title = 'Action Module';

  components = [
    DocActionButtonsComponent,
    DocActionItemComponent,
    DocActionMenuComponent
  ];

  constructor() { }

}
