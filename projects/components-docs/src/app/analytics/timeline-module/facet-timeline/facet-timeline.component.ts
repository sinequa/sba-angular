import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-facet-timeline',
  templateUrl: './facet-timeline.component.html'
})
export class DocFacetTimelineComponent extends BaseComponent {

  code = `<sq-facet-timeline
    [results]="results"
    [timeseries]="[{aggregation:'AggDateTimeline', primary: true}]"
    [width]="200">
</sq-facet-timeline>`;

}
