import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-facet-heatmap',
    templateUrl: './facet-heatmap.component.html',
    standalone: false
})
export class DocFacetHeatmapComponent extends BaseComponent {

  code = `<sq-facet-heatmap
    [results]="results">
</sq-facet-heatmap>`;

}
