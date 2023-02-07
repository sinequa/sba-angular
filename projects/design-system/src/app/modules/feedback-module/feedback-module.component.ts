import { Component } from '@angular/core';
import { FeedbackMenuComponent } from './feedback-menu/feedback-menu.component';

@Component({
  selector: 'app-feedback-module',
  templateUrl: '../module-template.html'
})
export class FeedbackModuleComponent {

  title = 'Feedback Module';

  components = [
    FeedbackMenuComponent
  ];

  constructor() { }

}
