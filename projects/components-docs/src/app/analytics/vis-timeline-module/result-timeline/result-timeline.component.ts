import { Component } from '@angular/core';
import { EntityItem } from '@sinequa/core/web-services';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-result-timeline',
  templateUrl: './result-timeline.component.html'
})
export class DocResultTimelineComponent extends BaseComponent {

  code = `<sq-result-timeline
    [record]="record"
    [dates]="dates">
</sq-result-timeline>`;

  dates: EntityItem[];

  constructor() {
    super();

    const date1 = new Date();
    const date2 = new Date();
    const date3 = new Date();

    date1.setFullYear(date1.getFullYear() - 1);
    date2.setFullYear(date2.getFullYear() - 2);
    date3.setFullYear(date3.getFullYear() - 4);

    this.dates = [
      {
        value: date1.toISOString(),
        display: date1.toISOString()
      },
      {
        value: date2.toISOString(),
        display: date2.toISOString()
      },
      {
        value: date3.toISOString(),
        display: date3.toISOString()
      }
    ]
  }

}
