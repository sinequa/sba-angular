import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-selection-arranger',
    templateUrl: './selection-arranger.component.html',
    standalone: false
})
export class DocSelectionArrangerComponent extends BaseComponent {

  code = `<sq-selection-arranger [records]="records">
    <ng-template let-record>
        {{record.title}}
    </ng-template>
</sq-selection-arranger>`;

}
