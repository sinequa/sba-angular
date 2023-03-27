import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocUtilsModuleComponent } from './utils-module.component';
import { DocStickyComponent } from './sticky/sticky.component';
import { DocTooltipComponent } from './tooltip/tooltip.component';
import { UtilsModule } from "@sinequa/components/utils";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocUtilsModuleComponent }
];

@NgModule({
  declarations: [
    DocUtilsModuleComponent,
    DocStickyComponent,
    DocTooltipComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    UtilsModule
  ]
})
export class DocUtilsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-sticky', DocStickyComponent);
    this.createElement('doc-tooltip', DocTooltipComponent);
  }
}
