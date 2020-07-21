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
        // {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuditInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: NotificationsInterceptor, multi: true},
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}