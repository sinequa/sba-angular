import { Component } from '@angular/core';

@Component({
  selector: 'app-facet-baskets',
  templateUrl: './facet-baskets.component.html'
})
export class FacetBasketsComponent {

  code = `<sq-facet-card>
    <sq-facet-baskets #facet></sq-facet-baskets>
</sq-facet-card>`;

  constructor() { }

}
