import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'doc-results',
  templateUrl: './results.component.html'
})
export class DocResultsComponent {

  constructor(public globalService: GlobalService) { }

}
