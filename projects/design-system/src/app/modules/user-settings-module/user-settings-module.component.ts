import { Component } from '@angular/core';
import { EditUserSettingsComponent } from './edit-user-settings/edit-user-settings.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserSettingsEditorComponent } from './user-settings-editor/user-settings-editor.component';

@Component({
  selector: 'app-user-settings-module',
  templateUrl: '../module-template.html'
})
export class UserSettingsModuleComponent {

  title = 'User Settings Module';

  components = [
    EditUserSettingsComponent,
    UserMenuComponent,
    UserSettingsEditorComponent
  ];

  constructor() { }

}
