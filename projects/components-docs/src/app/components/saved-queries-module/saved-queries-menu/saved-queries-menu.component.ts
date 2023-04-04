import { Component } from '@angular/core';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { environment } from 'src/environments/environment';
import { savedQueries } from 'src/mocks/data/user-settings';

@Component({
  selector: 'doc-saved-queries-menu',
  templateUrl: './saved-queries-menu.component.html'
})
export class DocSavedQueriesMenuComponent {

  code = `<sq-saved-queries-menu></sq-saved-queries-menu>`;

  constructor(private userSettingsService: UserSettingsWebService) {
    if (environment.mock) {
      this.userSettingsService.userSettings = { ...this.userSettingsService.userSettings, ...savedQueries };
    }
  }

}
