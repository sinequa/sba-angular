import { APP_INITIALIZER, DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DocAppComponent } from './app.component';
import { BsFacetModule, FacetState, NamedFacetConfig } from "@sinequa/components/facet";
import { IntlModule, Locale, LocaleData, LocalesConfig } from "@sinequa/core/intl";
import { WebServicesModule, StartConfig, StartConfigWebService } from "@sinequa/core/web-services";
import { LoginInterceptor } from "@sinequa/core/login";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ResultModule } from "@sinequa/components/result";
import { BsSelectionModule } from "@sinequa/components/selection";
import { BsLabelsModule } from "@sinequa/components/labels";
import { DocResultsComponent } from './results/results.component';
import { DocButtonsComponent } from './buttons/buttons.component';
import { BsActionModule } from "@sinequa/components/action";
import { FormsModule } from "@angular/forms";
import { DocInputsComponent } from './inputs/inputs.component';
import { DocSearchComponent } from './search/search.component';
import { BsSearchModule, SearchOptions } from "@sinequa/components/search";
import { DocMenuComponent } from './menu/menu.component';
import { DocNavbarComponent } from './navbar/navbar.component';
import { UtilsModule } from "@sinequa/components/utils";
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { BsResultsViewModule, ResultsView } from "@sinequa/components/results-view";
import { BsAlertsModule } from "@sinequa/components/alerts";
import { MetadataModule } from "@sinequa/components/metadata";
import { CollapseModule } from "@sinequa/components/collapse";
import { BsPreviewModule } from "@sinequa/components/preview";
import { DocFacetComponent } from './modules/facet/facet/facet.component';
import { DocAlertsComponent } from './modules/alerts-module/alerts/alerts.component';
import { BsNotificationModule } from "@sinequa/components/notification";
import { DocPreviewComponent } from './preview/preview.component';
import { DocSqPreviewComponent } from './preview/sq-preview/sq-preview.component';
import { DocCodeComponent } from './base/code.component';
import { DocFacetModuleComponent } from './modules/facet/facet-module.component';
import { DocFacetListComponent } from './modules/facet/facet-list/facet-list.component';
import { DocFacetFiltersComponent } from './modules/facet/facet-filters/facet-filters.component';
import { DocFacetRangeComponent } from './modules/facet/facet-range/facet-range.component';
import { DocFacetBarComponent } from './modules/facet/facet-bar/facet-bar.component';
import { DocFacetMultiComponent } from './modules/facet/facet-multi/facet-multi.component';
import { DocFacetTagCloudComponent } from './modules/facet/facet-tag-cloud/facet-tag-cloud.component';
import { DocRefineComponent } from './modules/facet/refine/refine.component';
import { DocPreviewModuleComponent } from './modules/preview/preview-module.component';
import { DocPreviewHighlightsComponent } from './modules/preview/preview-highlights/preview-highlights.component';
import { DocPreviewLinksComponent } from './modules/preview/preview-links/preview-links.component';
import { DocPreviewPopupComponent } from './modules/preview/preview-popup/preview-popup.component';
import { DocPreviewPanelComponent } from './modules/preview/preview-panel/preview-panel.component';
import { DocResultLinkPreviewComponent } from './modules/preview/result-link-preview/result-link-preview.component';
import { DocFacetPreviewComponent } from './modules/preview/facet-preview/facet-preview.component';
import { DocSimilarDocumentsComponent } from './modules/preview/similar-documents/similar-documents.component';
import { DocPreviewEntityFacetComponent } from './modules/preview/preview-entity-facet/preview-entity-facet.component';
import { DocPreviewEntityPanelComponent } from './modules/preview/preview-entity-panel/preview-entity-panel.component';
import { DocPreviewExtractsPanelComponent } from './modules/preview/preview-extracts-panel/preview-extracts-panel.component';
import { DocPreviewSearchFormComponent } from './modules/preview/preview-search-form/preview-search-form.component';
import { DocPreviewPagesPanelComponent } from './modules/preview/preview-pages-panel/preview-pages-panel.component';
import { DocPreviewPageFormComponent } from './modules/preview/preview-page-form/preview-page-form.component';
import { DocPreviewMinimapComponent } from './modules/preview/preview-minimap/preview-minimap.component';
import { DocFacetPreviewComponentComponent } from './modules/preview/facet-preview-component/facet-preview-component.component';
import { DocResultModuleComponent } from './modules/result/result-module.component';
import { environment } from "../environments/environment";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DocSearchBarComponent } from './search-bar/search-bar.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GlobalService } from './global.service';
import { BsModalModule } from '@sinequa/components/modal';
import { ModalRef, MODAL_MODEL } from '@sinequa/core/modal';
import { DocResultTitleComponent } from './modules/result/result-title/result-title.component';
import { DocResultExtractsComponent } from './modules/result/result-extracts/result-extracts.component';
import { DocResultMissingTermsComponent } from './modules/result/result-missing-terms/result-missing-terms.component';
import { DocResultThumbnailComponent } from './modules/result/result-thumbnail/result-thumbnail.component';
import { DocUserRatingComponent } from './modules/result/user-rating/user-rating.component';
import { DocSponsoredResultsComponent } from './modules/result/sponsored-results/sponsored-results.component';
import { DocResultsCounterComponent } from './modules/result/results-counter/results-counter.component';
import { DocResultIconComponent } from './modules/result/result-icon/result-icon.component';
import { DocResultSourceComponent } from './modules/result/result-source/result-source.component';
import { BsTimelineModule } from '@sinequa/analytics/timeline';
import { DocFacetTestingComponent } from './modules/facet/facet-testing/facet-testing.component';
import { DocBasketsModuleComponent } from './modules/baskets-module/baskets-module.component';
import { DocEditBasketComponent } from './modules/baskets-module/edit-basket/edit-basket.component';
import { DocManageBasketsComponent } from './modules/baskets-module/manage-baskets/manage-baskets.component';
import { DocSelectBasketsComponent } from './modules/baskets-module/select-baskets/select-baskets.component';
import { DocResultBasketsComponent } from './modules/baskets-module/result-baskets/result-baskets.component';
import { DocBasketsMenuComponent } from './modules/baskets-module/baskets-menu/baskets-menu.component';
import { DocFacetBasketsComponent } from './modules/baskets-module/facet-baskets/facet-baskets.component';
import { BsBasketsModule } from '@sinequa/components/baskets';
import { DocCollapseModuleComponent } from './modules/collapse-module/collapse-module.component';
import { DocCommentsModuleComponent } from './modules/comments-module/comments-module.component';
import { DocFeedbackModuleComponent } from './modules/feedback-module/feedback-module.component';
import { DocLabelsModuleComponent } from './modules/labels-module/labels-module.component';
import { DocMachineLearningModuleComponent } from './modules/machine-learning-module/machine-learning-module.component';
import { DocCollapseComponent } from './modules/collapse-module/collapse/collapse.component';
import { DocCollapseButtonComponent } from './modules/collapse-module/collapse-button/collapse-button.component';
import { DocCommentsComponent } from './modules/comments-module/comments/comments.component';
import { CommentsModule } from '@sinequa/components/comments';
import { DocFeedbackMenuComponent } from './modules/feedback-module/feedback-menu/feedback-menu.component';
import { BsFeedbackModule } from '@sinequa/components/feedback';
import { DocLabelsAutocompleteComponent } from './modules/labels-module/labels-autocomplete/labels-autocomplete.component';
import { DocRenameLabelComponent } from './modules/labels-module/rename-label/rename-label.component';
import { DocLabelsMenuComponent } from './modules/labels-module/labels-menu/labels-menu.component';
import { DocDeleteLabelComponent } from './modules/labels-module/delete-label/delete-label.component';
import { DocAddLabelComponent } from './modules/labels-module/add-label/add-label.component';
import { DocEditLabelComponent } from './modules/labels-module/edit-label/edit-label.component';
import { DocAnswerCardComponent } from './modules/machine-learning-module/answer-card/answer-card.component';
import { DocPassageListComponent } from './modules/machine-learning-module/passage-list/passage-list.component';
import { DocTopPassagesComponent } from './modules/machine-learning-module/top-passages/top-passages.component';
import { MLModule } from '@sinequa/components/machine-learning';
import { DocComponentDemoComponent } from './base/component-demo.component';
import { DocMetadataModuleComponent } from './modules/metadata-module/metadata-module.component';
import { DocMetadataComponent } from './modules/metadata-module/metadata/metadata.component';
import { DocAdvancedModuleComponent } from './modules/advanced-module/advanced-module.component';
import { DocAlertsModuleComponent } from './modules/alerts-module/alerts-module.component';
import { DocAdvancedFormCheckboxComponent } from './modules/advanced-module/advanced-form-checkbox/advanced-form-checkbox.component';
import { DocAdvancedFormInputComponent } from './modules/advanced-module/advanced-form-input/advanced-form-input.component';
import { DocAdvancedFormRangeComponent } from './modules/advanced-module/advanced-form-range/advanced-form-range.component';
import { DocAdvancedFormSelectComponent } from './modules/advanced-module/advanced-form-select/advanced-form-select.component';
import { DocAdvancedFormMultiInputComponent } from './modules/advanced-module/advanced-form-multi-input/advanced-form-multi-input.component';
import { DocDatePickerComponent } from './modules/advanced-module/date-picker/date-picker.component';
import { DocDateRangePickerComponent } from './modules/advanced-module/date-range-picker/date-range-picker.component';
import { DocSelectComponent } from './modules/advanced-module/select/select.component';
import { BsAdvancedModule } from '@sinequa/components/advanced';
import { DocEditAlertComponent } from './modules/alerts-module/edit-alert/edit-alert.component';
import { DocManageAlertsComponent } from './modules/alerts-module/manage-alerts/manage-alerts.component';
import { DocAlertsMenuComponent } from './modules/alerts-module/alerts-menu/alerts-menu.component';
import { DocAutocompleteModuleComponent } from './modules/autocomplete-module/autocomplete-module.component';
import { DocAutocompleteListComponent } from './modules/autocomplete-module/autocomplete-list/autocomplete-list.component';
import { DocModalModuleComponent } from './modules/modal-module/modal-module.component';
import { DocModalComponent } from './modules/modal-module/modal/modal.component';
import { DocModalHeaderComponent } from './modules/modal-module/modal-header/modal-header.component';
import { DocModalFooterComponent } from './modules/modal-module/modal-footer/modal-footer.component';
import { DocLoginComponent } from './modules/modal-module/login/login.component';
import { DocConfirmComponent } from './modules/modal-module/confirm/confirm.component';
import { DocOverrideUserComponent } from './modules/modal-module/override-user/override-user.component';
import { DocEditableComponent } from './modules/modal-module/editable/editable.component';
import { DocPromptComponent } from './modules/modal-module/prompt/prompt.component';
import { DocHelpComponent } from './modules/modal-module/help/help.component';
import { DocNotificationModuleComponent } from './modules/notification-module/notification-module.component';
import { DocNotificationsComponent } from './modules/notification-module/notifications/notifications.component';
import { DocNotificationsManagerComponent } from './modules/notification-module/notifications-manager/notifications-manager.component';
import { DocResultsViewModuleComponent } from './modules/results-view-module/results-view-module.component';
import { DocResultsViewSelectorComponent } from './modules/results-view-module/results-view-selector/results-view-selector.component';
import { DocResultsGridViewComponent } from './modules/results-view-module/results-grid-view/results-grid-view.component';
import { DocRfmModuleComponent } from './modules/rfm-module/rfm-module.component';
import { DocSavedQueriesModuleComponent } from './modules/saved-queries-module/saved-queries-module.component';
import { DocSearchModuleComponent } from './modules/search-module/search-module.component';
import { DocRfmActionComponent } from './modules/rfm-module/rfm-action/rfm-action.component';
import { BsRfmModule } from '@sinequa/components/rfm';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { DocEditSavedQueryComponent } from './modules/saved-queries-module/edit-saved-query/edit-saved-query.component';
import { DocManageSavedQueriesComponent } from './modules/saved-queries-module/manage-saved-queries/manage-saved-queries.component';
import { DocExportQueryComponent } from './modules/saved-queries-module/export-query/export-query.component';
import { DocQueryExporterComponent } from './modules/saved-queries-module/query-exporter/query-exporter.component';
import { DocSavedQueriesMenuComponent } from './modules/saved-queries-module/saved-queries-menu/saved-queries-menu.component';
import { DocFacetSavedQueriesComponent } from './modules/saved-queries-module/facet-saved-queries/facet-saved-queries.component';
import { DocFacetRecentQueriesComponent } from './modules/saved-queries-module/facet-recent-queries/facet-recent-queries.component';
import { DocFacetRecentDocumentsComponent } from './modules/saved-queries-module/facet-recent-documents/facet-recent-documents.component';
import { DocDidYouMeanComponent } from './modules/search-module/did-you-mean/did-you-mean.component';
import { DocPagerComponent } from './modules/search-module/pager/pager.component';
import { DocPageSizeSelectorComponent } from './modules/search-module/page-size-selector/page-size-selector.component';
import { DocSortSelectorComponent } from './modules/search-module/sort-selector/sort-selector.component';
import { DocTabsComponent } from './modules/search-module/tabs/tabs.component';
import { DocLoadingBarComponent } from './modules/search-module/loading-bar/loading-bar.component';
import { DocScrollerComponent } from './modules/search-module/scroller/scroller.component';
import { DocLoadMoreComponent } from './modules/search-module/load-more/load-more.component';
import { DocScopeComponent } from './modules/search-module/scope/scope.component';
import { DocSelectionModuleComponent } from './modules/selection-module/selection-module.component';
import { DocSlideBuilderModuleComponent } from './modules/slide-builder-module/slide-builder-module.component';
import { DocStatusBarModuleComponent } from './modules/status-bar-module/status-bar-module.component';
import { DocResultsSelectorComponent } from './modules/selection-module/results-selector/results-selector.component';
import { DocResultSelectorComponent } from './modules/selection-module/result-selector/result-selector.component';
import { DocSelectionArrangerComponent } from './modules/selection-module/selection-arranger/selection-arranger.component';
import { DocSlideBuilderComponent } from './modules/slide-builder-module/slide-builder/slide-builder.component';
import { DocSlideListComponent } from './modules/slide-builder-module/slide-list/slide-list.component';
import { DocFullscreenActivatorComponent } from './modules/status-bar-module/fullscreen-activator/fullscreen-activator.component';
import { DocNetworkActivityComponent } from './modules/status-bar-module/network-activity/network-activity.component';
import { DocThemeToggleModuleComponent } from './modules/theme-toggle-module/theme-toggle-module.component';
import { DocUserSettingsModuleComponent } from './modules/user-settings-module/user-settings-module.component';
import { DocThemeToggleComponent } from './modules/theme-toggle-module/theme-toggle/theme-toggle.component';
import { DocEditUserSettingsComponent } from './modules/user-settings-module/edit-user-settings/edit-user-settings.component';
import { DocUserSettingsEditorComponent } from './modules/user-settings-module/user-settings-editor/user-settings-editor.component';
import { DocUserMenuComponent } from './modules/user-settings-module/user-menu/user-menu.component';
import { DocUtilsModuleComponent } from './modules/utils-module/utils-module.component';
import { DocStickyComponent } from './modules/utils-module/sticky/sticky.component';
import { DocTooltipComponent } from './modules/utils-module/tooltip/tooltip.component';
import { SlideBuilderModule } from '@sinequa/components/slide-builder';
import { BsStatusBarModule } from '@sinequa/components/status-bar';
import { BsThemeToggleModule } from '@sinequa/components/theme-toggle';
import { BsUserSettingsModule } from '@sinequa/components/user-settings';
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
import { DocAgGridViewComponent } from './analytics/ag-grid-module/ag-grid-view/ag-grid-view.component';
import { AgGridModule } from '@sinequa/analytics/ag-grid';
import { DocAddWidgetModalComponent } from './analytics/dashboard-module/add-widget-modal/add-widget-modal.component';
import { DocDashboardComponent } from './analytics/dashboard-module/dashboard/dashboard.component';
import { DocMoneyCloudComponent } from './analytics/finance-module/money-cloud/money-cloud.component';
import { DocMoneyTimelineComponent } from './analytics/finance-module/money-timeline/money-timeline.component';
import { DocChartComponent } from './analytics/fusioncharts-module/chart/chart.component';
import { DocMultiLevelPieChartComponent } from './analytics/fusioncharts-module/multi-level-pie-chart/multi-level-pie-chart.component';
import { DocMapComponent } from './analytics/googlemaps-module/map/map.component';
import { DocFacetHeatmapComponent } from './analytics/heatmap-module/facet-heatmap/facet-heatmap.component';
import { DocHeatmapComponent } from './analytics/heatmap-module/heatmap/heatmap.component';
import { DocResultsHeatmapViewComponent } from './analytics/heatmap-module/results-heatmap-view/results-heatmap-view.component';
import { DocEdgeInfoCardComponent } from './analytics/network-module/edge-info-card/edge-info-card.component';
import { DocNetworkComponent } from './analytics/network-module/network/network.component';
import { DocNodeInfoCardComponent } from './analytics/network-module/node-info-card/node-info-card.component';
import { DocFacetChartComponent } from './analytics/ngx-charts-module/facet-chart/facet-chart.component';
import { DocFacetDateComponent } from './analytics/timeline-module/facet-date/facet-date.component';
import { DocFacetTimelineComponent } from './analytics/timeline-module/facet-timeline/facet-timeline.component';
import { DocTimelineLegendComponent } from './analytics/timeline-module/timeline-legend/timeline-legend.component';
import { DocTimelineComponent } from './analytics/timeline-module/timeline/timeline.component';
import { DocResultTimelineComponent } from './analytics/vis-timeline-module/result-timeline/result-timeline.component';
import { DocTooltip2Component } from './analytics/tooltip-module/tooltip-2/tooltip-2.component';
import { DashboardComponent } from '@sinequa/analytics/dashboard';
import { FinanceModule } from '@sinequa/analytics/finance';
import { FusionChartsModule } from '@sinequa/analytics/fusioncharts';
import { GoogleMapsModule } from '@sinequa/analytics/googlemaps';
import { BsHeatmapModule } from '@sinequa/analytics/heatmap';
import { NetworkModule } from '@sinequa/analytics/network';
import { NgxChartsModule } from '@sinequa/analytics/ngx-charts';
import { BsTooltipComponent } from '@sinequa/analytics/tooltip';
import { VisTimelineModule } from '@sinequa/analytics/vis-timeline';
import { DocInterceptor } from './doc.interceptor';
import { createCustomElement } from '@angular/elements';

