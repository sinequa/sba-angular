import { Component, OnInit } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { RECORD } from 'src/mocks/record';

@Component({
  selector: 'app-facet-preview',
  templateUrl: './facet-preview.component.html'
})
export class FacetPreviewComponent implements OnInit {

  record = RECORD;

  constructor(public searchService: SearchService) {

  }

  ngOnInit(): void {
  }

}
