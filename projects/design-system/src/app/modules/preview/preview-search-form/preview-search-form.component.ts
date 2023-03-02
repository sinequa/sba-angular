import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-preview-search-form',
  templateUrl: './preview-search-form.component.html'
})
export class DocPreviewSearchFormComponent {

  code = `<sq-preview-search-form
    [query]="query">
</sq-preview-search-form>`;

  constructor(public globalService: GlobalService) { }

}
