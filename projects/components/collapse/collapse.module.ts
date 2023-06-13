import {NgModule} from "@angular/core";
import {Collapse} from "./collapse.component";
import {CollapseButton} from "./collapse-button.component";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";
import {UtilsModule} from "@sinequa/components/utils";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        IntlModule,
        UtilsModule
    ],
    declarations: [
        Collapse, CollapseButton
    ],
    exports: [
        Collapse, CollapseButton
    ],
})
export class CollapseModule {
}
