import { Component } from '@angular/core';
import { DocChartComponent } from './chart/chart.component';
import { DocMultiLevelPieChartComponent } from './multi-level-pie-chart/multi-level-pie-chart.component';

@Component({
  selector: 'doc-fusioncharts-module',
  templateUrl: '../../module-template.html'
})
export class DocFusionchartsModuleComponent {

  title = 'Fusioncharts Module';

  components = [
    DocChartComponent,
    DocMultiLevelPieChartComponent
  ];

  constructor() { }

}
