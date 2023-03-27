import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonInfo } from '@sinequa/components/user-settings/bootstrap/user-settings-editor/jsonInfo.model';
import { MapOf } from '@sinequa/core/base';
import { IntlService, Locale } from '@sinequa/core/intl/intl.service';

@Component({
  selector: 'doc-user-settings-editor',
  templateUrl: './user-settings-editor.component.html'
})
export class DocUserSettingsEditorComponent {

  code = `<sq-user-settings-editor
    [form]="form"
    [model]="model"
    [layout]="layout">
</sq-user-settings-editor>`;

  form: FormGroup;
  public model: Record<string, any>;
  public layout: MapOf<JsonInfo.Entry>;

  constructor(formBuilder: FormBuilder,
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
