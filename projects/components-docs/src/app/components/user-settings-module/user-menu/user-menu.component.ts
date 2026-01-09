import { Component } from '@angular/core';

@Component({
    selector: 'doc-user-menu',
    templateUrl: './user-menu.component.html',
    standalone: false
})
export class DocUserMenuComponent {

  code = `<sq-user-menu
    [showText]="true">
</sq-user-menu>`;

  constructor() { }

}
