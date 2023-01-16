import { Component } from '@angular/core';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-preview-page-form',
  templateUrl: './preview-page-form.component.html'
})
export class PreviewPageFormComponent {

  code = `<sq-preview-page-form
    [pageNumber]="previewData?.record?.$page"
    (gotopage)="gotoPage($event)">
</sq-preview-page-form>`;

  constructor(public globalService: GlobalService) { }

}
