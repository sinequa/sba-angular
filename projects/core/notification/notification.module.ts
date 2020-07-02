import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

import {NotificationsInterceptor} from "./notifications.interceptor";

import {NOTIFICATION_MODULE_PROVIDERS} from "./module.providers";

/**
 * This module provides a service for managing notifications. It is used by the
 * Sinequa runtime and can also be used for application-specific purposes.
 */
@NgModule({
    imports: [
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: NotificationsInterceptor, multi: true},
        ...NOTIFICATION_MODULE_PROVIDERS
    ]
})
export class NotificationModule {
}
