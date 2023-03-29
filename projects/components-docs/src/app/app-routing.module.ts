import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ui',
    children: [
      { path: 'action', loadChildren: () => import(`./components/action-module/action.module`).then(m => m.DocActionModule) },
      { path: 'collapse', loadChildren: () => import(`./components/collapse-module/collapse.module`).then(m => m.DocCollapseModule) },
      { path: 'modal', loadChildren: () => import(`./components/modal-module/modal.module`).then(m => m.DocModalModule) },
      { path: 'notification', loadChildren: () => import(`./components/notification-module/notification.module`).then(m => m.DocNotificationModule) },
      { path: 'utils', loadChildren: () => import(`./components/utils-module/utils.module`).then(m => m.DocUtilsModule) },
    ]
  },
  {
    path: 'components',
    children: [
      { path: 'search', loadChildren: () => import(`./components/search-module/search.module`).then(m => m.DocSearchModule) },
      { path: 'result', loadChildren: () => import(`./components/result-module/result.module`).then(m => m.DocResultModule) },
      { path: 'autocomplete', loadChildren: () => import(`./components/autocomplete-module/autocomplete.module`).then(m => m.DocAutocompleteModule) },
      { path: 'facet', loadChildren: () => import(`./components/facet-module/facet.module`).then(m => m.DocFacetModule) },
      { path: 'preview', loadChildren: () => import(`./components/preview-module/preview.module`).then(m => m.DocPreviewModule) },
      { path: 'metadata', loadChildren: () => import(`./components/metadata-module/metadata.module`).then(m => m.DocMetadataModule) },
      { path: 'baskets', loadChildren: () => import(`./components/baskets-module/baskets.module`).then(m => m.DocBasketsModule) },
      { path: 'alerts', loadChildren: () => import(`./components/alerts-module/alerts.module`).then(m => m.DocAlertsModule) },
      { path: 'saved-queries', loadChildren: () => import(`./components/saved-queries-module/saved-queries.module`).then(m => m.DocSavedQueriesModule) },
      { path: 'labels', loadChildren: () => import(`./components/labels-module/labels.module`).then(m => m.DocLabelsModule) },
      { path: 'user-settings', loadChildren: () => import(`./components/user-settings-module/user-settings.module`).then(m => m.DocUserSettingsModule) },
      { path: 'advanced', loadChildren: () => import(`./components/advanced-module/advanced.module`).then(m => m.DocAdvancedModule) },
      { path: 'feedback', loadChildren: () => import(`./components/feedback-module/feedback.module`).then(m => m.DocFeedbackModule) },
      { path: 'machine-learning', loadChildren: () => import(`./components/machine-learning-module/machine-learning.module`).then(m => m.DocMachineLearningModule) },
      { path: 'results-view', loadChildren: () => import(`./components/results-view-module/results-view.module`).then(m => m.DocResultsViewModule) },
      { path: 'selection', loadChildren: () => import(`./components/selection-module/selection.module`).then(m => m.DocSelectionModule) },
      { path: 'comments', loadChildren: () => import(`./components/comments-module/comments.module`).then(m => m.DocCommentsModule) },
      { path: 'slide-builder', loadChildren: () => import(`./components/slide-builder-module/slide-builder.module`).then(m => m.DocSlideBuilderModule) },
      { path: 'rfm', loadChildren: () => import(`./components/rfm-module/rfm.module`).then(m => m.DocRfmModule) },
      { path: 'status-bar', loadChildren: () => import(`./components/status-bar-module/status-bar.module`).then(m => m.DocStatusBarModule) },
    ]
  },
  {
    path: 'analytics',
    children: [
      { path: 'ag-grid', loadChildren: () => import(`./analytics/ag-grid-module/ag-grid.module`).then(m => m.DocAgGridModule) },
      { path: 'dashboard', loadChildren: () => import(`./analytics/dashboard-module/dashboard.module`).then(m => m.DocDashboardModule) },
      { path: 'finance', loadChildren: () => import(`./analytics/finance-module/finance.module`).then(m => m.DocFinanceModule) },
      { path: 'fusioncharts', loadChildren: () => import(`./analytics/fusioncharts-module/fusioncharts.module`).then(m => m.DocFusionchartsModule) },
      { path: 'googlemaps', loadChildren: () => import(`./analytics/googlemaps-module/googlemaps.module`).then(m => m.DocGooglemapsModule) },
      { path: 'heatmap', loadChildren: () => import(`./analytics/heatmap-module/heatmap.module`).then(m => m.DocHeatmapModule) },
      { path: 'network', loadChildren: () => import(`./analytics/network-module/network.module`).then(m => m.DocNetworkModule) },
      { path: 'ngx-charts', loadChildren: () => import(`./analytics/ngx-charts-module/ngx-charts.module`).then(m => m.DocNgxChartsModule) },
      { path: 'timeline', loadChildren: () => import(`./analytics/timeline-module/timeline.module`).then(m => m.DocTimelineModule) },
      { path: 'tooltip', loadChildren: () => import(`./analytics/tooltip-module/tooltip.module`).then(m => m.DocTooltipModule) },
      { path: 'vis-timeline', loadChildren: () => import(`./analytics/vis-timeline-module/vis-timeline.module`).then(m => m.DocVisTimelineModule) },
    ]
  },
  { path: '**', redirectTo: '/components/search' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
