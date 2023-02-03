import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-selection-module',
  templateUrl: './selection-module.component.html'
})
export class SelectionModuleComponent {

  constructor(public globalService: GlobalService) { }

}