// Initialization of @sinequa/core
export const startConfig: StartConfig = {
    app: "app",
    production: environment.production,
    autoSAMLProvider: environment.autoSAMLProvider,
    auditEnabled: true
};

// @sinequa/core config initializer
export function startConfigInitializer(startConfigWebService: StartConfigWebService) {
    return () => startConfigWebService.fetchPreLoginAppConfig();
}

// export function startConfigInitializer(startConfigWebService: StartConfigWebService) {
//     if (environment.mock) {
//         return (): Promise<any> =>
//             new Promise<void>((resolve) => {
//                 resolve();
//             });
//     }
//     return StartConfigInitializer(startConfigWebService);
// }

// Search options (search service)
export const searchOptions: SearchOptions = {
    routes: ["facet"],
    deactivateRouting: true
};

// List of facet configurations (of type list and tree)
export const namedFacetConfig: NamedFacetConfig[] = [
    {
        name: "facet1",
        title: "Modified",
        type: "list",
        icon: "fas fa-calendar-day",
        aggregation: 'modified'
    },
    {
        name: "facet2",
        title: "Tree path",
        type: "tree",
        icon: "fas fa-sitemap",
        aggregation: "Treepath"
    },
    {
        name: "facet3",
        title: "Person",
        type: "list",
        icon: "fas fa-user",
        aggregation: "Person"
    }
];

