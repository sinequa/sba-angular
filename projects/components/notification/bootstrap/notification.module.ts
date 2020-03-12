import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BsNotification} from "./notification/notification";
import {BsNotifications} from "./notifications/notifications";
import {BsNotificationsManager} from "./notifications-manager/notifications-manager";

import {IntlModule} from "@sinequa/core/intl";
import {BsActionModule} from "@sinequa/components/action";

@NgModule({
    imports: [
        CommonModule,        
        IntlModule,
        BsActionModule,
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [
        BsNotification, BsNotifications, BsNotificationsManager
    ],
    exports: [
        BsNotifications, BsNotificationsManager
    ]
})
export class BsNotificationModule {
}
