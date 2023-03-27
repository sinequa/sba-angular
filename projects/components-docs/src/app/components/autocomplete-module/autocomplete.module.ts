import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocAutocompleteModuleComponent } from './autocomplete-module.component';
import { DocAutocompleteListComponent } from './autocomplete-list/autocomplete-list.component';
import { BsAutocompleteModule } from "@sinequa/components/autocomplete";
import { BsAdvancedModule } from '@sinequa/components/advanced';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
export class DocAutocompleteModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-autocomplete-list', DocAutocompleteListComponent);
  }
}
