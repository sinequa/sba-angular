import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IntlModule} from "@sinequa/core/intl";

import {BsActionModule} from "@sinequa/components/action";
import {UtilsModule} from "@sinequa/components/utils";

import {BsFullscreenActivator} from "./fullscreen-activator/fullscreen-activator";
import {BsNetworkActivity} from "./network-activity/network-activity";

@NgModule({
    imports: [
        CommonModule,
        IntlModule,
        BsActionModule,
        UtilsModule,
    ],
    declarations: [
        BsFullscreenActivator, BsNetworkActivity,
    ],
    exports: [
        BsFullscreenActivator, BsNetworkActivity,
    ]
})
export class BsStatusBarModule {
}
