import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocRfmModuleComponent } from './rfm-module.component';
import { DocRfmActionComponent } from './rfm-action/rfm-action.component';
import { BsRfmModule } from '@sinequa/components/rfm';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocRfmModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-rfm-action', DocRfmActionComponent);
  }
}
