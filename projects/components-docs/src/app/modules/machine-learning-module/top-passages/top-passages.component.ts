import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-top-passages',
  templateUrl: './top-passages.component.html'
})
export class DocTopPassagesComponent {

  code = `<sq-top-passages
    [results]="results">
</sq-top-passages>`;

  constructor(public globalService: GlobalService) { }

}
