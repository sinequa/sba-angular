import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-top-passages',
  templateUrl: './top-passages.component.html'
})
export class TopPassagesComponent {

  code = `<sq-top-passages
    [results]="results">
</sq-top-passages>`;

  constructor(public globalService: GlobalService) { }

}
