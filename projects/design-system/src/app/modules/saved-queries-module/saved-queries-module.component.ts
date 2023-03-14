import { Component } from '@angular/core';
import { DocEditSavedQueryComponent } from './edit-saved-query/edit-saved-query.component';
import { DocExportQueryComponent } from './export-query/export-query.component';
import { DocFacetRecentDocumentsComponent } from './facet-recent-documents/facet-recent-documents.component';
import { DocFacetRecentQueriesComponent } from './facet-recent-queries/facet-recent-queries.component';
import { DocFacetSavedQueriesComponent } from './facet-saved-queries/facet-saved-queries.component';
import { DocManageSavedQueriesComponent } from './manage-saved-queries/manage-saved-queries.component';
import { DocQueryExporterComponent } from './query-exporter/query-exporter.component';
import { DocSavedQueriesMenuComponent } from './saved-queries-menu/saved-queries-menu.component';

@Component({
  selector: 'doc-saved-queries-module',
  templateUrl: '../../module-template.html'
})
export class DocSavedQueriesModuleComponent {

  title = 'Saved Queries Module';
  description = ``;

  components = [
    DocEditSavedQueryComponent,
    DocExportQueryComponent,
    DocFacetRecentDocumentsComponent,
    DocFacetRecentQueriesComponent,
    DocFacetSavedQueriesComponent,
    DocManageSavedQueriesComponent,
    DocQueryExporterComponent,
    DocSavedQueriesMenuComponent
  ];

  constructor() { }

}
