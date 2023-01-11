import { Component, OnInit } from '@angular/core';
import { FACETS } from 'src/mocks/facets';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-facet-multi',
  templateUrl: './facet-multi.component.html'
})
export class FacetMultiComponent implements OnInit {

  results: any = RESULTS;
  FACETS = FACETS;

  code = `<sq-facet-card
    title="Multi"
    [collapsible]="false">
        <sq-facet-multi
            [results]="results"
            [facets]="FACETS"
            #facet></sq-facet-multi>
</sq-facet-card>`;

  constructor() { }

  ngOnInit(): void {
  }

}
