import {Injectable, Inject} from "@angular/core";
import {Observable, of, map, tap} from "rxjs";
import {SqHttpClient} from "./http-client";
import {HttpService} from "./http.service";
import {START_CONFIG, StartConfig} from "./start-config.web.service";
import {IQuery} from "./query/query";

export interface QueryIntentResponse {
    query: string;
    intents: QueryIntentMatch[];
}

export interface QueryIntentMatch {
    /** name of the intent */
    name: string;
    /** global entities that match */
    globalEntities?: QueryIntentEntity2[];
    /** rule that match if exact match rule */
    matchRule: string | null;
    /** ml score or 1 if rule */
    score: number;
    /** ml confidence score or 1 if rule */
    confidence: number;
}

export interface QueryIntentEntity2 {
    /** global entity name, eg. "person" */
    name: string;
    /** global entity type (entities are detected by classical NLP, slots are detected by ML) */
    type: "entity" | "slot";
    /** global entity resource */
    resource: string;
    /** text that match the global entity, eg. "Bill gates" */
    value: string;
    /** offset in the query */
    offset: number;
    /** length in the query */
    length: number;
    /** basic form if type=entity, eg. "BILL GATES"*/
    basic: string | null;
    /** normalization form if type=entity, eg. "William H Gates"*/
    normalization: string | null;
    /** score for the extraction if type=slot */
    score?: number;
}

/**
 * A service for calling the queryintent web service
 */
@Injectable({
    providedIn: "root"
})
export class QueryIntentWebService extends HttpService {
    private readonly endpoint = "queryintent";

    // The cache prevents analyzing the same query multiple times
    cache = new Map<string,QueryIntentMatch[]>();

    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    getQueryIntent(query: IQuery): Observable<QueryIntentMatch[]> {
        if(!query.text){
            return of([]);
        }
        const text = query.text.toLowerCase();
        if(this.cache.has(text)){
            return of(this.cache.get(text)!);
        }
        const data = {
            query,
            app: this.appName
        };
        return this.httpClient.post<QueryIntentResponse>(
            this.makeUrl(this.endpoint), data)
                .pipe(
                    map(r => r.intents),
                    tap(intents => {
                        this.cache.set(text, intents);
                    })
                );
    }
}
