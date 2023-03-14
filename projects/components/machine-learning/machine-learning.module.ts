import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { BsSearchModule } from "@sinequa/components/search";
import { ResultModule } from "@sinequa/components/result";
import { UtilsModule } from "@sinequa/components/utils";
import { BsFacetModule } from "@sinequa/components/facet";
import { IntlModule } from "@sinequa/core/intl";

import { AnswerCardComponent } from "./answer-card.component";
import { PassageListComponent } from "./passage-list.component";
import { TopPassagesComponent } from "./top-passages/top-passages.component";
import { SummaryComponent } from "./summary.component";
import { SummarySettingsComponent } from "./summary-settings.component";



@NgModule({
    imports: [
        CommonModule,
        ResultModule,
        IntlModule,
        UtilsModule,
        BsFacetModule,
        FormsModule,
        BsSearchModule.forRoot({})
    ],
    declarations: [
        AnswerCardComponent,
        PassageListComponent,
        TopPassagesComponent,
        SummaryComponent,
        SummarySettingsComponent
    ],
    exports: [
        AnswerCardComponent,
        PassageListComponent,
        TopPassagesComponent,
        SummaryComponent
    ]
})
export class MLModule {
}
