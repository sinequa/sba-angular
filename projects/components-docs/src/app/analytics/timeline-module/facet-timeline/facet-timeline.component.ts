import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-timeline',
  templateUrl: './facet-timeline.component.html'
})
export class DocFacetTimelineComponent {

  code = `<sq-facet-timeline
    [results]="results"
    [timeseries]="[{aggregation:'AggDateTimeline', primary: true}]"
    [width]="200">
</sq-facet-timeline>`;

  constructor(public globalService: GlobalService) { }

}
