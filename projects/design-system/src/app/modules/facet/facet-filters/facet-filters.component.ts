import { Component } from '@angular/core';
import { FACETS } from 'src/mocks/facets';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-filters',
  templateUrl: './facet-filters.component.html'
})
export class DocFacetFiltersComponent {

  FACETS = FACETS;

  code = `<sq-facet-filters
  [results]="results"
  [facets]="FACETS"></sq-facet-filters>`;

  constructor(public globalService: GlobalService) { }

}
