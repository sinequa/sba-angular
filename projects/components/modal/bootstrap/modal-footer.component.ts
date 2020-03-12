import {Component, Input, HostBinding, Injector} from "@angular/core";
import {ModalButton, ModalRef} from "@sinequa/core/modal";

@Component({
    selector: "sq-modal-footer",
    templateUrl: "./modal-footer.component.html"
})
export class BsModalFooter {
    @Input() buttons: ModalButton[] = [];
    @HostBinding("class.sq-modal-footer") true;

    constructor(
        protected modalRef: ModalRef,
        protected injector: Injector) {
    }

    buttonClick(button: ModalButton) {
        if (button.validation && button.validation.controls) {
            // Mark all controls as dirty so validation errors are shown on all controls after a submit
            for (const name of Object.keys(button.validation.controls)) {
                button.validation.controls[name].markAsDirty();
            }
        }
        button.click(this.modalRef);
    }
}
