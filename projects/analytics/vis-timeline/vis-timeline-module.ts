import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";

import {ResultTimeline} from "./result-timeline/result-timeline";
import { VisTimelineDirective } from "./vis-timeline.directive";

@NgModule({
    imports: [
        CommonModule,
        IntlModule
    ],
    declarations: [
        ResultTimeline,
        VisTimelineDirective
    ],
    exports: [
        ResultTimeline,
        VisTimelineDirective
    ]
})
export class VisTimelineModule {
}
