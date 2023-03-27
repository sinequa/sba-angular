import { Component } from '@angular/core';
import { Alert, ManageAlertsModel } from '@sinequa/components/alerts';
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

const alert2: Alert = {
  name: 'name2',
  description: 'description2',
  query: null as any,
  timezone: 'utc',
  frequency: Alert.Frequency.Monthly,
  days: Alert.Days.WeekDays,
  interval: 2,
  index: 1,
  times: '0',
  active: true,
  combine: false,
  respectTabSelection: true
};

const modalModel: ManageAlertsModel = {
  alerts: [
    alert, alert2
  ]
};

@Component({
  selector: 'doc-manage-alerts',
  templateUrl: './manage-alerts.component.html',
  providers: [{ provide: MODAL_MODEL, useValue: modalModel }]
})
export class DocManageAlertsComponent {

  code1 = `<sq-manage-alerts></sq-manage-alerts>`;

  code2 = `const alert: Alert = {
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

const alert2: Alert = {
    name: 'name2',
    description: 'description2',
    query: null as any,
    timezone: 'utc',
    frequency: Alert.Frequency.Monthly,
    days: Alert.Days.WeekDays,
    interval: 2,
    index: 1,
    times: '0',
    active: true,
    combine: false,
    respectTabSelection: true
};

const modalModel: ManageAlertsModel = {
    alerts: [
        alert, alert2
    ]
};

providers: [{ provide: MODAL_MODEL, useValue: modalModel }]`;

  constructor() { }

}
