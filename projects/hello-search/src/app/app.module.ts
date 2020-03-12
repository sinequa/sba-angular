import {NgModule/*, APP_INITIALIZER*/} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WebServicesModule, StartConfigWebService, StartConfig} from "@sinequa/core/web-services";
import {LoginModule} from "@sinequa/core/login";
import {IntlModule} from "@sinequa/core/intl";
import {ModalModule} from "@sinequa/core/modal";

import {DefaultLocalesConfig} from "@sinequa/core";
import {AppComponent} from "./app.component";
import {environment} from "../environments/environment";

export function StartConfigInitializer(startConfigWebService: StartConfigWebService): () => Promise<StartConfig> {
    const init = () => startConfigWebService.fetchPreLoginAppConfig().toPromise();
    return init;
}

export const startConfig: StartConfig = {
    //url: "https://my-sinequa-server.local", 
    //app: "my-hello-search-app",
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
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}