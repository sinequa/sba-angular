import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-result-icon',
  templateUrl: './result-icon.component.html'
})
export class DocResultIconComponent extends BaseComponent {

  code = `<sq-result-icon
    [record]="record">
</sq-result-icon>`;

}
