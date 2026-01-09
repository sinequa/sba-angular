import { Component } from '@angular/core';
import { DocBasketsMenuComponent } from './baskets-menu/baskets-menu.component';
import { DocEditBasketComponent } from './edit-basket/edit-basket.component';
import { DocFacetBasketsComponent } from './facet-baskets/facet-baskets.component';
import { DocManageBasketsComponent } from './manage-baskets/manage-baskets.component';
import { DocResultBasketsComponent } from './result-baskets/result-baskets.component';
import { DocSelectBasketsComponent } from './select-baskets/select-baskets.component';

@Component({
    selector: 'doc-baskets-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocBasketsModuleComponent {

  title = 'Baskets Module';

  components = [
    DocBasketsMenuComponent,
    DocEditBasketComponent,
    DocFacetBasketsComponent,
    DocManageBasketsComponent,
    DocResultBasketsComponent,
    DocSelectBasketsComponent
  ];

  constructor() { }

}
