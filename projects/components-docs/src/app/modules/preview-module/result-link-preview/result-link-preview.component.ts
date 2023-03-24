import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-result-link-preview',
  templateUrl: './result-link-preview.component.html'
})
export class DocResultLinkPreviewComponent extends BaseComponent {

  code = `<sq-result-link-preview
    [query]="query"
    [text]="'Some text'"
    [record]="record">
</sq-result-link-preview>`;

}
