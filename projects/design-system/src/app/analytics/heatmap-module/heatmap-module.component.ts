import { Component } from '@angular/core';
import { DocFacetHeatmapComponent } from './facet-heatmap/facet-heatmap.component';
import { DocHeatmapComponent } from './heatmap/heatmap.component';
import { DocResultsHeatmapViewComponent } from './results-heatmap-view/results-heatmap-view.component';

@Component({
  selector: 'doc-heatmap-module',
  templateUrl: '../../module-template.html'
})
export class DocHeatmapModuleComponent {

  title = 'Heatmap Module';
  description = ``;

  components = [
    DocFacetHeatmapComponent,
    DocHeatmapComponent,
    DocResultsHeatmapViewComponent
  ];

  constructor() { }

}
