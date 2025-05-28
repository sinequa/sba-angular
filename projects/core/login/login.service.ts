import {Injectable, Inject, OnDestroy, Type, Optional} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, forkJoin, of, throwError, firstValueFrom, switchMap} from "rxjs";
import {Utils, SqError, SqErrorCode} from "@sinequa/core/base";
import {START_CONFIG, StartConfig, CCApp, PrincipalWebService, Principal,
    UserSettingsWebService, UserSettings, AuditWebService} from "@sinequa/core/web-services";
import {ModalService, ModalResult} from "@sinequa/core/modal";
import {NotificationsService} from "@sinequa/core/notification";
import {AppService} from "@sinequa/core/app-utils";
import {AuthenticationService} from "./authentication.service";
import { CREDENTIALS, Credentials, LoginData, MODAL_LOGIN, ProcessedCredentials, SessionEvent, UserOverride } from "./typings";


/**
 * A high-level service to manage user login
 */
@Injectable({
    providedIn: "root"
})
export class LoginService implements OnDestroy {
    /**
     * `true` if a user is currently logged in
     */
    complete: boolean;
    // getCredentials handling (concurrent calls)
    protected loginModalPromise: Promise<ModalResult> | undefined;
    protected processCredentialsPromise: Promise<ProcessedCredentials | undefined> | undefined;
    protected checkPrincipalPromise: Promise<Principal> | undefined;
    protected automaticLoginPromise: Promise<any> | undefined;
    protected _events = new BehaviorSubject<SessionEvent>({type: "session-changed"});

    constructor(
        @Inject(START_CONFIG) protected startConfig: StartConfig,
        @Inject(MODAL_LOGIN) protected loginModal: Type<any>,
        @Optional() @Inject(CREDENTIALS) protected credentials: Credentials|undefined,
        @Optional() protected router: Router,
        protected appService: AppService,
        protected principalService: PrincipalWebService,
        protected userSettingsService: UserSettingsWebService,
        protected modalService: ModalService,
        protected notificationsService: NotificationsService,
        protected authenticationService: AuthenticationService,
        protected auditService: AuditWebService
    ) {
        // NB unload doesn't fire reliably so we listen for beforeunload
        window.addEventListener("beforeunload", this.beforeUnloadEventListener);
    }

    protected beforeUnloadEventListener = (e: Event) => {
        this._events.next({type: "session-end"});
    }

    ngOnDestroy() {
        this._events.complete();
        window.removeEventListener("beforeunload", this.beforeUnloadEventListener);
    }

    /**
     * Get an `Observable` stream of {@link SessionEvent} events emitted by the service
     */
    get events(): Observable<SessionEvent> {
        return this._events;
    }

    /**
     * Get the currently logged in {@link Principal}, if any. Note that a principal can exist
     * without the login being complete. For example, in the situation where access is denied to
     * the selected app.
     */
    get principal(): Principal | undefined {
        return this.principalService.principal;
    }

    private setComplete() {
        const complete = this.complete;
        this.complete = !!this.appService.app && !!this.principalService.principal && !!this.userSettingsService.userSettings;
        if (this.complete) {
            if (!this.authenticationService.userOverrideFailed) {
                this.notificationsService.hideNotifications();
            }
            this.authenticationService.userOverrideFailed = false;
        }
        if (!!complete !== !!this.complete) {
            this._events.next({type: "session-changed"});
        }
    }

    /**
     * Perform a logout of the currently logged in user. [AppService.app]{@link AppService#app},
     * [PrincipalWebService.principal]{@link PrincipalWebService#prinicpal} and
     * [UserSettingsWebService.userSettings]{@link UserSettingsWebService#userSettings} are reset.
     * The `session-end` event is emitted
     */
    logout() {
        if (this.complete) {
            this._events.next({ type: "session-end" });
            this.appService.clear();
            this.principalService.principal = undefined;
            this.userSettingsService.userSettings = undefined;
            this.authenticationService.deactivateUserOverride();
            this.authenticationService.logout();
            this.setComplete();
            this._events.next({ type: "logout-complete" });
        }
    }

