import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-sort-selector',
  templateUrl: './sort-selector.component.html'
})
export class DocSortSelectorComponent {

  code = `<sq-sort-selector
    [results]="results">
</sq-sort-selector>`;

  constructor(public globalService: GlobalService) { }

}
