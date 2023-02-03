import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { JsonInfo } from '@sinequa/components/user-settings/bootstrap/user-settings-editor/jsonInfo.model';
import { MapOf } from '@sinequa/core/base';
import { IntlService, Locale } from '@sinequa/core/intl/intl.service';

@Component({
  selector: 'app-user-settings-editor',
  templateUrl: './user-settings-editor.component.html'
})
export class UserSettingsEditorComponent {

  code = `<sq-user-settings-editor
    [form]="form"
    [model]="model"
    [layout]="layout">
</sq-user-settings-editor>`;

  form: UntypedFormGroup;
  public model: MapOf<any>;
  public layout: MapOf<JsonInfo.Entry>;

  constructor(formBuilder: UntypedFormBuilder,
    intlService: IntlService) {
    const locale: Locale = {
      name: 'fr-FR',
      display: 'Français'
    };
    this.form = formBuilder.group({
      'selectedLocale': locale
    });

    this.layout = {};
    this.model = {
      'language': intlService.currentLocale.name
    };
  }

}
