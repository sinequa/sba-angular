import {Component, Input, HostBinding, Injector} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {ModalButton} from "@sinequa/core/modal";

@Component({
    selector: "sq-modal-footer",
    templateUrl: "./modal-footer.component.html"
})
export class MdModalFooter {
    @Input() buttons: ModalButton[] = [];
    @HostBinding("class.sq-modal-footer") true;

    constructor(
        protected dialogRef: MatDialogRef<any>,
        protected injector: Injector) {
    }

    buttonClick(button: ModalButton) {
        button.click(this.dialogRef);
    }
}
