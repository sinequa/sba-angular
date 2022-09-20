import {Component, Input, ViewEncapsulation} from "@angular/core";
import {ModalButton} from "@sinequa/core/modal";

@Component({
    selector: "sq-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    host: {'class': 'modal d-block position-relative'},
    encapsulation: ViewEncapsulation.None
})
export class BsModal {
    @Input() title: string;
    @Input() buttons: ModalButton[];
    @Input() showHeader = true;
    @Input() showFooter = true;
    @Input() isProcessingState = false;
}
