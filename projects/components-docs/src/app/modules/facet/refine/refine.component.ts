import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-refine',
  templateUrl: './refine.component.html'
})
export class DocRefineComponent {

  code = `<sq-refine [results]="results"></sq-refine>`;

  constructor(public globalService: GlobalService) { }

}
