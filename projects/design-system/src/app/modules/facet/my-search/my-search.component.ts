import { Component, OnInit } from '@angular/core';
import { Breadcrumbs, BreadcrumbsItem, SearchService } from '@sinequa/components/search';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-my-search',
  templateUrl: './my-search.component.html'
})
export class MySearchComponent implements OnInit {

  results: any = RESULTS;

  code = `<sq-facet-mysearch [results]="results"></sq-facet-mysearch>`;

  constructor(private searchService: SearchService) {
    const item: BreadcrumbsItem = {
      expr: undefined,
      display: "< 10 Ko",
      facet: "Size",
      active: true,
    };

    const item2: BreadcrumbsItem = {
      expr: undefined,
      display: "10 Ko à 100 Ko",
      facet: "Size",
      active: false
    };

    this.searchService.breadcrumbs = {
      activeIndex: 1,
      selects: [item, item2],
      items: [{ expr: undefined, display: "abc" }, item, item2] as BreadcrumbsItem[],
      activeSelects: [item, item2] as BreadcrumbsItem[],
      findSelect: (facet) => item2.expr
    } as Breadcrumbs;
  }

  ngOnInit(): void {
  }

}
