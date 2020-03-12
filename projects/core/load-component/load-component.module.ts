import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BaseModule} from "@sinequa/core/base";

import {LoadComponentDirective} from "./load-component.directive";
import {LOAD_COMPONENT_MODULE_PROVIDERS} from "./module.providers";

/**
 * This module provides functionality for the dynamic loading of components based on the
 * techniques described in the [angular documentation]{@link https://angular.io/guide/dynamic-component-loader}
 */
// @dynamic
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        LoadComponentDirective
    ],
    exports: [
        LoadComponentDirective
    ],
    providers: [
        ...LOAD_COMPONENT_MODULE_PROVIDERS
    ]
})
export class LoadComponentModule {
}
