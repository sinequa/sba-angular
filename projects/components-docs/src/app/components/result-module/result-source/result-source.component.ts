import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-result-source',
  templateUrl: './result-source.component.html'
})
export class DocResultSourceComponent extends BaseComponent {

  code = `<sq-result-source
    [record]="record">
</sq-result-source>`;

}
