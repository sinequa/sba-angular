import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocVisTimelineModuleComponent } from './vis-timeline-module.component';
import { DocResultTimelineComponent } from './result-timeline/result-timeline.component';
import { VisTimelineModule } from '@sinequa/analytics/vis-timeline';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocVisTimelineModuleComponent }
];

@NgModule({
  declarations: [
    DocVisTimelineModuleComponent,
    DocResultTimelineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    VisTimelineModule
  ]
})
export class DocVisTimelineModule {
  constructor() {
    createElement('doc-result-timeline', DocResultTimelineComponent);
  }
}
