import { Component } from '@angular/core';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { BasketsService } from '@sinequa/components/baskets';
import { environment } from 'src/environments/environment';
import { baskets } from 'src/mocks/data/user-settings';

@Component({
    selector: 'doc-manage-baskets',
    templateUrl: './manage-baskets.component.html',
    providers: [{ provide: MODAL_MODEL, useValue: { baskets } }],
    standalone: false
})
export class DocManageBasketsComponent {

  code1 = `<sq-manage-baskets></sq-manage-baskets>`;

  constructor(private basketsService: BasketsService) {
    if (environment.mock) {
      this.basketsService.updateBaskets(baskets);
    }
  }

}
