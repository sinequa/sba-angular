import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview-extracts-panel',
  templateUrl: './preview-extracts-panel.component.html'
})
export class DocPreviewExtractsPanelComponent extends BaseComponent {

  code = `<sq-preview-extracts-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-extracts-panel>`;

}
