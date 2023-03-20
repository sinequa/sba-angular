import { Component, Input, OnChanges } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'doc-search-bar',
  templateUrl: './search-bar.component.html'
})
export class DocSearchBarComponent extends BaseComponent implements OnChanges {

  @Input() search: string;

  ngOnChanges(): void {
    if (this.search) {
      this.globalService.query.text = this.search;
      this.globalService.search();
    }
  }

}
