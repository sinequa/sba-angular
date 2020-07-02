import {NotificationsService} from "./notifications.service";
import {NotificationsInterceptor} from "./notifications.interceptor";

const NOTIFICATION_MODULE_PROVIDERS = [
    NotificationsService,
    NotificationsInterceptor,
];

export {NOTIFICATION_MODULE_PROVIDERS};