    /**
     * Override the current user to the user specified in `userOverride`. Only an administrator
     * is permitted to do this. They can revert to the normal login by calling this method with
     * `undefined`
     *
     * @param userOverride The user override
     */
    overrideUser(userOverride: UserOverride | undefined) {
        this.authenticationService.userOverride = userOverride;
        this.appService.clear();
        this.principalService.principal = undefined;
        this.userSettingsService.userSettings = undefined;

        this.complete = false;
        this.login();
    }

    private switchPrincipal(principal: Principal) {
        if (!principal.isAdministrator) {
            this.authenticationService.deactivateUserOverride();
        }
        this.principalService.principal = principal;
        this.userSettingsService.userSettings = undefined;
        Utils.delay().then(() => this.login());
    }

    /**
     * Initiate the user login process. The method attempts to retrieve
     * the [application configuration]{@link CCApp}, the
     * [logged in user]{@link Principal} and the [user settings]{@link UserSettings}.
     * If a user is not currently authenticated then authentication is performed using
     * the {@link AuthenticationService} - OAuth/SAML if configured on the Sinequa Server
     * or manual using a login modal dialog provided using the {@link MODAL_LOGIN} injection
     * token.
     */
    login(): Observable<LoginData> {
        const appName = this.appService.appName;
        if (!appName) {
            return throwError({error: "App not specified"});
        }
        let appNeeded: boolean;
        if (this.router) {
            const hash = window.location.hash.replace("#", "");
            const href = hash.split("?")[0];
            const params = new URLSearchParams(hash.split("?")[1]);
            const queryParams = {}
            params.forEach((v, k) => queryParams[k] = v);

            // Pick up any user override from the query string
            const overrideUser = queryParams["overrideUser"];
            const overrideDomain = queryParams["overrideDomain"];
            if (overrideUser) {
                this.authenticationService.userOverride = {
                    userName: overrideUser,
                    domain: overrideDomain
                };
                delete queryParams["overrideUser"];
                delete queryParams["overrideDomain"];
                const url = Utils.makeURL(href);
                this.router.navigate([url.pathname], {queryParams});
            }
        }

        const observable = this.authenticationService.autoAuthenticate()
            .pipe(switchMap(() => {
                let app: Observable<CCApp>;
                let userSettings: Observable<UserSettings>;
                let principal: Observable<Principal>;
                if (!this.appService.app || (appName && this.appService.app.name !== appName)) {
                    appNeeded = true;
                    app = this.appService.init();
                }
                else {
                    app = of(this.appService.app);
                }
                let loadUserSettings = false;
                if (!this.principalService.principal) {
                    loadUserSettings = true;
                    principal = this.principalService.load();
                }
                else {
                    principal = of(this.principalService.principal);
                }
                if (!this.userSettingsService.userSettings || loadUserSettings) {
                    userSettings = this.userSettingsService.load();
                }
                else {
                    userSettings = of(this.userSettingsService.userSettings);
                }
                return forkJoin({app, principal, userSettings});
            }));

        Utils.subscribe(observable,
            (result) => {
                console.log("loginService.login ok: ", result);
                // send an audit event about login success
                this.auditService.notifyLogin();
                this.setComplete();
                if (appNeeded) {
                    this._events.next({type: "session-start"});
                }
                this._events.next({ type: "login-complete" });
            },
            (error) => {
                console.log("loginService.login failed: ", error);
                this._events.next({ type: "login-failed" });
                // proceed to logout to clean process
                this.logout();
                return throwError(error);
            });
        return observable;
    }


