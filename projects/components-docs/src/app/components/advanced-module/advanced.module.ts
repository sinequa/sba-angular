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
import { CustomElementModule } from 'src/app/shared/custom-element-module';

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
    DocSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsAdvancedModule
  ]
})
export class DocAdvancedModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-advanced-form-checkbox', DocAdvancedFormCheckboxComponent);
    this.createElement('doc-advanced-form-input', DocAdvancedFormInputComponent);
    this.createElement('doc-advanced-form-multi-input', DocAdvancedFormMultiInputComponent);
    this.createElement('doc-advanced-form-range', DocAdvancedFormRangeComponent);
    this.createElement('doc-advanced-form-select', DocAdvancedFormSelectComponent);
    this.createElement('doc-date-picker', DocDatePickerComponent);
    this.createElement('doc-date-range-picker', DocDateRangePickerComponent);
    this.createElement('doc-select', DocSelectComponent);
  }
}
