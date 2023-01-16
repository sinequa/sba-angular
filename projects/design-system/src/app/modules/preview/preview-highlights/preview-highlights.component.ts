import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-highlights',
  templateUrl: './preview-highlights.component.html'
})
export class PreviewHighlightsComponent {

  code = `<sq-preview-highlights
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-highlights>`;

  constructor(public globalService: GlobalService) { }

}
