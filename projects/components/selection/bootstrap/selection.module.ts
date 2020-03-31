import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";

import {BsActionModule} from "@sinequa/components/action";

import {BsResultsSelector} from "./results-selector/results-selector";
import {BsResultSelector} from "./result-selector/result-selector";

@NgModule({
    imports: [
        CommonModule,

        IntlModule,

        BsActionModule,
    ],
    declarations: [
        BsResultsSelector, BsResultSelector,
    ],
    exports: [
        BsResultsSelector, BsResultSelector,
    ]
})
export class BsSelectionModule {
}
