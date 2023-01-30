import { Component } from '@angular/core';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html'
})
export class EditableComponent {

  code = `<sq-editable
    [name]="'name'"
    [value]="'value'">
</sq-editable>`;

  constructor() { }

}
