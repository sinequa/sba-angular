import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-money-timeline',
  templateUrl: './money-timeline.component.html'
})
export class DocMoneyTimelineComponent extends BaseComponent {

  code = `<sq-money-timeline
    [results]="results">
</sq-money-timeline>`;

}
