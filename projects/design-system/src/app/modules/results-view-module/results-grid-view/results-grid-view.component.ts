import { Component } from '@angular/core';
import { GridView } from '@sinequa/components/results-view';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-results-grid-view',
  templateUrl: './results-grid-view.component.html'
})
export class ResultsGridViewComponent {

  gridView: GridView = {
    columns: [{
      active: true,
      title: 'ID',
      field: 'id',
      sortable: true,
      renderAsHtml: true
    },
    {
      active: true,
      title: 'Authors',
      field: 'sourcestr1',
      sortable: true,
      renderAsHtml: true
    }],
    name: 'name',
    type: 'type'
  };

  code = `<sq-results-grid-view
    [results]="results"
    [view]="gridView">
</sq-results-grid-view>`;

  code2 = `gridView: GridView = {
    columns: [{
        active: true,
        title: 'ID',
        field: 'id',
        sortable: true,
        renderAsHtml: true
    },
    {
        active: true,
        title: 'Authors',
        field: 'sourcestr1',
        sortable: true,
        renderAsHtml: true
    }],
    name: 'name',
    type: 'type'
};`;

  constructor(public globalService: GlobalService) { }

}
