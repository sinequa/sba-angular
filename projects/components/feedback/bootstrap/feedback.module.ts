import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";
import {BsActionModule} from "@sinequa/components/action";
import {BsModalModule} from "@sinequa/components/modal";

import {BsFeedbackMenu} from "./feedback-menu/feedback-menu";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        BsActionModule,
        ValidationModule,
        BsModalModule
    ],
    declarations: [
        BsFeedbackMenu
    ],
    exports: [
        BsFeedbackMenu
    ]
})
export class BsFeedbackModule {
}
