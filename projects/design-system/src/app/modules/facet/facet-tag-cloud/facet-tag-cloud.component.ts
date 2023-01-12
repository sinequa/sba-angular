import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-tag-cloud',
  templateUrl: './facet-tag-cloud.component.html'
})
export class FacetTagCloudComponent implements OnInit {

  code = `<sq-facet-tag-cloud
    [results]="results"
    [aggregations]="['Company','Person']"></sq-facet-tag-cloud>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