// List of default facets displayed (only facet2 is displayed here)
export const defaultFacets: FacetState[] = [
    { name: "facet1", position: 0 },
    { name: "facet2", position: 1 },
    { name: "facet3", position: 2 }
];

const data: LocaleData = {
    intl: {
        locale: "en-US"
    },
    messages: {}
};

const resultsView: ResultsView = {
    name: 'name',
    type: 'type'
};

export class AppLocalesConfig implements LocalesConfig {
    defaultLocale: Locale;
    locales?: Locale[];

    constructor() {
        this.locales = [
            { name: "en", display: "msg#locale.en", data },
            { name: "fr", display: "msg#locale.fr", data },
            { name: "de", display: "msg#locale.de", data },
        ];
        this.defaultLocale = this.locales[0];
    }
}

export function httpInterceptor() {
    if (environment.mock) {
        return DocInterceptor;
    }
    return LoginInterceptor;
}

@NgModule({
    declarations: [
        DocAppComponent,
        DocResultsComponent,
        DocButtonsComponent,
        DocInputsComponent,
        DocSearchComponent,
        DocMenuComponent,
        DocNavbarComponent,
        DocFacetComponent,
        DocAlertsComponent,
        DocPreviewComponent,
        DocSqPreviewComponent,
        DocCodeComponent,
        DocFacetModuleComponent,
        DocFacetListComponent,
        DocFacetFiltersComponent,
        DocFacetRangeComponent,
        DocFacetBarComponent,
        DocFacetMultiComponent,
        DocFacetTagCloudComponent,
        DocRefineComponent,
        DocPreviewModuleComponent,
        DocPreviewHighlightsComponent,
        DocPreviewLinksComponent,
        DocPreviewPopupComponent,
        DocPreviewPanelComponent,
        DocResultLinkPreviewComponent,
        DocFacetPreviewComponent,
        DocSimilarDocumentsComponent,
        DocPreviewEntityFacetComponent,
        DocPreviewEntityPanelComponent,
        DocPreviewExtractsPanelComponent,
        DocPreviewSearchFormComponent,
        DocPreviewPagesPanelComponent,
        DocPreviewPageFormComponent,
        DocPreviewMinimapComponent,
        DocFacetPreviewComponentComponent,
        DocSearchBarComponent,
        DocResultModuleComponent,
        DocResultTitleComponent,
        DocResultExtractsComponent,
        DocResultMissingTermsComponent,
        DocResultThumbnailComponent,
        DocUserRatingComponent,
        DocSponsoredResultsComponent,
        DocResultsCounterComponent,
        DocResultIconComponent,
        DocResultSourceComponent,
        DocFacetTestingComponent,
        DocBasketsModuleComponent,
        DocEditBasketComponent,
        DocManageBasketsComponent,
        DocSelectBasketsComponent,
        DocResultBasketsComponent,
        DocBasketsMenuComponent,
        DocFacetBasketsComponent,
        DocCollapseModuleComponent,
        DocCommentsModuleComponent,
        DocFeedbackModuleComponent,
        DocLabelsModuleComponent,
        DocMachineLearningModuleComponent,
        DocCollapseComponent,
        DocCollapseButtonComponent,
        DocCommentsComponent,
        DocFeedbackMenuComponent,
        DocLabelsAutocompleteComponent,
        DocRenameLabelComponent,
        DocLabelsMenuComponent,
        DocDeleteLabelComponent,
        DocAddLabelComponent,
        DocEditLabelComponent,
        DocAnswerCardComponent,
        DocPassageListComponent,
        DocTopPassagesComponent,
        DocComponentDemoComponent,
        DocMetadataModuleComponent,
        DocMetadataComponent,
        DocAdvancedModuleComponent,
        DocAlertsModuleComponent,
        DocAdvancedFormCheckboxComponent,
        DocAdvancedFormInputComponent,
        DocAdvancedFormRangeComponent,
        DocAdvancedFormSelectComponent,
        DocAdvancedFormMultiInputComponent,
        DocDatePickerComponent,
        DocDateRangePickerComponent,
        DocSelectComponent,
        DocEditAlertComponent,
        DocManageAlertsComponent,
        DocAlertsMenuComponent,
        DocAutocompleteModuleComponent,
        DocAutocompleteListComponent,
        DocModalModuleComponent,
        DocModalComponent,
        DocModalHeaderComponent,
        DocModalFooterComponent,
        DocLoginComponent,
        DocConfirmComponent,
        DocHelpComponent,
        DocOverrideUserComponent,
        DocEditableComponent,
        DocPromptComponent,
        DocNotificationModuleComponent,
        DocNotificationsComponent,
        DocNotificationsManagerComponent,
        DocResultsViewModuleComponent,
        DocResultsViewSelectorComponent,
        DocResultsGridViewComponent,
        DocRfmModuleComponent,
        DocSavedQueriesModuleComponent,
        DocSearchModuleComponent,
        DocRfmActionComponent,
        DocEditSavedQueryComponent,
        DocManageSavedQueriesComponent,
        DocExportQueryComponent,
        DocQueryExporterComponent,
        DocSavedQueriesMenuComponent,
        DocFacetSavedQueriesComponent,
        DocFacetRecentQueriesComponent,
        DocFacetRecentDocumentsComponent,
        DocDidYouMeanComponent,
        DocPagerComponent,
        DocPageSizeSelectorComponent,
        DocSortSelectorComponent,
        DocTabsComponent,
        DocLoadingBarComponent,
        DocScrollerComponent,
        DocLoadMoreComponent,
        DocScopeComponent,
        DocSelectionModuleComponent,
        DocSlideBuilderModuleComponent,
        DocStatusBarModuleComponent,
        DocResultsSelectorComponent,
        DocResultSelectorComponent,
        DocSelectionArrangerComponent,
        DocSlideBuilderComponent,
        DocSlideListComponent,
        DocFullscreenActivatorComponent,
        DocNetworkActivityComponent,
        DocThemeToggleModuleComponent,
        DocUserSettingsModuleComponent,
        DocThemeToggleComponent,
        DocEditUserSettingsComponent,
        DocUserSettingsEditorComponent,
        DocUserMenuComponent,
        DocUtilsModuleComponent,
        DocStickyComponent,
        DocTooltipComponent,
        DocAgGridModuleComponent,
        DocDashboardModuleComponent,
        DocFinanceModuleComponent,
        DocFusionchartsModuleComponent,
        DocGooglemapsModuleComponent,
        DocHeatmapModuleComponent,
        DocNetworkModuleComponent,
        DocNgxChartsModuleComponent,
        DocTimelineModuleComponent,
        DocTooltipModuleComponent,
        DocVisTimelineModuleComponent,
        DocAgGridViewComponent,
        DocAddWidgetModalComponent,
        DocDashboardComponent,
        DocMoneyCloudComponent,
        DocMoneyTimelineComponent,
        DocChartComponent,
        DocMultiLevelPieChartComponent,
        DocMapComponent,
        DocFacetHeatmapComponent,
        DocHeatmapComponent,
        DocResultsHeatmapViewComponent,
        DocEdgeInfoCardComponent,
        DocNetworkComponent,
        DocNodeInfoCardComponent,
        DocFacetChartComponent,
        DocFacetDateComponent,
        DocFacetTimelineComponent,
        DocTimelineLegendComponent,
        DocTimelineComponent,
        DocTooltip2Component,
        DocResultTimelineComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        WebServicesModule.forRoot(startConfig),
        BsFacetModule.forRoot(namedFacetConfig, defaultFacets),
        IntlModule.forRoot(AppLocalesConfig),
        BsSearchModule.forRoot(searchOptions),
        BsTimelineModule,
        ResultModule,
        BsSelectionModule,
        BsLabelsModule,
        BsActionModule,
        FormsModule,
        BsSearchModule,
        BsPreviewModule,
        BsModalModule,
        MetadataModule,
        CollapseModule,
        UtilsModule,
        BsAutocompleteModule,
        BsNotificationModule,
        BsBasketsModule,
        CommentsModule,
        BsFeedbackModule,
        MLModule,
        MetadataModule,
        BsAdvancedModule,
        BsAlertsModule,
        BsResultsViewModule.forRoot([resultsView], resultsView),
        BsRfmModule,
        BsSavedQueriesModule,
        SlideBuilderModule,
        BsStatusBarModule,
        BsThemeToggleModule,
        BsUserSettingsModule,
        AgGridModule,
        DashboardComponent,
        FinanceModule,
        FusionChartsModule,
        GoogleMapsModule,
        BsHeatmapModule,
        NetworkModule,
        NgxChartsModule,
        BsTooltipComponent,
        VisTimelineModule
    ],
    entryComponents: [],
    providers: [
        { provide: APP_INITIALIZER, useFactory: startConfigInitializer, deps: [StartConfigWebService], multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor(), multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: MODAL_MODEL, useValue: {} },
        { provide: ModalRef, useValue: {} },
        GlobalService,
        ...environment.providers
    ],
    bootstrap: [DocAppComponent]
})
export class AppModule implements DoBootstrap {

    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        // advanced
        const advancedFormCheckbox = createCustomElement(DocAdvancedFormCheckboxComponent, { injector: this.injector });
        const advancedFormInput = createCustomElement(DocAdvancedFormInputComponent, { injector: this.injector });
        const advancedFormMultiInput = createCustomElement(DocAdvancedFormMultiInputComponent, { injector: this.injector });
        const advancedFormRange = createCustomElement(DocAdvancedFormRangeComponent, { injector: this.injector });
        const advancedFormSelect = createCustomElement(DocAdvancedFormSelectComponent, { injector: this.injector });
        const datePicker = createCustomElement(DocDatePickerComponent, { injector: this.injector });
        const dateRangePicker = createCustomElement(DocDateRangePickerComponent, { injector: this.injector });
        const selectComponent = createCustomElement(DocSelectComponent, { injector: this.injector });
        customElements.define('doc-advanced-form-checkbox', advancedFormCheckbox);
        customElements.define('doc-advanced-form-input', advancedFormInput);
        customElements.define('doc-advanced-form-multi-input', advancedFormMultiInput);
        customElements.define('doc-advanced-form-range', advancedFormRange);
        customElements.define('doc-advanced-form-select', advancedFormSelect);
        customElements.define('doc-date-picker', datePicker);
        customElements.define('doc-date-range-picker', dateRangePicker);
        customElements.define('doc-select', selectComponent);

