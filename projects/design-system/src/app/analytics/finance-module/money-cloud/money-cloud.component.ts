import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-money-cloud',
  templateUrl: './money-cloud.component.html'
})
export class DocMoneyCloudComponent {

  code = `<sq-money-cloud
    [results]="results">
</sq-money-cloud>`;

  constructor(public globalService: GlobalService,
    public searchService: SearchService) { }

}
