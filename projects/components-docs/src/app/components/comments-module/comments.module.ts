import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocCommentsModuleComponent } from './comments-module.component';
import { DocCommentsComponent } from './comments/comments.component';
import { CommentsModule } from '@sinequa/components/comments';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocCommentsModuleComponent }
];

@NgModule({
  declarations: [
    DocCommentsModuleComponent,
    DocCommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    CommentsModule
  ]
})
export class DocCommentsModule {
  constructor() {
    createElement('doc-comments', DocCommentsComponent);
  }
}
