import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-pages-panel',
  templateUrl: './preview-pages-panel.component.html'
})
export class PreviewPagesPanelComponent {

  code = `<sq-preview-pages-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument"
    [pages]="pagesResults"
    (gotopage)="gotoPage($event)">
</sq-preview-pages-panel>`;

  constructor(public globalService: GlobalService) { }

}
