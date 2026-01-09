import { Component, } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-result-title',
    templateUrl: './result-title.component.html',
    standalone: false
})
export class DocResultTitleComponent extends BaseComponent {

  code = `<sq-result-title
    [record]="record">
</sq-result-title>`;

}
