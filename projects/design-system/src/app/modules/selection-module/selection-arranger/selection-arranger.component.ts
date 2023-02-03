import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-selection-arranger',
  templateUrl: './selection-arranger.component.html'
})
export class SelectionArrangerComponent {

  code = `<sq-selection-arranger
    [records]="records">
</sq-selection-arranger>`;

  constructor(public globalService: GlobalService) { }

}
