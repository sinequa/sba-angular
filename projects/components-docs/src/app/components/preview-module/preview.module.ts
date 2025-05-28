import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocPreviewModuleComponent } from './preview-module.component';
import { DocPreviewComponent } from './preview/preview.component';
import { DocPreviewSearchFormComponent } from './preview-search-form/preview-search-form.component';
import { createElement } from 'src/app/shared/create-element';
import { PreviewModule } from '@sinequa/components/preview';
import { BsFacetModule } from '@sinequa/components/facet';

const routes: Routes = [
  { path: '', component: DocPreviewModuleComponent }
];

@NgModule({
  declarations: [
    DocPreviewModuleComponent,
    DocPreviewComponent,
    DocPreviewSearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsFacetModule,
    DocBaseModule,
    PreviewModule
  ]
})
export class DocPreviewModule {
  constructor() {
    createElement('doc-preview', DocPreviewComponent);
    createElement('doc-preview-search-form', DocPreviewSearchFormComponent);
  }
}
