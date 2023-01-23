import { Component } from '@angular/core';

@Component({
  selector: 'app-collapse-button',
  templateUrl: './collapse-button.component.html'
})
export class CollapseButtonComponent {

  collapsed = false;

  code = `<sq-collapse-button
    [collapsed]="collapsed"
    collapsedTitle="Collapsed"
    expandedTitle="Expanded"
    icon="fas fa-inbox"
    text="Text">
</sq-collapse-button>`;

  constructor() { }

}
