import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-preview-entity-panel',
  templateUrl: './preview-entity-panel.component.html'
})
export class DocPreviewEntityPanelComponent extends BaseComponent {

  code = `<sq-preview-entity-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-entity-panel>`;

}
