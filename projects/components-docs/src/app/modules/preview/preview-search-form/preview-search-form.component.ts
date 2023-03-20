import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-preview-search-form',
  templateUrl: './preview-search-form.component.html'
})
export class DocPreviewSearchFormComponent extends BaseComponent {

  code = `<sq-preview-search-form
    [query]="query">
</sq-preview-search-form>`;

}
