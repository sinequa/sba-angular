import {NgModule} from "@angular/core";
import {BaseModule} from "@sinequa/core/base";
import {IntlModule} from "@sinequa/core/intl";
import {WebServicesModule} from "@sinequa/core/web-services";

import {APP_UTILS_MODULE_PROVIDERS} from "./module.providers";

/**
 * This module contains a utility {@link AppService} for managing the configuration of a Sinequa SBA and a {@link FormatService}
 * for handling the formatting and parsing of Sinequa field values. It also contains an implementation of a {@link Query} class
 * as well as classes for manipulating Sinequa fielded search expressions.
 *
 * The {@link AuditInterceptor} in this module should be registered using `HTTP_INTERCEPTORS` in your app module.
 */
@NgModule({
    imports: [
        BaseModule,
        IntlModule,
        WebServicesModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        ...APP_UTILS_MODULE_PROVIDERS
    ]
})
export class AppUtilsModule {
}
