import { Component, } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-result-title',
  templateUrl: './result-title.component.html'
})
export class DocResultTitleComponent {

  code = `<sq-result-title
    [record]="record">
</sq-result-title>`;

  constructor(public globalService: GlobalService) { }

}
