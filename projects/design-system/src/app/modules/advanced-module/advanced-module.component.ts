import { Component } from '@angular/core';
import { AdvancedFormCheckboxComponent } from './advanced-form-checkbox/advanced-form-checkbox.component';
import { AdvancedFormInputComponent } from './advanced-form-input/advanced-form-input.component';
import { AdvancedFormMultiInputComponent } from './advanced-form-multi-input/advanced-form-multi-input.component';
import { AdvancedFormRangeComponent } from './advanced-form-range/advanced-form-range.component';
import { AdvancedFormSelectComponent } from './advanced-form-select/advanced-form-select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { SelectComponent } from './select/select.component';

@Component({
  selector: 'app-advanced-module',
  templateUrl: '../../module-template.html'
})
export class AdvancedModuleComponent {

  title = 'Advanced Module';

  components = [
    AdvancedFormCheckboxComponent,
    AdvancedFormInputComponent,
    AdvancedFormMultiInputComponent,
    AdvancedFormRangeComponent,
    AdvancedFormSelectComponent,
    DatePickerComponent,
    DateRangePickerComponent,
    SelectComponent
  ];

  constructor() { }

}
