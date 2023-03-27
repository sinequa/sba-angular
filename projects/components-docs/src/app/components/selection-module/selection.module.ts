import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocSelectionModuleComponent } from './selection-module.component';
import { DocResultSelectorComponent } from './result-selector/result-selector.component';
import { DocResultsSelectorComponent } from './results-selector/results-selector.component';
import { DocSelectionArrangerComponent } from './selection-arranger/selection-arranger.component';
import { BsSelectionModule } from "@sinequa/components/selection";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocSelectionModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-result-selector', DocResultSelectorComponent);
    this.createElement('doc-results-selector', DocResultsSelectorComponent);
    this.createElement('doc-selection-arranger', DocSelectionArrangerComponent);
  }
}
