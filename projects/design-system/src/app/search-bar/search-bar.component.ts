import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent {

  constructor(public globalService: GlobalService) { }

}
