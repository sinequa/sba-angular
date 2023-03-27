import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocMachineLearningModuleComponent } from './machine-learning-module.component';
import { DocAnswerCardComponent } from './answer-card/answer-card.component';
import { DocPassageListComponent } from './passage-list/passage-list.component';
import { DocTopPassagesComponent } from './top-passages/top-passages.component';
import { MLModule } from '@sinequa/components/machine-learning';
import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocMachineLearningModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-answer-card', DocAnswerCardComponent);
    this.createElement('doc-passage-list', DocPassageListComponent);
    this.createElement('doc-top-passages', DocTopPassagesComponent);
  }
}
