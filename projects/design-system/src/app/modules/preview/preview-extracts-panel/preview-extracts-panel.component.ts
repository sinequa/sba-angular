import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html'
})
export class PreviewExtractsPanelComponent {

  code = `<sq-preview-extracts-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-extracts-panel>`;

  constructor(public globalService: GlobalService) { }

}
