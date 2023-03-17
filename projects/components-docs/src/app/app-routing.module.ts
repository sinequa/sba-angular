import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocButtonsComponent } from "./buttons/buttons.component";
import { DocInputsComponent } from "./inputs/inputs.component";
import { DocFacetModuleComponent } from './modules/facet/facet-module.component';
import { DocPreviewModuleComponent } from './modules/preview/preview-module.component';
import { DocResultModuleComponent } from './modules/result/result-module.component';
import { DocBasketsModuleComponent } from './modules/baskets-module/baskets-module.component';
import { DocCollapseModuleComponent } from './modules/collapse-module/collapse-module.component';
import { DocCommentsModuleComponent } from './modules/comments-module/comments-module.component';
import { DocFeedbackModuleComponent } from './modules/feedback-module/feedback-module.component';
import { DocLabelsModuleComponent } from './modules/labels-module/labels-module.component';
import { DocMachineLearningModuleComponent } from './modules/machine-learning-module/machine-learning-module.component';
import { DocMetadataModuleComponent } from './modules/metadata-module/metadata-module.component';
import { DocAdvancedModuleComponent } from './modules/advanced-module/advanced-module.component';
import { DocAlertsModuleComponent } from './modules/alerts-module/alerts-module.component';
import { DocAutocompleteModuleComponent } from './modules/autocomplete-module/autocomplete-module.component';
import { DocModalModuleComponent } from './modules/modal-module/modal-module.component';
import { DocNotificationModuleComponent } from './modules/notification-module/notification-module.component';
import { DocResultsViewModuleComponent } from './modules/results-view-module/results-view-module.component';
import { DocSearchModuleComponent } from './modules/search-module/search-module.component';
import { DocRfmModuleComponent } from './modules/rfm-module/rfm-module.component';
import { DocSavedQueriesModuleComponent } from './modules/saved-queries-module/saved-queries-module.component';
import { DocStatusBarModuleComponent } from './modules/status-bar-module/status-bar-module.component';
import { DocSlideBuilderModuleComponent } from './modules/slide-builder-module/slide-builder-module.component';
import { DocSelectionModuleComponent } from './modules/selection-module/selection-module.component';
import { DocThemeToggleModuleComponent } from './modules/theme-toggle-module/theme-toggle-module.component';
import { DocUserSettingsModuleComponent } from './modules/user-settings-module/user-settings-module.component';
import { DocUtilsModuleComponent } from './modules/utils-module/utils-module.component';
import { DocAgGridModuleComponent } from './analytics/ag-grid-module/ag-grid-module.component';
import { DocDashboardModuleComponent } from './analytics/dashboard-module/dashboard-module.component';
import { DocFinanceModuleComponent } from './analytics/finance-module/finance-module.component';
import { DocFusionchartsModuleComponent } from './analytics/fusioncharts-module/fusioncharts-module.component';
import { DocGooglemapsModuleComponent } from './analytics/googlemaps-module/googlemaps-module.component';
import { DocHeatmapModuleComponent } from './analytics/heatmap-module/heatmap-module.component';
import { DocNetworkModuleComponent } from './analytics/network-module/network-module.component';
import { DocNgxChartsModuleComponent } from './analytics/ngx-charts-module/ngx-charts-module.component';
import { DocTimelineModuleComponent } from './analytics/timeline-module/timeline-module.component';
import { DocTooltipModuleComponent } from './analytics/tooltip-module/tooltip-module.component';
import { DocVisTimelineModuleComponent } from './analytics/vis-timeline-module/vis-timeline-module.component';

const routes: Routes = [
  { path: 'buttons', component: DocButtonsComponent },
  { path: 'inputs', component: DocInputsComponent },
  { path: 'search', component: DocSearchModuleComponent },
  { path: 'alerts', component: DocAlertsModuleComponent },
  { path: 'advanced', component: DocAdvancedModuleComponent },
  { path: 'autocomplete', component: DocAutocompleteModuleComponent },
  { path: 'facet', component: DocFacetModuleComponent },
  { path: 'preview', component: DocPreviewModuleComponent },
  { path: 'baskets', component: DocBasketsModuleComponent },
  { path: 'result', component: DocResultModuleComponent },
  { path: 'collapse', component: DocCollapseModuleComponent },
  { path: 'comments', component: DocCommentsModuleComponent },
  { path: 'feedback', component: DocFeedbackModuleComponent },
  { path: 'labels', component: DocLabelsModuleComponent },
  { path: 'machine-learning', component: DocMachineLearningModuleComponent },
  { path: 'metadata', component: DocMetadataModuleComponent },
  { path: 'modal', component: DocModalModuleComponent },
  { path: 'notification', component: DocNotificationModuleComponent },
  { path: 'results-view', component: DocResultsViewModuleComponent },
  { path: 'rfm', component: DocRfmModuleComponent },
  { path: 'saved-queries', component: DocSavedQueriesModuleComponent },
  { path: 'selection', component: DocSelectionModuleComponent },
  { path: 'slide-builder', component: DocSlideBuilderModuleComponent },
  { path: 'status-bar', component: DocStatusBarModuleComponent },
  { path: 'theme-toggle', component: DocThemeToggleModuleComponent },
  { path: 'user-settings', component: DocUserSettingsModuleComponent },
  { path: 'utils', component: DocUtilsModuleComponent },
  { path: 'ag-grid', component: DocAgGridModuleComponent },
  { path: 'dashboard', component: DocDashboardModuleComponent },
  { path: 'finance', component: DocFinanceModuleComponent },
  { path: 'fusioncharts', component: DocFusionchartsModuleComponent },
  { path: 'googlemaps', component: DocGooglemapsModuleComponent },
  { path: 'heatmap', component: DocHeatmapModuleComponent },
  { path: 'network', component: DocNetworkModuleComponent },
  { path: 'ngx-charts', component: DocNgxChartsModuleComponent },
  { path: 'timeline', component: DocTimelineModuleComponent },
  { path: 'tooltip', component: DocTooltipModuleComponent },
  { path: 'vis-timeline', component: DocVisTimelineModuleComponent },
  { path: '**', redirectTo: '/buttons' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
