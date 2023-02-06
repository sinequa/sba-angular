import { Component } from '@angular/core';
import { NotificationsManagerComponent } from './notifications-manager/notifications-manager.component';
import { NotificationsComponent } from './notifications/notifications.component';

@Component({
  selector: 'app-notification-module',
  templateUrl: './notification-module.component.html'
})
export class NotificationModuleComponent {

  components = [
    NotificationsComponent,
    NotificationsManagerComponent
  ];

  constructor() { }

}
