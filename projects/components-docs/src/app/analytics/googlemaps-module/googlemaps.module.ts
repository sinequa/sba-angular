import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocGooglemapsModuleComponent } from './googlemaps-module.component';
import { DocMapComponent } from './map/map.component';
import { GoogleMapsModule } from '@sinequa/analytics/googlemaps';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocGooglemapsModuleComponent }
];

@NgModule({
  declarations: [
    DocGooglemapsModuleComponent,
    DocMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    GoogleMapsModule
  ]
})
export class DocGooglemapsModule {
  constructor() {
    createElement('doc-map', DocMapComponent);
  }
}
