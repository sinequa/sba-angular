import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { mockAgGridColumns, mockAgGridDefaultColDef, mockAgGridResults } from './mock';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'doc-ag-grid-view',
    templateUrl: './ag-grid-view.component.html',
    standalone: false
})
export class DocAgGridViewComponent extends BaseComponent {

  code = `<sq-ag-grid-view
    [results]="results"
    [columns]="columns"
    [defaultColDef]="defaultColDef">
</sq-ag-grid-view>`;

get columns() {
  return mockAgGridColumns;
}

get defaultColDef() {
  return mockAgGridDefaultColDef;
}

get results() {
  return environment.mock ? mockAgGridResults : this.globalService.results;
}

}

