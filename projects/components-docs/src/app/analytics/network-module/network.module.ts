import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocNetworkModuleComponent } from './network-module.component';
import { DocEdgeInfoCardComponent } from './edge-info-card/edge-info-card.component';
import { DocNetworkComponent } from './network/network.component';
import { DocNodeInfoCardComponent } from './node-info-card/node-info-card.component';
import { NetworkModule } from '@sinequa/analytics/network';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocNetworkModuleComponent }
];

@NgModule({
  declarations: [
    DocNetworkModuleComponent,
    DocEdgeInfoCardComponent,
    DocNetworkComponent,
    DocNodeInfoCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    NetworkModule
  ]
})
export class DocNetworkModule {
  constructor() {
    createElement('doc-edge-info-card', DocEdgeInfoCardComponent);
    createElement('doc-network', DocNetworkComponent);
    createElement('doc-node-info-card', DocNodeInfoCardComponent);
  }
}
