import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from '@angular/router';


// @sinequa/core library
import { AuditInterceptor } from "@sinequa/core/app-utils";
import { IntlModule } from "@sinequa/core/intl";
import { AuthenticationService, LoginInterceptor, LoginModule, TeamsInitializer } from "@sinequa/core/login";
import { ModalModule } from "@sinequa/core/modal";
import { NotificationsInterceptor } from "@sinequa/core/notification";
import { StartConfigWebService, WebServicesModule } from "@sinequa/core/web-services";

// @sinequa/components library
import { BsActionModule } from "@sinequa/components/action";
import { BsAlertsModule } from '@sinequa/components/alerts';
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { BsBasketsModule } from '@sinequa/components/baskets';
import { BsFacetModule } from "@sinequa/components/facet";
import { BsFeedbackModule } from '@sinequa/components/feedback';
import { FiltersModule } from "@sinequa/components/filters";
import { BsLabelsModule } from '@sinequa/components/labels';
import { MetadataModule } from '@sinequa/components/metadata';
import { BsModalModule } from "@sinequa/components/modal";
import { BsNotificationModule } from "@sinequa/components/notification";
import { ResultModule } from '@sinequa/components/result';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { BsSearchModule, SearchOptions } from "@sinequa/components/search";
import { SearchFormComponent } from "@sinequa/components/search-form";
import { BsSelectionModule, SELECTION_OPTIONS, SelectionOptions } from '@sinequa/components/selection';
import { BsUserSettingsModule } from '@sinequa/components/user-settings';
import { SCREEN_SIZE_RULES, UtilsModule } from '@sinequa/components/utils';

// @sinequa/analytics library
import { FusionChartsModule } from '@sinequa/analytics/fusioncharts';
import { GOOGLE_MAPS_API_KEY } from "@sinequa/analytics/googlemaps";

// Components
import { AppComponent } from "./app.component";
import { AppDashboardComponent } from "./dashboard/dashboard.component";
import { AppSearchFormComponent } from "./search-form/search-form.component";
import { SearchComponent } from './search/search.component';

// Components imported from Vanilla Search
// ⚠️ Starting from v11.7, these components are referenced from the Vanilla Search project to avoid duplicating the code
// Feel free to copy the source code into the Pepper app to avoid modifying the source code of Vanilla.
import { AutocompleteComponent } from '@sinequa/vanilla/app/search-form/autocomplete.component';

// Environment
import { environment as startConfig } from "../environments/environment";

// @sinequa/core config initializer
export function StartConfigInitializer(startConfigWebService: StartConfigWebService) {
    return () => startConfigWebService.fetchPreLoginAppConfig();
}


// Application routes (see https://angular.io/guide/router)
export const routes: Routes = [
    {path: "search", component: SearchComponent},
    {path: "**", redirectTo: "search"}
];


// Search options (search service)
export const searchOptions: SearchOptions = {
    routes: ["search"],
    homeRoute: "home"
};


// Application languages (intl service)
import { Locale, LocalesConfig } from "@sinequa/core/intl";
import deLocale from "../locales/de";
import enLocale from "../locales/en";
import frLocale from "../locales/fr";

export class AppLocalesConfig implements LocalesConfig {
    defaultLocale: Locale;
    locales?: Locale[];
    constructor(){
        this.locales = [
            { name: "en", display: "msg#locale.en", data: enLocale},
            { name: "fr", display: "msg#locale.fr", data: frLocale},
            { name: "de", display: "msg#locale.de", data: deLocale},
        ];
        this.defaultLocale = this.locales[0];
    }
}


// Screen size breakpoints (consistent with Bootstrap custom breakpoints in app.scss)
export const breakpoints = {
    xl: "(min-width: 1650px)",
    lg: "(min-width: 1400px) and (max-width: 1649.98px)",
    md: "(min-width: 992px) and (max-width: 1399.98px)",
    sm: "(min-width: 576px) and (max-width: 991.98px)",
    xs: "(max-width: 575.98px)",
};

export const selectionOptions: SelectionOptions = {
    resetOnNewQuery: false,
    resetOnNewResults: false,
    storage: "record"
}


// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
// Fusion is a light theme, Candy is a dark theme
import * as CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
FusionCharts.options.creditLabel = false;

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,

        WebServicesModule.forRoot(startConfig),
        IntlModule.forRoot(AppLocalesConfig),
        LoginModule,
        ModalModule,

        BsSearchModule.forRoot(searchOptions),
        BsAutocompleteModule,
        BsNotificationModule,
        BsFacetModule,
        BsActionModule,
        BsModalModule,
        BsBasketsModule,
        BsAlertsModule,
        BsSavedQueriesModule,
        UtilsModule,
        BsLabelsModule,
        BsUserSettingsModule,
        ResultModule,
        BsFeedbackModule,
        MetadataModule,
        BsSelectionModule,
        FiltersModule,
        SearchFormComponent,

        FusionChartsModule.forRoot(FusionCharts, charts, FusionTheme, CandyTheme),
        AppDashboardComponent
    ],
    declarations: [
        AppComponent,
        SearchComponent,
        AppSearchFormComponent,
        AutocompleteComponent
    ],
    providers: [
        // Provides an APP_INITIALIZER which will fetch application configuration information from the Sinequa
        // server automatically at startup using the application name specified in the URL (app[-debug]/<app-name>).
        // This allows an application to avoid hard-coding parameters in the StartConfig but requires that the application
        // be served from the an app[-debug]/<app name> URL.
        {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},

        // Uncomment if the app is to be used with Teams
        {provide: APP_INITIALIZER, useFactory: TeamsInitializer, deps: [AuthenticationService], multi: true},

        // Provides the Angular LocationStrategy to be used for reading route state from the browser's URL. Currently
        // only the HashLocationStrategy is supported by Sinequa.
        {provide: LocationStrategy, useClass: HashLocationStrategy},

        // Provides an HttpInterceptor to handle user login. The LoginInterceptor handles HTTP 401 responses
        // to Sinequa web service requests and initiates the login process.
        {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},

        // Provides an HttpInterceptor that offers a centralized location through which all client-side
        // audit records pass. An application can replace AuditInterceptor with a subclass that overrides
        // the updateAuditRecord method to add custom audit information to the records.
        {provide: HTTP_INTERCEPTORS, useClass: AuditInterceptor, multi: true},

        // Provides an HttpInterceptor that automatically processes any notifications specified in the $notifications
        // member of the response body to any Sinequa web service requests.
        {provide: HTTP_INTERCEPTORS, useClass: NotificationsInterceptor, multi: true},

        {provide: SCREEN_SIZE_RULES, useValue: breakpoints},
        {provide: SELECTION_OPTIONS, useValue: selectionOptions},

        {provide: GOOGLE_MAPS_API_KEY, useValue: ""}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
