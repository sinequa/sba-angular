import {Component, Input, HostBinding, ViewEncapsulation} from "@angular/core";
import {ModalButton} from "@sinequa/core/modal";

@Component({
    selector: "sq-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MdModal {
    @Input() title: string;
    @Input() buttons: ModalButton[];
    @Input() showHeader = true;
    @Input() showFooter = true;
    @Input() fullscreen: boolean;
    @HostBinding("class.sq-modal") true;
}