import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocMetadataModuleComponent } from './metadata-module.component';
import { DocMetadataComponent } from './metadata/metadata.component';
import { MetadataModule } from "@sinequa/components/metadata";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocMetadataModuleComponent }
];

@NgModule({
  declarations: [
    DocMetadataModuleComponent,
    DocMetadataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    MetadataModule
  ]
})
export class DocMetadataModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-metadata', DocMetadataComponent);
  }
}
