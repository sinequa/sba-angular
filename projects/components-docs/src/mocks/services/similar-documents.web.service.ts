import { Injectable } from "@angular/core";
import { HttpService, Record } from "@sinequa/core/web-services";
import { Observable, of } from "rxjs";
import { RESULTS } from "../data/results";

@Injectable({
  providedIn: "root"
})
export class MockSimilarDocumentsWebService extends HttpService {

  public get(sourceDocumentId: string, queryName: string): Observable<Record[]> {
    return of(RESULTS.records.slice(0, 2) as any);
  }
}
