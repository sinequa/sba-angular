import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-chart',
  templateUrl: './chart.component.html'
})
export class DocChartComponent extends BaseComponent {

  code = `<sq-fusion-chart
    [results]="results">
</sq-fusion-chart>`;

}
