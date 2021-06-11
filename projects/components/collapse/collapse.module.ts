import {NgModule} from "@angular/core";
import {Collapse} from "./collapse.component";
import {CollapseButton} from "./collapse-button.component";
import {CollapseLink} from "./collapse-link.component";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";

@NgModule({
    imports: [
        CommonModule,
        IntlModule
    ],
    declarations: [
        Collapse, CollapseButton, CollapseLink
    ],
    exports: [
        Collapse, CollapseButton, CollapseLink
    ],
})
export class CollapseModule {
}
