import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-facet-chart',
    templateUrl: './facet-chart.component.html',
    standalone: false
})
export class DocFacetChartComponent extends BaseComponent {

  code = `<sq-facet-ngx-chart
    [results]="results"
    [aggregation]="'treepath'">
</sq-facet-ngx-chart>`;

}
