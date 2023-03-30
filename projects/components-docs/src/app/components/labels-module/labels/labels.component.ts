import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-labels',
  templateUrl: './labels.component.html'
})
export class DocLabelsComponent extends BaseComponent {

  code = `<sq-labels [record]="record"></sq-labels>`;

}
