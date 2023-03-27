import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocBaseModule } from '../../shared/base.module';
import { RouterModule, Routes } from '@angular/router';
import { DocResultModuleComponent } from './result-module.component';
import { DocResultExtractsComponent } from './result-extracts/result-extracts.component';
import { DocResultIconComponent } from './result-icon/result-icon.component';
import { DocResultMissingTermsComponent } from './result-missing-terms/result-missing-terms.component';
import { DocResultSourceComponent } from './result-source/result-source.component';
import { DocResultThumbnailComponent } from './result-thumbnail/result-thumbnail.component';
import { DocResultTitleComponent } from './result-title/result-title.component';
import { DocResultsCounterComponent } from './results-counter/results-counter.component';
import { DocSponsoredResultsComponent } from './sponsored-results/sponsored-results.component';
import { DocUserRatingComponent } from './user-rating/user-rating.component';
import { ResultModule } from "@sinequa/components/result";
import { CustomElementModule } from 'src/app/shared/custom-element-module';

const routes: Routes = [
  { path: '', component: DocResultModuleComponent }
];

@NgModule({
  declarations: [
    DocResultModuleComponent,
    DocResultExtractsComponent,
    DocResultIconComponent,
    DocResultMissingTermsComponent,
    DocResultSourceComponent,
    DocResultThumbnailComponent,
    DocResultTitleComponent,
    DocResultsCounterComponent,
    DocSponsoredResultsComponent,
    DocUserRatingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DocBaseModule,
    ResultModule
  ]
})
export class DocResultModule extends CustomElementModule {
  constructor() {
    super();
    this.createElement('doc-result-title', DocResultTitleComponent);
    this.createElement('doc-result-extracts', DocResultExtractsComponent);
    this.createElement('doc-result-missing-terms', DocResultMissingTermsComponent);
    this.createElement('doc-result-thumbnail', DocResultThumbnailComponent);
    this.createElement('doc-user-rating', DocUserRatingComponent);
    this.createElement('doc-sponsored-results', DocSponsoredResultsComponent);
    this.createElement('doc-results-counter', DocResultsCounterComponent);
    this.createElement('doc-result-icon', DocResultIconComponent);
    this.createElement('doc-result-source', DocResultSourceComponent);
  }
}
