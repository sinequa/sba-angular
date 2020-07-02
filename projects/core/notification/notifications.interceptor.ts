import {Injectable, Inject} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {Utils} from "@sinequa/core/base";
import {NotificationsService, Notification, NotificationType} from "./notifications.service";

/**
 * An `HttpInterceptor` to process notifications attached to the response body
 * in the `$notifications` member.
 */
@Injectable({
    providedIn: "root"
})
export class NotificationsInterceptor implements HttpInterceptor {
    constructor(
        @Inject(START_CONFIG) private startConfig: StartConfig,
        private notificationsService: NotificationsService) {
    }

    protected shouldIntercept(url: string): boolean {
        /*tslint:disable-next-line*/
        return Utils.startsWith(url, this.startConfig.apiPath!);
    }

    protected processNotifications(notifications: Notification[] | undefined) {
        if (Utils.isArray(notifications)) {
            for (const notification of notifications) {
                let  type = notification.type;
                if (Utils.isUndefined(type)) {
                    type = NotificationType.Info;
                }
                const text = notification.text;
                if (text) {
                    const params = notification.params;
                    const title = notification.title;
                    let autoClose = notification.autoClose;
                    if (Utils.isUndefined(autoClose)) {
                        autoClose = (type === NotificationType.Success) || (type === NotificationType.Info);
                    }
                    this.notificationsService.notify(type, text, params, title, autoClose);
                }
            }
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.shouldIntercept(request.url)) {
            return next.handle(request);
        }
        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (request.responseType === "json" && Utils.isObject(event.body)) {
                        this.processNotifications(event.body.$notifications);
                    }
                }
            }));
   }
}
