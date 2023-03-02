import { Component } from '@angular/core';
import { ResultTimelineComponent } from './result-timeline/result-timeline.component';

@Component({
  selector: 'app-vis-timeline-module',
  templateUrl: '../../module-template.html'
})
export class VisTimelineModuleComponent {

  title = 'Vis Timeline Module';

  components = [
    ResultTimelineComponent
  ];

  constructor() { }

}
