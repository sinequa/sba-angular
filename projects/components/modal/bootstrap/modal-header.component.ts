import {Component, Input, HostBinding, Injector} from "@angular/core";
import { UIService } from "@sinequa/components/utils";
import {ModalService, ModalResult, ModalRef} from "@sinequa/core/modal";

@Component({
    selector: "sq-modal-header",
    templateUrl: "./modal-header.component.html",
    standalone: false
})
export class BsModalHeader {
    @Input() title: string;
    @HostBinding("class.sq-modal-header") true;

    constructor(
        protected modalRef: ModalRef,
        protected injector: Injector,
        public readonly ui: UIService) {
    }

    // Avoid circular reference (via Confirm)
    get modalService(): ModalService {
        return this.injector.get(ModalService);
    }

    cancel() {
        this.modalRef.close(ModalResult.Cancel);
    }
}