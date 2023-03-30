import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { FACETS } from 'src/mocks/data/facets';

@Component({
  selector: 'doc-facet-filters',
  templateUrl: './facet-filters.component.html'
})
export class DocFacetFiltersComponent extends BaseComponent {

  FACETS = FACETS;

  code = `<sq-facet-filters
  [results]="results"
  [facets]="FACETS"></sq-facet-filters>`;

}
