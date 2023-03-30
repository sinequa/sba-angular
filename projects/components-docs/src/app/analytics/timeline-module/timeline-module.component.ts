import { Component } from '@angular/core';
import { DocFacetDateComponent } from './facet-date/facet-date.component';
import { DocFacetTimelineComponent } from './facet-timeline/facet-timeline.component';
import { DocTimelineLegendComponent } from './timeline-legend/timeline-legend.component';
import { DocTimelineComponent } from './timeline/timeline.component';

@Component({
  selector: 'doc-timeline-module',
  templateUrl: '../../module-template.html'
})
export class DocTimelineModuleComponent {

  title = 'Timeline Module';

  components = [
    DocFacetDateComponent,
    DocFacetTimelineComponent,
    DocTimelineComponent,
    DocTimelineLegendComponent
  ];

  constructor() { }

}
