import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { AnswerCardComponent } from "./answer-card.component";
import { PassageListComponent } from "./passage-list.component";
import { ResultModule } from "@sinequa/components/result";
import { UtilsModule } from "@sinequa/components/utils";


@NgModule({
    imports: [
        CommonModule,
        ResultModule,
        UtilsModule
    ],
    declarations: [
        AnswerCardComponent,
        PassageListComponent
    ],
    exports: [
        AnswerCardComponent,
        PassageListComponent
    ]
})
export class MLModule {
}
