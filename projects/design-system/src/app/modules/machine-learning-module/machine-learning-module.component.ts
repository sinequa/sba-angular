import { Component } from '@angular/core';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { PassageListComponent } from './passage-list/passage-list.component';
import { TopPassagesComponent } from './top-passages/top-passages.component';

@Component({
  selector: 'app-machine-learning-module',
  templateUrl: './machine-learning-module.component.html'
})
export class MachineLearningModuleComponent {

  components = [
    AnswerCardComponent,
    PassageListComponent,
    TopPassagesComponent
  ];

  constructor() { }

}
