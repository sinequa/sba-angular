import {Injectable} from "@angular/core";
import {HttpHeaders, HttpParams, HttpResponse, HttpErrorResponse} from "@angular/common/http";
import {Observable, of, throwError, Subject, firstValueFrom, map, catchError, take} from "rxjs";
import { authentication } from "@microsoft/teams-js";

import {HttpService, AuditWebService} from "@sinequa/core/web-services";
import { Utils, IRef } from "@sinequa/core/base";

import {TokenService} from "./token.service";
import {JWTService} from "./jwt.service";
import { Authentication, Credentials, LEGACY_PROCESSED_CREDENTIALS_KIND, ProcessedCredentials, UserOverride } from "./typings";

/**
 * A service to authenticate a user with a Sinequa server. Authentication can be automatic (OAuth/SAML), if configured in the
 * Sinequa administration, or manual where the user name and password are entered in a modal dialog box and transmitted in
 * clear text. There is also support for the ng2-ui-auth library where the authentication process occurs in a browser popup window.
 * Successful authentication results in a JWT stored in cookie along with a CSRF token which is stored in storage so it can
 * be picked up in other browser tabs.
 *
 * The service also holds information on the status of the "override user" administrator function
 */
@Injectable({
    providedIn: "root"
})
export class AuthenticationService extends HttpService {
    private authentication: Authentication | undefined;
    private storage: Storage;
    private redirect$ = new Subject<string>();
    /**
     * A flag indicating whether an attempt to "override user" has failed. This is normally
     * only set by the {@link HttpInterceptor} and tested and reset in {@link LoginService}
     */
    userOverrideFailed: boolean;

    isTeams?: boolean;

    constructor(
        private tokenService: TokenService,
        private auditService: AuditWebService,
        private jWTService: JWTService) {
        super();
        this.init();
    }

    private _userOverride: UserOverride | undefined;
    /**
     * Get the currrent user override, if any
     */
    get userOverride(): UserOverride | undefined {
        return this._userOverride;
    }

    /**
     * Set/unset the user override. The {@link #userOverrideActive} flag
     * is set accordingly
     */
    set userOverride(value: UserOverride | undefined) {
        this._userOverride = value;
        if (this._userOverride) {
            this._userOverrideActive = !!this._userOverride.userName && !!this._userOverride.domain;
        }
        else {
            this._userOverrideActive = false;
        }
    }

    private _userOverrideActive: boolean;

    /**
     * A flag indicating whether the current user override is active
     */
    get userOverrideActive(): boolean {
        return this._userOverrideActive;
    }

    private _processedCredentials: ProcessedCredentials | undefined;
    private _processedCredentialsStr: string | undefined;

    /**
     * Get the current processed credentials
     */
    get processedCredentials(): ProcessedCredentials | undefined {
        return this._processedCredentials;
    }

    /**
     * Set the current processed credentials. A stringified version
     * is stored in either local or session storage
     */
    set processedCredentials(value: ProcessedCredentials | undefined) {
        this._processedCredentials = value;
        if (value) {
            const newProcessedCredentialsStr = Utils.toJson(this._processedCredentials);
            if (this._processedCredentialsStr !== newProcessedCredentialsStr) {
                this._processedCredentialsStr = newProcessedCredentialsStr;
                this.storage.setItem("sinequa-credentials", this._processedCredentialsStr);
            }
        }
        else {
            if (this._processedCredentialsStr) {
                this._processedCredentialsStr = undefined;
                this.storage.removeItem("sinequa-credentials");
            }
        }
    }

    /**
     * Returns `true` if an OAuth or SAML auto provider is configured
     */
    get autoLoginActive(): boolean {
        return !!this.startConfig.autoOAuthProvider || !!this.startConfig.autoSAMLProvider;
    }

    /**
     * Deactivate the current user override
     */
    deactivateUserOverride() {
        this._userOverrideActive = false;
    }

    private loadCredentials() {
        const sinequaCredentials = this.storage.getItem("sinequa-credentials");
        this._processedCredentialsStr = sinequaCredentials ? sinequaCredentials : undefined;
        this._processedCredentials = this._processedCredentialsStr ? Utils.fromJson(this._processedCredentialsStr) : null;
    }

    private saveCredentials(value: ProcessedCredentials) {
        this.processedCredentials = value;
    }

