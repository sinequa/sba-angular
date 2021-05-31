import { Component, Input } from '@angular/core';

@Component({
  selector: 'sq-alert-message',
  templateUrl: './alert-message.component.html'
})
export class BsAlertMessageComponent {
  @Input() message: string;
}
