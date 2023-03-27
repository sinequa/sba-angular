import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocVisTimelineModuleComponent } from './vis-timeline-module.component';
import { DocResultTimelineComponent } from './result-timeline/result-timeline.component';
import { VisTimelineModule } from '@sinequa/analytics/vis-timeline';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocVisTimelineModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-result-timeline', DocResultTimelineComponent);
  }
}
