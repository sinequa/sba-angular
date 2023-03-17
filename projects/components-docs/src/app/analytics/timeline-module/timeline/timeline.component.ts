import { Component } from '@angular/core';
import { TimelineSeries } from '@sinequa/analytics/timeline';

@Component({
  selector: 'doc-timeline',
  templateUrl: './timeline.component.html'
})
export class DocTimelineComponent {

  code = ``;

  data: TimelineSeries[];

  constructor() {
    const date1 = new Date();
    const date2 = new Date();
    const date3 = new Date();
    const date4 = new Date();

    date1.setDate(date1.getDate() - 1);
    date2.setDate(date2.getDate() - 2);
    date3.setDate(date3.getDate() - 3);
    date4.setDate(date4.getDate() - 4);

    this.data = [
      {
        name: 'name1',
        dates: [
          {
            date: date1,
            value: 1
          },
          {
            date: date2,
            value: 3
          },
          {
            date: date3,
            value: 13
          },
          {
            date: date4,
            value: 2
          }
        ],
        primary: true
      },
      {
        name: 'name2',
        dates: [
          {
            date: date4,
            value: 1
          },
          {
            date: date3,
            value: 3
          },
          {
            date: date2,
            value: 13
          },
          {
            date: date1,
            value: 2
          }
        ],
        primary: false
      }
    ];
  }

}
