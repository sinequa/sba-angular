import { Component, Input, OnChanges } from '@angular/core';
import { BaseComponent } from '../shared/base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'doc-search-bar',
    templateUrl: './search-bar.component.html',
    styles: [`input {
    width: 100%;
    border: 0;
    &:focus-visible {
      outline: 0;
    }
  }`],
    standalone: false
})
export class DocSearchBarComponent extends BaseComponent implements OnChanges {

  @Input() search: string;

  constructor(private route: ActivatedRoute) {
    super();

    this.route.queryParams
      .subscribe(params => {
        if (params.search) {
          this.triggerSearch(params.search);
        }
      })
  }

  ngOnChanges(): void {
    if (this.search) {
      this.triggerSearch(this.search);
    }
  }

  private triggerSearch(value: string): void {
    this.globalService.query.text = value;
    this.globalService.search();
  }

}
