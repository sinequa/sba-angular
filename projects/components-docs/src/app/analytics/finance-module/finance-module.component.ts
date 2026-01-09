import { Component } from '@angular/core';
import { DocMoneyCloudComponent } from './money-cloud/money-cloud.component';
import { DocMoneyTimelineComponent } from './money-timeline/money-timeline.component';

@Component({
    selector: 'doc-finance-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocFinanceModuleComponent {

  title = 'Finance Module';

  components = [
    DocMoneyCloudComponent,
    DocMoneyTimelineComponent
  ];

  constructor() { }

}
