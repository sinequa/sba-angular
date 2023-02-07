import { Component } from '@angular/core';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { PassageListComponent } from './passage-list/passage-list.component';
import { TopPassagesComponent } from './top-passages/top-passages.component';

@Component({
  selector: 'app-machine-learning-module',
  templateUrl: '../module-template.html'
})
export class MachineLearningModuleComponent {

  title = 'Machine Learning Module';

  components = [
    AnswerCardComponent,
    PassageListComponent,
    TopPassagesComponent
  ];

  constructor() { }

}
