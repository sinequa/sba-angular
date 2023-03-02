import { Component } from '@angular/core';
import { ExportQueryModel } from '@sinequa/components/saved-queries';
import { MODAL_MODEL } from '@sinequa/core/modal';
import { ExportOutputFormat, ExportSourceType } from '@sinequa/core/web-services';

const exportQuery: ExportQueryModel = {
  format: ExportOutputFormat.Xlsx,
  export: ExportSourceType.SavedQuery,
  webService: '_queryexport'
};

@Component({
  selector: 'doc-export-query',
  templateUrl: './export-query.component.html',
  providers: [
    {provide: MODAL_MODEL, useValue: exportQuery}
  ]
})
export class DocExportQueryComponent {

  code = `<sq-export-query></sq-export-query>`;

  code2 = `const exportQuery: ExportQueryModel = {
    format: ExportOutputFormat.Xlsx,
    export: ExportSourceType.SavedQuery,
    webService: '_queryexport'
};

providers: [
    {provide: MODAL_MODEL, useValue: exportQuery}
]`;

  constructor() { }

}
