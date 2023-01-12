import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-range',
  templateUrl: './facet-range.component.html'
})
export class FacetRangeComponent implements OnInit {

  code = `<sq-facet-card
    title="Range
    [collapsible]="false"">
        <sq-facet-range
            [results]="results"
            [aggregation]="'modified'"
            [min]="'2017-01-01'"
            [max]="'2023-01-01'"></sq-facet-range>
</sq-facet-card>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
