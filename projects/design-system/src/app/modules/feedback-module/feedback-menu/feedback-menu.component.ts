import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback-menu',
  templateUrl: './feedback-menu.component.html'
})
export class FeedbackMenuComponent {

  code = `<sq-feedback-menu
    [style]="'primary'">
</sq-feedback-menu>`;

  constructor() { }

}
