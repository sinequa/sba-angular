import { Component } from '@angular/core';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { environment } from 'src/environments/environment';
import { savedQueries } from 'src/mocks/data/user-settings';

@Component({
  selector: 'doc-facet-saved-queries',
  templateUrl: './facet-saved-queries.component.html'
})
export class DocFacetSavedQueriesComponent {

  code = `<sq-facet-saved-queries></sq-facet-saved-queries>`;

  constructor(private userSettingsService: UserSettingsWebService) {
    if (environment.mock) {
      this.userSettingsService.userSettings = { ...this.userSettingsService.userSettings, ...savedQueries };
    }
  }

}
