import { Component } from '@angular/core';
import { FACETS } from 'src/mocks/facets';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-filters',
  templateUrl: './facet-filters.component.html'
})
export class FacetFiltersComponent {

  FACETS = FACETS;

  code = `<sq-facet-filters
  [results]="results"
  [facets]="FACETS"></sq-facet-filters>`;

  constructor(public globalService: GlobalService) { }

}
