import { Component } from '@angular/core';
import { ResultExtractsComponent } from './result-extracts/result-extracts.component';
import { ResultIconComponent } from './result-icon/result-icon.component';
import { ResultMissingTermsComponent } from './result-missing-terms/result-missing-terms.component';
import { ResultSourceComponent } from './result-source/result-source.component';
import { ResultThumbnailComponent } from './result-thumbnail/result-thumbnail.component';
import { ResultTitleComponent } from './result-title/result-title.component';
import { ResultsCounterComponent } from './results-counter/results-counter.component';
import { SponsoredResultsComponent } from './sponsored-results/sponsored-results.component';
import { UserRatingComponent } from './user-rating/user-rating.component';

@Component({
  selector: 'app-result-module',
  templateUrl: './result-module.component.html'
})
export class ResultModuleComponent {

  components = [
    ResultExtractsComponent,
    ResultIconComponent,
    ResultMissingTermsComponent,
    ResultSourceComponent,
    ResultThumbnailComponent,
    ResultTitleComponent,
    ResultsCounterComponent,
    SponsoredResultsComponent,
    UserRatingComponent
  ];

  constructor() { }

}
