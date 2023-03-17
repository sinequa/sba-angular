import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.scss']
})
export class DocPreviewMinimapComponent {

  code = `<sq-preview-minimap
    [previewDocument]="previewDocument"
    [previewData]="previewData"
    [type]="minimapType">
</sq-preview-minimap>`;

  constructor(public globalService: GlobalService) { }

}
