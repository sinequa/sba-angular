import { Component, OnInit } from '@angular/core';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-facet-list',
  templateUrl: './facet-list.component.html'
})
export class FacetListComponent implements OnInit {

  results: any = RESULTS;

  code = `<sq-facet-card
    title="List"
    [collapsible]="false">
        <sq-facet-list
            #facet
            [results]="results"
            [aggregation]="'Treepath'"></sq-facet-list>
</sq-facet-card>`;

  constructor() { }

  ngOnInit(): void {
  }

}
