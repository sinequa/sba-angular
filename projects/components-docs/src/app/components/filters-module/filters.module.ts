import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFiltersModuleComponent } from './filters-module.component';
import { createElement } from 'src/app/shared/create-element';
import { DocFiltersComponent } from './filters/filters.component';
import { FiltersModule } from '@sinequa/components/filters';
import { DocFiltersEditorComponent } from './filters-editor/filters-editor.component';
import { DocFiltersViewComponent } from './filters-view/filters-view.component';

const routes: Routes = [
  { path: '', component: DocFiltersModuleComponent }
];

@NgModule({
  declarations: [
    DocFiltersModuleComponent,
    DocFiltersComponent,
    DocFiltersEditorComponent,
    DocFiltersViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    FiltersModule
  ]
})
export class DocFiltersModule {
  constructor() {
    createElement('doc-filters', DocFiltersComponent);
    createElement('doc-filters-editor', DocFiltersEditorComponent);
    createElement('doc-filters-view', DocFiltersViewComponent);
  }
}
