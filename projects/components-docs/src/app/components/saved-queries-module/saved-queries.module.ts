import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocSavedQueriesModuleComponent } from './saved-queries-module.component';
import { DocEditSavedQueryComponent } from './edit-saved-query/edit-saved-query.component';
import { DocExportQueryComponent } from './export-query/export-query.component';
import { DocFacetRecentDocumentsComponent } from './facet-recent-documents/facet-recent-documents.component';
import { DocFacetRecentQueriesComponent } from './facet-recent-queries/facet-recent-queries.component';
import { DocFacetSavedQueriesComponent } from './facet-saved-queries/facet-saved-queries.component';
import { DocManageSavedQueriesComponent } from './manage-saved-queries/manage-saved-queries.component';
import { DocQueryExporterComponent } from './query-exporter/query-exporter.component';
import { DocSavedQueriesMenuComponent } from './saved-queries-menu/saved-queries-menu.component';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocSavedQueriesModuleComponent }
];

@NgModule({
  declarations: [
    DocSavedQueriesModuleComponent,
    DocEditSavedQueryComponent,
    DocExportQueryComponent,
    DocFacetRecentDocumentsComponent,
    DocFacetRecentQueriesComponent,
    DocFacetSavedQueriesComponent,
    DocManageSavedQueriesComponent,
    DocQueryExporterComponent,
    DocSavedQueriesMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsSavedQueriesModule
  ]
})
export class DocSavedQueriesModule {
  constructor() {
    createElement('doc-edit-saved-query', DocEditSavedQueryComponent);
    createElement('doc-export-query', DocExportQueryComponent);
    createElement('doc-facet-recent-documents', DocFacetRecentDocumentsComponent);
    createElement('doc-facet-recent-queries', DocFacetRecentQueriesComponent);
    createElement('doc-facet-saved-queries', DocFacetSavedQueriesComponent);
    createElement('doc-manage-saved-queries', DocManageSavedQueriesComponent);
    createElement('doc-query-exporter', DocQueryExporterComponent);
    createElement('doc-saved-queries-menu', DocSavedQueriesMenuComponent);
  }
}
