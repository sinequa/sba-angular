import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UtilsModule} from "@sinequa/components/utils";
import {IntlModule} from "@sinequa/core/intl";

import {BsThemeToggleComponent} from "./theme-toggle.component";

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        IntlModule
    ],
    declarations: [
        BsThemeToggleComponent
    ],
    exports: [
        BsThemeToggleComponent
    ],
    providers: []
})
export class BsThemeToggleModule {
}
