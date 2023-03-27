import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocAgGridModuleComponent } from './ag-grid-module.component';
import { DocAgGridViewComponent } from './ag-grid-view/ag-grid-view.component';
import { AgGridModule } from '@sinequa/analytics/ag-grid';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocAgGridModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-ag-grid-view', DocAgGridViewComponent);
  }
}
