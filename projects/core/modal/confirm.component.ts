import {Component, Inject} from "@angular/core";
import {MODAL_MODEL, ConfirmOptions, ModalButton} from "./modal.service";
import {ModalRef} from "./modal-ref";

@Component({
    selector: "sq-core-confirm",
    template: `
        <div style="border: solid;padding: 16px;background-color: white;" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <h3 style="margin-top: 0;">{{title | sqMessage}}</h3>
            <div>{{model.message | sqMessage:model.messageParams}}</div>
            <hr>
            <ng-container *ngFor="let button of model.buttons">
                <button *ngIf="button.visible" type="{{button.primary ? 'submit' : 'button'}}"
                    (click)="buttonClick(button)">{{button.getText() | sqMessage}}</button>
            </ng-container>
        </div>
    `
})
export class Confirm {
    constructor(
        @Inject(MODAL_MODEL) public model: ConfirmOptions,
        protected modalRef: ModalRef) {
    }

    get title(): string {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }

    buttonClick(button: ModalButton) {
        button.click(this.modalRef);
    }
}
