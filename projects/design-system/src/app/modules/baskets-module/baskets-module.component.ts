import { Component } from '@angular/core';
import { BasketsMenuComponent } from './baskets-menu/baskets-menu.component';
import { EditBasketComponent } from './edit-basket/edit-basket.component';
import { FacetBasketsComponent } from './facet-baskets/facet-baskets.component';
import { ManageBasketsComponent } from './manage-baskets/manage-baskets.component';
import { ResultBasketsComponent } from './result-baskets/result-baskets.component';
import { SelectBasketsComponent } from './select-baskets/select-baskets.component';

@Component({
  selector: 'app-baskets-module',
  templateUrl: '../../module-template.html'
})
export class BasketsModuleComponent {

  title = 'Baskets Module';

  components = [
    BasketsMenuComponent,
    EditBasketComponent,
    FacetBasketsComponent,
    ManageBasketsComponent,
    ResultBasketsComponent,
    SelectBasketsComponent
  ];

  constructor() { }

}
