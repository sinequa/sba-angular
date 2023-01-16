import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-links',
  templateUrl: './preview-links.component.html'
})
export class PreviewLinksComponent {

  code = `<sq-preview-links
    [record]="previewData.record"
    [resultId]="previewData.resultId">
</sq-preview-links>`;

  constructor(public globalService: GlobalService) { }

}
