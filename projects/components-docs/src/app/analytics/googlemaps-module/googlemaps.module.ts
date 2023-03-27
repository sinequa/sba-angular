import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocGooglemapsModuleComponent } from './googlemaps-module.component';
import { DocMapComponent } from './map/map.component';
import { GoogleMapsModule } from '@sinequa/analytics/googlemaps';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocGooglemapsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-map', DocMapComponent);
  }
}
