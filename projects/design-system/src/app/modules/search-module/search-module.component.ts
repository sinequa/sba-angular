import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-search-module',
  templateUrl: './search-module.component.html'
})
export class SearchModuleComponent {

  constructor(public globalService: GlobalService) { }

}
