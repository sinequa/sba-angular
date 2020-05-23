import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";

// Formatting pipes
import {DatePipe} from "./pipes/date-pipe";
import {ExprPipe} from "./pipes/expr-pipe";
import {MemorySizePipe} from "./pipes/memory-size-pipe";
import {MomentPipe} from "./pipes/moment-pipe";
import {NumberPipe} from "./pipes/number-pipe";
import {RelativeTimePipe} from "./pipes/relative-time-pipe";
import {TimePipe} from "./pipes/time-pipe";
import {ValuePipe} from "./pipes/value-pipe";

// UI Directives
import {Autofocus} from "./directives/autofocus";
import {ClickOutside} from "./directives/click-outside";
import {Load} from "./directives/load";
import {MediaIf} from "./directives/media-if";
import {ScrollIntoView} from "./directives/scroll-into-view";

// UI Service
import {SCREEN_SIZE_RULES} from "./ui.service";

export const defaultScreenSizeRules = {
    xxl: "(min-width: 1920px)",
    xl: "(min-width: 1200px) and (max-width: 1920px)",
    lg: "(min-width: 992px) and (max-width: 1200px)",
    md: "(min-width: 768px) and (max-width: 992px)",
    sm: "(min-width: 576px) and (max-width: 768px)",
    xs: "(max-width: 576px)",
};

@NgModule({
    imports: [
        CommonModule,
        IntlModule
    ],
    declarations: [
        DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, Load, MediaIf, ScrollIntoView,
    ],
    exports: [
        DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, Load, MediaIf, ScrollIntoView,
    ],
    providers: [
        {
            provide: SCREEN_SIZE_RULES,
            useValue: defaultScreenSizeRules
        }
    ]
})
export class UtilsModule {
}
