import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocActionModuleComponent } from './action-module.component';
import { DocActionButtonsComponent } from './action-buttons/action-buttons.component';
import { DocActionItemComponent } from './action-item/action-item.component';
import { DocActionMenuComponent } from './action-menu/action-menu.component';
import { BsActionModule } from "@sinequa/components/action";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocActionModuleComponent }
];

@NgModule({
  declarations: [
    DocActionModuleComponent,
    DocActionButtonsComponent,
    DocActionItemComponent,
    DocActionMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsActionModule
  ]
})
export class DocActionModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-action-buttons', DocActionButtonsComponent);
    this.createElement('doc-action-item', DocActionItemComponent);
    this.createElement('doc-action-menu', DocActionMenuComponent);
  }
}
