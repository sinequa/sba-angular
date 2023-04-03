import { Injectable } from "@angular/core";
import { HttpService, Suggestion } from "@sinequa/core/web-services";
import { Observable, of } from "rxjs";
import { SUGGESTIONS } from "../data/suggestion";

@Injectable({
  providedIn: "root"
})
export class MockSuggestQueryWebService extends HttpService {

  get(suggestQuery: string, text: string, query: string, fields?: string | string[]): Observable<Suggestion[]> {
    return of(SUGGESTIONS);
  }
}
