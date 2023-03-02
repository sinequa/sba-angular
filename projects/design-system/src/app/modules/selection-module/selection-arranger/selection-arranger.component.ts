import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-selection-arranger',
  templateUrl: './selection-arranger.component.html'
})
export class DocSelectionArrangerComponent {

  code = `<sq-selection-arranger
    [records]="records">
</sq-selection-arranger>`;

  constructor(public globalService: GlobalService) { }

}
