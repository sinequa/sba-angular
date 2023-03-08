import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-facet-preview',
  templateUrl: './facet-preview.component.html'
})
export class DocFacetPreviewComponent {

  constructor(public globalService: GlobalService) {}

}
