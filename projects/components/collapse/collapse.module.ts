import {NgModule} from "@angular/core";
import {Collapse} from "./collapse.component";
import {CollapseButton} from "./collapse-button.component";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";
import {UtilsModule} from "@sinequa/components/utils";

@NgModule({
    imports: [
        CommonModule,
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
