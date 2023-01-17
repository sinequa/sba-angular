import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-refine',
  templateUrl: './refine.component.html'
})
export class RefineComponent {

  code = `<sq-refine [results]="results"></sq-refine>`;

  constructor(public globalService: GlobalService) { }

}
