import {NgModule, APP_BOOTSTRAP_LISTENER} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BsSearchModule} from "@sinequa/components/search";
import {HTTP_REQUEST_INITIALIZERS} from "@sinequa/core/login";

import {MlAuditService} from "./ml-audit.service";
import {DwellTime} from "./dwell-time.directive";


// Initialization that needs to be done once the app component has been created
export function AppBootstrapListener(mlAuditService: MlAuditService) {
    return () => {
        mlAuditService.init();
    };
}

export function HttpRequestListener(mlAuditService: MlAuditService) {
    return mlAuditService.requestInitializer;
}

// See https://github.com/angular/angular/issues/19698
// @dynamic
@NgModule({
    imports: [
        CommonModule,
        BsSearchModule
    ],
    declarations: [
        DwellTime
    ],
    exports: [
    ],
    providers: [
        {provide: APP_BOOTSTRAP_LISTENER, useFactory: AppBootstrapListener, deps: [MlAuditService], multi: true},
        {provide: HTTP_REQUEST_INITIALIZERS, useFactory: HttpRequestListener, deps: [MlAuditService], multi: true},
    ]
})
export class MLModule {
}
