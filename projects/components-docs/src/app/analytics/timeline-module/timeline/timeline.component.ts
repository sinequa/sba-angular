import { Component } from '@angular/core';
import { mockTimelineData } from './mock';

@Component({
    selector: 'doc-timeline',
    templateUrl: './timeline.component.html',
    standalone: false
})
export class DocTimelineComponent {

  code = `<sq-timeline
    [data]="timeseries">
</sq-timeline>`;

  code2 = `timeseries = [
    {
        name: 'my series',
        dates: [
            {date: new Date('2020-01-01'), value: 42.3},
            {date: new Date('2020-02-01'), value: 58.4},
            {date: new Date('2020-03-01'), value: 21.0},
            {date: new Date('2020-04-01'), value: 3.1},
            {date: new Date('2020-05-01'), value: 34.3},
        ],
        primary: true
    }
];`;

  get data() {
    return mockTimelineData.map(data => {
      data.dates = data.dates.map(date => {
        date.date = new Date(date.date) as any
        return date;
      });
      return data;
    });
  }

  timeseries = [
    {
      name: 'my series',
      dates: [
        { date: new Date('2020-01-01'), value: 42.3 },
        { date: new Date('2020-02-01'), value: 58.4 },
        { date: new Date('2020-03-01'), value: 21.0 },
        { date: new Date('2020-04-01'), value: 3.1 },
        { date: new Date('2020-05-01'), value: 34.3 },
      ],
      primary: true
    }
  ];

}
