import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";

import {UtilsModule} from "@sinequa/components/utils";
import {CollapseModule} from "@sinequa/components/collapse";
import {MetadataModule} from "@sinequa/components/metadata";

import {ResultTitle} from "./result-title/result-title";
import {ResultSource} from "./result-source/result-source";
import {ResultExtracts} from "./result-extracts/result-extracts";
import {ResultMissingTerms} from "./result-missing-terms/result-missing-terms";
import {ResultMetadata} from "./result-metadata/result-metadata";
import {ResultThumbnail} from "./result-thumbnail/result-thumbnail";
import {UserRating} from "./user-rating/user-rating";
import {SponsoredResults} from './sponsored-results/sponsored-results';
import {ResultsCounter} from "./results-counter/results-counter";
import {ResultIcon} from "./result-icon/result-icon";
import {ResultEntitySummary} from "./result-entity-summary/result-entity-summary";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,

        IntlModule,

        UtilsModule,
        CollapseModule,
        MetadataModule
    ],
    declarations: [
        ResultTitle, ResultExtracts,
        ResultMissingTerms, ResultMetadata,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource,
        ResultEntitySummary
    ],
    exports: [
        ResultTitle, ResultExtracts,
        ResultMissingTerms, ResultMetadata,
        ResultThumbnail, UserRating,
        SponsoredResults, ResultsCounter,
        ResultIcon, ResultSource,
        ResultEntitySummary
    ]
})
export class ResultModule {
}
