import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-preview-highlights',
  templateUrl: './preview-highlights.component.html'
})
export class DocPreviewHighlightsComponent extends BaseComponent {

  code = `<sq-preview-highlights
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-highlights>`;

}
