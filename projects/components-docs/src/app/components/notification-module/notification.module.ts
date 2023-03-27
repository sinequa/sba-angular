import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocNotificationModuleComponent } from './notification-module.component';
import { DocNotificationsComponent } from './notifications/notifications.component';
import { DocNotificationsManagerComponent } from './notifications-manager/notifications-manager.component';
import { BsNotificationModule } from "@sinequa/components/notification";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocNotificationModuleComponent }
];

@NgModule({
  declarations: [
    DocNotificationModuleComponent,
    DocNotificationsComponent,
    DocNotificationsManagerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsNotificationModule
  ]
})
export class DocNotificationModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-notifications', DocNotificationsComponent);
    this.createElement('doc-notifications-manager', DocNotificationsManagerComponent);
  }
}
