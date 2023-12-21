import {Injectable, Inject, InjectionToken, Optional} from "@angular/core";
import {
    HttpInterceptor, HttpRequest, HttpHandler,
    HttpEvent, HttpErrorResponse, HttpParams, HttpResponse, HttpHeaders
} from "@angular/common/http";
import {from, Observable, throwError, catchError, map, switchMap, timer, tap} from "rxjs";
import {Utils, SqError, SqErrorCode} from "@sinequa/core/base";
import {IntlService} from "@sinequa/core/intl";
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

    scheduledRetry: Observable<0> | undefined;

    constructor(
        @Inject(START_CONFIG) protected startConfig: StartConfig,
        @Optional() @Inject(HTTP_REQUEST_INITIALIZERS) protected requestInitializers: HttpRequestInitializer[],
        protected notificationsService: NotificationsService,
        protected loginService: LoginService,
        protected authService: AuthenticationService,
        protected intlService: IntlService
    ) {}

    protected processRequestInitializers(request: HttpRequest<any>) {
        if (this.requestInitializers) {
            for (const requestInitializer of this.requestInitializers) {
                if (!requestInitializer(request)) {
                    break;
                }
            }
        }
    }

    protected isJsonable(obj): boolean {
        return (Utils.isObject(obj) || Array.isArray(obj)) && !Utils.isArrayBuffer(obj) && !Utils.isBlob(obj) &&
            !Utils.isString(obj) && !(obj instanceof HttpParams);
    }

    protected shouldIntercept(url: string): boolean {
        const apiV1 = this.startConfig.apiPath || "/api/v1";
        const apiV2 = apiV1.replace('/api/v1', '/api/v2');
        const endpointsV1 = apiV1.replace('/api/v1', '/endpoints/v1');
        return [apiV1, apiV2, endpointsV1].some(
          (api) => Utils.startsWith(url, api)
        )
    }

    protected notifyError(error: any) {
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

    protected getCredentials(response: HttpErrorResponse, acceptCurrent: boolean): Promise<void> {
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

        const config = {headers: request.headers, params: request.params};

        const options: Options = {
            noAutoAuthentication: Utils.isTrue(config.params.get("noAutoAuthentication")),
            noUserOverride: Utils.isTrue(config.params.get("noUserOverride")),
            hadCredentials: this.authService.haveCredentials,
            userOverrideActive: false
        }

        const noNotify = Utils.isTrue(config.params.get("noNotify"));

        config.params = config.params.delete("noAutoAuthentication");
        config.params = config.params.delete("noUserOverride");
        config.params = config.params.delete("noNotify");

        if (this.authService.userOverrideActive && !options.noUserOverride) {
            options.userOverrideActive = true;
            config.headers = this.authService.addUserOverride(config);
        }

        config.headers = config.headers.set("sinequa-force-camel-case", "true");

        // send user language
        config.headers = config.headers.set("x-language", this.intlService.currentLocale.name);
        const [key, value] = ["ui-language", this.intlService.currentLocale.name];

        if (this.isJsonable(request.body)) {
            Object.assign(request.body, { [key]: value });
            this.processRequestInitializers(request);
        } else {
            config.params = config.params.set(key,value);
        }

        this.notificationsService.enter("network");

        return from(this.authService.addAuthentication(config)).pipe(
            switchMap(cfg => this.handleRequest(request, cfg, next, options, noNotify))
        );

    }

    protected handleRequest(request: HttpRequest<any>, config: {headers: HttpHeaders, params: HttpParams}, next: HttpHandler, options: Options, noNotify: boolean) {
        const _request = request.clone({
            headers: config.headers,
            params: config.params,
            body: request.body,
            withCredentials: true
        });

        return next.handle(_request).pipe(
            catchError((error, caught) => this.handleError(error, caught, _request, next, options, noNotify)),
            map((event) => {
                if (event instanceof HttpResponse) {
                    this.notificationsService.leave("network");
                    this.authService.updateAuthentication(event);
                }
                return event;
            })
        );
    }

    protected handleError(error: any, caught: Observable<HttpEvent<any>>, request: HttpRequest<any>, next: HttpHandler, options: Options, noNotify: boolean, delay = 5000) {
      this.notificationsService.leave("network");
      if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
              return this.handle401Error(error, request, next, options, caught);
          }
          if (error.status === 0 || error.status === 503 || error.status === 504) { // 503: Service unavailable, 504: Gateway timeout
              return this.handleNetworkError(request, next, options, noNotify, delay);
          }
      }
      if (!noNotify) {
          this.notifyError(error);
      }
      return throwError(() => error)
    }

    protected handle401Error(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler, options: Options, caught: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
        if (!options.noAutoAuthentication) {
          if (options.userOverrideActive) {
            if (this.authService.userOverrideActive) {
              this.authService.deactivateUserOverride();
              this.authService.userOverrideFailed = true;
              this.notificationsService.error("msg#error.userOverrideFailure");
            }
            return throwError(() => err);
          }

          return from(this.getCredentials(err, !options.hadCredentials)).pipe(
            switchMap(() => this.authService.addAuthentication(req)),
            switchMap(config => next.handle(req.clone({ headers: config.headers }))),
            catchError((error) => throwError(() => error))
          );
        }

        return throwError(() => err);
    }

    protected handleNetworkError(request: HttpRequest<any>, next: HttpHandler, options: Options, noNotify: boolean, delay: number): Observable<HttpEvent<any>> {
        if(!this.scheduledRetry) {
            const prettyDelay = this.intlService.formatRelativeTime(delay);
            const notif = this.notificationsService.warning("msg#login.retry", {prettyDelay});
            this.scheduledRetry = timer(delay).pipe(
              tap(() => this.notificationsService.deleteNotification(notif)),
              tap(() => this.scheduledRetry = undefined)
            );
        }
        return this.scheduledRetry.pipe(
            tap(() => this.notificationsService.enter("network")),
            switchMap(() => next.handle(request)),
            catchError((error,caught) => this.handleError(error, caught, request, next, options, noNotify, delay * 2))
        )
    }
}