    private init() {
        // To avoid multipe redirection when multiple HTTP 401 error occurs
        this.redirect$.pipe(take(1)).subscribe(url => window.location.replace(url));
        if (this.startConfig.authenticationStorage === "local") {
            this.storage = window.localStorage;
        }
        else {
            this.storage = window.sessionStorage;
        }
        this.loadCredentials();
        window.addEventListener('storage', (event: StorageEvent) => {
            if (event.storageArea === this.storage) {
                if (!event.key) { // clear
                    this.processedCredentials = undefined;
                }
                else if (event.key === "sinequa-credentials") {
                    if (event.newValue !== this._processedCredentialsStr) {
                        this.loadCredentials();
                    }
                }
            }
        });
    }

    /**
     * Return `true` if `processedCredentials` exists
     */
    get haveCredentials(): boolean {
        return !!this.processedCredentials;
    }

    /**
     * Add the current authentication information to the passed `HttpHeaders` and `HttpParams`.
     * Currently, this adds the `sinequa-csrf-token` value to the HTTP headers. Called from
     * {@link HttpInterceptor}
     *
     * @param config HttpHeaders and HttpParams to be updated
     *
     * @returns new configuration
     */
    addAuthentication(config: {headers: HttpHeaders, params: HttpParams}): Promise<{headers: HttpHeaders, params: HttpParams}> {
        this.doAuthentication();
        if (this.authentication) {
            if (this.authentication.headers) {
                for (const header in this.authentication.headers) {
                    if (this.authentication.headers.hasOwnProperty(header)) {
                        config.headers = config.headers.set(header, this.authentication.headers[header]);
                    }
                }
            }
            if (this.authentication.params) {
                for (const param in this.authentication.params) {
                    if (this.authentication.params.hasOwnProperty(param)) {
                        config.params = config.params.set(param, this.authentication.params[param]);
                    }
                }
            }
        }
        if(this.isTeams) {
            return authentication.getAuthToken().then(
                token => {
                    config.headers = config.headers.set("teams-token", token);
                    return config
                },
                error => {
                    console.error("Could not get a token from MS Teams. Proceeding without it...", error);
                    return config;
                }
            );
        }
        return Promise.resolve(config);
    }

    /**
     * Update the current authentication information with information in the passed `response`.
     * This processes the `sinequa-jwt-refresh` header which will contain an updated CSRF token
     * to correspond to the new JWT cookie. Called from {@link HttpInterceptor}
     *
     * @param response An `HttpResponse`
     */
    updateAuthentication(response: HttpResponse<any>) {
        const csrfToken = response.headers.get("sinequa-jwt-refresh");
        if (csrfToken) {
            if (this.processedCredentials) {
                if (this.processedCredentials.data.csrfToken !== csrfToken) {
                    this.processedCredentials.data.csrfToken = csrfToken;
                    this.saveCredentials(this.processedCredentials);
                }
            }
            else {
                this.setCsrfToken(csrfToken);
            }
        }
    }

    private refreshAuthentication() {
        if (this.processedCredentials) {
            if (!this.authentication) {
                this.authentication = {
                    csrfToken: this.processedCredentials.data.csrfToken
                };
            }
            else {
                this.authentication.csrfToken = this.processedCredentials.data.csrfToken;
            }
        }
        else {
            this.authentication = undefined;
        }
    }

    private doAuthentication() {
        this.refreshAuthentication();
        if (this.authentication && this.authentication.csrfToken) {
            this.authentication.headers = {
                "sinequa-csrf-token": this.authentication.csrfToken
            };
        }
    }

