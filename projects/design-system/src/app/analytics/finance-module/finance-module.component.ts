import { Component } from '@angular/core';
import { DocMoneyCloudComponent } from './money-cloud/money-cloud.component';
import { DocMoneyTimelineComponent } from './money-timeline/money-timeline.component';

@Component({
  selector: 'doc-finance-module',
  templateUrl: '../../module-template.html'
})
export class DocFinanceModuleComponent {

  title = 'Finance Module';
  description = ``;

  components = [
    DocMoneyCloudComponent,
    DocMoneyTimelineComponent
  ];

  constructor() { }

}
