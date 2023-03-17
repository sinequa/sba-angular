import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-tag-cloud',
  templateUrl: './facet-tag-cloud.component.html'
})
export class DocFacetTagCloudComponent {

  code = `<sq-facet-tag-cloud
    [results]="results"
    [aggregations]="['Company','Person']"></sq-facet-tag-cloud>`;

  constructor(public globalService: GlobalService) { }

}
