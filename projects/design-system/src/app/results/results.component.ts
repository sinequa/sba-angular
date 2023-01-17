import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {

  constructor(public globalService: GlobalService) { }

}
