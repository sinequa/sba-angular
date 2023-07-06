import { Component } from '@angular/core';
import { DocAddWidgetModalComponent } from './add-widget-modal/add-widget-modal.component';
import { DocDashboardComponent } from './dashboard/dashboard.component';
import { DocDashboard2Component } from './dashboard/dashboard2.component';

@Component({
  selector: 'doc-dashboard-module',
  templateUrl: '../../module-template.html'
})
export class DocDashboardModuleComponent {

  title = 'Dashboard Module';

  components = [
    DocAddWidgetModalComponent,
    DocDashboardComponent,
    DocDashboard2Component
  ];

  constructor() { }

}
