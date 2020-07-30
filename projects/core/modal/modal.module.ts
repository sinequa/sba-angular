import {Confirm} from "./confirm.component";

import {NgModule, ModuleWithProviders, Type} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {A11yModule} from "@angular/cdk/a11y";
import {OverlayModule} from "@angular/cdk/overlay";

// Sinequa modules
import {BaseModule} from "@sinequa/core/base";
import {IntlModule} from "@sinequa/core/intl";


import {MODAL_CONFIRM} from "./modal.service";

import {MODAL_MODULE_PROVIDERS} from "./module.providers";

/**
 * This module contains an implementation of a [modal dialog service]{@link ModalService} which can be extended
 * to support UI frameworks such as Bootstrap and Material Design. It uses the `Overlay` and `Portal` funcionality
 * provided by the [Angular CDK]{@link https://material.angular.io/cdk/categories} library.
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        // CDK
        OverlayModule, // Needed for the modal service
        A11yModule,

        // Sinequa modules
        BaseModule,
        IntlModule
    ],
    declarations: [
        Confirm,    // Default confirm
    ],
    exports: [
    ],
    providers: [
        ...MODAL_MODULE_PROVIDERS
    ]
})
export class ModalModule {
    static forRoot(confirmModal: Type<any> = Confirm): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [
                {provide: MODAL_CONFIRM, useValue: confirmModal},
            ]
        };
    }
}
