import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { createElement } from 'src/app/shared/create-element';
import { DocSearchFormComponent } from './search-form/search-form.component';
import { SearchFormComponent } from '@sinequa/components/search-form';
import { DocSearchFormModuleComponent } from './search-form-module.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: DocSearchFormModuleComponent }
];

@NgModule({
  declarations: [
    DocSearchFormModuleComponent,
    DocSearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    SearchFormComponent
  ]
})
export class DocSearchFormModule {
  constructor() {
    createElement('doc-search-form', DocSearchFormComponent);
  }
}