        // alerts
        const alerts = createCustomElement(DocAlertsComponent, { injector: this.injector });
        const alertsMenu = createCustomElement(DocAlertsMenuComponent, { injector: this.injector });
        const editAlert = createCustomElement(DocEditAlertComponent, { injector: this.injector });
        const manageAlerts = createCustomElement(DocManageAlertsComponent, { injector: this.injector });
        customElements.define('doc-alerts', alerts);
        customElements.define('doc-alerts-menu', alertsMenu);
        customElements.define('doc-edit-alert', editAlert);
        customElements.define('doc-manage-alerts', manageAlerts);

        // autocomplete
        const autocompleteList = createCustomElement(DocAutocompleteListComponent, { injector: this.injector });
        customElements.define('doc-autocomplete-list', autocompleteList);

        // baskets
        const editBasket = createCustomElement(DocEditBasketComponent, { injector: this.injector });
        const manageBaskets = createCustomElement(DocManageBasketsComponent, { injector: this.injector });
        const selectBaskets = createCustomElement(DocSelectBasketsComponent, { injector: this.injector });
        const resultBaskets = createCustomElement(DocResultBasketsComponent, { injector: this.injector });
        const basketsMenu = createCustomElement(DocBasketsMenuComponent, { injector: this.injector });
        const facetBaskets = createCustomElement(DocFacetBasketsComponent, { injector: this.injector });
        customElements.define('doc-edit-basket', editBasket);
        customElements.define('doc-manage-baskets', manageBaskets);
        customElements.define('doc-select-baskets', selectBaskets);
        customElements.define('doc-result-baskets', resultBaskets);
        customElements.define('doc-baskets-menu', basketsMenu);
        customElements.define('doc-facet-baskets', facetBaskets);

