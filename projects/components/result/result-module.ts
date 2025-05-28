import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";

import {ResultTitle} from "./result-title/result-title";
import {ResultSource} from "./result-source/result-source";
import {ResultExtracts} from "./result-extracts/result-extracts";
import {ResultMissingTerms} from "./result-missing-terms/result-missing-terms";
import {ResultThumbnail} from "./result-thumbnail/result-thumbnail";
import {UserRating} from "./user-rating/user-rating";
import {SponsoredResults} from './sponsored-results/sponsored-results';
import {ResultsCounter} from "./results-counter/results-counter";
import {ResultIcon} from "./result-icon/result-icon";
import {ResultDuplicatesComponent} from "./result-duplicates/result-duplicates.component";
import {ResultDuplicatesListComponent} from "./result-duplicates-list/result-duplicates-list.component";
import { ResultDuplicatesSpacerComponent } from "./result-duplicates-spacer/result-duplicates-spacer.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        IntlModule,

        UtilsModule,
        CollapseModule
    ],
    declarations: [
        ResultTitle, ResultExtracts,
        ResultMissingTerms,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource,
        ResultDuplicatesComponent, ResultDuplicatesListComponent, ResultDuplicatesSpacerComponent
    ],
    exports: [
        ResultTitle, ResultExtracts,
        ResultMissingTerms,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource,
        ResultDuplicatesComponent, ResultDuplicatesListComponent, ResultDuplicatesSpacerComponent
    ]
})
export class ResultModule {
}
