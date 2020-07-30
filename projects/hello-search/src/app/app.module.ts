import {NgModule/*, APP_INITIALIZER*/} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WebServicesModule, StartConfigWebService, StartConfig} from "@sinequa/core/web-services";
import {LoginModule, LoginInterceptor} from "@sinequa/core/login";
import {IntlModule} from "@sinequa/core/intl";
import {ModalModule} from "@sinequa/core/modal";
import {NotificationsInterceptor} from "@sinequa/core/notification";
import {AuditInterceptor} from "@sinequa/core/app-utils";

import {DefaultLocalesConfig} from "@sinequa/core";
import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";

export function StartConfigInitializer(startConfigWebService: StartConfigWebService): () => Promise<StartConfig> {
    const init = () => startConfigWebService.fetchPreLoginAppConfig().toPromise();
    return init;
}

export const startConfig: StartConfig = {
    app: "your-app-name",
    production: environment.production
};

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,

        WebServicesModule.forRoot(startConfig),
        IntlModule.forRoot(DefaultLocalesConfig),
        LoginModule.forRoot(), // Just use default login modal
        ModalModule.forRoot(),
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        // Provides an APP_INITIALIZER which will fetch application configuration information from the Sinequa
        // server automatically at startup using the application name specified in the URL (app[-debug]/<app-name>).
        // This allows an application to avoid hard-coding parameters in the StartConfig but requires that the application
        // be served from the an app[-debug]/<app name> URL.
        // {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},

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
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}