import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-results-view-module',
  templateUrl: './results-view-module.component.html'
})
export class ResultsViewModuleComponent {

  constructor(public globalService: GlobalService) { }

}
