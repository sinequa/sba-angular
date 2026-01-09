import { Component } from '@angular/core';
import { GridView } from '@sinequa/components/results-view';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-results-grid-view',
    templateUrl: './results-grid-view.component.html',
    standalone: false
})
export class DocResultsGridViewComponent extends BaseComponent {

  gridView: GridView = {
    columns: [{
      active: true,
      title: 'ID',
      field: 'id',
      sortable: true,
      renderAsHtml: true
    }],
    name: 'name',
    type: 'type'
  };

  code1 = `<sq-results-grid-view
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
    }],
    name: 'name',
    type: 'type'
};`;

}
