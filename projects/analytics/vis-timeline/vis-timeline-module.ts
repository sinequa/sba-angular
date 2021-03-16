import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";

import {VisModule} from "ngx-vis";

import {ResultTimeline} from "./result-timeline/result-timeline";

@NgModule({
    imports: [
        CommonModule,

        IntlModule,

        VisModule
    ],
    declarations: [
        ResultTimeline
    ],
    exports: [
        ResultTimeline
    ]
})
export class VisTimelineModule {
}
