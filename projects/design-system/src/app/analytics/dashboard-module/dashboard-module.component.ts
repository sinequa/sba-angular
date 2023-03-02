import { Component } from '@angular/core';
import { AddWidgetModalComponent } from './add-widget-modal/add-widget-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard-module',
  templateUrl: '../../module-template.html'
})
export class DashboardModuleComponent {

  title = 'Dashboard Module';

  components = [
    AddWidgetModalComponent,
    DashboardComponent
  ];

  constructor() { }

}
