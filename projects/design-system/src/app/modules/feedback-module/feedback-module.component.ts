import { Component } from '@angular/core';
import { DocFeedbackMenuComponent } from './feedback-menu/feedback-menu.component';

@Component({
  selector: 'doc-feedback-module',
  templateUrl: '../../module-template.html'
})
export class DocFeedbackModuleComponent {

  title = 'Feedback Module';

  components = [
    DocFeedbackMenuComponent
  ];

  constructor() { }

}
