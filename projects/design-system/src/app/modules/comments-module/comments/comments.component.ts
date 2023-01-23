import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent {

  code = `<sq-comments
    [docid]="record.id">
</sq-comments>`;

  constructor(public globalService: GlobalService) { }

}
