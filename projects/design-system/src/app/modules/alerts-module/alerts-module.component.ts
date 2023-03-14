import { Component } from '@angular/core';
import { DocAlertsMenuComponent } from './alerts-menu/alerts-menu.component';
import { DocAlertsComponent } from './alerts/alerts.component';
import { DocEditAlertComponent } from './edit-alert/edit-alert.component';
import { DocManageAlertsComponent } from './manage-alerts/manage-alerts.component';

@Component({
  selector: 'doc-alerts-module',
  templateUrl: '../../module-template.html'
})
export class DocAlertsModuleComponent {

  title = 'Alerts Module';
  description = ``;

  components = [
    DocAlertsComponent,
    DocAlertsMenuComponent,
    DocEditAlertComponent,
    DocManageAlertsComponent
  ];

  constructor() { }

}
