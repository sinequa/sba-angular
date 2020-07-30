import {NgModule, APP_INITIALIZER, ModuleWithProviders, Type} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BaseModule} from "@sinequa/core/base";

import {IntlService, LOCALES_CONFIG, LocalesConfig} from "./intl.service";
import {MessagePipe} from "./message.pipe";
import {INTL_MODULE_PROVIDERS} from "./module.providers";

/**
 * An APP_INITIALIZER factory function for initialising the {@link IntlService} before any UI is displayed
 */
export function IntlInitializer(intlService: IntlService): () => Promise<string> {
    const init = () => intlService.init().toPromise();
    return init;
}

/**
 * This module contains core internationalization functionality for the formatting of numbers, dates and strings.
 * It is based on the industry standard
 * [Intl]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl} API
 * and an implementation of the ICU Message syntax provided by [FormatJS]{@link https://formatjs.io/}.
 *
 * The module provides mechanisms for the definition and loading of locales which can be extended with library specific
 * locale information. By default, locales contain support for `Moment.js` and `D3.js`.
 *
 * The module can be initialized by importing it using the `forRoot` static method or otherwise providing the
 * {@link LOCALES_CONFIG} injection token
 */
@NgModule({
    imports: [
        CommonModule,
        BaseModule
    ],
    declarations: [
        MessagePipe
    ],
    exports: [
        MessagePipe
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory: IntlInitializer, deps: [IntlService], multi: true},
        ...INTL_MODULE_PROVIDERS
    ]
})
export class IntlModule {
    static forRoot(localeConfig: Type<LocalesConfig>): ModuleWithProviders<IntlModule> {
        return {
            ngModule: IntlModule,
            providers: [
                {provide: LOCALES_CONFIG, useClass: localeConfig},
            ]
        };
    }
}
