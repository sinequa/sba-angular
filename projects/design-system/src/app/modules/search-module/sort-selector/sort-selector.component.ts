import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html'
})
export class SortSelectorComponent {

  code = `<sq-sort-selector
    [results]="results">
</sq-sort-selector>`;

  constructor(public globalService: GlobalService) { }

}
