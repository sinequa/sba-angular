import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocResultsViewModuleComponent } from './results-view-module.component';
import { DocResultsGridViewComponent } from './results-grid-view/results-grid-view.component';
import { DocResultsViewSelectorComponent } from './results-view-selector/results-view-selector.component';
import { BsResultsViewModule, ResultsView } from "@sinequa/components/results-view";
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocResultsViewModuleComponent }
];

const resultsViews: ResultsView[] = [
  {
    name: 'name',
    type: 'type',
    display: 'text',
    icon: 'fas fa-user'
  },
  {
    name: 'name2',
    type: 'type2',
    display: 'text2',
    icon: 'fas fa-thumbs-up'
  }
];

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
    BsResultsViewModule.forRoot(resultsViews, resultsViews[0])
  ]
})
export class DocResultsViewModule {
  constructor() {
    createElement('doc-results-grid-view', DocResultsGridViewComponent);
    createElement('doc-results-view-selector', DocResultsViewSelectorComponent);
  }
}
