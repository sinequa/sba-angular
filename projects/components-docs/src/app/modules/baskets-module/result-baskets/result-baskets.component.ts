import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-result-baskets',
  templateUrl: './result-baskets.component.html'
})
export class DocResultBasketsComponent {

  code = `<sq-result-baskets
    [record]="record">
</sq-result-baskets>`;

  constructor(public globalService: GlobalService) { }

}
