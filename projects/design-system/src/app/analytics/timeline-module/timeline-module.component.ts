import { Component } from '@angular/core';
import { FacetDateComponent } from './facet-date/facet-date.component';
import { FacetTimelineComponent } from './facet-timeline/facet-timeline.component';
import { TimelineLegendComponent } from './timeline-legend/timeline-legend.component';
import { TimelineComponent } from './timeline/timeline.component';

@Component({
  selector: 'app-timeline-module',
  templateUrl: '../../module-template.html'
})
export class TimelineModuleComponent {

  title = 'Timeline Module';

  components = [
    FacetDateComponent,
    FacetTimelineComponent,
    TimelineComponent,
    TimelineLegendComponent
  ];

  constructor() { }

}
