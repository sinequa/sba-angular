import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ResultModule } from "@sinequa/components/result";
import { UtilsModule } from "@sinequa/components/utils";
import { IntlModule } from "@sinequa/core/intl";

import { AnswerCardComponent } from "./answer-card.component";
import { PassageListComponent } from "./passage-list.component";
import { TopPassagesComponent } from "./top-passages/top-passages.component";


@NgModule({
    imports: [
        CommonModule,
        ResultModule,
        IntlModule,
        UtilsModule
    ],
    declarations: [
        AnswerCardComponent,
        PassageListComponent,
        TopPassagesComponent
    ],
    exports: [
        AnswerCardComponent,
        PassageListComponent,
        TopPassagesComponent
    ]
})
export class MLModule {
}
