import { Component } from '@angular/core';
import { ValueItem } from '@sinequa/core/app-utils';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html'
})
export class SelectComponent {

  items: ValueItem[] = [
    {value: 'value1', display: 'value1'},
    {value: 'value2', display: 'value2'},
    {value: 'value3', display: 'value3'},
    {value: 'value4', display: 'value4'}
  ];

  code = `<sq-select
    [items]="items"
    [multiple]="true">
</sq-select>`;

  code2 = `items: ValueItem[] = [
    {value: 'value1', display: 'value1'},
    {value: 'value2', display: 'value2'},
    {value: 'value3', display: 'value3'},
    {value: 'value4', display: 'value4'}
];`;

  constructor() { }

}