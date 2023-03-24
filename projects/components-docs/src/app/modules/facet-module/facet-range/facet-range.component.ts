import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-facet-range',
  templateUrl: './facet-range.component.html'
})
export class DocFacetRangeComponent extends BaseComponent {

  code = `<sq-facet-card
    title="Range
    [collapsible]="false"">
        <sq-facet-range
            [results]="results"
            [aggregation]="'modified'"
            [min]="'2017-01-01'"
            [max]="'2023-01-01'"></sq-facet-range>
</sq-facet-card>`;

}
