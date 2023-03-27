import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocCommentsModuleComponent } from './comments-module.component';
import { DocCommentsComponent } from './comments/comments.component';
import { CommentsModule } from '@sinequa/components/comments';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocCommentsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-comments', DocCommentsComponent);
  }
}
