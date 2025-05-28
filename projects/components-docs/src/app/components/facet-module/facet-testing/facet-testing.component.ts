import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-facet-testing',
  templateUrl: './facet-testing.component.html',
  styles: [`::ng-deep :host > sq-facet-card > .card > .card-header {
    background-color: #f5f6fa !important;
  }`]
})
export class DocFacetTestingComponent extends BaseComponent {

  code1 = `<sq-facet-card
    [title]="'Booleans'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggBool'">
        </sq-facet-list>
</sq-facet-card>`;
  code2 = `<sq-facet-card
    [title]="'Integers'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggInt'">
        </sq-facet-list>
</sq-facet-card>`;
  code3 = `<sq-facet-card
    [title]="'Doubles'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggDouble'">
        </sq-facet-list>
</sq-facet-card>`;
  code4 = `<sq-facet-card
    [title]="'Doubles Dist'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggDoubleDist'">
        </sq-facet-list>
</sq-facet-card>`;
  code5 = `<sq-facet-card
    [title]="'Doubles Range'">
        <sq-facet-range
            #facet
            [results]="results"
            [aggregation]="'AggDoubleRange'">
        </sq-facet-range>
</sq-facet-card>`;
  code6 = `<sq-facet-card
    [title]="'Dates Dist'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggDateDist'">
        </sq-facet-list>
</sq-facet-card>`;
  code7 = `<sq-facet-card
    [title]="'Dates Range'">
        <sq-facet-range
            #facet
            [results]="results"
            [aggregation]="'AggDateRange'">
        </sq-facet-range>
</sq-facet-card>`;
  code8 = `<sq-facet-card
    [title]="'Dates Timeline'">
        <sq-facet-timeline
            #facet
            [results]="results"
            [timeseries]="[{aggregation:'AggDateTimeline', primary: true}]"
            [width]="200">
        </sq-facet-timeline>
</sq-facet-card>`;
  code9 = `<sq-facet-card
    [title]="'Dates'">
        <sq-facet-date
            #facet
            [results]="results"
            [aggregation]="'AggDateDist'"
            [timelineAggregation]="'AggDateTimeline'"
            [allowPredefinedRange]="true"
            [allowCustomRange]="true"
            [showCustomRange]="true">
        </sq-facet-date>
</sq-facet-card>`;
  code10 = `<sq-facet-card
    [title]="'Strings'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggString'">
        </sq-facet-list>
</sq-facet-card>`;
  code11 = `<sq-facet-card
    [title]="'Trees'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggTree'">
        </sq-facet-list>
</sq-facet-card>`;
  code12 = `<sq-facet-card
    [title]="'Entities'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggEntity'">
        </sq-facet-list>
</sq-facet-card>`;
  code13 = `<sq-facet-card
    [title]="'Normalized Entities'">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'AggEntityNorm'">
        </sq-facet-list>
</sq-facet-card>`;

}
