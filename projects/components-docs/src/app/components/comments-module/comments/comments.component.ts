import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-comments',
    templateUrl: './comments.component.html',
    standalone: false
})
export class DocCommentsComponent extends BaseComponent {

  code = `<sq-comments
    [docid]="record.id">
</sq-comments>`;

}
