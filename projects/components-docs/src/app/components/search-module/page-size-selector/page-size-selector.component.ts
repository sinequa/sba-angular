import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-page-size-selector',
    templateUrl: './page-size-selector.component.html',
    standalone: false
})
export class DocPageSizeSelectorComponent extends BaseComponent {

  code = `<sq-page-size-selector
    [results]="results"
    [pageSizes]="[5, 10, 20]">
</sq-page-size-selector>`;

}
