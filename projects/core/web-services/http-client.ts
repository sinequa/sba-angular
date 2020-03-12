import {Injectable} from "@angular/core";
import {HttpClient, HttpRequest, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {share, tap} from "rxjs/operators";
import {Utils} from "@sinequa/core/base";

/**
 * A helper service that overrides the standard Angular [HttpClient]{@link https://angular.io/api/common/http/HttpClient}
 * to prevent multiple subscribers from causing multiple requests to be issued and to mitigate against request flooding
 */
@Injectable({
    providedIn: "root"
})
export class SqHttpClient extends HttpClient {

    private responseCache = new Map<string, Observable<any>>();

    constructor(
        httpHandler: HttpHandler) {
        super(httpHandler);
    }

    private getRequestHash(first: string | HttpRequest<any>, url?: string, options = {}): string {
        // The replacer ensures that object keys are always serialized in the same order
        const strRequest = JSON.stringify([first, url, options],
            (key: string, value: any) => {
                if (Utils.isObject(value) && !Utils.isIterable(value)) {
                    return Object.keys(value).sort().reduce(
                        (s, k) => {
                            s[k] = value[k];
                            return s;
                        }, {});
                }
                else {
                    return value;
                }
            });
        return Utils.sha256(strRequest);
    }

    /**
     * Overrides the standard `HttpClient.request` method to change its behavior as follows:
     * * pipes the observable to the share operator so that only a single request is issued even if there are multiple subscribers
     * * to mitigate request flooding, a cache of pending response observables keyed by the request thumbprint is maintained.
     * An observable from the cache is returned if the incoming request is identical to one in the cache
     */
    request(first: string | HttpRequest<any>, url?: string, options = {}): Observable<any> {
        const requestHash = this.getRequestHash(first, url, options);
        let observable = this.responseCache.get(requestHash);
        if (!observable) {
            observable = super.request(first as string, url as string, options)
                .pipe(share())
                .pipe(tap(() => this.responseCache.delete(requestHash)));
            this.responseCache.set(requestHash, observable);
        }
        return observable;
    }
}
