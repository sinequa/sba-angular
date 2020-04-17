import {Component, Inject, HostBinding} from "@angular/core";
import {MODAL_MODEL, ModalRef, ConfirmOptions, ConfirmType} from "@sinequa/core/modal";

@Component({
    selector: "sq-confirm",
    templateUrl: "./confirm.component.html"
})
export class BsConfirm {
    @HostBinding("class.sq-confirm") true;

    constructor(
        @Inject(MODAL_MODEL) public model: ConfirmOptions,
        protected modalRef: ModalRef) {
    }

    get title(): string {
        return this.model.title ? this.model.title : "msg#modal.confirm.title";
    }

    public getMessageClass(confirmType): string {
        switch (confirmType) {
            case ConfirmType.Info:
                return "alert-info";
            case ConfirmType.Success:
                return "alert-sucess";
            case ConfirmType.Warning:
                return "alert-warning";
            case ConfirmType.Error:
                return "alert-danger";
            default:
                return "";
        }
    }
}