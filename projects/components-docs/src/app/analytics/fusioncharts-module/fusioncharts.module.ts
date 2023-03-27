import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFusionchartsModuleComponent } from './fusioncharts-module.component';
import { DocChartComponent } from './chart/chart.component';
import { DocMultiLevelPieChartComponent } from './multi-level-pie-chart/multi-level-pie-chart.component';
import { FusionChartsModule } from '@sinequa/analytics/fusioncharts';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocFusionchartsModuleComponent }
];

@NgModule({
  declarations: [
    DocFusionchartsModuleComponent,
    DocChartComponent,
    DocMultiLevelPieChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    FusionChartsModule
  ]
})
export class DocFusionchartsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-chart', DocChartComponent);
    this.createElement('doc-multi-level-pie-chart', DocMultiLevelPieChartComponent);
  }
}
