import { Component } from '@angular/core';
import { ValueItem } from '@sinequa/core/app-utils';

@Component({
    selector: 'doc-select',
    templateUrl: './select.component.html',
    standalone: false
})
export class DocSelectComponent {

  items: ValueItem[] = [
    {value: 'value1', display: 'value1'},
    {value: 'value2', display: 'value2'},
    {value: 'value3', display: 'value3'},
    {value: 'value4', display: 'value4'}
  ];

  code1 = `<sq-select
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