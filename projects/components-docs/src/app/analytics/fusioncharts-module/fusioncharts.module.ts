import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocFusionchartsModuleComponent } from './fusioncharts-module.component';
import { DocChartComponent } from './chart/chart.component';
import { DocMultiLevelPieChartComponent } from './multi-level-pie-chart/multi-level-pie-chart.component';
import { FusionChartsModule } from '@sinequa/analytics/fusioncharts';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocFusionchartsModuleComponent }
];

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
// Fusion is a light theme, Candy is a dark theme
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { BsFacetModule } from '@sinequa/components/facet';
FusionCharts.options.creditLabel = false;

@NgModule({
  declarations: [
    DocFusionchartsModuleComponent,
    DocChartComponent,
    DocMultiLevelPieChartComponent
  ],
  imports: [
    CommonModule,
    BsFacetModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    FusionChartsModule.forRoot(FusionCharts, charts, FusionTheme, CandyTheme)
  ]
})
export class DocFusionchartsModule {
  constructor() {
    createElement('doc-chart', DocChartComponent);
    createElement('doc-multi-level-pie-chart', DocMultiLevelPieChartComponent);
  }
}
