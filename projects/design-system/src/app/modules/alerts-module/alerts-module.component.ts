import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-alerts-module',
  templateUrl: './alerts-module.component.html'
})
export class AlertsModuleComponent {

  constructor(public globalService: GlobalService) { }

}
