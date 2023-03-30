import { Component } from '@angular/core';
import { Alert } from '@sinequa/components/alerts';
import { MODAL_MODEL } from '@sinequa/core/modal';

const alert: Alert = {
  name: 'name',
  description: 'description',
  query: null as any,
  timezone: 'utc',
  frequency: Alert.Frequency.Daily,
  days: Alert.Days.Monday,
  interval: 2,
  index: 1,
  times: '0',
  active: true,
  combine: false,
  respectTabSelection: true
};

@Component({
  selector: 'doc-edit-alert',
  templateUrl: './edit-alert.component.html',
  providers: [{ provide: MODAL_MODEL, useValue: { alert } }]
})
export class DocEditAlertComponent {

  code1 = `<sq-edit-alert></sq-edit-alert>`;

  code2 = `{
    provide: MODAL_MODEL, useValue: {
        alert: {
            name: 'name',
            description: 'description',
            query: null,
            timezone: 'utc',
            frequency: 'Daily',
            days: 'Monday',
            interval: 2,
            index: 1,
            times: [1],
            active: true,
            combine: false,
            respectTabSelection: true
        }
    }
}`;

  constructor() { }

}
