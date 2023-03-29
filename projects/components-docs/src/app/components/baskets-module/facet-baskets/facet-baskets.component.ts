import { Component } from '@angular/core';
import { BasketsService } from '@sinequa/components/baskets';
import { environment } from 'src/environments/environment';
import { baskets } from 'src/mocks/data/user-settings';

@Component({
  selector: 'doc-facet-baskets',
  templateUrl: './facet-baskets.component.html'
})
export class DocFacetBasketsComponent {

  code = `<sq-facet-card>
    <sq-facet-baskets #facet></sq-facet-baskets>
</sq-facet-card>`;

  constructor(private basketsService: BasketsService) {
    if (environment.mock) {
      this.basketsService.updateBaskets(baskets);
    }
  }

}
