import { Injectable, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SqHttpClient } from "./http-client";
import { HttpService } from "./http.service";
import { START_CONFIG, StartConfig } from "./start-config.web.service";
import { Record } from "./query.web.service";

/**
 * A service for calling the similardocuments web service
 */
@Injectable({
  providedIn: "root"
})
export class SimilarDocumentsWebService extends HttpService {
    constructor(
        @Inject(START_CONFIG) startConfig: StartConfig,
        private httpClient: SqHttpClient) {
        super(startConfig);
    }

    /**
     * Gets an array of documents (records) similar to the passed document
     *
     * @param sourceDocumentId The id of the document for which to retrieve similar documents
     * @param queryName The name of the query
     */
    public get(sourceDocumentId: string, queryName: string): Observable<Record[]> {
      return this.httpClient.post<{data: Record[]}>(this.makeUrl("similardocuments"),
        {
          app: this.appName,
          sourceDocumentId,
          query: {
            name: queryName
          }
        }).pipe(map((response) => response.data));
    }
}
