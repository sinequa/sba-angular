import { NgModule/*, APP_INITIALIZER*/ } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// @sinequa/core library
import { WebServicesModule, StartConfigWebService, StartConfig } from "@sinequa/core/web-services";
import { LoginModule } from "@sinequa/core/login";
import { IntlModule } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";

// @sinequa/components library
import { BsSearchModule, SearchOptions } from "@sinequa/components/search";
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { BsNotificationModule } from "@sinequa/components/notification";
import { BsFacetModule } from "@sinequa/components/facet";
import { BsActionModule } from "@sinequa/components/action";
import { BsModalModule } from "@sinequa/components/modal";
import { BsBasketsModule } from '@sinequa/components/baskets';
import { BsAlertsModule } from '@sinequa/components/alerts';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { UtilsModule, SCREEN_SIZE_RULES } from '@sinequa/components/utils';
import { BsLabelsModule } from '@sinequa/components/labels';
import { BsUserSettingsModule } from '@sinequa/components/user-settings';
import { ResultModule } from '@sinequa/components/result';
import { BsFeedbackModule } from '@sinequa/components/feedback';
import { BsPreviewModule } from '@sinequa/components/preview';
import { MetadataModule } from '@sinequa/components/metadata';
import { BsSelectionModule } from '@sinequa/components/selection';

// Components
import { AppComponent } from "./app.component";
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PreviewComponent } from './preview/preview.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AutocompleteExtended } from './search-form/autocomplete-extended.directive';

// Environment
import { environment } from "../environments/environment";


// Initialization of @sinequa/core
export const startConfig: StartConfig = {
    app: "training",
    production: environment.production,
    autoSAMLProvider: environment.autoSAMLProvider,
    auditEnabled: true
};

// @sinequa/core config initializer
export function StartConfigInitializer(startConfigWebService: StartConfigWebService): () => Promise<StartConfig> {
    const init = () => startConfigWebService.fetchPreLoginAppConfig().toPromise();
    return init;
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
        BsPreviewModule,
        MetadataModule,
        BsSelectionModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SearchComponent,
        PreviewComponent,
        SearchFormComponent,
        AutocompleteExtended
    ],
    providers: [
        // {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: SCREEN_SIZE_RULES, useValue: breakpoints}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}