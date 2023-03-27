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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocSavedQueriesModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-edit-saved-query', DocEditSavedQueryComponent);
    this.createElement('doc-export-query', DocExportQueryComponent);
    this.createElement('doc-facet-recent-documents', DocFacetRecentDocumentsComponent);
    this.createElement('doc-facet-recent-queries', DocFacetRecentQueriesComponent);
    this.createElement('doc-facet-saved-queries', DocFacetSavedQueriesComponent);
    this.createElement('doc-manage-saved-queries', DocManageSavedQueriesComponent);
    this.createElement('doc-query-exporter', DocQueryExporterComponent);
    this.createElement('doc-saved-queries-menu', DocSavedQueriesMenuComponent);
  }
}
