import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocBasketsModuleComponent } from './baskets-module.component';
import { DocBasketsMenuComponent } from './baskets-menu/baskets-menu.component';
import { DocEditBasketComponent } from './edit-basket/edit-basket.component';
import { DocFacetBasketsComponent } from './facet-baskets/facet-baskets.component';
import { DocManageBasketsComponent } from './manage-baskets/manage-baskets.component';
import { DocResultBasketsComponent } from './result-baskets/result-baskets.component';
import { DocSelectBasketsComponent } from './select-baskets/select-baskets.component';
import { BsBasketsModule } from '@sinequa/components/baskets';
import { BsFacetModule } from '@sinequa/components/facet';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocBasketsModuleComponent }
];

@NgModule({
  declarations: [
    DocBasketsModuleComponent,
    DocBasketsMenuComponent,
    DocEditBasketComponent,
    DocFacetBasketsComponent,
    DocManageBasketsComponent,
    DocResultBasketsComponent,
    DocSelectBasketsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsBasketsModule,
    BsFacetModule
  ]
})
export class DocBasketsModule {
  constructor() {
    createElement('doc-edit-basket', DocEditBasketComponent);
    createElement('doc-manage-baskets', DocManageBasketsComponent);
    createElement('doc-select-baskets', DocSelectBasketsComponent);
    createElement('doc-result-baskets', DocResultBasketsComponent);
    createElement('doc-baskets-menu', DocBasketsMenuComponent);
    createElement('doc-facet-baskets', DocFacetBasketsComponent);
  }
}
