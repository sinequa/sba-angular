import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-multi-level-pie-chart',
  templateUrl: './multi-level-pie-chart.component.html'
})
export class DocMultiLevelPieChartComponent {

  code = `<sq-multi-level-pie-chart
    [results]="results">
</sq-multi-level-pie-chart>`;

  constructor(public globalService: GlobalService) { }

}
