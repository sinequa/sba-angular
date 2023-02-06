import { Component } from '@angular/core';
import { FeedbackMenuComponent } from './feedback-menu/feedback-menu.component';

@Component({
  selector: 'app-feedback-module',
  templateUrl: './feedback-module.component.html'
})
export class FeedbackModuleComponent {

  components = [
    FeedbackMenuComponent
  ];

  constructor() { }

}
