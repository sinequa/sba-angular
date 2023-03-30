import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocSlideBuilderModuleComponent } from './slide-builder-module.component';
import { DocSlideBuilderComponent } from './slide-builder/slide-builder.component';
import { DocSlideListComponent } from './slide-list/slide-list.component';
import { SlideBuilderModule } from '@sinequa/components/slide-builder';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocSlideBuilderModuleComponent }
];

@NgModule({
  declarations: [
    DocSlideBuilderModuleComponent,
    DocSlideBuilderComponent,
    DocSlideListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    SlideBuilderModule
  ]
})
export class DocSlideBuilderModule {
  constructor() {
    createElement('doc-slide-builder', DocSlideBuilderComponent);
    createElement('doc-slide-list', DocSlideListComponent);
  }
}
