import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';
import { FacetBarComponent } from './facet-bar/facet-bar.component';
import { FacetFiltersComponent } from './facet-filters/facet-filters.component';
import { FacetListComponent } from './facet-list/facet-list.component';
import { FacetMultiComponent } from './facet-multi/facet-multi.component';
import { FacetRangeComponent } from './facet-range/facet-range.component';
import { FacetTagCloudComponent } from './facet-tag-cloud/facet-tag-cloud.component';
import { FacetTestingComponent } from './facet-testing/facet-testing.component';
import { FacetComponent } from './facet/facet.component';
import { RefineComponent } from './refine/refine.component';

@Component({
  selector: 'app-facet-module',
  templateUrl: './facet-module.component.html'
})
export class FacetModuleComponent {

  components = [
    FacetComponent,
    FacetBarComponent,
    FacetFiltersComponent,
    FacetListComponent,
    FacetMultiComponent,
    FacetRangeComponent,
    FacetTagCloudComponent,
    RefineComponent,
    FacetTestingComponent
  ];

  constructor(public globalService: GlobalService) { }

}
