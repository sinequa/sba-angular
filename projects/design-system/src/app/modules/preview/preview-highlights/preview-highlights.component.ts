import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-preview-highlights',
  templateUrl: './preview-highlights.component.html'
})
export class DocPreviewHighlightsComponent {

  code = `<sq-preview-highlights
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-highlights>`;

  constructor(public globalService: GlobalService) { }

}
