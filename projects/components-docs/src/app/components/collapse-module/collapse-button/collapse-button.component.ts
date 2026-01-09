import { Component } from '@angular/core';

@Component({
    selector: 'doc-collapse-button',
    templateUrl: './collapse-button.component.html',
    standalone: false
})
export class DocCollapseButtonComponent {

  collapsed = true;

  code = `<sq-collapse-button
    (state)="collapsed = $event"
    text="Toggle view">
</sq-collapse-button>

<sq-collapse [collapsed]="collapsed">
    <ng-template>
        Some content
    </ng-template>
</sq-collapse>`;

  constructor() { }

}
