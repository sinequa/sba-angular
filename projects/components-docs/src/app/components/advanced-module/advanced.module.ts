import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocAdvancedModuleComponent } from './advanced-module.component';
import { DocAdvancedFormCheckboxComponent } from './advanced-form-checkbox/advanced-form-checkbox.component';
import { DocAdvancedFormInputComponent } from './advanced-form-input/advanced-form-input.component';
import { DocAdvancedFormMultiInputComponent } from './advanced-form-multi-input/advanced-form-multi-input.component';
import { DocAdvancedFormRangeComponent } from './advanced-form-range/advanced-form-range.component';
import { DocAdvancedFormSelectComponent } from './advanced-form-select/advanced-form-select.component';
import { DocDatePickerComponent } from './date-picker/date-picker.component';
import { DocDateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DocSelectComponent } from './select/select.component';
import { BsAdvancedModule } from '@sinequa/components/advanced';
import { createElement } from 'src/app/shared/create-element';
import { DocAdvancedFormComponent } from './advanced-form/doc-advanced-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DocAdvancedModuleComponent }
];

@NgModule({
  declarations: [
    DocAdvancedModuleComponent,
    DocAdvancedFormCheckboxComponent,
    DocAdvancedFormInputComponent,
    DocAdvancedFormMultiInputComponent,
    DocAdvancedFormRangeComponent,
    DocAdvancedFormSelectComponent,
    DocDatePickerComponent,
    DocDateRangePickerComponent,
    DocSelectComponent,
    DocAdvancedFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DocBaseModule,
    BsAdvancedModule
  ]
})
export class DocAdvancedModule {
  constructor() {
    createElement('doc-advanced-form-checkbox', DocAdvancedFormCheckboxComponent);
    createElement('doc-advanced-form-input', DocAdvancedFormInputComponent);
    createElement('doc-advanced-form-multi-input', DocAdvancedFormMultiInputComponent);
    createElement('doc-advanced-form-range', DocAdvancedFormRangeComponent);
    createElement('doc-advanced-form-select', DocAdvancedFormSelectComponent);
    createElement('doc-date-picker', DocDatePickerComponent);
    createElement('doc-date-range-picker', DocDateRangePickerComponent);
    createElement('doc-select', DocSelectComponent);
    createElement('doc-advanced-form', DocAdvancedFormComponent);
  }
}
