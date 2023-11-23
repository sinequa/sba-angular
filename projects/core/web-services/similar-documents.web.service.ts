import { Observable, map } from "rxjs";

import { Injectable } from "@angular/core";

import { HttpService } from "./http.service";
import { Record } from "./types";

/**
 * A service for calling the similar documents web service
 */
@Injectable({
  providedIn: "root"
})
export class SimilarDocumentsWebService extends HttpService {

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
