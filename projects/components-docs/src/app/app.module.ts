import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { DocAppComponent } from './app.component';
import { IntlModule, Locale, LocalesConfig } from "@sinequa/core/intl";
import { WebServicesModule, StartConfig, StartConfigWebService } from "@sinequa/core/web-services";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { DocMenuComponent } from './menu/menu.component';
import { DocNavbarComponent } from './navbar/navbar.component';
import { environment } from "../environments/environment";
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GlobalService } from './shared/global.service';
import { DocMachineLearningModule } from './components/machine-learning-module/machine-learning.module';
import { DocActionModule } from './components/action-module/action.module';
import { DocAdvancedModule } from './components/advanced-module/advanced.module';
import { DocAlertsModule } from './components/alerts-module/alerts.module';
import { DocAutocompleteModule } from './components/autocomplete-module/autocomplete.module';
import { DocBasketsModule } from './components/baskets-module/baskets.module';
import { DocCollapseModule } from './components/collapse-module/collapse.module';
import { DocCommentsModule } from './components/comments-module/comments.module';
import { DocFacetModule } from './components/facet-module/facet.module';
import { DocFeedbackModule } from './components/feedback-module/feedback.module';
import { DocLabelsModule } from './components/labels-module/labels.module';
import { DocMetadataModule } from './components/metadata-module/metadata.module';
import { DocModalModule } from './components/modal-module/modal.module';
import { DocNotificationModule } from './components/notification-module/notification.module';
import { DocPreviewModule } from './components/preview-module/preview.module';
import { DocResultModule } from './components/result-module/result.module';
import { DocResultsViewModule } from './components/results-view-module/results-view.module';
import { DocRfmModule } from './components/rfm-module/rfm.module';
import { DocSavedQueriesModule } from './components/saved-queries-module/saved-queries.module';
import { DocSearchModule } from './components/search-module/search.module';
import { DocSelectionModule } from './components/selection-module/selection.module';
import { DocSlideBuilderModule } from './components/slide-builder-module/slide-builder.module';
import { DocStatusBarModule } from './components/status-bar-module/status-bar.module';
import { DocUserSettingsModule } from './components/user-settings-module/user-settings.module';
import { DocUtilsModule } from './components/utils-module/utils.module';
import { DocAgGridModule } from './analytics/ag-grid-module/ag-grid.module';
import { DocDashboardModule } from './analytics/dashboard-module/dashboard.module';
import { DocFinanceModule } from './analytics/finance-module/finance.module';
import { DocFusionchartsModule } from './analytics/fusioncharts-module/fusioncharts.module';
import { DocGooglemapsModule } from './analytics/googlemaps-module/googlemaps.module';
import { DocHeatmapModule } from './analytics/heatmap-module/heatmap.module';
import { DocNetworkModule } from './analytics/network-module/network.module';
import { DocNgxChartsModule } from './analytics/ngx-charts-module/ngx-charts.module';
import { DocTimelineModule } from './analytics/timeline-module/timeline.module';
import { DocTooltipModule } from './analytics/tooltip-module/tooltip.module';
import { DocVisTimelineModule } from './analytics/vis-timeline-module/vis-timeline.module';
import { DocBaseModule } from './shared/base.module';
import { DocSearchBarComponent } from './search-bar/search-bar.component';
import { LoginInterceptor } from '@sinequa/core/login';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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

// Application languages (intl service)
import enLocale from "../locales/en";

export class AppLocalesConfig implements LocalesConfig {
    defaultLocale: Locale;
    locales?: Locale[];
    constructor(){
        this.locales = [
            { name: "en", display: "msg#locale.en", data: enLocale}
        ];
        this.defaultLocale = this.locales[0];
    }
}

@NgModule({
    declarations: [
        DocAppComponent,
        DocMenuComponent,
        DocNavbarComponent,
        DocSearchBarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        WebServicesModule.forRoot(startConfig),
        IntlModule.forRoot(AppLocalesConfig),
        FormsModule,
        DocBaseModule,
        DocActionModule,
        DocAdvancedModule,
        DocAlertsModule,
        DocAutocompleteModule,
        DocBasketsModule,
        DocCollapseModule,
        DocCommentsModule,
        DocFacetModule,
        DocFeedbackModule,
        DocLabelsModule,
        DocMachineLearningModule,
        DocMetadataModule,
        DocModalModule,
        DocNotificationModule,
        DocPreviewModule,
        DocResultModule,
        DocResultsViewModule,
        DocRfmModule,
        DocSavedQueriesModule,
        DocSearchModule,
        DocSelectionModule,
        DocSlideBuilderModule,
        DocStatusBarModule,
        DocUserSettingsModule,
        DocUtilsModule,
        DocAgGridModule,
        DocDashboardModule,
        DocFinanceModule,
        DocFusionchartsModule,
        DocGooglemapsModule,
        DocHeatmapModule,
        DocNetworkModule,
        DocNgxChartsModule,
        DocTimelineModule,
        DocTooltipModule,
        DocVisTimelineModule
    ],
    entryComponents: [],
    providers: [
        { provide: APP_INITIALIZER, useFactory: startConfigInitializer, deps: [StartConfigWebService], multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
        GlobalService,
        ...environment.providers
    ],
    bootstrap: [DocAppComponent]
})
export class AppModule {
}
