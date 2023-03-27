import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocStatusBarModuleComponent } from './status-bar-module.component';
import { DocFullscreenActivatorComponent } from './fullscreen-activator/fullscreen-activator.component';
import { DocNetworkActivityComponent } from './network-activity/network-activity.component';
import { BsStatusBarModule } from '@sinequa/components/status-bar';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocStatusBarModuleComponent }
];

@NgModule({
  declarations: [
    DocStatusBarModuleComponent,
    DocFullscreenActivatorComponent,
    DocNetworkActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsStatusBarModule
  ]
})
export class DocStatusBarModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-fullscreen-activator', DocFullscreenActivatorComponent);
    this.createElement('doc-network-activity', DocNetworkActivityComponent);
  }
}
