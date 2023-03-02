import { Component } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'doc-similar-documents',
  templateUrl: './similar-documents.component.html'
})
export class DocSimilarDocumentsComponent {

  code = `<sq-similar-documents
    [sourceDocumentId]="previewData.record.id"
    [query]="query">
</sq-similar-documents>`;

  constructor(public globalService: GlobalService) { }

}
