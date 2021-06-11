import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
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
