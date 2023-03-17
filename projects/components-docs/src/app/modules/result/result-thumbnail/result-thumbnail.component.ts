import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-result-thumbnail',
  templateUrl: './result-thumbnail.component.html'
})
export class DocResultThumbnailComponent {

  code = `<sq-result-thumbnail
    [record]="record">
</sq-result-thumbnail>`;

  constructor(public globalService: GlobalService) { }

}
