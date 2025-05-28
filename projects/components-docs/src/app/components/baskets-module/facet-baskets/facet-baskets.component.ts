import { Component } from '@angular/core';
import { BasketsService } from '@sinequa/components/baskets';
import { environment } from 'src/environments/environment';
import { baskets } from 'src/mocks/data/user-settings';

@Component({
  selector: 'doc-facet-baskets',
  templateUrl: './facet-baskets.component.html'
})
export class DocFacetBasketsComponent {

  code = `<sq-facet-card
    [title]="'msg#baskets.baskets'"
    [tooltip]="'msg#home.basketsTooltip'"
    [icon]="'fas fa-shopping-basket'"
    [collapsible]="false">
        <sq-facet-baskets #facet
            [maxBaskets]="5">
        </sq-facet-baskets>
</sq-facet-card>`;

  constructor(private basketsService: BasketsService) {
    if (environment.mock) {
      this.basketsService.updateBaskets(baskets);
    }
  }

}
