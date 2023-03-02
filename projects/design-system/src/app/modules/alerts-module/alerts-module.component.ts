import { Component } from '@angular/core';
import { AlertsMenuComponent } from './alerts-menu/alerts-menu.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EditAlertComponent } from './edit-alert/edit-alert.component';
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';

@Component({
  selector: 'app-alerts-module',
  templateUrl: '../../module-template.html'
})
export class AlertsModuleComponent {

  title = 'Alerts Module';

  components = [
    AlertsComponent,
    AlertsMenuComponent,
    EditAlertComponent,
    ManageAlertsComponent
  ];

  constructor() { }

}
