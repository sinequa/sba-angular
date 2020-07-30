import {Injectable, Inject, InjectionToken, Optional} from "@angular/core";
import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler,
    HttpEvent, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, of, from, throwError} from "rxjs";
import {map, switchMap, catchError} from "rxjs/operators";
import {Utils, SqError, SqErrorCode} from "@sinequa/core/base";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {NotificationsService} from "@sinequa/core/notification";
import {LoginService, LoginServiceProxy} from "./login.service";
import {AuthenticationService} from "./authentication.service";

export type HttpRequestInitializer = (request: HttpRequest<any>) => boolean;
export const HTTP_REQUEST_INITIALIZERS = new InjectionToken<HttpRequestInitializer[]>("HTTP_REQUEST_INITIALIZERS");

/**
 * An `HttpInterceptor` to handle `HTTP 401 unauthorized` error responses by calling
 * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles
 * the `sinequa-jwt-refresh` header set when auto refreshing of JWT is configured in
 * the Sinequa administration console.
 */
@Injectable({
    providedIn: "root"
})
export class LoginInterceptor implements HttpInterceptor {
    constructor(
        @Inject(START_CONFIG) private startConfig: StartConfig,
        @Optional() @Inject(HTTP_REQUEST_INITIALIZERS) private requestInitializers: HttpRequestInitializer[],
        private loginServiceProxy: LoginServiceProxy,
        private notificationsService: NotificationsService) {
    }

    private get loginService(): LoginService {
        return this.loginServiceProxy.loginService;
    }

    private get authenticationService(): AuthenticationService {
        return this.loginService.authenticationService;
    }

    private processRequestInitializers(request: HttpRequest<any>) {
        if (this.requestInitializers) {
            for (const requestInitializer of this.requestInitializers) {
                if (!requestInitializer(request)) {
                    break;
                }
            }
        }
    }

    private isJsonable(obj): boolean {
        return (Utils.isObject(obj) || Utils.isArray(obj)) && !Utils.isArrayBuffer(obj) && !Utils.isBlob(obj) &&
            !Utils.isString(obj) && !(obj instanceof HttpParams);
    }

    private shouldIntercept(url: string): boolean {
        /*tslint:disable-next-line*/
        return Utils.startsWith(url, this.startConfig.apiPath!);
    }

    private notifyError(error: any) {
        let message;
        const title = "msg#error.serverError";
        if (error instanceof HttpErrorResponse) {
            const response = error;
            try {
                let data = response.error;
                if (Utils.isString(data)) {
                    try {
                        data = JSON.parse(data);
                    }
                    catch (exception) {
                    }
                }
                if (data && data.errorMessage) {
                    message = data.errorMessage;
                    if (data.errorCodeText) {
                        message = `${message} (${data.errorCodeText})`;
                    }
                    else if (data.errorCode) {
                        message = `${message} (${data.errorCode})`;
                    }
                }
            }
            catch (exception) {
            }
            if (!message) {
                if (response.status === 200) {
                    message = "msg#error.responseLoadFailure";
                }
                else if (response.statusText) {
                    message = `${response.statusText} (${response.status})`;
                }
                else {
                    message = `HTTP error: ${response.status}`;
                }
            }
        }
        else if (SqError.is(error)) {
            message = error.message;
        }
        else {
            message = (error + "") || "msg#error.unknownError";
        }
        this.notificationsService.error(message, undefined, title);
    }

    private getCredentials(response: HttpErrorResponse, acceptCurrent: boolean): Promise<void> {
        return this.loginService.getCredentials(response, acceptCurrent)
            .catch((error) => {
                if (SqError.is(error, SqErrorCode.processedCredentialsError)) {
                    return this.getCredentials(response, acceptCurrent);
                }
                throw error;
            });
    }

    /**
     * Handles `HTTP 401 unauthorized errors responses by calling
     * [LoginService.getCredentials]{@link LoginService#getCredentials}. It also handles auto
     * refreshing of JWT by processing the `sinequa-jwt-refresh` header. The JWT cookie itself
     * is updated by a `Set-Cookie` header in the response. There are a number of flags that
     * can be set in the request parameters which will be removed before the request is actually
     * sent:
     * * `noAutoAuthentication` - set to bypass the `HTTP 401` handling
     * * `noUserOverride` - set to not add the current user override to the request
     * * `noNotify` - set to not notify errors using the {@link NotificationService}
     *
     * @param request The intercepted request
     * @param next The next interceptor in the chain
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.shouldIntercept(request.url) || request.params.has("noIntercept")) {
            return next.handle(request);
        }
        const observableRequest = of(request);
        let noAutoAuthentication = false;
        let noUserOverride = false;
        let noNotify = false;
        let hadCredentials = false;
        let userOverrideActive = false;
        return observableRequest
            .pipe(switchMap(request1 => {
                const config = {headers: request1.headers, params: request1.params};
                noAutoAuthentication = Utils.isTrue(config.params.get("noAutoAuthentication"));
                config.params = config.params.delete("noAutoAuthentication");
                noUserOverride = Utils.isTrue(config.params.get("noUserOverride"));
                config.params = config.params.delete("noUserOverride");
                noNotify = Utils.isTrue(config.params.get("noNotify"));
                config.params = config.params.delete("noNotify");
                hadCredentials = this.authenticationService.haveCredentials;
                this.authenticationService.addAuthentication(config);
                if (this.authenticationService.userOverrideActive && !noUserOverride) {
                    userOverrideActive = true;
                    this.authenticationService.addUserOverride(config);
                }
                else {
                    userOverrideActive = false;
                }
                config.headers = config.headers.set("sinequa-force-camel-case", "true");
                if (this.isJsonable(request1.body)) {
                    this.processRequestInitializers(request1);
                }
                const updatedRequest = request1.clone({
                    headers: config.headers,
                    params: config.params,
                    body: request1.body,
                    withCredentials: true
                });
                this.notificationsService.enter("network");
                return next.handle(updatedRequest)
                    .pipe(map((event, index) => {
                        if (event instanceof HttpResponse) {
                            this.notificationsService.leave("network");
                            this.authenticationService.updateAuthentication(event);
                        }
                        return event;
                    }));
            }),
            catchError((error, caught) => {
                this.notificationsService.leave("network");
                if (error.status === 401 && !noAutoAuthentication) {
                    if (userOverrideActive) {
                        if (this.authenticationService.userOverrideActive) {
                            this.authenticationService.deactivateUserOverride();
                            this.authenticationService.userOverrideFailed = true;
                            this.notificationsService.error("msg#error.userOverrideFailure");
                        }
                        return caught;
                    }
                    return from(this.getCredentials(error, !hadCredentials))
                        .pipe(switchMap(value => caught));
                }
                if (!noNotify) {
                    this.notifyError(error);
                }
                return throwError(error);
            }));
   }
}
