import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-heatmap',
  templateUrl: './facet-heatmap.component.html'
})
export class DocFacetHeatmapComponent {

  code = `<sq-facet-heatmap
    [results]="results">
</sq-facet-heatmap>`;

  constructor(public globalService: GlobalService) { }

}