        // collapse
        const collapse = createCustomElement(DocCollapseComponent, { injector: this.injector });
        const collapseButton = createCustomElement(DocCollapseButtonComponent, { injector: this.injector });
        customElements.define('doc-collapse', collapse);
        customElements.define('doc-collapse-button', collapseButton);

        // comments
        const comments = createCustomElement(DocCommentsComponent, { injector: this.injector });
        customElements.define('doc-comments', comments);

        // facet
        const facet = createCustomElement(DocFacetComponent, { injector: this.injector });
        const facetList = createCustomElement(DocFacetListComponent, { injector: this.injector });
        const facetFilters = createCustomElement(DocFacetFiltersComponent, { injector: this.injector });
        const facetRange = createCustomElement(DocFacetRangeComponent, { injector: this.injector });
        const facetBar = createCustomElement(DocFacetBarComponent, { injector: this.injector });
        const facetMulti = createCustomElement(DocFacetMultiComponent, { injector: this.injector });
        const facetTagCloud = createCustomElement(DocFacetTagCloudComponent, { injector: this.injector });
        const refine = createCustomElement(DocRefineComponent, { injector: this.injector });
        customElements.define('doc-facet', facet);
        customElements.define('doc-facet-list', facetList);
        customElements.define('doc-facet-filters', facetFilters);
        customElements.define('doc-facet-range', facetRange);
        customElements.define('doc-facet-bar', facetBar);
        customElements.define('doc-facet-multi', facetMulti);
        customElements.define('doc-facet-tag-cloud', facetTagCloud);
        customElements.define('doc-refine', refine);

