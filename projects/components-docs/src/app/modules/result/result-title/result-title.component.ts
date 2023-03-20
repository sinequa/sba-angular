import { Component, } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-result-title',
  templateUrl: './result-title.component.html'
})
export class DocResultTitleComponent extends BaseComponent {

  code = `<sq-result-title
    [record]="record">
</sq-result-title>`;

}
