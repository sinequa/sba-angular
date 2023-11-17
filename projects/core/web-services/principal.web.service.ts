import { Observable, Subject, catchError, map, tap, throwError } from "rxjs";

import { Injectable, OnDestroy } from "@angular/core";

import { HttpService } from "./http.service";
import { Principal, PrincipalEvent, PrincipalParams, PrincipalUserIdsParams, PrincipalUserInfo } from "./types";


/**
 * A service for calling the principal web service
 */
@Injectable({
    providedIn: "root"
})
export class PrincipalWebService extends HttpService implements OnDestroy {
    private _principal: Principal | undefined;
    private _events = new Subject<PrincipalEvent>();

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * The observable events emitted by this service
     */
    get events(): Observable<PrincipalEvent> {
        return this._events;
    }

    /**
     * Gets the current {@link Principal}
     */
    get principal(): Principal | undefined {
        return this._principal;
    }

    /**
     * Sets the current {@link Principal} and issues the "changed" event
     */
    set principal(value: Principal | undefined) {
        this._principal = value;
        this._events.next({type: "changed"});
    }

    /**
     * Gets the list of user info (user or group)
     *
     * @param params query params to specify the search
     * @returns list of user info
     */
    list(params?: PrincipalParams): Observable<(PrincipalUserInfo | undefined)[]> {
        return this.httpClient.get<(PrincipalUserInfo | undefined)[]>(this.makeUrl("principal/list"), {
            params: this.makeParams({...params})
        });
    }

    userId(userId: string): Observable<Partial<PrincipalUserInfo>> {
        return this.httpClient.get<Partial<PrincipalUserInfo>>(this.makeUrl(`principal/userId/${userId}`));
    }

    userIds(params?: PrincipalUserIdsParams): Observable<Partial<PrincipalUserInfo[]>> {
        return this.httpClient.post<{principals: Partial<PrincipalUserInfo[]>}>(this.makeUrl("principal/userids"), params).pipe(
            map(r => r.principals)
        );
    }

    /**
     * Gets the principal from the server based on the current login credentials
     *
     * @param autoAuthenticate Determines whether the {@link HttpInterceptor} should perform HTTP 401 handling
     * for this request
     */
    get(autoAuthenticate = true): Observable<Principal> {
        return this.httpClient.get<Principal>(this.makeUrl("principal"), {
            params: this.makeParams({
                action: "get",
                noAutoAuthentication: !autoAuthenticate
            })
        });
    }

    /**
     * Gets the principal from the server based on the current login credentials and sets the
     * principal member
     *
     */
    load(): Observable<Principal> {
        return this.get().pipe(
            catchError(error => {
                console.log("principalService.get failure - error: ", error);
                return throwError(() => error);
            }),
            tap(principal => this.principal = principal)
        )
    }
}
