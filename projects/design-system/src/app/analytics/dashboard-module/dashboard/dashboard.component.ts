import { Component } from '@angular/core';
import { Widget } from '@sinequa/analytics/dashboard';

@Component({
  selector: 'doc-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DocDashboardComponent {

  code = ``;

  dashboard: Widget[]

  constructor() { }

}
