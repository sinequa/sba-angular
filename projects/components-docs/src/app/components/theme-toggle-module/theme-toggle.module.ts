import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocThemeToggleModuleComponent } from './theme-toggle-module.component';
import { DocThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { BsThemeToggleModule } from '@sinequa/components/theme-toggle';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocThemeToggleModuleComponent }
];

@NgModule({
  declarations: [
    DocThemeToggleModuleComponent,
    DocThemeToggleComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsThemeToggleModule
  ]
})
export class DocThemeToggleModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-theme-toggle', DocThemeToggleComponent);
  }
}
