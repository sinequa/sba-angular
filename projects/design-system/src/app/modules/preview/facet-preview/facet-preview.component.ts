import { Component } from '@angular/core';
import { SearchService } from '@sinequa/components/search';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-facet-preview',
  templateUrl: './facet-preview.component.html'
})
export class FacetPreviewComponent {

  constructor(public searchService: SearchService,
    public globalService: GlobalService) {}

}
