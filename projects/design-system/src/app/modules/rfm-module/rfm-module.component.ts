import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-rfm-module',
  templateUrl: './rfm-module.component.html'
})
export class RfmModuleComponent {

  constructor(public globalService: GlobalService) { }

}
