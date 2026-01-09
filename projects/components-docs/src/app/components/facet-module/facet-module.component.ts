import { Component } from '@angular/core';
import { DocFacetBarComponent } from './facet-bar/facet-bar.component';
import { DocFacetContainerComponent } from './facet-container/facet-container.component';
import { DocFacetFiltersComponent } from './facet-filters/facet-filters.component';
import { DocFacetListComponent } from './facet-list/facet-list.component';
import { DocFacetMultiComponent } from './facet-multi/facet-multi.component';
import { DocFacetRangeComponent } from './facet-range/facet-range.component';
import { DocFacetTagCloudComponent } from './facet-tag-cloud/facet-tag-cloud.component';
import { DocFacetTestingComponent } from './facet-testing/facet-testing.component';
import { DocFacetComponent } from './facet/facet.component';
// import { DocRefineComponent } from './refine/refine.component';

@Component({
    selector: 'doc-facet-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocFacetModuleComponent {

  title = 'Facet Module';

  components = [
    DocFacetComponent,
    DocFacetBarComponent,
    DocFacetFiltersComponent,
    DocFacetListComponent,
    DocFacetMultiComponent,
    DocFacetContainerComponent,
    DocFacetRangeComponent,
    DocFacetTagCloudComponent,
    // DocRefineComponent,
    DocFacetTestingComponent
  ];

  constructor() { }

}
