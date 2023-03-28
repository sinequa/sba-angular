import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocSelectionModuleComponent } from './selection-module.component';
import { DocResultSelectorComponent } from './result-selector/result-selector.component';
import { DocResultsSelectorComponent } from './results-selector/results-selector.component';
import { DocSelectionArrangerComponent } from './selection-arranger/selection-arranger.component';
import { BsSelectionModule } from "@sinequa/components/selection";
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocSelectionModuleComponent }
];

@NgModule({
  declarations: [
    DocSelectionModuleComponent,
    DocResultSelectorComponent,
    DocResultsSelectorComponent,
    DocSelectionArrangerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsSelectionModule
  ]
})
export class DocSelectionModule {
  constructor() {
    createElement('doc-result-selector', DocResultSelectorComponent);
    createElement('doc-results-selector', DocResultsSelectorComponent);
    createElement('doc-selection-arranger', DocSelectionArrangerComponent);
  }
}
