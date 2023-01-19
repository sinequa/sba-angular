import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-sponsored-results',
  templateUrl: './sponsored-results.component.html'
})
export class SponsoredResultsComponent {

  code = `<sq-sponsored-results
    [query]="query">
</sq-sponsored-results>`;

  constructor(public globalService: GlobalService) { }

}
