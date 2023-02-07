import { Component } from '@angular/core';
import { RfmActionComponent } from './rfm-action/rfm-action.component';

@Component({
  selector: 'app-rfm-module',
  templateUrl: '../module-template.html'
})
export class RfmModuleComponent {

  title = 'RFM Module';

  components = [
    RfmActionComponent
  ];

  constructor() { }

}
