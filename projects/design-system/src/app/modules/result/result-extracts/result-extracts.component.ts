import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-result-extracts',
  templateUrl: './result-extracts.component.html'
})
export class ResultExtractsComponent {

  code = `<sq-result-extracts
    [record]="record">
</sq-result-extracts>`;

  constructor(public globalService: GlobalService) { }

}
