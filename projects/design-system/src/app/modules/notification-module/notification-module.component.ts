import { Component } from '@angular/core';
import { DocNotificationsManagerComponent } from './notifications-manager/notifications-manager.component';
import { DocNotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'doc-notification-module',
  templateUrl: '../../module-template.html'
})
export class DocNotificationModuleComponent {

  title = 'Notification Module';
  description = ``;

  components = [
    DocNotificationsComponent,
    DocNotificationsManagerComponent
  ];

  constructor() { }

}
