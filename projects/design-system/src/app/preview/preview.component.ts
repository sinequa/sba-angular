import { Component } from '@angular/core';

@Component({
  selector: 'doc-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class DocPreviewComponent {

  code: string = `<sq-facet-card [collapsible]="false" class="d-block mb-3 facet-preview">
  <sq-facet-preview-2 #facet
    [record]="record"
    [query]="searchService.query"></sq-facet-preview-2>
</sq-facet-card>`;

  constructor() { }

}
