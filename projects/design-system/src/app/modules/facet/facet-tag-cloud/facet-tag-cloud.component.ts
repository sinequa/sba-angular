import { Component, OnInit } from '@angular/core';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-facet-tag-cloud',
  templateUrl: './facet-tag-cloud.component.html'
})
export class FacetTagCloudComponent implements OnInit {

  results: any = RESULTS;

  code = `<sq-facet-tag-cloud
    [results]="results"
    [aggregations]="['Company','Person']"></sq-facet-tag-cloud>`;

  constructor() { }

  ngOnInit(): void {
  }

}
