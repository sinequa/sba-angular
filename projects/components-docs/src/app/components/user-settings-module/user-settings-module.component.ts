import { Component } from '@angular/core';
import { DocEditUserSettingsComponent } from './edit-user-settings/edit-user-settings.component';
import { DocUserMenuComponent } from './user-menu/user-menu.component';
import { DocUserSettingsEditorComponent } from './user-settings-editor/user-settings-editor.component';

@Component({
    selector: 'doc-user-settings-module',
    templateUrl: '../../module-template.html',
    standalone: false
})
export class DocUserSettingsModuleComponent {

  title = 'User Settings Module';

  components = [
    DocEditUserSettingsComponent,
    DocUserMenuComponent,
    DocUserSettingsEditorComponent
  ];

  constructor() { }

}
