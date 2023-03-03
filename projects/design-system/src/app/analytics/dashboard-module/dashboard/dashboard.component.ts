import { Component } from '@angular/core';
import { Widget } from '@sinequa/analytics/dashboard';

@Component({
  selector: 'doc-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DocDashboardComponent {

  code = `<sq-dashboard
    [dashboard]="dashboard">
</sq-dashboard>`;

  dashboard: Widget[] = [
    {
      state: {
        type: 'timeline',
        x: 1,
        y: 1,
        cols: 1,
        rows: 1,
        title: 'title'
      },
      icon: 'fas fa-chart-line fa-fw',
    },
    {
      state: {
        type: 'map',
        x: 1,
        y: 1,
        cols: 1,
        rows: 1,
        title: 'title'
      },
      icon: 'fas fa-globe-americas fa-fw'
    }
  ];

  constructor() { }

}
