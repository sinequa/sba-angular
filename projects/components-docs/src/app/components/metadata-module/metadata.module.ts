import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocMetadataModuleComponent } from './metadata-module.component';
import { DocMetadataComponent } from './metadata/metadata.component';
import { MetadataModule } from "@sinequa/components/metadata";
import { createElement } from 'src/app/shared/create-element';
import { DocMetadataItemComponent } from './metadata-item/metadata-item.component';

const routes: Routes = [
  { path: '', component: DocMetadataModuleComponent }
];

@NgModule({
  declarations: [
    DocMetadataModuleComponent,
    DocMetadataComponent,
    DocMetadataItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    MetadataModule
  ]
})
export class DocMetadataModule {
  constructor() {
    createElement('doc-metadata', DocMetadataComponent);
    createElement('doc-metadata-item', DocMetadataItemComponent);
  }
}
