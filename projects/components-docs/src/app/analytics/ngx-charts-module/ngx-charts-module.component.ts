import { Component } from '@angular/core';
import { DocFacetChartComponent } from './facet-chart/facet-chart.component';

@Component({
    selector: 'doc-ngx-charts-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocNgxChartsModuleComponent {

  title = 'Ngx Charts Module';

  components = [
    DocFacetChartComponent
  ];

  constructor() { }

}
