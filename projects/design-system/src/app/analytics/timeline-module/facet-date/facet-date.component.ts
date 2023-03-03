import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-date',
  templateUrl: './facet-date.component.html'
})
export class DocFacetDateComponent {

  code = `<sq-facet-date
    [results]="results"
    [aggregation]="'AggDateDist'"
    [timelineAggregation]="'AggDateTimeline'"
    [allowPredefinedRange]="true"
    [allowCustomRange]="true"
    [showCustomRange]="true">
</sq-facet-date>`;

  constructor(public globalService: GlobalService) { }

}
