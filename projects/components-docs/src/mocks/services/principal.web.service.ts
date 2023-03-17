import { Injectable, OnDestroy } from "@angular/core";
import { Subject, Observable, map, of } from "rxjs";
import { Utils } from "@sinequa/core/base";
import { HttpService, Principal, PrincipalChangedEvent, PrincipalParams, PrincipalUserIdsParams, PrincipalUserInfo } from "@sinequa/core/web-services";
import { PRINCIPAL } from "../data/principal";

@Injectable({
    providedIn: "root"
})
export class MockPrincipalWebService extends HttpService implements OnDestroy {
    private _principal: Principal | undefined;
    private _events = new Subject<PrincipalChangedEvent>();

    ngOnDestroy() {
        this._events.complete();
    }

    get events(): Observable<PrincipalChangedEvent> {
        return this._events;
    }

    get principal(): Principal | undefined {
        return this._principal;
    }

    set principal(value: Principal | undefined) {
        this._principal = value;
        this._events.next({ type: "changed" });
    }

    list(params?: PrincipalParams): Observable<(PrincipalUserInfo | undefined)[]> {
        return this.httpClient.get<(PrincipalUserInfo | undefined)[]>(this.makeUrl("principal/list"), {
            params: this.makeParams({ ...params })
        });
    }

    userId(userId: string): Observable<Partial<PrincipalUserInfo>> {
        return this.httpClient.get<Partial<PrincipalUserInfo>>(this.makeUrl(`principal/userId/${userId}`));
    }

    userIds(params?: PrincipalUserIdsParams): Observable<Partial<PrincipalUserInfo[]>> {
        return this.httpClient.post<{ principals: Partial<PrincipalUserInfo[]> }>(this.makeUrl("principal/userids"), params).pipe(
            map(r => r.principals)
        );
    }

    get(autoAuthenticate = true): Observable<Principal> {
        return of(PRINCIPAL as any);
    }

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
