import {Component, Input, HostBinding, Injector, OnChanges, SimpleChanges} from "@angular/core";
import {ModalButton, ModalRef, ModalResult} from "@sinequa/core/modal";

@Component({
    selector: "sq-modal-footer",
    templateUrl: "./modal-footer.component.html",
    styleUrls: ["./modal-footer.component.scss"]
})
export class BsModalFooter implements OnChanges{
    @Input() buttons: ModalButton[] = [];
    @Input() isProcessingState: boolean;
    @HostBinding("class.sq-modal-footer") true;

    constructor(
        protected modalRef: ModalRef,
        protected injector: Injector) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isProcessingState) {
            this.isProcessingState = changes.isProcessingState.currentValue;
        }
    }

    buttonClick(button: ModalButton) {
        if (button.validation && button.validation.controls) {
            // Mark all controls as dirty so validation errors are shown on all controls after a submit
            for (const name of Object.keys(button.validation.controls)) {
                button.validation.controls[name].markAsDirty();
            }
        }
        button.click(this.modalRef);
        return false;
    }

    public close(): void {
        this.modalRef.close(ModalResult.Cancel);
    }
}
