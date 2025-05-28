import { Component } from '@angular/core';
import { DocResultDuplicatesComponent } from './result-duplicates/result-duplicates.component';
import { DocResultExtractsComponent } from './result-extracts/result-extracts.component';
import { DocResultIconComponent } from './result-icon/result-icon.component';
import { DocResultMissingTermsComponent } from './result-missing-terms/result-missing-terms.component';
import { DocResultSourceComponent } from './result-source/result-source.component';
import { DocResultThumbnailComponent } from './result-thumbnail/result-thumbnail.component';
import { DocResultTitleComponent } from './result-title/result-title.component';
import { DocResultsCounterComponent } from './results-counter/results-counter.component';
import { DocSponsoredResultsComponent } from './sponsored-results/sponsored-results.component';
import { DocUserRatingComponent } from './user-rating/user-rating.component';

@Component({
  selector: 'doc-result-module',
  templateUrl: '../../module-template.html'
})
export class DocResultModuleComponent {

  title = 'Result Module';

  components = [
    DocResultExtractsComponent,
    DocResultIconComponent,
    DocResultMissingTermsComponent,
    DocResultSourceComponent,
    DocResultThumbnailComponent,
    DocResultTitleComponent,
    DocResultsCounterComponent,
    DocSponsoredResultsComponent,
    DocUserRatingComponent,
    DocResultDuplicatesComponent
  ];

  constructor() { }

}
