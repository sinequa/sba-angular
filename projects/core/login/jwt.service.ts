import {Injectable} from "@angular/core";
import { Observable, map } from "rxjs";

import {HttpService} from "@sinequa/core/web-services";
import { Credentials } from "./typings";

/**
 * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
 */
@Injectable({
    providedIn: "root"
})
export class JWTService extends HttpService {

    /**
     * Get a JWT from the Sinequa server using the passed credentials. The JWT is received in a cookie
     * and the associated CSRF token in the response payload.
     *
     * @param credentials The credentials to be used for the JWT. These are sent in clear text
     */
    getToken(credentials: Credentials): Observable<string> {
        const observable = this.httpClient.post<{csrfToken: string}>(this.makeUrl("webToken"),
            {
                action: "get",
                user: credentials.userName,
                password: credentials.password,
                tokenInCookie: true,
            },
            {
                params: this.makeParams({
                    noUserOverride: true,
                    noAutoAuthentication: true
                })
            });
        return observable.pipe(
            map((value) => value.csrfToken));
    }
}
