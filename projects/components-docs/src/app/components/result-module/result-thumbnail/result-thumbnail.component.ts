import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-result-thumbnail',
  templateUrl: './result-thumbnail.component.html'
})
export class DocResultThumbnailComponent extends BaseComponent {

  code = `<sq-result-thumbnail
    [record]="record">
</sq-result-thumbnail>`;

}
