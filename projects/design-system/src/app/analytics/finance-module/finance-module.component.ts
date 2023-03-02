import { Component } from '@angular/core';
import { MoneyCloudComponent } from './money-cloud/money-cloud.component';
import { MoneyTimelineComponent } from './money-timeline/money-timeline.component';

@Component({
  selector: 'app-finance-module',
  templateUrl: '../../module-template.html'
})
export class FinanceModuleComponent {

  title = 'Finance Module';

  components = [
    MoneyCloudComponent,
    MoneyTimelineComponent
  ];

  constructor() { }

}
