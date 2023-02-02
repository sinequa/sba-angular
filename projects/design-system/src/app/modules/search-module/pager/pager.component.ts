import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent {

  code = `<sq-pager
    [results]="results">
</sq-pager>`;

  constructor(public globalService: GlobalService) { }

}
