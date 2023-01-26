import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from "./buttons/buttons.component";
import { InputsComponent } from "./inputs/inputs.component";
import { SearchComponent } from "./search/search.component";
import { FacetModuleComponent } from './modules/facet/facet-module.component';
import { PreviewModuleComponent } from './modules/preview/preview-module.component';
import { ResultModuleComponent } from './modules/result/result-module.component';
import { BasketsModuleComponent } from './modules/baskets-module/baskets-module.component';
import { CollapseModuleComponent } from './modules/collapse-module/collapse-module.component';
import { CommentsModuleComponent } from './modules/comments-module/comments-module.component';
import { FeedbackModuleComponent } from './modules/feedback-module/feedback-module.component';
import { LabelsModuleComponent } from './modules/labels-module/labels-module.component';
import { MachineLearningModuleComponent } from './modules/machine-learning-module/machine-learning-module.component';
import { MetadataModuleComponent } from './modules/metadata-module/metadata-module.component';
import { AdvancedModuleComponent } from './modules/advanced-module/advanced-module.component';
import { AlertsModuleComponent } from './modules/alerts-module/alerts-module.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent },
  { path: 'inputs', component: InputsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'alerts', component: AlertsModuleComponent },
  { path: 'advanced', component: AdvancedModuleComponent },
  { path: 'facet', component: FacetModuleComponent },
  { path: 'preview', component: PreviewModuleComponent },
  { path: 'baskets', component: BasketsModuleComponent },
  { path: 'result', component: ResultModuleComponent },
  { path: 'collapse', component: CollapseModuleComponent },
  { path: 'comments', component: CommentsModuleComponent },
  { path: 'feedback', component: FeedbackModuleComponent },
  { path: 'labels', component: LabelsModuleComponent },
  { path: 'machine-learning', component: MachineLearningModuleComponent },
  { path: 'metadata', component: MetadataModuleComponent },
  { path: '**', redirectTo: '/buttons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
