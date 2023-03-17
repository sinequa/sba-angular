import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-chart',
  templateUrl: './facet-chart.component.html'
})
export class DocFacetChartComponent {

  code = `<sq-facet-ngx-chart
    [results]="results"
    [aggregation]="'treepath'">
</sq-facet-ngx-chart>`;

  constructor(public globalService: GlobalService) { }

}
