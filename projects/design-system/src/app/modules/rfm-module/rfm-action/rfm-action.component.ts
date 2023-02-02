import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-rfm-action',
  templateUrl: './rfm-action.component.html'
})
export class RfmActionComponent {

  code = `<sq-rfm-action
    [results]="results"
    [record]="record">
</sq-rfm-action>`;

  constructor(public globalService: GlobalService) { }

}