    /**
     * Called by the {@link HttpInterceptor} on reception of an `HTTP 401` response.
     * This will either initiate an auto login process (OAuth/SAML) if configured on
     * the Sinequa server or display the login modal dialog to request user credentials
     *
     * @param response An `HTTP 401` response
     * @param acceptCurrent If `true` and the `AuthenticationService` currently has
     * processed credentials then use them instead of starting a new login
     * @returns A promise that is resolved when credentials have been obtained. Note that
     * when auto-authentication is configured the promise will be rejected and the browser
     * redirected to the OAuth/SAML redirect url
     */
    getCredentials(response: HttpErrorResponse, acceptCurrent: boolean): Promise<void> {
        if (acceptCurrent && this.authenticationService.processedCredentials) {
            return Promise.resolve(); // initiate retry
        }
        if (!this.startConfig.usePopupForLogin && this.authenticationService.autoLoginActive) {
            return this.authenticationService.autoAuthenticate().toPromise()
                .then(result => {
                    if (result/*auto-authentication initiated*/) {
                        return Promise.reject("performing auto login");
                    }
                    else {
                        return undefined;
                    }
                });
        }
        let firstCaller = false;
        const credentials: Credentials = {};
        if (this.authenticationService.processedCredentials) {
            credentials.userName = this.authenticationService.processedCredentials.userName;
        }
        if (!this.loginModalPromise) {
            if (this.credentials) {
                Object.assign(credentials, this.credentials);
                this.loginModalPromise = Promise.resolve(ModalResult.OK);
            }
            else {
                this.loginModalPromise = this.modalService.open(this.loginModal, {model: credentials});
            }
            firstCaller = true;
        }
        return this.loginModalPromise
            .then((result) => {
                this.loginModalPromise = undefined;
                // result === ModalResult.Yes is a special return from Login when using AuthenticationService.authenticateWithProvider
                if (result === ModalResult.OK || result === ModalResult.Yes) {
                    if (!this.processCredentialsPromise) {
                        this.processCredentialsPromise = result === ModalResult.Yes ?
                            Promise.resolve<ProcessedCredentials | undefined>(undefined) :
                            this.authenticationService.authenticate(credentials, response);
                    }
                    return this.processCredentialsPromise
                        .then((value) => {
                            this.processCredentialsPromise = undefined;
                            if (result !== ModalResult.Yes) {
                                this.authenticationService.processedCredentials = value;
                            }
                            if (!this.checkPrincipalPromise) {
                                this.checkPrincipalPromise = firstValueFrom(this.principalService.get(false));
                            }
                            return this.checkPrincipalPromise
                                .then((principal) => {
                                    this.checkPrincipalPromise = undefined;
                                    if (!this.principalService.principal || this.principalService.principal.id === principal.id) {
                                        // no current principal OR prinicpal unchanged - initiate retry
                                        return Promise.resolve();
                                    }
                                    const error = new SqError(SqErrorCode.principalSwitched);
                                    if (firstCaller) {
                                        this.switchPrincipal(principal);
                                        this.notificationsService.info(error.message);
                                    }
                                    throw error;
                                })
                                .catch((reason) => {
                                    this.checkPrincipalPromise = undefined;
                                    throw reason;
                                });
                        })
                        .catch((reason) => {
                            this.processCredentialsPromise = undefined;
                            if (SqError.is(reason, SqErrorCode.principalSwitched)) {
                                throw reason;
                            }
                            throw new SqError(SqErrorCode.processedCredentialsError);
                        });
                }
                else {
                    this.authenticationService.processedCredentials = undefined; // clean slate
                    const error = new SqError(SqErrorCode.loginCancelled);
                    if (firstCaller) {
                        this.notificationsService.info(error.message);
                    }
                    throw error;
                }
            })
            .catch((reason) => {
                if (!SqError.is(reason, SqErrorCode.principalSwitched)) {
                    this.authenticationService.processedCredentials = undefined; // clean slate
                }
                this.loginModalPromise = undefined;
                throw reason;
            });
    }
}
