import { Component, OnInit } from '@angular/core';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-facet-tree',
  templateUrl: './facet-tree.component.html'
})
export class FacetTreeComponent implements OnInit {

  results: any = RESULTS;

  code = `<sq-facet-card
    title="Tree"
    [collapsible]="false">
        <sq-facet-tree
            [results]="results"
            [aggregation]="'Treepath'"></sq-facet-tree>
</sq-facet-card>`;

  constructor() { }

  ngOnInit(): void {
  }

}
