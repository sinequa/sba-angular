import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocTooltipModuleComponent } from './tooltip-module.component';
import { DocTooltip2Component } from './tooltip-2/tooltip-2.component';
import { BsTooltipComponent } from '@sinequa/analytics/tooltip';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocTooltipModuleComponent }
];

@NgModule({
  declarations: [
    DocTooltipModuleComponent,
    DocTooltip2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsTooltipComponent
  ]
})
export class DocTooltipModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-tooltip-2', DocTooltip2Component);
  }
}
