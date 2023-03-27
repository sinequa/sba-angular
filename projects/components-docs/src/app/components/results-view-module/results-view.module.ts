import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocResultsViewModuleComponent } from './results-view-module.component';
import { DocResultsGridViewComponent } from './results-grid-view/results-grid-view.component';
import { DocResultsViewSelectorComponent } from './results-view-selector/results-view-selector.component';
import { BsResultsViewModule, ResultsView } from "@sinequa/components/results-view";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocResultsViewModuleComponent }
];

const resultsView: ResultsView = {
  name: 'name',
  type: 'type'
};

@NgModule({
  declarations: [
    DocResultsViewModuleComponent,
    DocResultsGridViewComponent,
    DocResultsViewSelectorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsResultsViewModule,
    BsResultsViewModule.forRoot([resultsView], resultsView)
  ]
})
export class DocResultsViewModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-results-grid-view', DocResultsGridViewComponent);
    this.createElement('doc-results-view-selector', DocResultsViewSelectorComponent);
  }
}
