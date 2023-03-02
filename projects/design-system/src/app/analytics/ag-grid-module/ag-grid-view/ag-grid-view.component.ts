import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-ag-grid-view',
  templateUrl: './ag-grid-view.component.html'
})
export class AgGridViewComponent {

  code = `<sq-ag-grid-view
    [results]="results"
    [query]="query">
</sq-ag-grid-view>`;

  constructor(public globalService: GlobalService,
    public searchService: SearchService) { }

}
