import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html'
})
export class SortSelectorComponent {

  code = ``;

  constructor(public globalService: GlobalService) { }

}
