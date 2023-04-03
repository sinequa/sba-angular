import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';

@Component({
  selector: 'doc-preview-page-form',
  templateUrl: './preview-page-form.component.html'
})
export class DocPreviewPageFormComponent extends BaseComponent {

  code = `<sq-preview-page-form
    [pageNumber]="previewData?.record?.$page"
    (gotopage)="gotoPage($event)">
</sq-preview-page-form>`;

}
