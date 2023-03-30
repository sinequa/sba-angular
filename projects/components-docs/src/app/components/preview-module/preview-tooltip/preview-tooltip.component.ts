import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview-tooltip',
  templateUrl: './preview-tooltip.component.html'
})
export class DocPreviewTooltipComponent extends BaseComponent {

  code = `<sq-preview-document-iframe
    [sandbox]="'sandbox'"
    [downloadUrl]="'downloadUrl'">
        <sq-preview-tooltip #tooltip
            [previewDocument]="document"
            [previewData]="data">
        </sq-preview-tooltip>
</sq-preview-document-iframe>`;

downloadUrl = '/';
}