    private getAuthenticateHeader(regex: RegExp, authenticationHeaders: string[], header: IRef<string>): boolean {
        if (authenticationHeaders) {
            for (let i = 0, ic = authenticationHeaders.length; i < ic; i++) {
                const authenticationHeader = authenticationHeaders[i];
                const matches = regex.exec(authenticationHeader);
                if (matches && matches.length > 0) {
                    const prefix = matches[0];
                    header.value = authenticationHeader.slice(prefix.length);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Authenticate with the Sinequa server using the passed credentials. The credentials are sent
     * in clear text. Prior to the authentication the passed `response` is checked for a
     * `WWW-Authenticate: Bearer` header.
     *
     * @param credentials The credentials to authenticate with
     * @param response The error response the reception of which initiated the call to this method
     */
    authenticate(
        credentials: Credentials,
        response: HttpErrorResponse): Promise<ProcessedCredentials | undefined> {
        const wwwAuthenticate = response.headers.get("WWW-Authenticate");
        if (!wwwAuthenticate) {
            console.error("Missing WWW-Authenticate header");
            return Promise.resolve(undefined);
        }
        const authenticateHeaders = wwwAuthenticate.split(", ");
        const header: IRef<string> = {value: ""};
        if (!this.getAuthenticateHeader(/^Bearer ?/, authenticateHeaders, header)) {
            console.error("Unexpected WWW-Authenticate header");
            return Promise.resolve(undefined);
        }
        return firstValueFrom(this.jWTService.getToken(credentials))
            .then((value) => ({
                    kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
                    userName: credentials.userName,
                    data: {
                        csrfToken: value,
                        provider: "Sinequa"
                    }
                }));
    }

    /**
     * Remove all current authentication data. The JWT cookie
     * is removed
     */
    logout() {
        this.auditService.notifyLogout().subscribe(
            _ => {
                this.tokenService.deleteWebTokenCookie().subscribe()
                this.authentication = undefined;
                this.processedCredentials = undefined;
            }
        );
    }

    /**
     * Add the current user override information to the passed headers.
     *
     * @param config An object containing the `HttpHeaders` to update
     */
    addUserOverride(config: {headers: HttpHeaders}): HttpHeaders {
        if (this.userOverride && this.userOverrideActive) {
            config.headers = config.headers.set("sinequa-override-user", this.userOverride.userName);
            config.headers = config.headers.set("sinequa-override-domain", this.userOverride.domain);
        }

        return config.headers;
    }


    private setCsrfToken(csrfToken: string, provider = "Sinequa"): boolean {
        if (!csrfToken) {
            return false;
        }
        this.processedCredentials = {
            kind: LEGACY_PROCESSED_CREDENTIALS_KIND,
            data: {
                csrfToken,
                provider
            }
        };
        return true;
    }

    private initiateAutoAuthentication(): boolean {
        if (!this.startConfig.usePopupForLogin && this.autoLoginActive) {
            let observable: Observable<{redirectUrl: string}>;
            if (this.startConfig.autoOAuthProvider) {
                observable = this.httpClient.post<{redirectUrl: string}>(this.makeUrl("security.oauth"),
                    {
                        action: "getcode",
                        provider: this.startConfig.autoOAuthProvider,
                        tokenInCookie: true,
                        originalUrl: window.location.href
                    },
                    {
                        params: this.makeParams({
                            noUserOverride: true,
                            noAutoAuthentication: true
                        })
                    });
            }
            else {
                observable = this.httpClient.post<{redirectUrl: string}>(this.makeUrl("security.saml"),
                    {
                        action: "getresponse",
                        provider: this.startConfig.autoSAMLProvider,
                        tokenInCookie: true,
                        originalUrl: window.location.href,
                    },
                    {
                        params: this.makeParams({
                            noUserOverride: true,
                            noAutoAuthentication: true
                        })
                    });
            }
            observable.subscribe((response) => this.redirect$.next(response.redirectUrl));
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * Initiate the auto-authentication process if an automatic OAuth or SAML provider is configured.
     * The {@LoginService} calls this method at startup. First, an attempt is made to retrieve a CSRF token.
     * If that works, then the token is set and authentication is complete. Otherwise, the initial OAuth or SAML
     * call is made to the Sinequa server. The `redirectUrl` in the response to this call is then used to redirect
     * the browser to continue the normal OAuth/SAML autentication flow. A successful authentiction will culminate
     * in the SBA being loaded a second time, this method being called again and the attempt to retrieve a CSRF
     * token succeeding because a valid JWT cookie will now be present.
     *
     * A CSRF token is always requested to allow automatic login if a valid web token cookie has previously been
     * written via, for example, a login to the admin console.
     *
     * @returns An Observable of a boolean value which if `true` indicates that auto-authentication has been initiated.
     */
    autoAuthenticate(): Observable<boolean> {
        if(this.isTeams) { // If we are in Teams, requests are authenticated with the teams-token header: no need for a CSRF token
          return of(false);
        }
        return this.tokenService.getCsrfToken().pipe(
            map((csrfToken) => {
                // Token can be empty as getCsrfToken suppresses application errors (no cookie or cookie invalid)
                // (We do this to avoid having errors in the console for normal situations.)
                if (csrfToken) {
                    this.setCsrfToken(csrfToken);
                    return false;
                }
                else {
                    this.initiateAutoAuthentication();
                    return true;
                }
            }),
            catchError((error) => {
                // We should rarely have an error now as getCsrfToken
                // suppresses the application-level ones
                if (this.initiateAutoAuthentication()) {
                    return throwError(() => error);
                }
                // Swallow the error and continue with non-auto login process
                return of(false);
            }));
    }
}
