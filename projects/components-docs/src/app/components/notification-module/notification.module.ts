import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocNotificationModuleComponent } from './notification-module.component';
import { DocNotificationsComponent } from './notifications/notifications.component';
import { DocNotificationsManagerComponent } from './notifications-manager/notifications-manager.component';
import { BsNotificationModule } from "@sinequa/components/notification";
import { createElement } from 'src/app/shared/create-element';

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
export class DocNotificationModule {
  constructor() {
    createElement('doc-notifications', DocNotificationsComponent);
    createElement('doc-notifications-manager', DocNotificationsManagerComponent);
  }
}
