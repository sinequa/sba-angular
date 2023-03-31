import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview-links',
  templateUrl: './preview-links.component.html'
})
export class DocPreviewLinksComponent extends BaseComponent {

  code = `<sq-preview-links
    [record]="previewData.record"
    [resultId]="previewData.resultId">
</sq-preview-links>`;

}
