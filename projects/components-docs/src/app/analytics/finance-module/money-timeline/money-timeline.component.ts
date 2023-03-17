import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-money-timeline',
  templateUrl: './money-timeline.component.html'
})
export class DocMoneyTimelineComponent {

  code = `<sq-money-timeline
    [results]="results">
</sq-money-timeline>`;

  constructor(public globalService: GlobalService) { }

}
