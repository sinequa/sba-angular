import {Injectable, Inject} from "@angular/core";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {Utils} from "@sinequa/core/base";
import {Suggestion} from "./suggest/suggestion";
import {IQuery} from "./query/query";

/**
 * A service for calling the suggestfield web service
 */
@Injectable({
    providedIn: "root"
})
export class SuggestFieldWebService extends HttpService {
    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

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
            if (!Utils.isArray(fields)) {
                fields = [fields];
            }
            const observable = this.httpClient.post<{suggests: Suggestion[]}>(this.makeUrl("suggestfield"), {
                app: this.appName,
                text: text,
                fields: fields,
                query: query
            }).pipe(map((value) => {
                value.suggests.forEach(value => value.display = Utils.toSqlValue(value.display)); // because dates get automatically converted by the interceptor
                return value.suggests;
            }));
            return observable;
        }
    }
}