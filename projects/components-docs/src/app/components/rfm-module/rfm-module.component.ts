import { Component } from '@angular/core';
import { DocRfmActionComponent } from './rfm-action/rfm-action.component';

@Component({
    selector: 'doc-rfm-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocRfmModuleComponent {

  title = 'RFM Module';

  components = [
    DocRfmActionComponent
  ];

  constructor() { }

}
