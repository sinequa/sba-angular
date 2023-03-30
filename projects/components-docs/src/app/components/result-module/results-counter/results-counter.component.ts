import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'doc-results-counter',
  templateUrl: './results-counter.component.html'
})
export class DocResultsCounterComponent {

  code = `<sq-results-counter
    [rowCount]="searchService.rowCount">
</sq-results-counter>`;

get rowCount(): number {
  return environment.mock ? 13248 : this.searchService.rowCount;
}

  constructor(public searchService: SearchService) { }

}
