import { Component } from '@angular/core';
import { mockTimelineData } from './mock';

@Component({
  selector: 'doc-timeline',
  templateUrl: './timeline.component.html'
})
export class DocTimelineComponent {

  code = `<sq-timeline
    [data]="data">
</sq-timeline>`;

  get data() {
    return mockTimelineData.map(data => {
      data.dates = data.dates.map(date => {
        date.date = new Date(date.date) as any
        return date;
      });
      return data;
    });
  }

}
