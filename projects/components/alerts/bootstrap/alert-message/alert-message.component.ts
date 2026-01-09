import { Component, Input } from '@angular/core';

@Component({
    selector: 'sq-alert-message',
    templateUrl: './alert-message.component.html',
    standalone: false
})
export class BsAlertMessageComponent {
  @Input() message: string;
}
