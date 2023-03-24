import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { FACETS } from 'src/mocks/data/facets';

@Component({
  selector: 'doc-facet-multi',
  templateUrl: './facet-multi.component.html'
})
export class DocFacetMultiComponent extends BaseComponent {

  FACETS = FACETS;

  code = `<sq-facet-card
    title="Multi"
    [collapsible]="false">
        <sq-facet-multi
            [results]="results"
            [facets]="FACETS"
            #facet></sq-facet-multi>
</sq-facet-card>`;

}
