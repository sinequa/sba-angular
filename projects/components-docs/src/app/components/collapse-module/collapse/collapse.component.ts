import { Component } from '@angular/core';

@Component({
    selector: 'doc-collapse',
    templateUrl: './collapse.component.html',
    standalone: false
})
export class DocCollapseComponent {

  collapsed: boolean = true;
  list: string[] = [
    'element 1',
    'element 2',
    'element 3'
  ];

  code = `<button type="button" class="btn btn-primary" (click)="collapsed = !collapsed">
    {{ collapsed ? 'Expand' : 'Collapse' }}
</button>

<sq-collapse [collapsed]="collapsed">
    <ng-template>
        <ul>
            <li *ngFor="let element of list">
                <span>{{ element }}</span>
            </li>
        </ul>
    </ng-template>
</sq-collapse>`;

code2 = `list: string[] = [
    'element 1',
    'element 2',
    'element 3'
];`;

  constructor() { }

}
