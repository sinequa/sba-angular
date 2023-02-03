import { Component } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {

  code = `<sq-user-menu
    [showText]="true">
</sq-user-menu>`;

  constructor() { }

}
