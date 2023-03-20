import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-selection-arranger',
  templateUrl: './selection-arranger.component.html'
})
export class DocSelectionArrangerComponent extends BaseComponent {

  code = `<sq-selection-arranger
    [records]="records">
</sq-selection-arranger>`;

}
