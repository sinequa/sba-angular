import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { environment } from 'src/environments/environment';
import { mockChartResults, mockChartAggregation } from './mock';

@Component({
    selector: 'doc-chart',
    templateUrl: './chart.component.html',
    standalone: false
})
export class DocChartComponent extends BaseComponent {

  code = `<sq-facet-card>
    <sq-fusion-chart
        [results]="results"
        [aggregation]="aggregation">
    </sq-fusion-chart>
</sq-facet-card>`;

  get results() {
    return environment.mock ? mockChartResults : this.globalService.results;
  }

  get aggregation() {
    return mockChartAggregation;
  }

}

