import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-ag-grid-view',
  templateUrl: './ag-grid-view.component.html'
})
export class DocAgGridViewComponent {

  code = `<sq-ag-grid-view
    [results]="results"
    [query]="query">
</sq-ag-grid-view>`;

  constructor(public globalService: GlobalService) { }

}
