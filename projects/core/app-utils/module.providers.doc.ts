import {AppService} from "./app.service";
import {AuditInterceptor} from "./audit.interceptor";
import {FormatService} from "./format.service";

const APP_UTILS_MODULE_PROVIDERS = [
    AppService,
    AuditInterceptor,
    FormatService,
];

export {APP_UTILS_MODULE_PROVIDERS};
