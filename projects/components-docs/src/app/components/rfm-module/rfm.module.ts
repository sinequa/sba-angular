import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocRfmModuleComponent } from './rfm-module.component';
import { DocRfmActionComponent } from './rfm-action/rfm-action.component';
import { BsRfmModule } from '@sinequa/components/rfm';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocRfmModuleComponent }
];

@NgModule({
  declarations: [
    DocRfmModuleComponent,
    DocRfmActionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsRfmModule
  ]
})
export class DocRfmModule {
  constructor() {
    createElement('doc-rfm-action', DocRfmActionComponent);
  }
}
