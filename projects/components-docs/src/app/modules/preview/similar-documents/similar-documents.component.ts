import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Component({
  selector: 'doc-similar-documents',
  templateUrl: './similar-documents.component.html'
})
export class DocSimilarDocumentsComponent extends BaseComponent {

  code = `<sq-similar-documents
    [sourceDocumentId]="previewData.record.id"
    [query]="query">
</sq-similar-documents>`;

}
