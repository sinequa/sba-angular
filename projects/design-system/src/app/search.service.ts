import { Injectable } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { Query } from '@sinequa/core/app-utils';
import { Results } from '@sinequa/core/web-services';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RESULTS } from 'src/mocks/results';

@Injectable({
  providedIn: 'root'
})
export class DocSearchService {

  query: Query;

  get rowCount(): number {
    return (!!this.results && this.results.rowCount) ? this.results.rowCount : 0;
  }

  get results() {
    return environment.mock ? RESULTS : this.searchService.results;
  }

  constructor(private searchService: SearchService) { }

  setResults(results: Results): void {
    this.searchService.setResults(results);
  }

  getResults(query: Query): Observable<Results> {
    if (environment.mock) {
      return this.searchService.getResults(query);
    } else {
      return this.searchService.getResults(query);
    }
  }
}
