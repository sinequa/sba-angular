import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocNgxChartsModuleComponent } from './ngx-charts-module.component';
import { DocFacetChartComponent } from './facet-chart/facet-chart.component';
import { NgxChartsModule } from '@sinequa/analytics/ngx-charts';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocNgxChartsModuleComponent }
];

@NgModule({
  declarations: [
    DocNgxChartsModuleComponent,
    DocFacetChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    NgxChartsModule
  ]
})
export class DocNgxChartsModule {
  constructor() {
    createElement('doc-facet-chart', DocFacetChartComponent);
  }
}
