import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-preview-entity-panel',
  templateUrl: './preview-entity-panel.component.html'
})
export class DocPreviewEntityPanelComponent {

  code = `<sq-preview-entity-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument">
</sq-preview-entity-panel>`;

  constructor(public globalService: GlobalService) { }

}
