import {Component, Inject, OnInit} from "@angular/core";
import {ValidatorFn} from "@angular/forms";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {AuditEvent, AuditEventType} from "@sinequa/core/web-services";
import {AlertsService, Alert, AlertEventType, ManageAlertsModel} from "../../alerts.service";

@Component({
    selector: "sq-manage-alerts",
    templateUrl: "./manage-alerts.html",
    styleUrls: ["./manage-alerts.scss"]
})
export class BsManageAlerts implements OnInit {
    reordering: boolean;
    buttons: ModalButton[];
    removeAllButton: ModalButton;
    nameValidators: ValidatorFn[];

    constructor(
        @Inject(MODAL_MODEL) public model: { alertManager: ManageAlertsModel, searchRoute: string },
        public alertsService: AlertsService) {
        this.reordering = false;
    }

    get alertManager() {
        return this.model.alertManager;
    }

    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageAlerts.removeAll",
                result: ModalResult.Custom,
                action: (button) => {
                    this.alertManager.alerts.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: AlertEventType.DeleteAll
                    });
                },
                visible: this.alertManager.alerts.length > 0
            }),
            new ModalButton({
                result: ModalResult.OK,
                primary: true
            }),
            new ModalButton({
                result: ModalResult.Cancel
            })
        ];
    }

    addAuditEvent(auditEvent: AuditEvent) {
        if (!this.alertManager.auditEvents) {
            this.alertManager.auditEvents = [];
        }
        this.alertManager.auditEvents.push(auditEvent);
    }

    reorder() {
        this.reordering = !this.reordering;
    }

    remove(alert: Alert, index: number) {
        this.alertManager.alerts.splice(index, 1);
        this.removeAllButton.visible = this.alertManager.alerts.length > 0;
        this.addAuditEvent({
            type: AuditEventType.Alert_Delete,
            detail: {
                alert: alert.name
            }
        });
        return false;
    }

    editAlert(alert: Alert) {
        if (!this.reordering) {
            const alert1 = Utils.copy(alert);
            this.alertsService.editAlertModal(alert1, true, this.model.searchRoute)
                .then(result => {
                    if (result) {
                        Utils.copy(alert1, alert);
                        this.addAuditEvent({
                            type: AuditEventType.Alert_Edit,
                            detail: {
                                alert: alert.name
                            }
                        });
                    }
                });
        }
        return false;
    }

    dropped(drop: CdkDragDrop<Alert[]>) {
        Utils.arrayMove(this.alertManager.alerts, drop.previousIndex, drop.currentIndex);
    }
}
