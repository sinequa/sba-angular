import {Injectable} from "@angular/core";
import {HttpService} from "@sinequa/core/web-services";
import {Observable, map} from "rxjs";

/**
 * A service to manage JWT and CSRF tokens. The methods of this service
 * can be called before the authentication process has completed
 */
@Injectable({
    providedIn: "root"
})
export class TokenService extends HttpService {

    /**
     * Retrieve the CSRF token corresponding to the current JWT cookie
     * which should accompany the request. This method is called by
     * [AuthenticationService.autoAuthenticate]{@link AuthenticationService#autoAuthenticate}
     *
     * @param notify `true` if any errors should be notified using the {@NotificationService}
     */
    getCsrfToken(notify = false): Observable<string> {
        return this.httpClient.get<{csrfToken: string}>(this.makeUrl("challenge"), {
            params: this.makeParams({
                action: "getCsrfToken",
                suppressErrors: !notify,
                noUserOverride: true,
                noAutoAuthentication: true,
                noNotify: !notify
            })
        }).pipe(
            map((value) => value.csrfToken));
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
