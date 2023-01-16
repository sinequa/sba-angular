import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-minimap',
  templateUrl: './preview-minimap.component.html',
  styleUrls: ['./preview-minimap.component.scss']
})
export class PreviewMinimapComponent {

  code = `<sq-preview-minimap
    [previewDocument]="previewDocument"
    [previewData]="previewData"
    [type]="minimapType">
</sq-preview-minimap>`;

  constructor(public globalService: GlobalService) { }

}
