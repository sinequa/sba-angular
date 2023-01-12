import { Component, OnInit } from '@angular/core';
import { FACETS } from 'src/mocks/facets';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-multi',
  templateUrl: './facet-multi.component.html'
})
export class FacetMultiComponent implements OnInit {

  FACETS = FACETS;

  code = `<sq-facet-card
    title="Multi"
    [collapsible]="false">
        <sq-facet-multi
            [results]="results"
            [facets]="FACETS"
            #facet></sq-facet-multi>
</sq-facet-card>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
