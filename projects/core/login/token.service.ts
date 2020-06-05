import {Injectable, Inject} from "@angular/core";
import {START_CONFIG, StartConfig, SqHttpClient, HttpService} from "@sinequa/core/web-services";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

/**
 * A service to manage JWT and CSRF tokens. The methods of this service
 * can be called before the authentication process has completed
 */
@Injectable({
    providedIn: "root"
})
export class TokenService extends HttpService {

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    /**
     * Retrieve the CSRF token corresponding to the current JWT cookie
     * which should accompany the request. This method is called by
     * [AuthenticationService.autoAuthenticate]{@link AuthenticationService#autoAuthenticate}
     *
     * @param notify `true` if any errors should be notified using the {@NotificationService}
     */
    getCsrfToken(notify = false): Observable<string> {
        const observable = this.httpClient.get<{csrfToken: string}>(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "getCsrfToken",
                suppressErrors: !notify,
                noUserOverride: true,
                noAutoAuthentication: true,
                noNotify: !notify
            })
        });
        return observable.pipe(
            map((value) => {
                return value.csrfToken;
            }));
    }

    /**
     * Delete the current JWT cookie.
     * This method is called by [AuthenticationService.logout]{@link AuthenticationService#logout}
     */
    deleteWebTokenCookie(): Observable<void> {
        return this.httpClient.get<void>(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "deleteWebTokenCookie",
                noUserOverride: true,
                noAutoAuthentication: true
            })
        });
    }
}
