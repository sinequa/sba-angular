import { Component } from '@angular/core';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { environment } from 'src/environments/environment';
import { recentQueries } from 'src/mocks/data/user-settings';

@Component({
  selector: 'doc-facet-recent-queries',
  templateUrl: './facet-recent-queries.component.html'
})
export class DocFacetRecentQueriesComponent {

  code = `<sq-facet-recent-queries></sq-facet-recent-queries>`;

  constructor(private userSettingsService: UserSettingsWebService) {
    if (environment.mock) {
      this.userSettingsService.userSettings = { ...this.userSettingsService.userSettings, ...recentQueries };
    }
  }

}
