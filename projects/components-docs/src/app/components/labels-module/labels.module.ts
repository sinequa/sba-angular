import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocLabelsModuleComponent } from './labels-module.component';
import { DocAddLabelComponent } from './add-label/add-label.component';
import { DocDeleteLabelComponent } from './delete-label/delete-label.component';
import { DocEditLabelComponent } from './edit-label/edit-label.component';
import { DocLabelsComponent } from './labels/labels.component';
import { DocLabelsAutocompleteComponent } from './labels-autocomplete/labels-autocomplete.component';
import { DocLabelsMenuComponent } from './labels-menu/labels-menu.component';
import { DocRenameLabelComponent } from './rename-label/rename-label.component';
import { DocResultLabelsComponent } from './result-labels/result-labels.component';
import { BsLabelsModule } from "@sinequa/components/labels";
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocLabelsModuleComponent }
];

@NgModule({
  declarations: [
    DocLabelsModuleComponent,
    DocAddLabelComponent,
    DocDeleteLabelComponent,
    DocEditLabelComponent,
    DocLabelsComponent,
    DocLabelsAutocompleteComponent,
    DocLabelsMenuComponent,
    DocRenameLabelComponent,
    DocResultLabelsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsLabelsModule
  ]
})
export class DocLabelsModule {
  constructor() {
    createElement('doc-add-label', DocAddLabelComponent);
    createElement('doc-delete-label', DocDeleteLabelComponent);
    createElement('doc-edit-label', DocEditLabelComponent);
    createElement('doc-labels-autocomplete', DocLabelsAutocompleteComponent);
    createElement('doc-labels-menu', DocLabelsMenuComponent);
    createElement('doc-rename-label', DocRenameLabelComponent);
    createElement('doc-labels', DocLabelsComponent);
    createElement('doc-result-labels', DocResultLabelsComponent);
  }
}
