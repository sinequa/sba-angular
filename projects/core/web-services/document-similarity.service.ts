import { Injectable } from "@angular/core";
import { Utils } from "@sinequa/core/base";
import { Observable, map } from "rxjs";
import { HttpService } from "./http.service";
import { Filter, SimilarDocument, SimilarityParams, SimilarityParamsSchema } from "./types";

/**
 * Service for retrieving similar documents based on a source document.
 */

@Injectable({ providedIn: "root" })
export class DocumentSimilarityService extends HttpService {

  get(sourceDocumentId: string, queryName: string, options?: { params?: SimilarityParams, expand?: string[], filters?: Filter[] }): Observable<SimilarDocument[]> {

    const url = Utils.addUrl(
      "/api/v2/app",
      this.appName,
      "query",
      queryName,
      "doc-similarity",
      encodeURIComponent(sourceDocumentId));


    const similarityParams = SimilarityParamsSchema.parse(options?.params || {});
    const scope = options?.filters ? { filters: options.filters } : undefined;

    const payload = {
      scope,
      similarityParams,
      expand: options?.expand || ['title']
    };

    return this.httpClient.post<{ items: SimilarDocument[] }>(url, payload).pipe(map(response => response.items));
  }
}