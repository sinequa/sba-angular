import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-chart',
  templateUrl: './chart.component.html'
})
export class DocChartComponent {

  code = `<sq-fusion-chart
    [results]="results">
</sq-fusion-chart>`;

  constructor(public globalService: GlobalService) { }

}
