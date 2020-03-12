import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BaseModule} from "@sinequa/core/base";
import {AppUtilsModule} from "@sinequa/core/app-utils";
import {IntlModule} from "@sinequa/core/intl";
import {LoadComponentModule} from "@sinequa/core/load-component";

import {ValidationDirective, VALIDATION_MESSAGE_COMPONENT} from "./validation.directive";
import {ValidationErrorPipe} from "./validation-error.pipe";
import {ValidationMessageComponent} from "./validation-message.component";

import {VALIDATION_MODULE_PROVIDERS} from "./module.providers";

/**
 * This module contains facilities for working with Angular's form validation. It provides a
 * {@link ValidationService} that works with {@link IntlService} and {@link FormatService} to
 * support locale-sensitive validators.
 */
@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        AppUtilsModule,
        IntlModule,
        LoadComponentModule
    ],
    declarations: [
        ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
    ],
    exports: [
        ValidationDirective, ValidationMessageComponent, ValidationErrorPipe,
    ],
    providers: [
        {provide: VALIDATION_MESSAGE_COMPONENT, useValue: ValidationMessageComponent},

        ...VALIDATION_MODULE_PROVIDERS
    ]
})
export class ValidationModule {
}
