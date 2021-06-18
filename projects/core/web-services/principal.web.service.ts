import {Injectable, Inject, OnDestroy} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {pluck} from "rxjs/operators";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils} from "@sinequa/core/base";

/**
 * Describes a Sinequa princpal
 */
export interface Principal {
    id: string;
    id2: string;
    id3: string;
    id4: string;
    id5: string;
    name: string;
    email: string;
    description: string;
    longName: string;
    userId: string;
    fullName: string;
    isAdministrator: boolean;
    isDelegatedAdmin: boolean;
    param1: string;
    param2: string;
    param3: string;
    param4: string;
    param5: string;
    param6: string;
    param7: string;
    param8: string;
    param9: string;
    param10: string;
}

export interface PrincipalUserInfo {
    id: string;
    userId: string;
    name: string;
    fullName: string;
    longName: string;
    email: string;
    isUser: string;
    isGroup: string;
}

export interface PrincipalParams {
    offset?: number;    // 0
    limit?: number;     // 10
    isUser?: boolean;   // true
    isGroup?: boolean;  // true
    search?: string;    // search by name, fullname or email

}

export interface PrincipalUserIdsParams {
    offset?: number;    // 0
    limit?: number;     // 10
    userIds: string[];
}

/**
 * A base event from which all events that can be issued by the {@link PrincipalWebService} are derived
 */
export interface PrincipalEvent {
    type: "changed";
}

/**
 * This event is fired each time the [principal]{@link PrincipalWebService#principal} member is modified.
 * Typically this will be at login / logoff and also if the "override user" admin feature is used.
 */
export interface PrincipalChangedEvent extends PrincipalEvent {
    type: "changed";
}

/**
 * A service for calling the principal web service
 */
@Injectable({
    providedIn: "root"
})
export class PrincipalWebService extends HttpService implements OnDestroy {
    private _principal: Principal | undefined;
    private _events = new Subject<PrincipalChangedEvent>();

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    ngOnDestroy() {
        this._events.complete();
    }

    /**
     * The observable events emitted by this service
     */
    get events(): Observable<PrincipalChangedEvent> {
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
        return this.httpClient.post<Partial<PrincipalUserInfo>>(this.makeUrl("principal/userids"), params).pipe(
            pluck("principals")
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
     */
    load(): Observable<Principal> {
        const observable = this.get();
        Utils.subscribe(observable,
            (response) => {
                this.principal = response;
                return response;
            },
            (error) => {
                console.log("principalService.get failure - error: ", error);
            });
        return observable;
    }
}
