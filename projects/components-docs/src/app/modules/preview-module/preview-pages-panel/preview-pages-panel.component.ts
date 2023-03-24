import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-preview-pages-panel',
  templateUrl: './preview-pages-panel.component.html'
})
export class DocPreviewPagesPanelComponent extends BaseComponent {

  code = `<sq-preview-pages-panel
    [previewData]="previewData"
    [previewDocument]="previewDocument"
    [pages]="pagesResults"
    (gotopage)="gotoPage($event)">
</sq-preview-pages-panel>`;

}
