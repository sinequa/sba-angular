import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocNgxChartsModuleComponent } from './ngx-charts-module.component';
import { DocFacetChartComponent } from './facet-chart/facet-chart.component';
import { NgxChartsModule } from '@sinequa/analytics/ngx-charts';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocNgxChartsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-facet-chart', DocFacetChartComponent);
  }
}
