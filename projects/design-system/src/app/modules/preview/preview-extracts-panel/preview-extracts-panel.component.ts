import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html'
})
export class DocPreviewExtractsPanelComponent {

  code = `<sq-preview-extracts-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-extracts-panel>`;

  constructor(public globalService: GlobalService) { }

}
