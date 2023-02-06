import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';
import { RfmActionComponent } from './rfm-action/rfm-action.component';

@Component({
  selector: 'app-rfm-module',
  templateUrl: './rfm-module.component.html'
})
export class RfmModuleComponent {

  components = [
    RfmActionComponent
  ];

  constructor(public globalService: GlobalService) { }

}
