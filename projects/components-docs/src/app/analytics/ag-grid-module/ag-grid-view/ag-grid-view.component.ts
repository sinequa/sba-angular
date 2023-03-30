import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-ag-grid-view',
  templateUrl: './ag-grid-view.component.html'
})
export class DocAgGridViewComponent extends BaseComponent {

  code = `<sq-ag-grid-view
    [results]="results"
    [query]="query">
</sq-ag-grid-view>`;

}
