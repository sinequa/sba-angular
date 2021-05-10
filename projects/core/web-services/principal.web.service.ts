import {Injectable, Inject, OnDestroy} from "@angular/core";
import {Subject, Observable} from "rxjs";
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
