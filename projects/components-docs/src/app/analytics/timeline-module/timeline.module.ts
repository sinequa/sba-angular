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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocTimelineModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-facet-date', DocFacetDateComponent);
    this.createElement('doc-facet-timeline', DocFacetTimelineComponent);
    this.createElement('doc-timeline', DocTimelineComponent);
    this.createElement('doc-timeline-legend', DocTimelineLegendComponent);
  }
}
