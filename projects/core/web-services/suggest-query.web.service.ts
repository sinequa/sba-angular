import {Observable, of, map} from "rxjs";

import {Injectable} from "@angular/core";

import {HttpService} from "./http.service";
import {Suggestion} from "./types";

/**
 * A service for calling the suggestquery web service
 */
@Injectable({
    providedIn: "root"
})
export class SuggestQueryWebService extends HttpService {

    /**
     * Gets suggestions for the passed text for a set of fields using the passed suggestquery web service
     *
     * @param suggestQuery The name of the suggestquery web service to use
     * @param text The text to match
     * @param query The name of the current query
     * @param fields The fields for which to return suggestions
     */
    get(suggestQuery: string, text: string, query: string, fields?: string | string[]): Observable<Suggestion[]> {
        if (!suggestQuery) {
            return of([]);
        }
        else {
            const observable = this.httpClient.post<{suggests: Suggestion[]}>(this.makeUrl("suggestquery"), {
                app: this.appName,
                suggestQuery: suggestQuery,
                text: text,
                query: query,
                kinds: fields
            });
            return observable.pipe(map(value => value.suggests));
        }
    }
}
