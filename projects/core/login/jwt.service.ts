import {Injectable, Inject} from "@angular/core";
import {START_CONFIG, StartConfig, SqHttpClient, HttpService} from "@sinequa/core/web-services";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Credentials} from "./authentication.service";

/**
 * A service to retrieve a JWT (JSON Web Token) from the Sinequa server.
 */
@Injectable({
    providedIn: "root"
})
export class JWTService extends HttpService {

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

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
            map((value) => {
                return value.csrfToken;
            }));
    }
}
