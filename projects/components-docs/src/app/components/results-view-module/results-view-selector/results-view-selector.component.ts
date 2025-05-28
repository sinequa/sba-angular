import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-results-view-selector',
  templateUrl: './results-view-selector.component.html'
})
export class DocResultsViewSelectorComponent extends BaseComponent {

  code = `<sq-results-view-selector
    [query]="query"
    [results]="results"
    [size]="'sm'"
    [rightAligned]="true"
    [useDropdownMenu]="false">
</sq-results-view-selector>`;

}
