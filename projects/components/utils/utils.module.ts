import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {A11yModule} from "@angular/cdk/a11y";

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
import {FocusKeyListDirective} from "./directives/focus-key-list.directive";
import {FocusKeyListItemDirective} from "./directives/focus-key-list-item.directive";
import {ResizeEventDirective} from "./directives/resize-event.directive";
import {StickyComponent} from "./directives/sticky";

// UI Service
import {SCREEN_SIZE_RULES} from "./ui.service";

export const defaultScreenSizeRules = {
    xxl: "(min-width: 1920px)",
    xl: "(min-width: 1200px) and (max-width: 1919.98px)",
    lg: "(min-width: 992px) and (max-width: 1199.98px)",
    md: "(min-width: 768px) and (max-width: 991.98px)",
    sm: "(min-width: 576px) and (max-width: 767.98px)",
    xs: "(max-width: 575.98px)",
};

@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        IntlModule
    ],
    declarations: [
        DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, Load, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective, 
        ResizeEventDirective, StickyComponent
    ],
    exports: [
        DatePipe, ExprPipe, MemorySizePipe, MomentPipe, NumberPipe, RelativeTimePipe, TimePipe, ValuePipe,
        Autofocus, ClickOutside, Load, MediaIf, ScrollIntoView, FocusKeyListDirective, FocusKeyListItemDirective,
        ResizeEventDirective, StickyComponent
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
