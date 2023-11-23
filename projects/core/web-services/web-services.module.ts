import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

import {NgModule, ModuleWithProviders, APP_INITIALIZER} from "@angular/core";

// Intl is required by various web services
import {BaseModule} from "@sinequa/core/base";
import {IntlModule} from "@sinequa/core/intl";

// StartConfig
import {WEB_SERVICES_MODULE_PROVIDERS} from "./module.providers";
import {StartConfigWebService, START_CONFIG, StartConfig} from "./start-config.web.service";


// Used to ensure that the StartConfigWebService is instantiated
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StartConfigInitializer(startConfigWebService: StartConfigWebService): () => Promise<void> {
    const init = () => Promise.resolve();
    return init;
}

/**
 * This module implements client services for the Sinequa web service APIs
 */
// @dynamic
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BaseModule,
        IntlModule
    ],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        // Ensure that the StartConfigWebService is instantiated so StartConfig is initialized
        {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true},
        ...WEB_SERVICES_MODULE_PROVIDERS
    ]
})
export class WebServicesModule {
    /**
     * Configures the module with a start configuration
     *
     * @param startConfig The start configuration object
     *
     * @returns The configured module
     */
    static forRoot(startConfig: StartConfig) : ModuleWithProviders<WebServicesModule> {
        return {
            ngModule: WebServicesModule,
            providers: [
                // Provide START_CONFIG
                {provide: START_CONFIG, useValue: startConfig},
            ]
        };
    }
}