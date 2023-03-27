import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocUserSettingsModuleComponent } from './user-settings-module.component';
import { DocEditUserSettingsComponent } from './edit-user-settings/edit-user-settings.component';
import { DocUserMenuComponent } from './user-menu/user-menu.component';
import { DocUserSettingsEditorComponent } from './user-settings-editor/user-settings-editor.component';
import { BsUserSettingsModule } from '@sinequa/components/user-settings';
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocUserSettingsModuleComponent }
];

@NgModule({
  declarations: [
    DocUserSettingsModuleComponent,
    DocEditUserSettingsComponent,
    DocUserMenuComponent,
    DocUserSettingsEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    BsUserSettingsModule
  ]
})
export class DocUserSettingsModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-edit-user-settings', DocEditUserSettingsComponent);
    this.createElement('doc-user-menu', DocUserMenuComponent);
    this.createElement('doc-user-settings-editor', DocUserSettingsEditorComponent);
  }
}
