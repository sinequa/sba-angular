import { Component, Input, OnChanges } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnChanges {

  @Input() search: string;

  constructor(public globalService: GlobalService) { }

  ngOnChanges(): void {
    if (this.search) {
      this.globalService.query.text = this.search;
      this.globalService.search();
    }
  }

}
