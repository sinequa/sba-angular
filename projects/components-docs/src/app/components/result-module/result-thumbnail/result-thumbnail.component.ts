import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-result-thumbnail',
    templateUrl: './result-thumbnail.component.html',
    standalone: false
})
export class DocResultThumbnailComponent extends BaseComponent {

  code = `<sq-result-thumbnail
    [record]="record"
    [linkBehavior]="'action'">
</sq-result-thumbnail>`;

}
