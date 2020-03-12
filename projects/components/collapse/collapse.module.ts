import {NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Collapse} from "./collapse.component";
import {CollapseButton} from "./collapse-button.component";
import {CollapseLink} from "./collapse-link.component";
import {CommonModule} from "@angular/common";
import {IntlModule} from "@sinequa/core/intl";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        BrowserModule,
        BrowserAnimationsModule
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
