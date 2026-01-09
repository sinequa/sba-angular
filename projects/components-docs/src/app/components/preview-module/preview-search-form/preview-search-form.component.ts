import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
    selector: 'doc-preview-search-form',
    templateUrl: './preview-search-form.component.html',
    standalone: false
})
export class DocPreviewSearchFormComponent extends BaseComponent {

  code = `<sq-preview-search-form
    [query]="query">
</sq-preview-search-form>`;

}
