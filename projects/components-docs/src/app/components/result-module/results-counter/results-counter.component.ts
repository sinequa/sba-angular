import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';

@Component({
  selector: 'doc-results-counter',
  templateUrl: './results-counter.component.html'
})
export class DocResultsCounterComponent {

  code = `<sq-results-counter
    [rowCount]="searchService.rowCount">
</sq-results-counter>`;

  constructor(public searchService: SearchService) { }

}
