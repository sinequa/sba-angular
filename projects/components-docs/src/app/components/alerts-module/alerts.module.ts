import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocAlertsModuleComponent } from './alerts-module.component';
import { DocAlertsComponent } from './alerts/alerts.component';
import { DocAlertsMenuComponent } from './alerts-menu/alerts-menu.component';
import { DocEditAlertComponent } from './edit-alert/edit-alert.component';
import { DocManageAlertsComponent } from './manage-alerts/manage-alerts.component';
import { BsAlertsModule } from "@sinequa/components/alerts";
import { BsNotificationModule } from '@sinequa/components/notification';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocAlertsModuleComponent }
];

@NgModule({
  declarations: [
    DocAlertsModuleComponent,
    DocAlertsComponent,
    DocAlertsMenuComponent,
    DocEditAlertComponent,
    DocManageAlertsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsAlertsModule,
    BsNotificationModule
  ]
})
export class DocAlertsModule {
  constructor() {
    createElement('doc-alerts', DocAlertsComponent);
    createElement('doc-alerts-menu', DocAlertsMenuComponent);
    createElement('doc-edit-alert', DocEditAlertComponent);
    createElement('doc-manage-alerts', DocManageAlertsComponent);
  }
}
