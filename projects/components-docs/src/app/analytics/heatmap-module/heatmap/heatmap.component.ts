import { Component } from '@angular/core';
import { HeatmapItem } from '@sinequa/analytics/heatmap';

@Component({
  selector: 'doc-heatmap',
  templateUrl: './heatmap.component.html'
})
export class DocHeatmapComponent {

  code = `<sq-heatmap
    [data]="data">
</sq-heatmap>`;

  data: HeatmapItem[] = [
    {
      x: '1.0',
      y: '5.0',
      count: 2,
      value: 'string',
      display: 'string',
      selected: true
    },
    {
      x: '2.0',
      y: '9.0',
      count: 10,
      value: 'string2',
      display: 'string2'
    }
  ];

  constructor() { }

}
