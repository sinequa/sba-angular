import { Component } from '@angular/core';
import { Widget } from '@sinequa/analytics/dashboard';

@Component({
    selector: 'doc-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: false
})
export class DocDashboardComponent {

  html =
`<sq-dashboard [dashboard]="widgets" style="display: block; height: 400px;">
  <ng-template let-widget>
    <div class="card h-100">
      <div class="card-header">{{widget.title}}</div>
      <div class="card-body">{{widget.description}}</div>
    </div>
  </ng-template>
</sq-dashboard>`;

  ts =
`widgets: Widget[] = [
  {
    state: {type: "", x: 0, y: 0, cols: 2, rows: 1},
    title: "Hello world",
    description: "This is a test widget",
  },
  {
    state: {type: "", x: 2, y: 0, cols: 2, rows: 1},
    title: "Good morning",
    description: "This is another test widget",
  },
];`

  widgets: Widget[] = [
    {
      state: {type: "", x: 0, y: 0, cols: 2, rows: 1},
      title: "Hello world",
      description: "This is a test widget",
    },
    {
      state: {type: "", x: 2, y: 0, cols: 2, rows: 1},
      title: "Good morning",
      description: "This is another test widget",
    },
  ];

  constructor() { }

}
