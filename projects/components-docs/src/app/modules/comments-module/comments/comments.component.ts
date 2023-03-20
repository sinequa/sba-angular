import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-comments',
  templateUrl: './comments.component.html'
})
export class DocCommentsComponent extends BaseComponent {

  code = `<sq-comments
    [docid]="record.id">
</sq-comments>`;

}
