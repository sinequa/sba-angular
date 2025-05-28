import { Injectable } from "@angular/core";
import { HttpService, IQuery, LinksResults } from "@sinequa/core/web-services";
import { Observable, of } from "rxjs";
import { LINKS_RESULTS } from "../data/sponsored-links";

@Injectable({
  providedIn: "root"
})
export class MockSponsoredLinksWebService extends HttpService {

  getLinks(query: IQuery, webService: string): Observable<LinksResults> {
    return of(LINKS_RESULTS)
  }
}
