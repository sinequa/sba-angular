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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocLabelsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-add-label', DocAddLabelComponent);
    this.createElement('doc-delete-label', DocDeleteLabelComponent);
    this.createElement('doc-edit-label', DocEditLabelComponent);
    this.createElement('doc-labels-autocomplete', DocLabelsAutocompleteComponent);
    this.createElement('doc-labels-menu', DocLabelsMenuComponent);
    this.createElement('doc-rename-label', DocRenameLabelComponent);
    this.createElement('doc-labels', DocLabelsComponent);
    this.createElement('doc-result-labels', DocResultLabelsComponent);
  }
}
