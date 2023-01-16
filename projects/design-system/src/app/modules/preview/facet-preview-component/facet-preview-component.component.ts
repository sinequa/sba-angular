import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-preview-component',
  templateUrl: './facet-preview-component.component.html'
})
export class FacetPreviewComponentComponent implements OnInit {

  code = `<sq-facet-preview-2
    [query]="query"
    [record]="record">
</sq-facet-preview-2>`;

  constructor(public globalService: GlobalService) { }

  ngOnInit(): void {
  }

}
