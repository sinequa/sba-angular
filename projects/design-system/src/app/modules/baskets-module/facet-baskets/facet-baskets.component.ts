import { Component } from '@angular/core';

@Component({
  selector: 'doc-facet-baskets',
  templateUrl: './facet-baskets.component.html'
})
export class DocFacetBasketsComponent {

  code = `<sq-facet-card>
    <sq-facet-baskets #facet></sq-facet-baskets>
</sq-facet-card>`;

  constructor() { }

}
