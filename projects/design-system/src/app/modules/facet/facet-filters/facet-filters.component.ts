import { Component, OnInit } from '@angular/core';
import { FACETS } from 'src/mocks/facets';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-facet-filters',
  templateUrl: './facet-filters.component.html'
})
export class FacetFiltersComponent implements OnInit {

  results: any = RESULTS;
  FACETS = FACETS;

  code = `<sq-facet-filters
  [results]="results"
  [facets]="FACETS"></sq-facet-filters>`;

  constructor() { }

  ngOnInit(): void {
  }

}
