import { Component } from '@angular/core';
import { FacetChartComponent } from './facet-chart/facet-chart.component';

@Component({
  selector: 'app-ngx-charts-module',
  templateUrl: '../../module-template.html'
})
export class NgxChartsModuleComponent {

  title = 'Ngx Charts Module';

  components = [
    FacetChartComponent
  ];

  constructor() { }

}
