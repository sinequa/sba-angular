import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocCollapseModuleComponent } from './collapse-module.component';
import { DocCollapseComponent } from './collapse/collapse.component';
import { DocCollapseButtonComponent } from './collapse-button/collapse-button.component';
import { CollapseModule } from "@sinequa/components/collapse";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocCollapseModuleComponent }
];

@NgModule({
  declarations: [
    DocCollapseModuleComponent,
    DocCollapseComponent,
    DocCollapseButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    CollapseModule
  ]
})
export class DocCollapseModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-collapse', DocCollapseComponent);
    this.createElement('doc-collapse-button', DocCollapseButtonComponent);
  }
}
