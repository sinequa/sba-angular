import { ScrollingModule } from "@angular/cdk/scrolling";
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
import { StartConfig, StartConfigWebService, WebServicesModule } from "@sinequa/core/web-services";

// @sinequa/components library
import { BsActionModule } from "@sinequa/components/action";
import { BsAlertsModule } from '@sinequa/components/alerts';
import { BsBasketsModule } from '@sinequa/components/baskets';
import { BsFacetModule } from "@sinequa/components/facet";
import { BsFeedbackModule } from '@sinequa/components/feedback';
import { BsLabelsModule } from '@sinequa/components/labels';
import { MLModule, SimilarDocumentsComponent } from '@sinequa/components/machine-learning';
import { MetadataModule } from '@sinequa/components/metadata';
import { BsModalModule } from "@sinequa/components/modal";
import { BsNotificationModule } from "@sinequa/components/notification";
import { PreviewModule } from '@sinequa/components/preview';
import { ResultModule } from '@sinequa/components/result';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { BsSearchModule, SearchOptions } from "@sinequa/components/search";
import { BsSelectionModule } from '@sinequa/components/selection';
import { APP_HELP_FOLDER_OPTIONS, BsUserSettingsModule } from '@sinequa/components/user-settings';
import { SCREEN_SIZE_RULES, UtilsModule } from '@sinequa/components/utils';

import { FiltersModule } from "@sinequa/components/filters";
import { SearchFormComponent } from "@sinequa/components/search-form";

// Components
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { PreviewComponent } from './preview/preview.component';
import { AutocompleteComponent } from "./search-form/autocomplete.component";
import { AppSearchFormComponent } from "./search-form/search-form.component";
import { SearchComponent } from './search/search.component';

// Environment
import { environment } from "../environments/environment";

// Help folder options
import { HELP_DEFAULT_FOLDER_OPTIONS } from "../config";

// Initialization of @sinequa/core
export const startConfig: StartConfig = {
    app: "training",
    production: environment.production,
    autoSAMLProvider: environment.autoSAMLProvider,
    auditEnabled: true
};

// @sinequa/core config initializer
export function StartConfigInitializer(startConfigWebService: StartConfigWebService) {
    return () => startConfigWebService.fetchPreLoginAppConfig();
}


// Application routes (see https://angular.io/guide/router)
export const routes: Routes = [
    {path: "home", component: HomeComponent},
    {path: "search", component: SearchComponent},
    {path: "preview", component: PreviewComponent},
    {path: "**", redirectTo: "home"}
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


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        FormsModule,
        ReactiveFormsModule,
        ScrollingModule,

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
        PreviewModule,
        MetadataModule,
        BsSelectionModule,
        MLModule,
        FiltersModule,
        SearchFormComponent,
        SimilarDocumentsComponent
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        PreviewComponent,
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
