import {Component, OnInit, Inject} from "@angular/core";
import {Validators, AbstractControl} from "@angular/forms";
import {ValidatorFn} from "@angular/forms";
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {MODAL_MODEL, ModalButton, ModalResult} from "@sinequa/core/modal";
import {Utils} from "@sinequa/core/base";
import {AuditEvent} from "@sinequa/core/web-services";
import {Basket, BasketEventType, ManageBasketsModel} from "../../baskets.service";

@Component({
    selector: "sq-manage-baskets",
    templateUrl: "./manage-baskets.html",
    styleUrls: ["./manage-baskets.scss"]
})
export class BsManageBaskets implements OnInit {
    reordering: boolean;
    buttons: ModalButton[];
    removeAllButton: ModalButton;
    nameValidators: ValidatorFn[];

    constructor(
        @Inject(MODAL_MODEL) public model: ManageBasketsModel) {
        this.reordering = false;

        this.nameValidators = [
            Validators.required,
            (control: AbstractControl) => {
                const modelControl = control.root.get("model");
                if (modelControl) {
                    for (const item of this.model.baskets) {
                        if (modelControl.value === item) {
                            continue;
                        }
                        if (control.value === item.name) {
                            return {
                                unique: true
                            };
                        }
                    }
                }
                return null;
            }
        ];
    }

    ngOnInit() {
        this.buttons = [
            this.removeAllButton = new ModalButton({
                text: "msg#manageBaskets.removeAll",
                result: ModalResult.Custom,
                action: (button) => {
                    this.model.baskets.splice(0);
                    button.visible = false;
                    this.addAuditEvent({
                        type: BasketEventType.DeleteAll
                    });
                },
                visible: this.model.baskets.length > 0
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
        if (!this.model.auditEvents) {
            this.model.auditEvents = [];
        }
        this.model.auditEvents.push(auditEvent);
    }

    reorder() {
        this.reordering = !this.reordering;
    }

    setName(basket: Basket, name: string) {
        if (!Utils.eqNC(basket.name, name)) {
            this.addAuditEvent({
                type: BasketEventType.Rename,
                detail: {
                    basket: name,
                    "old-name": basket.name
                }
            });
            basket.name = name;
        }
    }

    remove(basket: Basket, index: number) {
        this.model.baskets.splice(index, 1);
        this.removeAllButton.visible = this.model.baskets.length > 0;
        this.addAuditEvent({
            type: BasketEventType.Delete,
            detail: {
                basket: basket.name
            }
        });
        return false;
    }

    dropped(drop: CdkDragDrop<Basket[]>) {
        Utils.arrayMove(this.model.baskets, drop.previousIndex, drop.currentIndex);
    }
}
