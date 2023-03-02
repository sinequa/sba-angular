import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'doc-comments',
  templateUrl: './comments.component.html'
})
export class DocCommentsComponent {

  code = `<sq-comments
    [docid]="record.id">
</sq-comments>`;

  constructor(public globalService: GlobalService) { }

}
