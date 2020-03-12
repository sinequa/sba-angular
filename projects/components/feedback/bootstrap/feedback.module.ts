import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";
import {BsActionModule} from "@sinequa/components/action";
import {BsModalModule} from "@sinequa/components/modal";

import {FEEDBACK_COMPONENTS} from "../feedback.service";
import {BsFeedbackForm} from "./feedback-form/feedback-form";
import {BsFeedbackMenu} from "./feedback-menu/feedback-menu";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        FormsModule, ReactiveFormsModule,
        BsActionModule,
        ValidationModule,
        BsModalModule
    ],
    declarations: [
        BsFeedbackForm, BsFeedbackMenu
    ],
    exports: [
        BsFeedbackMenu
    ],
    providers: [
        { 
            provide: FEEDBACK_COMPONENTS, 
            useValue: {
                feedbackForm: BsFeedbackForm
            }
        }
    ]
})
export class BsFeedbackModule {
}
