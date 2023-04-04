import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonInfo } from '@sinequa/components/user-settings/bootstrap/user-settings-editor/jsonInfo.model';
import { MapOf } from '@sinequa/core/base';
import { IntlService } from '@sinequa/core/intl/intl.service';

@Component({
  selector: 'doc-user-settings-editor',
  templateUrl: './user-settings-editor.component.html'
})
export class DocUserSettingsEditorComponent {

  code = `<sq-user-settings-editor
    [form]="form"
    [model]="model"
    [layout]="layout"
    [showUILanguageSelector]="true">
</sq-user-settings-editor>`;

code2 = `import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonInfo } from '@sinequa/components/user-settings/bootstrap/user-settings-editor/jsonInfo.model';
import { MapOf } from '@sinequa/core/base';
import { IntlService } from '@sinequa/core/intl/intl.service';

...

form: FormGroup;
public model: Record<string, any>;
public layout: MapOf<JsonInfo.Entry>;

constructor(formBuilder: FormBuilder,
            intlService: IntlService) {
    this.form = formBuilder.group({
        'selectedLocale': [intlService.currentLocale.name]
    });
    this.layout = {};
    this.model = {
        'language': intlService.currentLocale.name
    };
}
`;

  form: FormGroup;
  public model: Record<string, any>;
  public layout: MapOf<JsonInfo.Entry>;

  constructor(formBuilder: FormBuilder,
    intlService: IntlService) {
    this.form = formBuilder.group({
      'selectedLocale': [intlService.currentLocale.name]
    });
    this.layout = {};
    this.model = {
      'language': intlService.currentLocale.name
    };
  }

}
