import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { GlobalService } from 'src/app/shared/global.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'doc-load-more',
    templateUrl: './load-more.component.html',
    standalone: false
})
export class DocLoadMoreComponent {

  code = `<sq-load-more></sq-load-more>`;

  constructor(private globalService: GlobalService,
    private searchService: SearchService) {
    if (environment.mock) {
      this.searchService.setResults(this.globalService.results);
    }
  }

}
