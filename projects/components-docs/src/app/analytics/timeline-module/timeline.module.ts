import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocTimelineModuleComponent } from './timeline-module.component';
import { DocFacetDateComponent } from './facet-date/facet-date.component';
import { DocFacetTimelineComponent } from './facet-timeline/facet-timeline.component';
import { DocTimelineComponent } from './timeline/timeline.component';
import { DocTimelineLegendComponent } from './timeline-legend/timeline-legend.component';
import { BsTimelineModule } from '@sinequa/analytics/timeline';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocTimelineModuleComponent }
];

@NgModule({
  declarations: [
    DocTimelineModuleComponent,
    DocFacetDateComponent,
    DocFacetTimelineComponent,
    DocTimelineComponent,
    DocTimelineLegendComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsTimelineModule
  ]
})
export class DocTimelineModule {
  constructor() {
    createElement('doc-facet-date', DocFacetDateComponent);
    createElement('doc-facet-timeline', DocFacetTimelineComponent);
    createElement('doc-timeline', DocTimelineComponent);
    createElement('doc-timeline-legend', DocTimelineLegendComponent);
  }
}
