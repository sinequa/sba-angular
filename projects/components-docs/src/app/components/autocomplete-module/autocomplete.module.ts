import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocAutocompleteModuleComponent } from './autocomplete-module.component';
import { DocAutocompleteListComponent } from './autocomplete-list/autocomplete-list.component';
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { BsAdvancedModule } from '@sinequa/components/advanced';
import { createElement } from 'src/app/shared/create-element';

const routes: Routes = [
  { path: '', component: DocAutocompleteModuleComponent }
];

@NgModule({
  declarations: [
    DocAutocompleteModuleComponent,
    DocAutocompleteListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsAutocompleteModule,
    BsAdvancedModule
  ]
})
export class DocAutocompleteModule {
  constructor() {
    createElement('doc-autocomplete-list', DocAutocompleteListComponent);
  }
}
