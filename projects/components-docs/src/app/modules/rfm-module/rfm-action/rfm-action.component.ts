import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-rfm-action',
  templateUrl: './rfm-action.component.html'
})
export class DocRfmActionComponent {

  code = `<sq-rfm-action
    [results]="results"
    [record]="record">
</sq-rfm-action>`;

  constructor(public globalService: GlobalService) { }

}
