import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BsActionModule} from "@sinequa/components/action";
import {BsRfmAction} from "./rfm-action/rfm-action";

@NgModule({
    imports: [
        CommonModule,

        BsActionModule
    ],
    declarations: [
        BsRfmAction
    ],
    exports: [
        BsRfmAction
    ]
})
export class BsRfmModule {
}
