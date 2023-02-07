import { Component } from '@angular/core';
import { NotificationsManagerComponent } from './notifications-manager/notifications-manager.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-notification-module',
  templateUrl: '../module-template.html'
})
export class NotificationModuleComponent {

  title = 'Notification Module';

  components = [
    NotificationsComponent,
    NotificationsManagerComponent
  ];

  constructor() { }

}
