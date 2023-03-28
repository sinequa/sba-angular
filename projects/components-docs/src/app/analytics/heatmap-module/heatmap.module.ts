import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocHeatmapModuleComponent } from './heatmap-module.component';
import { DocFacetHeatmapComponent } from './facet-heatmap/facet-heatmap.component';
import { DocResultsHeatmapViewComponent } from './results-heatmap-view/results-heatmap-view.component';
import { DocHeatmapComponent } from './heatmap/heatmap.component';
import { BsHeatmapModule } from '@sinequa/analytics/heatmap';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocHeatmapModuleComponent }
];

@NgModule({
  declarations: [
    DocHeatmapModuleComponent,
    DocFacetHeatmapComponent,
    DocHeatmapComponent,
    DocResultsHeatmapViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsHeatmapModule
  ]
})
export class DocHeatmapModule {
  constructor() {
    createElement('doc-facet-heatmap', DocFacetHeatmapComponent);
    createElement('doc-heatmap', DocHeatmapComponent);
    createElement('doc-results-heatmap-view', DocResultsHeatmapViewComponent);
  }
}