        // feedback
        const feedbackMenu = createCustomElement(DocFeedbackMenuComponent, { injector: this.injector });
        customElements.define('doc-feedback-menu', feedbackMenu);

        // labels
        const addLabel = createCustomElement(DocAddLabelComponent, { injector: this.injector });
        const deleteLabel = createCustomElement(DocDeleteLabelComponent, { injector: this.injector });
        const editLabel = createCustomElement(DocEditLabelComponent, { injector: this.injector });
        const labelsAutocomplete = createCustomElement(DocLabelsAutocompleteComponent, { injector: this.injector });
        const labelsMenu = createCustomElement(DocLabelsMenuComponent, { injector: this.injector });
        const renameLabel = createCustomElement(DocRenameLabelComponent, { injector: this.injector });
        customElements.define('doc-add-label', addLabel);
        customElements.define('doc-delete-label', deleteLabel);
        customElements.define('doc-edit-label', editLabel);
        customElements.define('doc-labels-autocomplete', labelsAutocomplete);
        customElements.define('doc-labels-menu', labelsMenu);
        customElements.define('doc-rename-label', renameLabel);

        // machine learning
        const answerCard = createCustomElement(DocAnswerCardComponent, { injector: this.injector });
        const passageList = createCustomElement(DocPassageListComponent, { injector: this.injector });
        const topPassages = createCustomElement(DocTopPassagesComponent, { injector: this.injector });
        customElements.define('doc-answer-card', answerCard);
        customElements.define('doc-passage-list', passageList);
        customElements.define('doc-top-passages', topPassages);

