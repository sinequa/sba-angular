import { Component } from '@angular/core';
import { DateRangePickerOptions } from '@sinequa/components/advanced';

@Component({
  selector: 'doc-date-range-picker',
  templateUrl: './date-range-picker.component.html'
})
export class DocDateRangePickerComponent {

  options: DateRangePickerOptions;
  options2: DateRangePickerOptions;

  code1 = `<sq-date-range-picker
    [options]="options">
</sq-date-range-picker>

<sq-date-range-picker
    [options]="options2"
    [display]="'column'">
</sq-date-range-picker>`;

  code2 = `options: DateRangePickerOptions;
options2: DateRangePickerOptions;

constructor() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 3);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 45);

    this.options = {
        minDate, maxDate, closedRange: true
    }
    this.options2 = {
        minDate, maxDate, closedRange: false
    }
}`;

  constructor() {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 3);

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 45);

    this.options = {
      minDate, maxDate, closedRange: true
    }
    this.options2 = {
      minDate, maxDate, closedRange: false
    }
  }

}
