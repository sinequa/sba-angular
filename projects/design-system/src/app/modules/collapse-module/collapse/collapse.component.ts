import { Component } from '@angular/core';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html'
})
export class CollapseComponent {

  collapsed = false;

  code = `<sq-collapse [collapsed]="collapsed">
    <ng-template>
        Some content
    </ng-template>
</sq-collapse>`;

  constructor() { }

}
