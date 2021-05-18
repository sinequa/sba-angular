import {Injectable, Inject, InjectionToken, Optional} from "@angular/core";
import {
    HttpInterceptor, HttpRequest, HttpHandler,
    HttpEvent, HttpErrorResponse, HttpParams, HttpResponse
} from "@angular/common/http";
import {from, Observable, throwError} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {Utils, SqError, SqErrorCode} from "@sinequa/core/base";
import {START_CONFIG, StartConfig} from "@sinequa/core/web-services";
import {NotificationsService} from "@sinequa/core/notification";
import {LoginService} from "./login.service";
import {AuthenticationService} from "./authentication.service";

export type HttpRequestInitializer = (request: HttpRequest<any>) => boolean;
export const HTTP_REQUEST_INITIALIZERS = new InjectionToken<HttpRequestInitializer[]>("HTTP_REQUEST_INITIALIZERS");

type Options = {noAutoAuthentication: boolean, noUserOverride: boolean, hadCredentials: boolean, userOverrideActive: boolean};

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
        private notificationsService: NotificationsService,
        private loginService: LoginService,
        private authService: AuthenticationService) {}

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

        let config = {headers: request.headers, params: request.params};

        const options: Options = {
            noAutoAuthentication: Utils.isTrue(config.params.get("noAutoAuthentication")) || false,
            noUserOverride: Utils.isTrue(config.params.get("noUserOverride")) || false,
            hadCredentials: this.authService.haveCredentials,
            userOverrideActive: false
        }

        const noNotify = Utils.isTrue(config.params.get("noNotify")) || false;

        config.params = config.params.delete("noAutoAuthentication");
        config.params = config.params.delete("noUserOverride");
        config.params = config.params.delete("noNotify");

        config = this.authService.addAuthentication(config);

        if (this.authService.userOverrideActive && !options.noUserOverride) {
            options.userOverrideActive = true;
            config.headers = this.authService.addUserOverride(config);
        }

        config.headers = config.headers.set("sinequa-force-camel-case", "true");

        if (this.isJsonable(request.body)) {
            this.processRequestInitializers(request);
        }

        this.notificationsService.enter("network");
        
        const _request = request.clone({
            headers: config.headers,
            params: config.params,
            body: request.body,
            withCredentials: true
        });

        return next.handle(_request).pipe(
            catchError((error, caught) => {
                this.notificationsService.leave("network");
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401: {
                            return this.handle401Error(error, _request, next, options, caught);
                        }
                    }
                }
                if (!noNotify) {
                    this.notifyError(error);
                }
                return throwError(error);
            }),
            map((event) => {
                if (event instanceof HttpResponse) {
                    this.notificationsService.leave("network");
                    this.authService.updateAuthentication(event);
                }
                return event;
            })
        );
    }

    private handle401Error(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler, options: Options, caught: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
        if (!options.noAutoAuthentication) {
            if (options.userOverrideActive) {
                if (this.authService.userOverrideActive) {
                    this.authService.deactivateUserOverride();
                    this.authService.userOverrideFailed = true;
                    this.notificationsService.error("msg#error.userOverrideFailure");
                }
                return throwError(err);
            }

            return from(this.getCredentials(err, !options.hadCredentials))
                .pipe(
                    switchMap(value => {
                        const {headers} = this.authService.addAuthentication(req);
                        return next.handle(req.clone({headers}));
                    }),
                    catchError(err => 
                        // in case of an Http error, 'caught' must be returned to be catched by the interceptor
                        err instanceof HttpErrorResponse ? caught : throwError(err)
                    ));
        }

        return throwError(err);
    }
}
