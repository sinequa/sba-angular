import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFeedbackModuleComponent } from './feedback-module.component';
import { DocFeedbackMenuComponent } from './feedback-menu/feedback-menu.component';
import { BsFeedbackModule } from '@sinequa/components/feedback';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocFeedbackModuleComponent }
];

@NgModule({
  declarations: [
    DocFeedbackModuleComponent,
    DocFeedbackMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsFeedbackModule
  ]
})
export class DocFeedbackModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-feedback-menu', DocFeedbackMenuComponent);
  }
}
