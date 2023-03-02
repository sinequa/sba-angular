import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-preview-links',
  templateUrl: './preview-links.component.html'
})
export class DocPreviewLinksComponent {

  code = `<sq-preview-links
    [record]="previewData.record"
    [resultId]="previewData.resultId">
</sq-preview-links>`;

  constructor(public globalService: GlobalService) { }

}
