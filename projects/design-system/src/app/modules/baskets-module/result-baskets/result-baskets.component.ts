import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-result-baskets',
  templateUrl: './result-baskets.component.html'
})
export class ResultBasketsComponent {

  code = `<sq-result-baskets
    [record]="record">
</sq-result-baskets>`;

  constructor(public globalService: GlobalService) { }

}
