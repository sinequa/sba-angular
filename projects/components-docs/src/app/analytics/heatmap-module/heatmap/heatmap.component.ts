import { Component } from '@angular/core';
import { mockHeatmapData } from './mock';

@Component({
    selector: 'doc-heatmap',
    templateUrl: './heatmap.component.html',
    standalone: false
})
export class DocHeatmapComponent {

  code = `<sq-heatmap
    [data]="data">
</sq-heatmap>`;

  get data() {
    return mockHeatmapData;
  }

}
