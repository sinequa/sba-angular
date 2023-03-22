import { NgModule, APP_INITIALIZER } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// @sinequa/core library
import { WebServicesModule, StartConfigWebService, StartConfig } from "@sinequa/core/web-services";
import { LoginModule, LoginInterceptor, TeamsInitializer, AuthenticationService } from "@sinequa/core/login";
import { IntlModule } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";
import { NotificationsInterceptor } from "@sinequa/core/notification";
import { AuditInterceptor } from "@sinequa/core/app-utils";

// @sinequa/components library
import { BsSearchModule, SearchOptions } from "@sinequa/components/search";
import { BsNotificationModule } from "@sinequa/components/notification";
import { BsFacetModule } from "@sinequa/components/facet";
import { BsActionModule } from "@sinequa/components/action";
import { BsModalModule } from "@sinequa/components/modal";
import { BsBasketsModule } from '@sinequa/components/baskets';
import { BsAlertsModule } from '@sinequa/components/alerts';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { UtilsModule, SCREEN_SIZE_RULES } from '@sinequa/components/utils';
import { BsLabelsModule } from '@sinequa/components/labels';
import { APP_HELP_FOLDER_OPTIONS, BsUserSettingsModule } from '@sinequa/components/user-settings';
import { ResultModule } from '@sinequa/components/result';
import { BsFeedbackModule } from '@sinequa/components/feedback';
import { BsPreviewModule } from '@sinequa/components/preview';
import { MetadataModule } from '@sinequa/components/metadata';
import { BsSelectionModule } from '@sinequa/components/selection';
import { MLModule } from '@sinequa/components/machine-learning';

import { SearchFormComponent } from "@sinequa/components/search-form";
import { FiltersModule } from "@sinequa/components/filters";

// Components
import { AppComponent } from "./app.component";
import { SearchComponent } from './search/search.component';
import { AppSearchFormComponent } from "@sinequa/pepper/app/search-form/search-form.component";
import { AutocompleteComponent } from '@sinequa/vanilla/app/search-form/autocomplete.component';

// Environment
import { environment } from "../environments/environment";

// Help folder options
import { HELP_DEFAULT_FOLDER_OPTIONS } from "../config";

// Initialization of @sinequa/core
export const startConfig: StartConfig = {
  app: "chat",
  url: "https://dev-demo-coe-ns.eastus2.cloudapp.azure.com",
  production: environment.production,
  autoOAuthProvider: "google",
  auditEnabled: true
};

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
    deactivateRouting: true,
    routes: ["search"],
    homeRoute: "home"
};


// Application languages (intl service)
import {LocalesConfig, Locale} from "@sinequa/core/intl";
import enLocale from "../locales/en";
import frLocale from "../locales/fr";
import deLocale from "../locales/de";

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
        BsPreviewModule,
        MetadataModule,
        BsSelectionModule,
        MLModule,
        FiltersModule,
        SearchFormComponent
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

        { provide: SCREEN_SIZE_RULES, useValue: breakpoints },

        // Provides default help's folder options
        // this options can be overriden by the custom json configuration from the administration panel
        { provide: APP_HELP_FOLDER_OPTIONS, useValue: HELP_DEFAULT_FOLDER_OPTIONS }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