        // metadata
        const metadata = createCustomElement(DocMetadataComponent, { injector: this.injector });
        customElements.define('doc-metadata', metadata);

        // modal
        const confirm = createCustomElement(DocConfirmComponent, { injector: this.injector });
        const editable = createCustomElement(DocEditableComponent, { injector: this.injector });
        const help = createCustomElement(DocHelpComponent, { injector: this.injector });
        const login = createCustomElement(DocLoginComponent, { injector: this.injector });
        const modal = createCustomElement(DocModalComponent, { injector: this.injector });
        const modalFooter = createCustomElement(DocModalFooterComponent, { injector: this.injector });
        const modalHeader = createCustomElement(DocModalHeaderComponent, { injector: this.injector });
        const overrideUser = createCustomElement(DocOverrideUserComponent, { injector: this.injector });
        const prompt = createCustomElement(DocPromptComponent, { injector: this.injector });
        customElements.define('doc-confirm', confirm);
        customElements.define('doc-editable', editable);
        customElements.define('doc-help', help);
        customElements.define('doc-login', login);
        customElements.define('doc-modal', modal);
        customElements.define('doc-modal-footer', modalFooter);
        customElements.define('doc-modal-header', modalHeader);
        customElements.define('doc-override-user', overrideUser);
        customElements.define('doc-prompt', prompt);

        // notification
        const notifications = createCustomElement(DocNotificationsComponent, { injector: this.injector });
        const notificationsManager = createCustomElement(DocNotificationsManagerComponent, { injector: this.injector });
        customElements.define('doc-notifications', notifications);
        customElements.define('doc-notifications-manager', notificationsManager);

        // preview
        const previewHighlights = createCustomElement(DocPreviewHighlightsComponent, { injector: this.injector });
        const previewLinks = createCustomElement(DocPreviewLinksComponent, { injector: this.injector });
        const previewPopup = createCustomElement(DocPreviewPopupComponent, { injector: this.injector });
        const previewPanel = createCustomElement(DocPreviewPanelComponent, { injector: this.injector });
        const resultLinkPreview = createCustomElement(DocResultLinkPreviewComponent, { injector: this.injector });
        const facetPreview = createCustomElement(DocFacetPreviewComponent, { injector: this.injector });
        const similarDocuments = createCustomElement(DocSimilarDocumentsComponent, { injector: this.injector });
        const previewEntityFacet = createCustomElement(DocPreviewEntityFacetComponent, { injector: this.injector });
        const previewEntityPanel = createCustomElement(DocPreviewEntityPanelComponent, { injector: this.injector });
        const previewExtractsPanel = createCustomElement(DocPreviewExtractsPanelComponent, { injector: this.injector });
        const previewSearchForm = createCustomElement(DocPreviewSearchFormComponent, { injector: this.injector });
        const previewPagesPanel = createCustomElement(DocPreviewPagesPanelComponent, { injector: this.injector });
        const previewPageForm = createCustomElement(DocPreviewPageFormComponent, { injector: this.injector });
        const previewMinimap = createCustomElement(DocPreviewMinimapComponent, { injector: this.injector });
        const facetPreviewComponent = createCustomElement(DocFacetPreviewComponentComponent, { injector: this.injector });
        customElements.define('doc-preview-highlights', previewHighlights);
        customElements.define('doc-preview-links', previewLinks);
        customElements.define('doc-preview-popup', previewPopup);
        customElements.define('doc-preview-panel', previewPanel);
        customElements.define('doc-result-link-preview', resultLinkPreview);
        customElements.define('doc-facet-preview', facetPreview);
        customElements.define('doc-similar-documents', similarDocuments);
        customElements.define('doc-preview-entity-facet', previewEntityFacet);
        customElements.define('doc-preview-entity-panel', previewEntityPanel);
        customElements.define('doc-preview-extracts-panel', previewExtractsPanel);
        customElements.define('doc-preview-search-form', previewSearchForm);
        customElements.define('doc-preview-pages-panel', previewPagesPanel);
        customElements.define('doc-preview-page-form', previewPageForm);
        customElements.define('doc-preview-minimap', previewMinimap);
        customElements.define('doc-facet-preview-2', facetPreviewComponent);

        // result
        const resultTitle = createCustomElement(DocResultTitleComponent, { injector: this.injector });
        const resultExtracts = createCustomElement(DocResultExtractsComponent, { injector: this.injector });
        const resultMissingTerms = createCustomElement(DocResultMissingTermsComponent, { injector: this.injector });
        const resultThumbnail = createCustomElement(DocResultThumbnailComponent, { injector: this.injector });
        const userRating = createCustomElement(DocUserRatingComponent, { injector: this.injector });
        const sponsoredResults = createCustomElement(DocSponsoredResultsComponent, { injector: this.injector });
        const resultsCounter = createCustomElement(DocResultsCounterComponent, { injector: this.injector });
        const resultIcon = createCustomElement(DocResultIconComponent, { injector: this.injector });
        const resultSource = createCustomElement(DocResultSourceComponent, { injector: this.injector });
        customElements.define('doc-result-title', resultTitle);
        customElements.define('doc-result-extracts', resultExtracts);
        customElements.define('doc-result-missing-terms', resultMissingTerms);
        customElements.define('doc-result-thumbnail', resultThumbnail);
        customElements.define('doc-user-rating', userRating);
        customElements.define('doc-sponsored-results', sponsoredResults);
        customElements.define('doc-results-counter', resultsCounter);
        customElements.define('doc-result-icon', resultIcon);
        customElements.define('doc-result-source', resultSource);

