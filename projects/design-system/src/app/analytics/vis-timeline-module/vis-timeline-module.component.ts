import { Component } from '@angular/core';
import { DocResultTimelineComponent } from './result-timeline/result-timeline.component';

@Component({
  selector: 'doc-vis-timeline-module',
  templateUrl: '../../module-template.html'
})
export class DocVisTimelineModuleComponent {

  title = 'Vis Timeline Module';

  components = [
    DocResultTimelineComponent
  ];

  constructor() { }

}
