import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocAgGridModuleComponent } from './ag-grid-module.component';
import { DocAgGridViewComponent } from './ag-grid-view/ag-grid-view.component';
import { AgGridModule } from '@sinequa/analytics/ag-grid';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocAgGridModuleComponent }
];

@NgModule({
  declarations: [
    DocAgGridModuleComponent,
    DocAgGridViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    AgGridModule
  ]
})
export class DocAgGridModule {
  constructor() {
    createElement('doc-ag-grid-view', DocAgGridViewComponent);
  }
}
