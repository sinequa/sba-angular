import { Component } from '@angular/core';
import {NotificationsService} from "@sinequa/core/notification";

@Component({
  selector: 'doc-alerts',
  templateUrl: './alerts.component.html'
})
export class DocAlertsComponent {

  code: string = `<button class="btn btn-primary mx-2"
      (click)="notificationsService.error('Lorem ipsum', undefined, 'ALERT');">
          Alert
</button>

<button class="btn btn-primary mx-2"
    (click)="notificationsService.success('Lorem ipsum', undefined, 'SUCCESS');">
        Success
</button>

<button class="btn btn-primary mx-2"
    (click)="notificationsService.warning('Lorem ipsum', undefined, 'WARNING');">
        Warning
</button>

<button class="btn btn-primary mx-2"
    (click)="notificationsService.info('Lorem ipsum', undefined, 'INFO');">
        Info
</button>

<sq-notifications></sq-notifications>`;

  constructor(public notificationsService: NotificationsService) { }

}
