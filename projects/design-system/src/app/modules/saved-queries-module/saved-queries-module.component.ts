import { Component } from '@angular/core';
import { EditSavedQueryComponent } from './edit-saved-query/edit-saved-query.component';
import { ExportQueryComponent } from './export-query/export-query.component';
import { FacetRecentDocumentsComponent } from './facet-recent-documents/facet-recent-documents.component';
import { FacetRecentQueriesComponent } from './facet-recent-queries/facet-recent-queries.component';
import { FacetSavedQueriesComponent } from './facet-saved-queries/facet-saved-queries.component';
import { ManageSavedQueriesComponent } from './manage-saved-queries/manage-saved-queries.component';
import { QueryExporterComponent } from './query-exporter/query-exporter.component';
import { SavedQueriesMenuComponent } from './saved-queries-menu/saved-queries-menu.component';

@Component({
  selector: 'app-saved-queries-module',
  templateUrl: '../module-template.html'
})
export class SavedQueriesModuleComponent {

  title = 'Saved Queries Module';

  components = [
    EditSavedQueryComponent,
    ExportQueryComponent,
    FacetRecentDocumentsComponent,
    FacetRecentQueriesComponent,
    FacetSavedQueriesComponent,
    ManageSavedQueriesComponent,
    QueryExporterComponent,
    SavedQueriesMenuComponent
  ];

  constructor() { }

}
