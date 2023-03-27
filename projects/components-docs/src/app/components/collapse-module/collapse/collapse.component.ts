import { Component } from '@angular/core';

@Component({
  selector: 'doc-collapse',
  templateUrl: './collapse.component.html'
})
export class DocCollapseComponent {

  collapsed = false;

  code = `<sq-collapse [collapsed]="collapsed">
    <ng-template>
        Some content
    </ng-template>
</sq-collapse>`;

  constructor() { }

}
