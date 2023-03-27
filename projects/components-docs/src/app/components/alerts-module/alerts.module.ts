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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocAlertsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-alerts', DocAlertsComponent);
    this.createElement('doc-alerts-menu', DocAlertsMenuComponent);
    this.createElement('doc-edit-alert', DocEditAlertComponent);
    this.createElement('doc-manage-alerts', DocManageAlertsComponent);
  }
}
