import {NgModule, Injectable, Inject, ModuleWithProviders, Type} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {Ng2UiAuthModule, /*IPartialConfigOptions,*/ CONFIG_OPTIONS, IProviders, StorageType, OauthService, PopupService} from "ng2-ui-auth";
import {A11yModule} from "@angular/cdk/a11y";
import {OverlayModule} from "@angular/cdk/overlay";
import {AuthenticationOauthService} from "./authentication-oauth.service";
import {AuthenticationPopupService} from "./authentication-popup.service";

// Sinequa modules
import {BaseModule} from "@sinequa/core/base";
import {WebServicesModule, START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {ValidationModule} from "@sinequa/core/validation";
import {IntlModule} from "@sinequa/core/intl";
import {ModalModule} from "@sinequa/core/modal";
import {NotificationModule} from "@sinequa/core/notification";
import {AppUtilsModule} from "@sinequa/core/app-utils";

// Login
import {MODAL_LOGIN} from "./login.service";
import {Login} from "./login.component";

import {LOGIN_MODULE_PROVIDERS} from "./module.providers";

/*tslint:disable-next-line*/
export interface IPartialConfigOptions {} // until export restored to ng2-ui-auth@9

/**
 * Configuration for the ng2-ui-auth library
 */
@Injectable({
    providedIn: "root"
})
export class AuthConfig implements IPartialConfigOptions {
    storageType: StorageType;
    providers: IProviders;
    constructor(@Inject(START_CONFIG) startConfig: StartConfig) {
        this.storageType = "memory" as StorageType;
        this.providers = startConfig.providers || {};
    }
}

/**
 * This module provides support for user authentication in the {@link AuthenticationService}. This authentication can be
 * automatic (OAuth/SAML), if configured in the Sinequa administration, or manual where the user name and password are
 * entered in a modal dialog box and transmitted in clear text. There is also support for the ng2-ui-auth library where the
 * authentication process occurs in a browser popup window. Authentication is instigated by the handling of HTTP 401 errors
 * in an `HttpInterceptor` so all web service calls requiring authentication are automatically protected. This module will
 * not be used for authentication when the web server is configured for Windows authentication.
 *
 * A higher level {@link LoginService} groups the successful retrieval of the current `application configuration` ({@link AppService}),
 * `principal` ({@link PrincipalWebService}), and `user settings` ({@link UserSettingsWebService}) all of which require the user
 * to be authenticated. This can be used as a "gatekeeper" to protect access to the main, often routed, component(s).
 *
 * The {@link LoginInterceptor} in this module must be registered using `HTTP_INTERCEPTORS` in your app module.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        Ng2UiAuthModule.forRoot(undefined, false),
        ModalModule.forRoot(),

        // CDK
        OverlayModule, // Needed for the modal service
        A11yModule,

        // Sinequa modules
        BaseModule,
        AppUtilsModule,
        WebServicesModule,  // Required for start-up config (START_CONFIG token)
        IntlModule,
        ValidationModule,
        NotificationModule
    ],
    declarations: [
        Login, // Default Login components
    ],
    exports: [
    ],
    providers: [
        // Auth module dependencies
        {provide: CONFIG_OPTIONS, useClass: AuthConfig},
        {provide: OauthService, useExisting: AuthenticationOauthService},
        {provide: PopupService, useExisting: AuthenticationPopupService},

        ...LOGIN_MODULE_PROVIDERS
    ]
})
export class LoginModule {
    static forRoot(loginModal: Type<any> = Login): ModuleWithProviders<LoginModule> {
        return {
            ngModule: LoginModule,
            providers: [
                // Login
                {provide: MODAL_LOGIN, useValue: loginModal},
            ]
        };
    }
}
