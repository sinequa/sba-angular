import { Component } from '@angular/core';
import { BasketsService } from '@sinequa/components/baskets';
import { environment } from 'src/environments/environment';
import { baskets } from 'src/mocks/data/user-settings';

@Component({
    selector: 'doc-select-baskets',
    templateUrl: './select-baskets.component.html',
    standalone: false
})
export class DocSelectBasketsComponent {

  code = `<sq-select-basket></sq-select-basket>`;

  constructor(private basketsService: BasketsService) {
    if (environment.mock) {
      this.basketsService.updateBaskets(baskets);
    }
  }

}
