import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html'
})
export class ModalHeaderComponent {

  code = `<sq-modal-header
    [title]="'title'">
</sq-modal-header>`;

  constructor() { }

}
