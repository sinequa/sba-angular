import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-result-labels',
  templateUrl: './result-labels.component.html'
})
export class DocResultLabelsComponent extends BaseComponent {

  code = `<sq-result-labels [record]="record"></sq-result-labels>`;

}
