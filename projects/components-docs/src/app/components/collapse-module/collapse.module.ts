import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocCollapseModuleComponent } from './collapse-module.component';
import { DocCollapseComponent } from './collapse/collapse.component';
import { DocCollapseButtonComponent } from './collapse-button/collapse-button.component';
import { CollapseModule } from "@sinequa/components/collapse";
import { createElement } from 'src/app/shared/create-element';

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
export class DocCollapseModule {
  constructor() {
    createElement('doc-collapse', DocCollapseComponent);
    createElement('doc-collapse-button', DocCollapseButtonComponent);
  }
}
