import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-result-link-preview',
  templateUrl: './result-link-preview.component.html'
})
export class ResultLinkPreviewComponent {

  code = `<sq-result-link-preview
    [query]="query"
    [text]="'Some text'"
    [record]="record">
</sq-result-link-preview>`;

  constructor(public globalService: GlobalService) { }

}
