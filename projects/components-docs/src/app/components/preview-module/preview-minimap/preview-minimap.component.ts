import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.scss']
})
export class DocPreviewMinimapComponent extends BaseComponent {

  code = `<sq-preview-minimap
    [previewDocument]="previewDocument"
    [previewData]="previewData"
    [type]="minimapType">
</sq-preview-minimap>`;

}
