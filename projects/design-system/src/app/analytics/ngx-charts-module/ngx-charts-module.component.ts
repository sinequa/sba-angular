import { Component } from '@angular/core';
import { DocFacetChartComponent } from './facet-chart/facet-chart.component';

@Component({
  selector: 'doc-ngx-charts-module',
  templateUrl: '../../module-template.html'
})
export class DocNgxChartsModuleComponent {

  title = 'Ngx Charts Module';

  components = [
    DocFacetChartComponent
  ];

  constructor() { }

}
