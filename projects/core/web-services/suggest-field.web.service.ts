import {Observable, of, map} from "rxjs";

import {Injectable} from "@angular/core";

import {Utils} from "@sinequa/core/base";

import {HttpService} from "./http.service";
import { IQuery, Suggestion } from "./types";

/**
 * A service for calling the suggestfield web service
 */
@Injectable({
    providedIn: "root"
})
export class SuggestFieldWebService extends HttpService {

    /**
     * Gets suggestions for the passed text for a set of fields and in the context of the passed query
     *
     * @param text The text to match
     * @param fields The fields for which to return suggestions
     * @param query The query context
     */
    get(text: string, fields: string | string[], query?: IQuery): Observable<Suggestion[]> {
        if (!fields) {
            return of([]);
        }
        else {
            fields = Utils.asArray(fields);
            const observable = this.httpClient.post<{suggests: Suggestion[]}>(this.makeUrl("suggestfield"), {
                app: this.appName,
                text,
                fields,
                query
            }).pipe(map((value) => {
                value.suggests.forEach(suggestion => suggestion.display = Utils.toSqlValue(suggestion.display)); // because dates get automatically converted by the interceptor
                return value.suggests;
            }));
            return observable;
        }
    }
}
