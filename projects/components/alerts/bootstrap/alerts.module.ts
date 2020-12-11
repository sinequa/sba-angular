import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";

import {IntlModule} from "@sinequa/core/intl";
import {ValidationModule} from "@sinequa/core/validation";

import {UtilsModule} from "@sinequa/components/utils";
import {BsActionModule} from "@sinequa/components/action";
import {BsModalModule} from "@sinequa/components/modal";

import {ALERT_COMPONENTS} from "../alerts.service";
import {BsEditAlert} from "./edit-alert/edit-alert";
import {BsManageAlerts} from "./manage-alerts/manage-alerts";
import {BsAlertsMenuComponent} from "./alerts-menu/alerts-menu.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        DragDropModule,

        BsModalModule,

        IntlModule,
        ValidationModule,

        UtilsModule,
        BsActionModule
    ],
    declarations: [
        BsEditAlert, BsManageAlerts, BsAlertsMenuComponent
    ],
    exports: [
        BsEditAlert, BsManageAlerts, BsAlertsMenuComponent
    ],
    providers: [
        {
            provide: ALERT_COMPONENTS,
            useValue: {
                editAlertModal: BsEditAlert,
                manageAlertsModal: BsManageAlerts
            }
        },
        { provide: Window, useValue: { window } }
    ]
})
export class BsAlertsModule {
}
