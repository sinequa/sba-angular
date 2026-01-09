import { Component } from '@angular/core';
import { DocAdvancedFormCheckboxComponent } from './advanced-form-checkbox/advanced-form-checkbox.component';
import { DocAdvancedFormInputComponent } from './advanced-form-input/advanced-form-input.component';
import { DocAdvancedFormMultiInputComponent } from './advanced-form-multi-input/advanced-form-multi-input.component';
import { DocAdvancedFormRangeComponent } from './advanced-form-range/advanced-form-range.component';
import { DocAdvancedFormSelectComponent } from './advanced-form-select/advanced-form-select.component';
import { DocDatePickerComponent } from './date-picker/date-picker.component';
import { DocDateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DocSelectComponent } from './select/select.component';
import { DocAdvancedFormComponent } from './advanced-form/doc-advanced-form.component';

@Component({
    selector: 'doc-advanced-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocAdvancedModuleComponent {

  title = 'Advanced Module';

  components = [
    DocAdvancedFormCheckboxComponent,
    DocAdvancedFormInputComponent,
    DocAdvancedFormMultiInputComponent,
    DocAdvancedFormRangeComponent,
    DocAdvancedFormSelectComponent,
    DocDatePickerComponent,
    DocDateRangePickerComponent,
    DocSelectComponent,
    DocAdvancedFormComponent
  ];

  constructor() { }

}
