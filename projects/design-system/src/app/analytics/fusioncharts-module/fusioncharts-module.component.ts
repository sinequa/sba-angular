import { Component } from '@angular/core';
import { ChartComponent } from './chart/chart.component';
import { MultiLevelPieChartComponent } from './multi-level-pie-chart/multi-level-pie-chart.component';

@Component({
  selector: 'app-fusioncharts-module',
  templateUrl: '../../module-template.html'
})
export class FusionchartsModuleComponent {

  title = 'Fusioncharts Module';

  components = [
    ChartComponent,
    MultiLevelPieChartComponent
  ];

  constructor() { }

}
