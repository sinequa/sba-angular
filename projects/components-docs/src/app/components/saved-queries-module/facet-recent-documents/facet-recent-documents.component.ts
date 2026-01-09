import { Component } from '@angular/core';
import { UserSettingsWebService } from '@sinequa/core/web-services';
import { environment } from 'src/environments/environment';
import { recentDocuments } from 'src/mocks/data/user-settings';

@Component({
    selector: 'doc-facet-recent-documents',
    templateUrl: './facet-recent-documents.component.html',
    standalone: false
})
export class DocFacetRecentDocumentsComponent {

  code = `<sq-facet-recent-documents></sq-facet-recent-documents>`;

  constructor(private userSettingsService: UserSettingsWebService) {
    if (environment.mock) {
      this.userSettingsService.userSettings = { ...this.userSettingsService.userSettings, ...recentDocuments };
    }
  }

}
