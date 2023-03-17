import { Component } from '@angular/core';
import { DatePickerOptions } from '@sinequa/components/advanced';

@Component({
  selector: 'doc-date-picker',
  templateUrl: './date-picker.component.html'
})
export class DocDatePickerComponent {

  options: DatePickerOptions;

  code = `<sq-date-picker
    [options]="options">
</sq-date-picker>`;

  code2 = `options: DatePickerOptions;

constructor() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 3);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 45);

    this.options = {
      minDate, maxDate
    }
}`;

  constructor() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 3);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 45);

    this.options = {
      minDate, maxDate
    }
  }

}
