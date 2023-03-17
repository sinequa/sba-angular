import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-page-size-selector',
  templateUrl: './page-size-selector.component.html'
})
export class DocPageSizeSelectorComponent {

  code = `<sq-page-size-selector
    [results]="results"
    [pageSizes]="[5, 10, 20]">
</sq-page-size-selector>`;

  constructor(public globalService: GlobalService) { }

}
