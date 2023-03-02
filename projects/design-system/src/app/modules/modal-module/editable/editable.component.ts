import { Component } from '@angular/core';

@Component({
  selector: 'doc-editable',
  templateUrl: './editable.component.html'
})
export class DocEditableComponent {

  code = `<sq-editable
    [name]="'name'"
    [value]="'value'">
</sq-editable>`;

  constructor() { }

}
