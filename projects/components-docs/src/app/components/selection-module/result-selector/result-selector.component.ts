import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-result-selector',
    templateUrl: './result-selector.component.html',
    standalone: false
})
export class DocResultSelectorComponent extends BaseComponent {

  code = `<sq-result-selector
    [record]="record">
</sq-result-selector>`;

}
