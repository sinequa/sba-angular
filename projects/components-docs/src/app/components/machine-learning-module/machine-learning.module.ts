import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocMachineLearningModuleComponent } from './machine-learning-module.component';
import { DocAnswerCardComponent } from './answer-card/answer-card.component';
import { DocPassageListComponent } from './passage-list/passage-list.component';
import { DocTopPassagesComponent } from './top-passages/top-passages.component';
import { MLModule } from '@sinequa/components/machine-learning';
import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocMachineLearningModuleComponent }
];

@NgModule({
  declarations: [
    DocMachineLearningModuleComponent,
    DocAnswerCardComponent,
    DocPassageListComponent,
    DocTopPassagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MLModule,
    DocBaseModule
  ]
})
export class DocMachineLearningModule {
  constructor() {
    createElement('doc-answer-card', DocAnswerCardComponent);
    createElement('doc-passage-list', DocPassageListComponent);
    createElement('doc-top-passages', DocTopPassagesComponent);
  }
}
