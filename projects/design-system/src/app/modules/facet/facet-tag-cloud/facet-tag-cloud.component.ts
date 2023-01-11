import { Component, OnInit } from '@angular/core';
import { RESULTS } from 'src/mocks/results';

@Component({
  selector: 'app-facet-tag-cloud',
  templateUrl: './facet-tag-cloud.component.html'
})
export class FacetTagCloudComponent implements OnInit {

  results: any = RESULTS;

  code = `<sq-facet-mysearch [results]="results"></sq-facet-mysearch>`;

  constructor() { }

  ngOnInit(): void {
  }

}
