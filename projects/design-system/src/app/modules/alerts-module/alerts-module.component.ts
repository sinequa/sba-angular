import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { AlertsMenuComponent } from './alerts-menu/alerts-menu.component';
import { AlertsComponent } from './alerts/alerts.component';
import { EditAlertComponent } from './edit-alert/edit-alert.component';
import { ManageAlertsComponent } from './manage-alerts/manage-alerts.component';

@Component({
  selector: 'app-alerts-module',
  templateUrl: './alerts-module.component.html'
})
export class AlertsModuleComponent {

  components = [
    AlertsComponent,
    AlertsMenuComponent,
    EditAlertComponent,
    ManageAlertsComponent
  ];

  constructor(public globalService: GlobalService) { }

}
