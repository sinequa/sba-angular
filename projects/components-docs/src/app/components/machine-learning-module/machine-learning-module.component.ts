import { Component } from '@angular/core';
import { DocAnswerCardComponent } from './answer-card/answer-card.component';
import { DocPassageListComponent } from './passage-list/passage-list.component';
import { DocTopPassagesComponent } from './top-passages/top-passages.component';

@Component({
  selector: 'doc-machine-learning-module',
  templateUrl: '../../module-template.html'
})
export class DocMachineLearningModuleComponent {

  title = 'Machine Learning Module';

  components = [
    DocAnswerCardComponent,
    DocPassageListComponent,
    DocTopPassagesComponent
  ];

  constructor() { }

}
