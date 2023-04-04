import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-facet-preview-component',
  templateUrl: './facet-preview-component.component.html'
})
export class DocFacetPreviewComponentComponent extends BaseComponent {

  code = `<sq-facet-preview-2
    [query]="query"
    [record]="record">
</sq-facet-preview-2>`;

}
