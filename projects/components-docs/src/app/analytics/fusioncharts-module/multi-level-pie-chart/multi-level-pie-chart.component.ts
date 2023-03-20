import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-multi-level-pie-chart',
  templateUrl: './multi-level-pie-chart.component.html'
})
export class DocMultiLevelPieChartComponent extends BaseComponent {

  code = `<sq-multi-level-pie-chart
    [results]="results">
</sq-multi-level-pie-chart>`;

}
