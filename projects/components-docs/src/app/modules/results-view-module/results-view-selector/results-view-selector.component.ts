import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-results-view-selector',
  templateUrl: './results-view-selector.component.html'
})
export class DocResultsViewSelectorComponent {

  code = `<sq-results-view-selector
    [query]="query"
    [results]="results">
</sq-results-view-selector>`;

  constructor(public globalService: GlobalService) { }

}
