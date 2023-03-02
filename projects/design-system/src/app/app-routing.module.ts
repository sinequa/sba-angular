import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ButtonsComponent } from "./buttons/buttons.component";
import { InputsComponent } from "./inputs/inputs.component";
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
import { AutocompleteModuleComponent } from './modules/autocomplete-module/autocomplete-module.component';
import { ModalModuleComponent } from './modules/modal-module/modal-module.component';
import { NotificationModuleComponent } from './modules/notification-module/notification-module.component';
import { ResultsViewModuleComponent } from './modules/results-view-module/results-view-module.component';
import { SearchModuleComponent } from './modules/search-module/search-module.component';
import { RfmModuleComponent } from './modules/rfm-module/rfm-module.component';
import { SavedQueriesModuleComponent } from './modules/saved-queries-module/saved-queries-module.component';
import { StatusBarModuleComponent } from './modules/status-bar-module/status-bar-module.component';
import { SlideBuilderModuleComponent } from './modules/slide-builder-module/slide-builder-module.component';
import { SelectionModuleComponent } from './modules/selection-module/selection-module.component';
import { ThemeToggleModuleComponent } from './modules/theme-toggle-module/theme-toggle-module.component';
import { UserSettingsModuleComponent } from './modules/user-settings-module/user-settings-module.component';
import { UtilsModuleComponent } from './modules/utils-module/utils-module.component';
import { AgGridModuleComponent } from './analytics/ag-grid-module/ag-grid-module.component';
import { DashboardModuleComponent } from './analytics/dashboard-module/dashboard-module.component';
import { FinanceModuleComponent } from './analytics/finance-module/finance-module.component';
import { FusionchartsModuleComponent } from './analytics/fusioncharts-module/fusioncharts-module.component';
import { GooglemapsModuleComponent } from './analytics/googlemaps-module/googlemaps-module.component';
import { HeatmapModuleComponent } from './analytics/heatmap-module/heatmap-module.component';
import { NetworkModuleComponent } from './analytics/network-module/network-module.component';
import { NgxChartsModuleComponent } from './analytics/ngx-charts-module/ngx-charts-module.component';
import { TimelineModuleComponent } from './analytics/timeline-module/timeline-module.component';
import { TooltipModuleComponent } from './analytics/tooltip-module/tooltip-module.component';
import { VisTimelineModuleComponent } from './analytics/vis-timeline-module/vis-timeline-module.component';

const routes: Routes = [
  { path: 'buttons', component: ButtonsComponent },
  { path: 'inputs', component: InputsComponent },
  { path: 'search', component: SearchModuleComponent },
  { path: 'alerts', component: AlertsModuleComponent },
  { path: 'advanced', component: AdvancedModuleComponent },
  { path: 'autocomplete', component: AutocompleteModuleComponent },
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
  { path: 'modal', component: ModalModuleComponent },
  { path: 'notification', component: NotificationModuleComponent },
  { path: 'results-view', component: ResultsViewModuleComponent },
  { path: 'rfm', component: RfmModuleComponent },
  { path: 'saved-queries', component: SavedQueriesModuleComponent },
  { path: 'selection', component: SelectionModuleComponent },
  { path: 'slide-builder', component: SlideBuilderModuleComponent },
  { path: 'status-bar', component: StatusBarModuleComponent },
  { path: 'theme-toggle', component: ThemeToggleModuleComponent },
  { path: 'user-settings', component: UserSettingsModuleComponent },
  { path: 'utils', component: UtilsModuleComponent },
  { path: 'ag-grid', component: AgGridModuleComponent },
  { path: 'dashboard', component: DashboardModuleComponent },
  { path: 'finance', component: FinanceModuleComponent },
  { path: 'fusioncharts', component: FusionchartsModuleComponent },
  { path: 'googlemaps', component: GooglemapsModuleComponent },
  { path: 'heatmap', component: HeatmapModuleComponent },
  { path: 'network', component: NetworkModuleComponent },
  { path: 'ngx-charts', component: NgxChartsModuleComponent },
  { path: 'timeline', component: TimelineModuleComponent },
  { path: 'tooltip', component: TooltipModuleComponent },
  { path: 'vis-timeline', component: VisTimelineModuleComponent },
  { path: '**', redirectTo: '/buttons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
