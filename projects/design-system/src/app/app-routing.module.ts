import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from "./buttons/buttons.component";
import { InputsComponent } from "./inputs/inputs.component";
import { SearchComponent } from "./search/search.component";
import { AlertsComponent } from "./alerts/alerts.component";
import { FacetModuleComponent } from './modules/facet/facet-module.component';
import { PreviewModuleComponent } from './modules/preview/preview-module.component';
import { ResultModuleComponent } from './modules/result/result-module.component';
import { BasketsModuleComponent } from './modules/baskets-module/baskets-module.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent },
  { path: 'inputs', component: InputsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'facet', component: FacetModuleComponent },
  { path: 'preview', component: PreviewModuleComponent },
  { path: 'baskets', component: BasketsModuleComponent },
  { path: 'result', component: ResultModuleComponent },
  { path: '**', redirectTo: '/buttons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
