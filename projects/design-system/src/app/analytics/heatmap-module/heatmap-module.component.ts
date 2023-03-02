import { Component } from '@angular/core';
import { FacetHeatmapComponent } from './facet-heatmap/facet-heatmap.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { ResultsHeatmapViewComponent } from './results-heatmap-view/results-heatmap-view.component';

@Component({
  selector: 'app-heatmap-module',
  templateUrl: '../../module-template.html'
})
export class HeatmapModuleComponent {

  title = 'Heatmap Module';

  components = [
    FacetHeatmapComponent,
    HeatmapComponent,
    ResultsHeatmapViewComponent
  ];

  constructor() { }

}
