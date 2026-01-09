import { Component } from '@angular/core';

@Component({
    selector: 'doc-edit-user-settings',
    templateUrl: './edit-user-settings.component.html',
    standalone: false
})
export class DocEditUserSettingsComponent {

  code = `<sq-edit-user-settings [showUILanguageSelector]="true"></sq-edit-user-settings>`;

  constructor() { }

}
