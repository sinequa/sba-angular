import { Component } from '@angular/core';
import { FACETS } from 'src/mocks/data/facets';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-multi',
  templateUrl: './facet-multi.component.html'
})
export class DocFacetMultiComponent {

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

}