        // results-view
        const resultsGridView = createCustomElement(DocResultsGridViewComponent, { injector: this.injector });
        const resultsViewSelector = createCustomElement(DocResultsViewSelectorComponent, { injector: this.injector });
        customElements.define('doc-results-grid-view', resultsGridView);
        customElements.define('doc-results-view-selector', resultsViewSelector);

        // rfm
        const rfmAction = createCustomElement(DocRfmActionComponent, { injector: this.injector });
        customElements.define('doc-rfm-action', rfmAction);

        // saved queries
        const editSavedQuery = createCustomElement(DocEditSavedQueryComponent, { injector: this.injector });
        const exportQuery = createCustomElement(DocExportQueryComponent, { injector: this.injector });
        const facetRecentDocuments = createCustomElement(DocFacetRecentDocumentsComponent, { injector: this.injector });
        const facetRecentQueries = createCustomElement(DocFacetRecentQueriesComponent, { injector: this.injector });
        const facetSavedQueries = createCustomElement(DocFacetSavedQueriesComponent, { injector: this.injector });
        const manageSavedQueries = createCustomElement(DocManageSavedQueriesComponent, { injector: this.injector });
        const queryExporter = createCustomElement(DocQueryExporterComponent, { injector: this.injector });
        const savedQueriesMenu = createCustomElement(DocSavedQueriesMenuComponent, { injector: this.injector });
        customElements.define('doc-edit-saved-query', editSavedQuery);
        customElements.define('doc-export-query', exportQuery);
        customElements.define('doc-facet-recent-documents', facetRecentDocuments);
        customElements.define('doc-facet-recent-queries', facetRecentQueries);
        customElements.define('doc-facet-saved-queries', facetSavedQueries);
        customElements.define('doc-manage-saved-queries', manageSavedQueries);
        customElements.define('doc-query-exporter', queryExporter);
        customElements.define('doc-saved-queries-menu', savedQueriesMenu);

        // search
        const didYouMean = createCustomElement(DocDidYouMeanComponent, { injector: this.injector });
        const loadMore = createCustomElement(DocLoadMoreComponent, { injector: this.injector });
        const loadingBar = createCustomElement(DocLoadingBarComponent, { injector: this.injector });
        const pageSizeSelector = createCustomElement(DocPageSizeSelectorComponent, { injector: this.injector });
        const pager = createCustomElement(DocPagerComponent, { injector: this.injector });
        const scope = createCustomElement(DocScopeComponent, { injector: this.injector });
        const scroller = createCustomElement(DocScrollerComponent, { injector: this.injector });
        const sortSelector = createCustomElement(DocSortSelectorComponent, { injector: this.injector });
        const tabs = createCustomElement(DocTabsComponent, { injector: this.injector });
        customElements.define('doc-did-you-mean', didYouMean);
        customElements.define('doc-load-more', loadMore);
        customElements.define('doc-loading-bar', loadingBar);
        customElements.define('doc-page-size-selector', pageSizeSelector);
        customElements.define('doc-pager', pager);
        customElements.define('doc-scope', scope);
        customElements.define('doc-scroller', scroller);
        customElements.define('doc-sort-selector', sortSelector);
        customElements.define('doc-tabs', tabs);

        // selection
        const resultSelector = createCustomElement(DocResultSelectorComponent, { injector: this.injector });
        const resultsSelector = createCustomElement(DocResultsSelectorComponent, { injector: this.injector });
        const selectionArranger = createCustomElement(DocSelectionArrangerComponent, { injector: this.injector });
        customElements.define('doc-result-selector', resultSelector);
        customElements.define('doc-results-selector', resultsSelector);
        customElements.define('doc-selection-arranger', selectionArranger);

        // slide builder
        const slideBuilder = createCustomElement(DocSlideBuilderComponent, { injector: this.injector });
        const slideList = createCustomElement(DocSlideListComponent, { injector: this.injector });
        customElements.define('doc-slide-builder', slideBuilder);
        customElements.define('doc-slide-list', slideList);

        // status bar
        const fullscreenActivator = createCustomElement(DocFullscreenActivatorComponent, { injector: this.injector });
        const networkActivity = createCustomElement(DocNetworkActivityComponent, { injector: this.injector });
        customElements.define('doc-fullscreen-activator', fullscreenActivator);
        customElements.define('doc-network-activity', networkActivity);

        // theme toggle
        const themeToggle = createCustomElement(DocThemeToggleComponent, { injector: this.injector });
        customElements.define('doc-theme-toggle', themeToggle);

        // user settings
        const editUserSettings = createCustomElement(DocEditUserSettingsComponent, { injector: this.injector });
        const userMenu = createCustomElement(DocUserMenuComponent, { injector: this.injector });
        const userSettingsEditor = createCustomElement(DocUserSettingsEditorComponent, { injector: this.injector });
        customElements.define('doc-edit-user-settings', editUserSettings);
        customElements.define('doc-user-menu', userMenu);
        customElements.define('doc-user-settings-editor', userSettingsEditor);

        // utils
        const sticky = createCustomElement(DocStickyComponent, { injector: this.injector });
        const tooltip = createCustomElement(DocTooltipComponent, { injector: this.injector });
        customElements.define('doc-sticky', sticky);
        customElements.define('doc-tooltip', tooltip);
    }
}
