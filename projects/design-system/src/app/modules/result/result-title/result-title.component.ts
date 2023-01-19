import { Component, } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-result-title',
  templateUrl: './result-title.component.html'
})
export class ResultTitleComponent {

  code = `<sq-result-title
    [record]="record">
</sq-result-title>`;

  constructor(public globalService: GlobalService) { }

}
