import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-facet-date',
    templateUrl: './facet-date.component.html',
    standalone: false
})
export class DocFacetDateComponent extends BaseComponent {

  code = `<sq-facet-date
    [results]="results"
    [aggregation]="'AggDateDist'"
    [timelineAggregation]="'AggDateTimeline'"
    [allowPredefinedRange]="true"
    [allowCustomRange]="true"
    [showCustomRange]="true">
</sq-facet-date>`;

}
